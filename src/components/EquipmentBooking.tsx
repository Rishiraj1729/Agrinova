import { useState } from 'react'
import { equipmentSlots } from '../data/demoData'

interface EquipmentBookingProps {
  onBooked: () => void
  onBack: () => void
}

export default function EquipmentBooking({ onBooked, onBack }: EquipmentBookingProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)

  function handleBook() {
    if (!selected) return
    setBooked(true)
    setTimeout(onBooked, 2000)
  }

  if (booked) {
    const slot = equipmentSlots.find((s) => s.id === selected)
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center animate-fade-in">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-agri-green/20 text-4xl">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-agri-green">Equipment Booked!</h1>
        <p className="mt-2 text-agri-muted">
          {slot?.equipment} · {slot?.date} · {slot?.time}
        </p>
        <p className="mt-4 text-sm text-agri-muted">Redirecting to payment...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 animate-fade-in">
      <h1 className="mb-2 text-2xl font-bold">Book Shared Equipment</h1>
      <p className="mb-8 text-agri-muted">
        Step 3 of 5 — Reserve a baler or Happy Seeder for your field
      </p>

      <div className="space-y-3">
        {equipmentSlots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            disabled={!slot.available}
            onClick={() => setSelected(slot.id)}
            className={`w-full rounded-xl border p-5 text-left transition ${
              !slot.available
                ? 'cursor-not-allowed border-agri-border/50 opacity-50'
                : selected === slot.id
                  ? 'border-agri-green bg-agri-green/10'
                  : 'border-agri-border bg-agri-card hover:border-agri-green/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">{slot.equipment}</p>
                <p className="text-sm text-agri-muted">
                  {slot.date} · {slot.time}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  slot.available
                    ? 'bg-agri-green/20 text-agri-green'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {slot.available ? 'Available' : 'Booked'}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-agri-border bg-agri-card p-4 text-sm text-agri-muted">
        <p>
          <strong className="text-white">Shared equipment</strong> — pay only ₹800–1,200
          per session instead of buying machinery worth ₹8–15 lakhs.
        </p>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg border border-agri-border py-3 font-medium"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleBook}
          disabled={!selected}
          className="flex-1 rounded-lg bg-agri-green py-3 font-bold text-agri-dark disabled:opacity-40"
        >
          Book Slot
        </button>
      </div>
    </div>
  )
}
