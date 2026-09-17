import { useState } from 'react'
import { ClipboardList, Leaf, Recycle } from 'lucide-react'
import { useEcologicalLog, type EcoStream } from '../hooks/useEcologicalLog'
import { Button } from './ui/Button'
import { Input, Label, Select, Textarea } from './ui/Input'
import { SourceNote } from './SourceNote'

const STREAMS: { id: EcoStream; label: string }[] = [
  { id: 'diverted', label: 'Sold / lifted to plant' },
  { id: 'compost', label: 'Municipal compost / SWM' },
  { id: 'paper', label: 'Paper mill' },
  { id: 'biogas', label: 'Biogas' },
  { id: 'dumped', label: 'Dumped / mixed waste' },
  { id: 'burned', label: 'Burned' },
]

export function EcologicalTracker({
  storageKey,
  seedDemo,
  officer,
  defaultDistrict,
}: {
  storageKey: string
  seedDemo: boolean
  officer: string
  defaultDistrict: string
}) {
  const { records, add, totals } = useEcologicalLog(storageKey, seedDemo)
  const [district, setDistrict] = useState(defaultDistrict)
  const [stream, setStream] = useState<EcoStream>('diverted')
  const [tonnes, setTonnes] = useState(5)
  const [notes, setNotes] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    add({
      date: new Date().toISOString().slice(0, 10),
      district,
      stream,
      tonnes,
      notes,
      officer,
    })
    setNotes('')
  }

  return (
    <section className="rounded-2xl border border-nv-border bg-white p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-nv-green/10 text-nv-green">
          <ClipboardList className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-semibold tracking-tight">Ecological tracking register</h2>
          <p className="mt-1 text-sm text-nv-muted">
            Officers record each lift, dump, or burn. This is how waste management becomes a ledger — not a one-off raid.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-nv-elevated p-4">
          <p className="text-[11px] text-nv-muted">Tonnes tracked to plants / SWM</p>
          <p className="mt-1 flex items-center gap-2 text-2xl font-semibold text-nv-green">
            <Recycle className="h-5 w-5" /> {totals.diverted.toFixed(1)}
          </p>
        </div>
        <div className="rounded-xl bg-nv-elevated p-4">
          <p className="text-[11px] text-nv-muted">Dumped or burned</p>
          <p className="mt-1 text-2xl font-semibold">{totals.leaked.toFixed(1)} t</p>
        </div>
        <div className="rounded-xl bg-nv-elevated p-4">
          <p className="text-[11px] text-nv-muted">Indicative tCO₂e</p>
          <p className="mt-1 flex items-center gap-2 text-2xl font-semibold">
            <Leaf className="h-5 w-5 text-nv-green" /> {totals.tco2e.toFixed(1)}
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-2">
        <div>
          <Label>District</Label>
          <Input value={district} onChange={(e) => setDistrict(e.target.value)} />
        </div>
        <div>
          <Label>Stream</Label>
          <Select value={stream} onChange={(e) => setStream(e.target.value as EcoStream)}>
            {STREAMS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>Tonnes</Label>
          <Input type="number" min={0.1} step={0.1} value={tonnes} onChange={(e) => setTonnes(Number(e.target.value))} />
        </div>
        <div>
          <Label>Field note</Label>
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Cluster, plant, or drain site" />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit">Record this track</Button>
        </div>
      </form>

      <div className="mt-5 max-h-64 space-y-2 overflow-auto">
        {records.length === 0 && (
          <p className="text-sm text-nv-muted">No records yet. Log the first lift or dump for this desk.</p>
        )}
        {records.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-nv-border px-3 py-2 text-sm">
            <span>
              <strong>{r.district}</strong> · {r.tonnes} t · {STREAMS.find((s) => s.id === r.stream)?.label}
            </span>
            <span className="text-nv-muted">{r.date}</span>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <SourceNote provenance="DEMONSTRATION_DATA">
          Officer-entered register in this browser. Not a CPCB feed. Demo desks keep sample rows; new government logins start empty.
        </SourceNote>
      </div>
    </section>
  )
}
