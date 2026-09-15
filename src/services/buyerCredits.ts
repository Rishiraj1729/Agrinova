/** Indicative green-tax / CSR offset for buyers — demonstration only */
export const BUYER_TAX_INR_PER_TCO2E = 1200
/** Buyer earns 70% of farmer credit volume as Scope-3 style procurement credits */
export const BUYER_CREDIT_SHARE = 0.7

export function buyerTaxReliefInr(avoidedTco2e: number) {
  return Math.round(avoidedTco2e * BUYER_TAX_INR_PER_TCO2E)
}

export function buyerCreditsFromAvoided(avoidedTco2e: number, creditsPerTco2e: number) {
  return Math.round(avoidedTco2e * creditsPerTco2e * BUYER_CREDIT_SHARE)
}
