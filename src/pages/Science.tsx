import { scienceSteps } from '../data/agrinovaData'
import { MATH } from '../data/indiaLocations'
import { Card, CardContent } from '../components/ui/Card'
import { ProvenanceBadge } from '../components/ProvenanceBadge'

const stepColors = [
  'border-red-500/30', 'border-orange-500/30', 'border-yellow-500/30',
  'border-nv-green/30', 'border-blue-500/30', 'border-purple-500/30',
  'border-pink-500/30', 'border-nv-green/40', 'border-amber-500/30', 'border-nv-green/50',
]

const extras = [
  {
    title: 'Match score (weights sum 100)',
    body: `Distance ${MATH.matchWeights.distance}, rating ${MATH.matchWeights.rating}, demand ${MATH.matchWeights.demand}, moisture ${MATH.matchWeights.moisture}, pathway ${MATH.matchWeights.pathway}, price ${MATH.matchWeights.price}. Wet Madhyamgram heaps prefer compost; dry Punjab lots prefer ≤15% biomass. Moisture can zero a bad match.`,
  },
  {
    title: 'Mathematical working constants',
    body: `Rice straw ${MATH.strawPerAcreRice_t} t/acre (band ${MATH.strawBandMin_t}–${MATH.strawBandMax_t}); wheat ${MATH.strawPerAcreWheat_t} t/acre. Avoided CO₂e ≈ ${MATH.co2ePerTonneStraw} tCO₂e per tonne utilised vs open burn (order-of-magnitude, not Verra). Working gate price ₹${MATH.gatePriceWorking_INR}/t before freight. Example: 3 ac Doltala → 6.0 t → ≈ ₹4,200 gross → ≈ 9.0 tCO₂e avoided if sold instead of burned/dumped.`,
  },
  {
    title: 'Kisan Bandhu vision + booth samples',
    body: 'Leaf photo → OpenAI vision JSON (crop, disease, confidence, first actions) with educational disclaimer. Booth ships three curated samples (rice blast, bacterial blight, wheat rust) with known results. Offline heuristic if the API is down.',
  },
  {
    title: 'India 2070 contribution logic',
    body: 'AgriNova does not claim national net-zero accounting. It shows a West Bengal ward pathway first: fewer mixed drain loads, utilised tonnes on the ULB desk — with Punjab phone comparison for the burn clock.',
  },
]

export default function SciencePage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div className="text-center py-4">
        <p className="text-xs uppercase tracking-widest text-nv-green mb-2">NCSC Research Prototype</p>
        <h1 className="text-3xl font-semibold tracking-tight">Science & Methodology</h1>
        <p className="mt-2 text-nv-muted">
          Problem → Observation → Hypothesis → Data → Model → Experiment → Results → Limitations → Conclusion
        </p>
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

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Scientific depth modules</h2>
        {extras.map((e) => (
          <Card key={e.title}>
            <CardContent className="pt-5">
              <p className="font-semibold">{e.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-nv-muted">{e.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="pt-5 text-sm text-amber-800 space-y-2">
          <div className="flex flex-wrap gap-2">
            <ProvenanceBadge provenance="FIELD_SURVEY" />
            <ProvenanceBadge provenance="DEMONSTRATION_DATA" />
            <ProvenanceBadge provenance="MODEL_ESTIMATE" />
          </div>
          <p>
            <strong>Scientific integrity:</strong> Field-book claims are the n=10 September pack. Larger website clusters are
            labelled demonstration. Carbon figures are estimates, not certified credits. Disease scan is educational vision —
            not a laboratory diagnosis.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
