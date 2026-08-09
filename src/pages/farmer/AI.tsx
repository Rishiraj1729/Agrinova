import { useState } from 'react'
import { Mic, Send, Bot } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { parseVoiceInput, findBuyersForResidue } from '../../data/agrinoveData'
import { formatINR } from '../../lib/utils'

export default function AIPage() {
  const [input, setInput] = useState('मेरे पास तीन टन धान का भूसा है')
  const [result, setResult] = useState<ReturnType<typeof parseVoiceInput> | null>(null)

  function handleParse() {
    setResult(parseVoiceInput(input))
  }

  const buyers = result ? findBuyersForResidue(result.residueType, result.quantity) : []

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">AI Assistant</h1>
        <p className="text-sm text-nv-muted">Multilingual voice prototype · English, Hindi, Bengali</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Bot className="h-5 w-5 text-nv-green" />
          <CardTitle>Voice Interaction Prototype</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-lg border border-nv-border bg-nv-dark px-4 py-2.5 text-sm focus:border-nv-green focus:outline-none"
              placeholder='Try: "मेरे पास तीन टन धान का भूसा है"'
            />
            <Button onClick={handleParse}><Send className="h-4 w-4" /></Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => setInput('मेरे पास तीन टन धान का भूसा है')}>
            <Mic className="h-4 w-4 mr-2" /> Demo phrase
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-nv-green/30">
          <CardContent className="pt-5 space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="success">Detected: {result.residueType}</Badge>
              <Badge variant="info">{result.quantity} tonnes</Badge>
            </div>
            <p className="text-sm text-nv-muted">Found {buyers.length} matching buyers:</p>
            {buyers.slice(0, 3).map((b) => (
              <div key={b.id} className="flex justify-between items-center rounded-lg border border-nv-border p-3">
                <span className="text-sm">{b.name} · {b.distanceKm}km</span>
                <span className="text-sm font-medium text-nv-green">{formatINR(b.estimatedValue)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
