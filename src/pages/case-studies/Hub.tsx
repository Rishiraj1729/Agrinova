import { Link } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ProvenanceBadge } from '../../components/ProvenanceBadge'
import { punjabCaseStudy } from '../../data/caseStudies/punjab'
import { westBengalCaseStudy } from '../../data/caseStudies/westBengal'
import { useCaseStudy } from '../../contexts/CaseStudyContext'

export default function CaseStudiesHub() {
  const { setRegion } = useCaseStudy()

  const cards = [
    { meta: punjabCaseStudy, to: '/case-studies/punjab', primary: true },
    { meta: westBengalCaseStudy, to: '/case-studies/west-bengal', primary: false },
  ]

  return (
    <div className="animate-fade-in space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold">Case studies</h1>
        <p className="text-sm text-nv-muted mt-1">
          AgriNova is built around regional demonstration datasets. Choose a case study, then run the marketplace simulation.
        </p>
        <ProvenanceBadge provenance="DEMONSTRATION_DATA" className="mt-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map(({ meta, to, primary }) => (
          <Card key={meta.region} className={primary ? 'border-nv-green/40' : ''}>
            <CardContent className="pt-5 space-y-3">
              <h2 className="font-semibold">{meta.title}</h2>
              <p className="text-sm text-nv-muted line-clamp-3">{meta.problem}</p>
              <p className="text-xs text-nv-muted">{meta.baseline.farmers} farmers · {meta.baseline.buyers} buyers (demo)</p>
              <Link
                to={to}
                onClick={() => setRegion(meta.region)}
              >
                <Button variant={primary ? 'primary' : 'outline'} className="w-full">Open case study</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
