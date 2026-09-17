import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { PageHeader, StatTile } from '../../components/ui/PageHeader'
import { ProvenanceBadge } from '../../components/ProvenanceBadge'
import { SourceNote } from '../../components/SourceNote'
import { useCaseStudy } from '../../contexts/CaseStudyContext'
import { useLanguage } from '../../contexts/LanguageContext'
import {
  wbFlow,
  wbGovernmentStudies,
  wbScopeIfUtilised,
  wbSurvey,
  wbVsPunjab,
  wbWasteBridge,
  westBengalCaseStudy,
} from '../../data/caseStudies/westBengal'
import { formatINR } from '../../lib/utils'

const tooltipStyle = { background: '#fff', border: '1px solid #e6e4df', color: '#1d1d1f', borderRadius: 12, fontSize: 12 }
const pieColors = ['#9a6b32', '#c4bfb5', '#1f4d3a', '#6e6e73']

export default function WestBengalCaseStudyPage() {
  const { setRegion } = useCaseStudy()
  const { t } = useLanguage()
  const [util, setUtil] = useState(60)
  const meta = westBengalCaseStudy
  const scoped = wbScopeIfUtilised.reduce((a, b) =>
    Math.abs(b.utilisation - util) < Math.abs(a.utilisation - util) ? b : a,
  )

  useEffect(() => {
    setRegion('west-bengal')
  }, [setRegion])

  return (
    <div className="animate-fade-in mx-auto max-w-5xl space-y-12 px-4 py-10">
      <PageHeader
        eyebrow="NCSC · West Bengal case"
        title={meta.title}
        description={meta.problem}
      />
      <ProvenanceBadge provenance={meta.provenance} />

      <section className="rounded-[28px] border border-nv-border bg-[#10261c] p-6 text-white sm:p-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/65">Why West Bengal — preface</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">From Kendriya Vidyalaya Dum Dum</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base">
          We are Class XI students at KV Dum Dum. We did not claim a Burdwan travel survey. The stream we can walk to is
          peri-urban paddy leftover in <strong className="text-white">Madhyamgram and Barasat</strong>: wet stacks, drain
          dumps, and mixed municipal biodegradable waste under SWM Rules, 2016. Punjab enters only as a{' '}
          <strong className="text-white">phone comparison</strong> (burn clock). Field work started at{' '}
          <strong className="text-white">Hridaypur in September 2025</strong> — leftover already sitting after the monsoon —
          not an October–November harvest-window study.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
            <p className="text-[11px] text-white/65">Home failure</p>
            <p className="font-semibold">Dump / mix</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
            <p className="text-[11px] text-white/65">Phone comparison</p>
            <p className="font-semibold">Punjab burn</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
            <p className="text-[11px] text-white/65">Missing object</p>
            <p className="font-semibold">Listing + 5-day pickup</p>
          </div>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-4">
        <StatTile label="Survey farmers" value={wbSurvey.n} hint="four districts" />
        <StatTile label="Straw dumped or mixed" value="41%" tone="saffron" hint="last season" />
        <StatTile label="Would list if pickup in 5 days" value="71%" tone="green" />
        <StatTile label="Cluster cash (seed)" value={formatINR(meta.baseline.totalIncome)} />
      </div>

      <section className="rounded-3xl border border-nv-border bg-white p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold tracking-tight">Field book strip (report-aligned)</h2>
          <ProvenanceBadge provenance="FIELD_SURVEY" />
        </div>
        <p className="mt-2 text-sm text-nv-muted">
          Authoritative NCSC claim: 6 nearby Madhyamgram–Barasat sheets + 4 Punjab phone sheets (n=10). Larger platform
          cluster below remains demonstration data.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <StatTile label="Named sheets" value="10" hint="6 WB + 4 PB phone" />
          <StatTile label="Acres in book" value="40.5" />
          <StatTile label="Would list (Yes)" value="8/10" tone="green" />
          <StatTile label="Civic officers" value="2" hint="Ward 21 · Madhyamgram SI" />
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-nv-border bg-white p-6">
        <h2 className="text-lg font-semibold tracking-tight">Waste gap — field to city</h2>
        <p className="mt-1 text-sm text-nv-muted">
          Straw that never reaches a buyer becomes drain dump and mixed municipal waste. AgriNova is the matching layer SWM Rules assumed.
        </p>
        <div className="mt-6 hidden grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 md:grid">
          {['Field straw', 'No desk', 'Drain / ULB mix', 'AgriNova match', 'Compost · paper · biogas'].map((label, i) => (
            <div key={label} className="contents">
              <div className="rounded-2xl border border-nv-border bg-nv-elevated px-4 py-6 text-center">
                <p className="text-[11px] font-medium uppercase tracking-wide text-nv-muted">0{i + 1}</p>
                <p className="mt-2 text-sm font-semibold">{label}</p>
              </div>
              {i < 4 && <ArrowRight className="h-4 w-4 text-nv-muted" />}
            </div>
          ))}
        </div>
        <div className="mt-6 md:hidden space-y-2">
          {['Field straw', 'No desk', 'Drain / ULB mix', 'AgriNova match', 'Plant gate'].map((label) => (
            <div key={label} className="rounded-xl border border-nv-border px-4 py-3 text-sm font-medium">{label}</div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Where 180 t of cluster straw went</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={wbFlow}>
                <XAxis dataKey="name" fontSize={10} stroke="#6e6e73" interval={0} angle={-18} textAnchor="end" height={56} />
                <YAxis fontSize={10} stroke="#6e6e73" />
                <Tooltip formatter={(v: number) => `${v} t`} contentStyle={tooltipStyle} />
                <Bar dataKey="t" fill="#1f4d3a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <SourceNote provenance="MODEL_ESTIMATE">Demonstration cluster tonnes, not a state inventory.</SourceNote>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Last-season fate (survey %)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={wbSurvey.findings} dataKey="pct" nameKey="label" innerRadius={58} outerRadius={88} paddingAngle={2}>
                  {wbSurvey.findings.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-nv-muted">
              {wbSurvey.findings.map((f, i) => (
                <p key={f.label} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: pieColors[i] }} />
                  {f.label} {f.pct}%
                </p>
              ))}
            </div>
            <SourceNote provenance="FIELD_SURVEY">n = {wbSurvey.n}.</SourceNote>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-lg font-semibold tracking-tight">Government studies this desk sits on</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {wbGovernmentStudies.map((s) => (
            <Card key={s.id}>
              <CardContent className="pt-5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{s.title}</p>
                  <ProvenanceBadge provenance={s.provenance} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-nv-muted">{s.body}</p>
                <p className="mt-3 text-sm leading-relaxed">
                  <span className="font-medium">Gap. </span>
                  {s.gap}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight">How AgriNova returns residue to the waste system</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {wbWasteBridge.map((b) => (
            <Card key={b.from}>
              <CardContent className="pt-5">
                <p className="text-[13px] font-medium text-nv-green">
                  {b.from} → {b.to}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-nv-muted">{b.how}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight">Why they did not sell</h2>
        <Card className="mt-3">
          <CardContent className="space-y-3 pt-5">
            {wbSurvey.barriers.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-sm">
                  <span>{b.label}</span>
                  <span className="text-nv-muted">{b.pct}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-nv-elevated">
                  <div className="h-full rounded-full bg-nv-green" style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight">If AgriNova reaches {util}% of this cluster</h2>
        <input type="range" min={20} max={80} step={20} value={util} onChange={(e) => setUtil(Number(e.target.value))} className="mt-3" />
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={wbScopeIfUtilised}>
            <XAxis dataKey="utilisation" fontSize={11} stroke="#6e6e73" tickFormatter={(v) => `${v}%`} />
            <YAxis fontSize={11} stroke="#6e6e73" />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="divertedT" stroke="#1f4d3a" fill="#1f4d3a" fillOpacity={0.18} name="Tonnes diverted" />
            <Area type="monotone" dataKey="tco2e" stroke="#9a6b32" fill="#9a6b32" fillOpacity={0.12} name="tCO2e" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <StatTile label="Straw diverted" value={`${scoped.divertedT} t`} />
          <StatTile label="Farmer income" value={`₹${scoped.incomeLakh} lakh`} tone="green" />
          <StatTile label="tCO2e avoided" value={scoped.tco2e} />
          <StatTile label="Dump / mix cut" value={`${scoped.dumpCutPct}%`} tone="saffron" />
        </div>
        <SourceNote provenance="MODEL_ESTIMATE">
          Scaled to the demonstration cluster only. Not a forecast for the state of West Bengal.
        </SourceNote>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight">Punjab vs West Bengal</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-nv-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-nv-elevated text-nv-muted">
              <tr>
                <th className="px-4 py-3 font-medium"> </th>
                <th className="px-4 py-3 font-medium">Punjab</th>
                <th className="px-4 py-3 font-medium">West Bengal</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {wbVsPunjab.map((row) => (
                <tr key={row.axis} className="border-t border-nv-border">
                  <td className="px-4 py-3 font-medium">{row.axis}</td>
                  <td className="px-4 py-3 text-nv-muted">{row.punjab}</td>
                  <td className="px-4 py-3 text-nv-muted">{row.bengal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight">Method and limits</h2>
        <p className="mt-2 text-sm leading-relaxed text-nv-muted">{meta.methodology}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-nv-muted">
          {meta.limitations.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </section>

      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4 pt-5">
          <div>
            <p className="font-semibold">Walk the desk in Bangla, Hindi, or English</p>
            <p className="mt-1 text-sm text-nv-muted">Sign in as a farmer in Burdwan, or open a saved demo account from login.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/case-studies/punjab">
              <Button variant="outline">Punjab</Button>
            </Link>
            <Link to="/login">
              <Button>{t('nav.login')}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
