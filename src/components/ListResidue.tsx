import { useState } from 'react'
import { estimateValue, farmer, getBestBuyer } from '../data/demoData'
import type { CropType, ResidueListing } from '../types'

interface ListResidueProps {
  onSubmit: (listing: ResidueListing) => void
  onCancel: () => void
  onBookEquipment: () => void
}

const cropTypes: CropType[] = ['Wheat', 'Rice', 'Cotton', 'Sugarcane']

export default function ListResidue({ onSubmit, onCancel, onBookEquipment }: ListResidueProps) {
  const [cropType, setCropType] = useState<CropType>('Wheat')
  const [acres, setAcres] = useState(farmer.acres)
  const [quantity, setQuantity] = useState(Math.round(farmer.acres * 2.4))
  const [step, setStep] = useState<'form' | 'preview'>('form')

  const estimatedValue = estimateValue(acres, cropType)
  const bestBuyer = getBestBuyer(quantity)
  const buyerOffer = quantity * bestBuyer.pricePerTon

  function handleSubmit() {
    const listing: ResidueListing = {
      id: `lst-${Date.now()}`,
      cropType,
      quantity,
      acres,
      location: `${farmer.village}, ${farmer.district}`,
      district: farmer.district.split(',')[0],
      status: 'matched',
      estimatedValue: buyerOffer,
      matchedBuyer: bestBuyer.name,
      createdAt: new Date().toISOString().split('T')[0],
    }
    onSubmit(listing)
  }

  if (step === 'preview') {
    return (
      <div className="mx-auto max-w-lg px-4 py-10 animate-fade-in">
        <h1 className="mb-6 text-2xl font-bold">Confirm Your Listing</h1>
        <div className="space-y-4 rounded-xl border border-agri-border bg-agri-card p-6">
          <Row label="Crop" value={cropType} />
          <Row label="Acres" value={`${acres} acres`} />
          <Row label="Quantity" value={`~${quantity} tonnes`} />
          <Row label="Location" value={`${farmer.village}, ${farmer.district}`} />
          <div className="border-t border-agri-border pt-4">
            <Row label="Best Match" value={bestBuyer.name} highlight />
            <Row label="Distance" value={`${bestBuyer.distance} km`} />
            <Row label="Offer" value={`₹${buyerOffer.toLocaleString('en-IN')}`} highlight />
          </div>
          <div className="rounded-lg bg-agri-green/10 p-4 text-sm">
            <p className="text-agri-green font-medium">
              vs. Burning: ₹0 earned + up to ₹{(acres * 15000).toLocaleString('en-IN')} fine risk
            </p>
            <p className="mt-1 text-agri-muted">
              Estimated earnings: ₹{estimatedValue.toLocaleString('en-IN')} – ₹{buyerOffer.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setStep('form')}
            className="flex-1 rounded-lg border border-agri-border py-3 font-medium hover:border-agri-green/50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 rounded-lg bg-agri-green py-3 font-bold text-agri-dark hover:bg-agri-green-dim"
          >
            Confirm & Match
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-agri-muted">
          Next:{' '}
          <button type="button" onClick={onBookEquipment} className="text-agri-green hover:underline">
            Book baling equipment →
          </button>
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10 animate-fade-in">
      <h1 className="mb-2 text-2xl font-bold">List Your Crop Residue</h1>
      <p className="mb-8 text-agri-muted">Step 1 of 5 — Tell us what you have</p>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">Crop Type</label>
          <div className="grid grid-cols-2 gap-2">
            {cropTypes.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCropType(c)}
                className={`rounded-lg border py-3 text-sm font-medium transition ${
                  cropType === c
                    ? 'border-agri-green bg-agri-green/15 text-agri-green'
                    : 'border-agri-border hover:border-agri-green/40'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Acres ({acres} ac)
          </label>
          <input
            type="range"
            min={1}
            max={20}
            value={acres}
            onChange={(e) => {
              const a = Number(e.target.value)
              setAcres(a)
              setQuantity(Math.round(a * 2.4))
            }}
            className="w-full accent-agri-green"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Estimated Quantity (tonnes)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full rounded-lg border border-agri-border bg-agri-card px-4 py-3 focus:border-agri-green focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Location</label>
          <input
            type="text"
            readOnly
            value={`${farmer.village}, ${farmer.district}`}
            className="w-full rounded-lg border border-agri-border bg-agri-card/50 px-4 py-3 text-agri-muted"
          />
        </div>

        <div className="rounded-xl border border-agri-green/30 bg-agri-green/5 p-4">
          <p className="text-sm text-agri-muted">Estimated value</p>
          <p className="text-2xl font-bold text-agri-green">
            ₹{estimatedValue.toLocaleString('en-IN')} – ₹{buyerOffer.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-agri-border py-3 font-medium"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => setStep('preview')}
          className="flex-1 rounded-lg bg-agri-green py-3 font-bold text-agri-dark"
        >
          Preview Match →
        </button>
      </div>
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-agri-muted">{label}</span>
      <span className={highlight ? 'font-bold text-agri-green' : 'font-medium'}>{value}</span>
    </div>
  )
}
