import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type {
  BuyerRequirement,
  CarbonLedgerEntry,
  CreditRedemption,
  FarmerCreditWallet,
  ListingStatus,
  MarketplaceTransaction,
  MrvRecord,
  Offer,
  ResidueListing,
} from '../types'
import { CREDITS_PER_TCO2E, redemptionCatalog } from '../data/redemptionCatalog'
import { createLedgerEntry } from '../services/carbonLedger'
import { createMrvRecord } from '../services/mrvRecord'
import { scoreBuyerMatch } from '../services/scoreMatch'
import { buyerCreditsFromAvoided } from '../services/buyerCredits'
import { buildLivedInSeed } from '../data/seedLivedIn'
import { useCaseStudy } from './CaseStudyContext'

const STORAGE_KEY = 'agrinova_marketplace_v4'

interface StoredState {
  listings: ResidueListing[]
  offers: Offer[]
  requirements: BuyerRequirement[]
  transactions: MarketplaceTransaction[]
  ledger: CarbonLedgerEntry[]
  mrv: MrvRecord[]
  wallets: Record<string, FarmerCreditWallet>
  redemptions: CreditRedemption[]
}

interface MarketplaceContextValue extends StoredState {
  addListing: (partial: Omit<ResidueListing, 'id' | 'createdAt' | 'status'> & { status?: ListingStatus }) => ResidueListing
  updateListingStatus: (id: string, status: ResidueListing['status']) => void
  createOffer: (listingId: string, buyerId: string, buyerName: string, pricePerTon: number, quantity: number) => Offer
  seedOffersForListing: (
    listingId: string,
    matches: { buyerId: string; buyerName: string; pricePerTon: number; quantity: number }[],
  ) => Offer[]
  acceptOffer: (offerId: string) => MarketplaceTransaction | null
  acceptOfferAndStartTxn: (
    listingId: string,
    buyerId: string,
    buyerName: string,
    pricePerTon: number,
    quantity: number,
  ) => MarketplaceTransaction | null
  advanceTransaction: (txnId: string) => void
  completeTransaction: (txnId: string, logisticsMode?: 'individual' | 'consolidated') => void
  postRequirement: (req: Omit<BuyerRequirement, 'id' | 'createdAt'>) => void
  resetDemo: () => void
  getWallet: (farmerId: string) => FarmerCreditWallet
  redeemCredits: (farmerId: string, itemId: string) => boolean
  getOffersForListing: (listingId: string) => Offer[]
}

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null)

function issueCredits(
  wallets: Record<string, FarmerCreditWallet>,
  farmerId: string,
  buyerId: string,
  avoidedTco2e: number,
): { wallets: Record<string, FarmerCreditWallet>; farmerCredits: number; buyerCredits: number } {
  const farmerCredits = Math.round(avoidedTco2e * CREDITS_PER_TCO2E)
  const buyerCredits = buyerCreditsFromAvoided(avoidedTco2e, CREDITS_PER_TCO2E)
  let next = { ...wallets }
  const bump = (id: string, amount: number) => {
    const prev = next[id] ?? { farmerId: id, balance: 0, lifetimeEarned: 0, lifetimeRedeemed: 0 }
    next = {
      ...next,
      [id]: {
        ...prev,
        balance: prev.balance + amount,
        lifetimeEarned: prev.lifetimeEarned + amount,
      },
    }
  }
  bump(farmerId, farmerCredits)
  bump(buyerId, buyerCredits)
  return { wallets: next, farmerCredits, buyerCredits }
}

const STATUS_FLOW: ListingStatus[] = [
  'accepted',
  'collection_scheduled',
  'collected',
  'delivered',
  'completed',
]

