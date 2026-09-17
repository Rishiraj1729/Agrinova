import { Link } from 'react-router-dom'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ProvenanceBadge } from '../../components/ProvenanceBadge'
import { punjabCaseStudy } from '../../data/caseStudies/punjab'
import { westBengalCaseStudy } from '../../data/caseStudies/westBengal'
import { useCaseStudy } from '../../contexts/CaseStudyContext'
import { useLanguage } from '../../contexts/LanguageContext'

export default function CaseStudiesHub() {
  const { setRegion } = useCaseStudy()
  const { t } = useLanguage()

  const cards = [
    { meta: punjabCaseStudy, to: '/case-studies/punjab', kicker: t('landing.punjabt') },
    { meta: westBengalCaseStudy, to: '/case-studies/west-bengal', kicker: t('landing.wbt') },
  ]

  return (
    <div className="animate-fade-in mx-auto max-w-4xl space-y-8 px-4 py-12">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{t('cs.hub')}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-nv-muted">{t('cs.hubsub')}</p>
        <ProvenanceBadge provenance="DEMONSTRATION_DATA" className="mt-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map(({ meta, to, kicker }) => (
          <Card key={meta.region}>
            <CardContent className="space-y-3 pt-5">
              <p className="text-[13px] font-medium text-nv-green">{kicker}</p>
              <h2 className="font-semibold">{meta.title}</h2>
              <p className="text-sm leading-relaxed text-nv-muted line-clamp-4">{meta.problem}</p>
              <p className="text-xs text-nv-muted">
                {meta.baseline.farmers} farmers · {meta.baseline.buyers} buyers (demo)
              </p>
              <Link to={to} onClick={() => setRegion(meta.region)}>
                <Button variant="outline" className="w-full">
                  {t('cs.open')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
