import { useEffect } from 'react'
import { CaseStudyDetail } from './CaseStudyLayout'
import { useCaseStudy } from '../../contexts/CaseStudyContext'

export default function WestBengalCaseStudyPage() {
  const { setRegion } = useCaseStudy()
  useEffect(() => { setRegion('west-bengal') }, [setRegion])
  return <CaseStudyDetail runCtaTo="/farmer/kisansathi" />
}