function loadState(): StoredState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredState
  } catch {
    return null
  }
}

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const { region, buyers, incrementSimulation } = useCaseStudy()
  const [state, setState] = useState<StoredState>(() => {
    const saved = loadState()
    if (saved?.listings?.length) {
      return {
        ...saved,
        wallets: saved.wallets ?? {},
        redemptions: saved.redemptions ?? [],
      }
    }
    return buildLivedInSeed()
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const addListing = useCallback(
    (partial: Omit<ResidueListing, 'id' | 'createdAt' | 'status'> & { status?: ListingStatus }) => {
      const listing: ResidueListing = {
        ...partial,
        id: `lst-live-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        status: partial.status ?? 'listed',
        region,
      }
      setState((s) => ({ ...s, listings: [listing, ...s.listings] }))
      return listing
    },
    [region],
  )

  const updateListingStatus = useCallback((id: string, status: ResidueListing['status']) => {
    setState((s) => ({
      ...s,
      listings: s.listings.map((l) => (l.id === id ? { ...l, status } : l)),
    }))
  }, [])

  const createOffer = useCallback(
    (listingId: string, buyerId: string, buyerName: string, pricePerTon: number, quantity: number) => {
      const buyer = buyers.find((b) => b.id === buyerId)
      if (!buyer) throw new Error('Invalid buyer')
      const offer: Offer = {
        id: `off-${Date.now()}`,
        listingId,
        buyerId,
        buyerName,
        pricePerTon,
        quantityTonnes: quantity,
        validUntil: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        matchScore: 0,
        breakdown: {
          rating: 0,
          distance: 0,
          demandFit: 0,
          priceFit: 0,
          pathwayFit: 0,
          moistureFit: 0,
          total: 0,
        },
        status: 'pending',
      }
      setState((s) => {
        const listing = s.listings.find((l) => l.id === listingId)
        if (!listing) return s
        const { matchScore, breakdown } = scoreBuyerMatch(
          buyer,
          listing.residueType,
          quantity,
          listing.pathway ?? 'biomass',
          listing.details?.moisturePercent,
        )
        offer.matchScore = matchScore
        offer.breakdown = breakdown
        return {
          ...s,
          offers: [offer, ...s.offers],
          listings: s.listings.map((l) =>
            l.id === listingId ? { ...l, status: 'offer_received' as const } : l,
          ),
        }
      })
      return offer
    },
    [buyers],
  )

  const seedOffersForListing = useCallback(
    (
      listingId: string,
      matches: { buyerId: string; buyerName: string; pricePerTon: number; quantity: number }[],
    ) => {
      const newOffers: Offer[] = []
      setState((s) => {
        const listing = s.listings.find((l) => l.id === listingId)
        if (!listing) return s
        matches.forEach((m, i) => {
          const buyer = buyers.find((b) => b.id === m.buyerId)
          if (!buyer) return
          const { matchScore, breakdown } = scoreBuyerMatch(
            buyer,
            listing.residueType,
            m.quantity,
            listing.pathway ?? 'biomass',
            listing.details?.moisturePercent,
          )
          newOffers.push({
            id: `off-${Date.now()}-${i}`,
            listingId,
            buyerId: m.buyerId,
            buyerName: m.buyerName,
            pricePerTon: m.pricePerTon,
            quantityTonnes: m.quantity,
            validUntil: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
            matchScore,
            breakdown,
            status: 'pending',
          })
        })
        return {
          ...s,
          offers: [...newOffers, ...s.offers],
          listings: s.listings.map((l) =>
            l.id === listingId ? { ...l, status: 'offer_received' as const } : l,
          ),
        }
      })
      return newOffers
    },
    [buyers],
  )

  const acceptOfferAndStartTxn = useCallback(
    (listingId: string, buyerId: string, buyerName: string, pricePerTon: number, quantity: number) => {
      let txn: MarketplaceTransaction | null = null
      setState((s) => {
        const listing = s.listings.find((l) => l.id === listingId)
        if (!listing) return s
        const buyer = buyers.find((b) => b.id === buyerId)
        const { matchScore, breakdown } = buyer
          ? scoreBuyerMatch(buyer, listing.residueType, quantity, listing.pathway ?? 'biomass', listing.details?.moisturePercent)
          : {
              matchScore: 80,
              breakdown: {
                rating: 16,
                distance: 18,
                demandFit: 16,
                priceFit: 10,
                pathwayFit: 10,
                moistureFit: 10,
                total: 80,
              },
            }
        const offerId = `off-${Date.now()}`
        const offer: Offer = {
          id: offerId,
          listingId,
          buyerId,
          buyerName,
          pricePerTon,
          quantityTonnes: quantity,
          validUntil: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
          matchScore,
          breakdown,
          status: 'accepted',
        }
        txn = {
          id: `txn-${Date.now()}`,
          listingId: listing.id,
          offerId,
          farmerId: listing.farmerId,
          buyerId,
          quantityTonnes: quantity,
          amount: quantity * pricePerTon,
          status: 'accepted',
          pathway: listing.pathway ?? 'biomass',
          region,
          logisticsMode: 'individual',
          updatedAt: new Date().toISOString(),
        }
        return {
          ...s,
          offers: [offer, ...s.offers.map((o) => (o.listingId === listingId ? { ...o, status: 'rejected' as const } : o))],
          listings: s.listings.map((l) =>
            l.id === listingId ? { ...l, status: 'accepted', matchedBuyerId: buyerId } : l,
          ),
          transactions: [txn!, ...s.transactions],
        }
      })
      return txn
    },
    [buyers, region],
  )

  const acceptOffer = useCallback(
    (offerId: string) => {
      const offer = state.offers.find((o) => o.id === offerId)
      if (!offer) return null
      const listing = state.listings.find((l) => l.id === offer.listingId)
      if (!listing) return null
      const txn: MarketplaceTransaction = {
        id: `txn-${Date.now()}`,
        listingId: listing.id,
        offerId: offer.id,
        farmerId: listing.farmerId,
        buyerId: offer.buyerId,
        quantityTonnes: offer.quantityTonnes,
        amount: offer.quantityTonnes * offer.pricePerTon,
        status: 'accepted',
        pathway: listing.pathway ?? 'biomass',
        region,
        logisticsMode: 'individual',
        updatedAt: new Date().toISOString(),
      }
      setState((s) => ({
        ...s,
        offers: s.offers.map((o) =>
          o.id === offerId ? { ...o, status: 'accepted' as const } : { ...o, status: 'rejected' as const },
        ),
        listings: s.listings.map((l) =>
          l.id === listing.id ? { ...l, status: 'accepted', matchedBuyerId: offer.buyerId } : l,
        ),
        transactions: [txn, ...s.transactions],
      }))
      return txn
    },
    [state.offers, state.listings, region],
  )

  const advanceTransaction = useCallback(
    (txnId: string) => {
      setState((s) => {
        const txn = s.transactions.find((t) => t.id === txnId)
        if (!txn) return s
        const idx = STATUS_FLOW.indexOf(txn.status as ListingStatus)
        const nextStatus = idx < 0 ? 'collection_scheduled' : STATUS_FLOW[Math.min(idx + 1, STATUS_FLOW.length - 1)]
        const updatedTxn = { ...txn, status: nextStatus, updatedAt: new Date().toISOString() }
        let ledger = s.ledger
        let mrv = s.mrv
        let listings = s.listings
        if (nextStatus === 'completed') {
          const listing = s.listings.find((l) => l.id === txn.listingId)
          const entry = createLedgerEntry(updatedTxn, listing?.residueType ?? 'Rice Straw')
          const { wallets, farmerCredits } = issueCredits(s.wallets ?? {}, txn.farmerId, txn.buyerId, entry.avoidedTco2e)
          ledger = [entry, ...s.ledger]
          mrv = [createMrvRecord(entry), ...s.mrv]
          listings = listings.map((l) =>
            l.id === txn.listingId ? { ...l, status: 'completed', carbonCreditsIssued: farmerCredits } : l,
          )
          incrementSimulation()
          return {
            ...s,
            wallets,
            transactions: s.transactions.map((t) => (t.id === txnId ? updatedTxn : t)),
            ledger,
            mrv,
            listings,
          }
        } else {
          listings = listings.map((l) => (l.id === txn.listingId ? { ...l, status: nextStatus } : l))
        }
        return {
          ...s,
          transactions: s.transactions.map((t) => (t.id === txnId ? updatedTxn : t)),
          ledger,
          mrv,
          listings,
        }
      })
    },
    [incrementSimulation],
  )

  const completeTransaction = useCallback(
    (txnId: string, logisticsMode: 'individual' | 'consolidated' = 'individual') => {
      setState((s) => {
        const txn = s.transactions.find((t) => t.id === txnId)
        if (!txn) return s
        const updatedTxn: MarketplaceTransaction = {
          ...txn,
          status: 'completed',
          logisticsMode,
          updatedAt: new Date().toISOString(),
        }
        const listing = s.listings.find((l) => l.id === txn.listingId)
        const entry = createLedgerEntry(updatedTxn, listing?.residueType ?? 'Rice Straw')
        const { wallets, farmerCredits } = issueCredits(s.wallets ?? {}, txn.farmerId, txn.buyerId, entry.avoidedTco2e)
        return {
          ...s,
          wallets,
          transactions: s.transactions.map((t) => (t.id === txnId ? updatedTxn : t)),
          listings: s.listings.map((l) =>
            l.id === txn.listingId ? { ...l, status: 'completed', carbonCreditsIssued: farmerCredits } : l,
          ),
          ledger: [entry, ...s.ledger],
          mrv: [createMrvRecord(entry), ...s.mrv],
        }
      })
      incrementSimulation()
    },
    [incrementSimulation],
  )

  const getWallet = useCallback(
    (farmerId: string): FarmerCreditWallet => {
      return (
        state.wallets?.[farmerId] ?? {
          farmerId,
          balance: 0,
          lifetimeEarned: 0,
          lifetimeRedeemed: 0,
        }
      )
    },
    [state.wallets],
  )

  const redeemCredits = useCallback((farmerId: string, itemId: string) => {
    const item = redemptionCatalog.find((i) => i.id === itemId)
    if (!item) return false
    let ok = false
    setState((s) => {
      const w = s.wallets?.[farmerId] ?? {
        farmerId,
        balance: 0,
        lifetimeEarned: 0,
        lifetimeRedeemed: 0,
      }
      if (w.balance < item.creditsCost) return s
      ok = true
      const redemption: CreditRedemption = {
        id: `red-${Date.now()}`,
        farmerId,
        itemName: item.name,
        creditsSpent: item.creditsCost,
        date: new Date().toISOString().split('T')[0],
      }
      return {
        ...s,
        wallets: {
          ...(s.wallets ?? {}),
          [farmerId]: {
            ...w,
            balance: w.balance - item.creditsCost,
            lifetimeRedeemed: w.lifetimeRedeemed + item.creditsCost,
          },
        },
        redemptions: [redemption, ...(s.redemptions ?? [])],
      }
    })
    return ok
  }, [])

  const getOffersForListing = useCallback(
    (listingId: string) => state.offers.filter((o) => o.listingId === listingId && o.status === 'pending'),
    [state.offers],
  )

  const postRequirement = useCallback((req: Omit<BuyerRequirement, 'id' | 'createdAt'>) => {
    const full: BuyerRequirement = {
      ...req,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      region,
    }
    setState((s) => ({ ...s, requirements: [full, ...s.requirements] }))
  }, [region])

  const resetDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setState(buildLivedInSeed())
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      wallets: state.wallets ?? {},
      redemptions: state.redemptions ?? [],
      addListing,
      updateListingStatus,
      createOffer,
      seedOffersForListing,
      acceptOffer,
      acceptOfferAndStartTxn,
      advanceTransaction,
      completeTransaction,
      postRequirement,
      resetDemo,
      getWallet,
      redeemCredits,
      getOffersForListing,
    }),
    [state, addListing, updateListingStatus, createOffer, seedOffersForListing, acceptOffer, acceptOfferAndStartTxn, advanceTransaction, completeTransaction, postRequirement, resetDemo, getWallet, redeemCredits, getOffersForListing],
  )

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>
}

export function useMarketplace() {
  const ctx = useContext(MarketplaceContext)
  if (!ctx) throw new Error('useMarketplace must be used within MarketplaceProvider')
  return ctx
}
