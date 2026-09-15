import type { SoilProfile } from '../contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Label, Select, Input, Textarea } from './ui/Input'
import { Button } from './ui/Button'

export function SoilProfileCard({
  soil,
  onChange,
  onAskAi,
}: {
  soil: SoilProfile
  onChange: (s: SoilProfile) => void
  onAskAi?: () => void
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Soil profile</CardTitle>
        {onAskAi && (
          <Button size="sm" variant="outline" onClick={onAskAi}>
            Ask Kisan AI
          </Button>
        )}
      </CardHeader>
      <CardContent className="grid sm:grid-cols-2 gap-3">
        <div>
          <Label>Soil type</Label>
          <Select
            value={soil.type}
            onChange={(e) => onChange({ ...soil, type: e.target.value as SoilProfile['type'] })}
          >
            <option value="alluvial">Alluvial</option>
            <option value="sandy_loam">Sandy loam</option>
            <option value="clay_loam">Clay loam</option>
            <option value="saline">Saline / sodic</option>
          </Select>
        </div>
        <div>
          <Label>pH</Label>
          <Input
            type="number"
            step={0.1}
            value={soil.ph}
            onChange={(e) => onChange({ ...soil, ph: Number(e.target.value) })}
          />
        </div>
        <div>
          <Label>Organic carbon %</Label>
          <Input
            type="number"
            step={0.01}
            value={soil.organicCarbonPercent}
            onChange={(e) => onChange({ ...soil, organicCarbonPercent: Number(e.target.value) })}
          />
        </div>
        <div>
          <Label>Nitrogen status</Label>
          <Select
            value={soil.nitrogen}
            onChange={(e) => onChange({ ...soil, nitrogen: e.target.value as SoilProfile['nitrogen'] })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label>Notes for Kisan AI</Label>
          <Textarea
            value={soil.notes}
            onChange={(e) => onChange({ ...soil, notes: e.target.value })}
            placeholder="Last crop, fertiliser used, waterlogging…"
          />
        </div>
      </CardContent>
    </Card>
  )
}
