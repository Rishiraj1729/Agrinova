import { scienceSteps } from '../data/agrinovaData'
import { Card, CardContent } from '../components/ui/Card'

const stepColors = [
  'border-red-500/30', 'border-orange-500/30', 'border-yellow-500/30',
  'border-nv-green/30', 'border-blue-500/30', 'border-purple-500/30',
  'border-pink-500/30', 'border-nv-green/40', 'border-amber-500/30', 'border-nv-green/50',
]

export default function SciencePage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl space-y-6">
      <div className="text-center py-8">
        <p className="text-xs uppercase tracking-widest text-nv-green mb-2">NCSC Research Prototype</p>
        <h1 className="text-3xl font-semibold tracking-tight">Science & Methodology</h1>
        <p className="mt-2 text-nv-muted">Problem → Observation → Hypothesis → Data → Model → Experiment → Results → Limitations → Conclusion</p>
      </div>

      <div className="space-y-4">
        {scienceSteps.map((s, i) => (
          <Card key={s.step} className={stepColors[i]}>
            <CardContent className="pt-5">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nv-green/15 text-sm font-bold text-nv-green">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-nv-green">{s.step}</p>
                  <p className="mt-2 text-sm text-nv-muted leading-relaxed">{s.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="pt-5 text-sm text-amber-300/90">
          <strong>Scientific Integrity:</strong> All data in this prototype is fictional and clearly labelled.
          Carbon impact figures are project-level estimates, not certified carbon credits.
          AI predictions display confidence intervals and are not guarantees.
        </CardContent>
      </Card>
    </div>
  )
}
