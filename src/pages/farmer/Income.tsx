import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { TrustBadge } from '../../components/ui/TrustBadge'
import { currentFarmer } from '../../data/agrinovaData'
import { formatINR } from '../../lib/utils'

export default function IncomePage() {
  const [acres, setAcres] = useState(currentFarmer.acres)
  const [yieldQ, setYieldQ] = useState(22)
  const [price, setPrice] = useState(2280)
  const [residueIncome, setResidueIncome] = useState(2250)

  const cropIncome = acres * yieldQ * price / 10
  const total = cropIncome + residueIncome

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Income Simulator</h1>
        <p className="text-sm text-nv-muted">Estimate crop + residue income · Demo calculator</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Inputs</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Acres', value: acres, set: setAcres, max: 20 },
              { label: 'Yield (q/acre)', value: yieldQ, set: setYieldQ, max: 40 },
              { label: 'Price (₹/q)', value: price, set: setPrice, max: 8000 },
              { label: 'Residue Income (₹)', value: residueIncome, set: setResidueIncome, max: 15000 },
            ].map(({ label, value, set, max }) => (
              <div key={label}>
                <label className="text-sm text-nv-muted">{label}: {value}</label>
                <input type="range" min={1} max={max} value={value} onChange={(e) => set(Number(e.target.value))}
                  className="w-full mt-1 accent-nv-green" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Estimated Income</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between"><span className="text-nv-muted">Crop sales</span><span className="font-medium">{formatINR(Math.round(cropIncome))}</span></div>
            <div className="flex justify-between"><span className="text-nv-muted">Residue sales</span><span className="font-medium text-nv-green">{formatINR(residueIncome)}</span></div>
            <div className="border-t border-nv-border pt-4 flex justify-between">
              <span className="font-semibold">Total (estimated)</span>
              <span className="text-2xl font-semibold text-nv-green">{formatINR(Math.round(total))}</span>
            </div>
            <p className="text-sm text-nv-muted">vs burning residue: ₹0 + fine risk up to {formatINR(acres * 15000)}</p>
            <TrustBadge confidence={70} reason="Based on user inputs and demo MSP/mandi data" label="Estimated" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
