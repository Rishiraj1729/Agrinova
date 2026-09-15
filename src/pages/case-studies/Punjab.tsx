import { useEffect } from 'react'
import { CaseStudyDetail } from './CaseStudyLayout'
import { useCaseStudy } from '../../contexts/CaseStudyContext'

export default function PunjabCaseStudyPage() {
  const { setRegion } = useCaseStudy()
  useEffect(() => { setRegion('punjab') }, [setRegion])
  return <CaseStudyDetail runCtaTo="/farmer/kisansathi" />
}
