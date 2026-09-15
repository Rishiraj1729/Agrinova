import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Landmark, Leaf, LogIn, TrendingDown, IndianRupee, Factory } from 'lucide-react'
import { PunjabPollutionMap } from '../../components/PunjabPollutionMap'
import { AgentChat } from '../../components/AgentChat'
import { ProvenanceBadge } from '../../components/ProvenanceBadge'
import { SourceNote } from '../../components/SourceNote'
import { useCaseStudy } from '../../contexts/CaseStudyContext'
import { useMarketplace } from '../../contexts/MarketplaceContext'
import {
  agrinovaOperationalSites,
  beforeAfterProjection,
  districtUtilisation,
  operationalSavingsTotals,
  projectDistrictSavings,
  punjabBurningBaseline,
} from '../../data/punjabPollution'
import { BUYER_TAX_INR_PER_TCO2E } from '../../services/buyerCredits'
import { formatINR } from '../../lib/utils'

export default function GovernmentDashboard() {
  const { region } = useCaseStudy()
  const { ledger, transactions, wallets } = useMarketplace()
  const [district, setDistrict] = useState('Patiala')
  const [utilPct, setUtilPct] = useState(70)

  const liveCo2 = ledger.filter((e) => e.region === region).reduce((s, e) => s + e.avoidedTco2e, 0)
  const totalCredits = Object.values(wallets ?? {}).reduce((s, w) => s + w.lifetimeEarned, 0)
  const completedTxns = transactions.filter((t) => t.status === 'completed' && t.region === region).length
  const proj = beforeAfterProjection
  const ops = operationalSavingsTotals()
  const districtSave = useMemo(() => projectDistrictSavings(district, utilPct), [district, utilPct])
  const dRow = districtUtilisation.find((d) => d.district === district)

  const compare = [
    { name: 'Burned t', without: proj.without.burnedTonnes, withA: proj.withAgrinova70pct.burnedTonnes },
    { name: 'Utilised t', without: proj.without.utilisedTonnes, withA: proj.withAgrinova70pct.utilisedTonnes },
    { name: 'PM2.5 idx', without: proj.without.indicativePm25Index, withA: proj.withAgrinova70pct.indicativePm25Index },
  ]

  return (
    <div className="animate-fade-in -mx-4 -mt-6 min-h-[calc(100vh-57px)] bg-[#eef1f5] text-slate-900">
      {/* Tricolor + masthead — agriculture department portal look */}
      <div className="h-1.5 w-full tri-bar" />
      <header className="border-b border-[#c5cad3] bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#0b3d91] bg-[#f7f8fa] text-[#0b3d91]">
            <Landmark className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#0b3d91]">
              Government of Punjab · Demo portal
            </p>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Department of Agriculture &amp; Farmers Welfare
            </h1>
            <p className="text-xs text-slate-600">
              Crop Residue Management · Air Quality Mission desk · AgriNova decision support
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-sm border border-[#0b3d91] px-3 py-2 text-xs font-semibold text-[#0b3d91] hover:bg-[#0b3d91] hover:text-white"
          >
            <LogIn className="h-3.5 w-3.5" /> Login
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span>Home</span>
          <span>/</span>
          <span className="font-medium text-[#0b3d91]">Residue &amp; air quality dashboard</span>
          <ProvenanceBadge provenance="MODEL_ESTIMATE" className="ml-2" />
        </div>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Episode straw share (lit.)',
              value: `${punjabBurningBaseline.pm25ContributionPercent}%`,
              icon: Factory,
            },
            { label: 'Live tCO₂e avoided', value: liveCo2.toFixed(1), icon: Leaf },
            { label: 'Credits issued (demo)', value: totalCredits.toLocaleString(), icon: IndianRupee },
            { label: 'Completed residue txns', value: String(completedTxns), icon: TrendingDown },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-sm border border-[#c5cad3] bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-[#0b3d91]">
                <Icon className="h-4 w-4" />
                <p className="text-[11px] uppercase tracking-wide text-slate-500">{label}</p>
              </div>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <PunjabPollutionMap selected={district} onSelect={setDistrict} />
          </div>
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-sm border border-[#c5cad3] bg-white p-4 shadow-sm">
              <h2 className="text-sm font-bold text-[#0b3d91]">{district} — current pulse</h2>
              {dRow ? (
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <dt className="text-slate-500">Burned (demo t)</dt>
                    <dd className="font-semibold">{dRow.burned}</dd>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <dt className="text-slate-500">Utilised (demo t)</dt>
                    <dd className="font-semibold text-[#138808]">{dRow.utilised}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">PM2.5 index</dt>
                    <dd className="font-semibold text-red-700">{dRow.pm25Index}</dd>
                  </div>
                </dl>
              ) : (
                <p className="mt-2 text-sm text-slate-500">Select a district on the map.</p>
              )}
            </div>

            <div className="rounded-sm border border-[#c5cad3] bg-white p-4 shadow-sm">
              <h2 className="text-sm font-bold text-[#0b3d91]">If AgriNova reaches {utilPct}% utilisation</h2>
              <input
                type="range"
                min={40}
                max={90}
                step={5}
                value={utilPct}
                onChange={(e) => setUtilPct(Number(e.target.value))}
                className="mt-3 w-full accent-[#0b3d91]"
              />
              {districtSave && (
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-slate-500">Extra straw diverted</span>
                    <strong>{districtSave.additionalTonnes} t</strong>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">Farmer income (proj.)</span>
                    <strong className="text-[#138808]">{formatINR(districtSave.farmerIncomeInr)}</strong>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">tCO₂e avoided</span>
                    <strong>{districtSave.co2eAvoidedT}</strong>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">PM index drop (indicative)</span>
                    <strong>−{districtSave.pm25IndexDrop}</strong>
                  </li>
                </ul>
              )}
              <SourceNote provenance="MODEL_ESTIMATE">
                Slider scales demo district totals — not a census forecast.
              </SourceNote>
            </div>
          </div>
        </section>

        <section className="rounded-sm border border-[#c5cad3] bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-[#0b3d91]">AgriNova operational areas — savings to date</h2>
              <p className="text-xs text-slate-600">
                Green map markers · {ops.farmers} farmers across demo clusters
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-center text-sm">
              <div>
                <p className="text-[10px] uppercase text-slate-500">Straw diverted</p>
                <p className="text-lg font-bold">{ops.strawDivertedT} t</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-slate-500">Burn avoided</p>
                <p className="text-lg font-bold text-red-700">{ops.burnedAvoidedT} t</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-slate-500">Farmer income</p>
                <p className="text-lg font-bold text-[#138808]">{formatINR(ops.farmerIncomeInr)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-slate-500">tCO₂e</p>
                <p className="text-lg font-bold">{ops.co2eAvoidedT}</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-[#f7f8fa] text-[11px] uppercase text-slate-500">
                <tr>
                  <th className="px-3 py-2">Cluster</th>
                  <th className="px-3 py-2">District</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Farmers</th>
                  <th className="px-3 py-2">Diverted t</th>
                  <th className="px-3 py-2">Income</th>
                  <th className="px-3 py-2">tCO₂e</th>
                  <th className="px-3 py-2">PM drop</th>
                </tr>
              </thead>
              <tbody>
                {agrinovaOperationalSites.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-2.5 font-medium">{s.name}</td>
                    <td className="px-3 py-2.5">{s.district}</td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`rounded-sm px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                          s.status === 'operational'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">{s.farmers}</td>
                    <td className="px-3 py-2.5">{s.strawDivertedT}</td>
                    <td className="px-3 py-2.5 text-[#138808]">{formatINR(s.farmerIncomeInr)}</td>
                    <td className="px-3 py-2.5">{s.co2eAvoidedT}</td>
                    <td className="px-3 py-2.5">−{s.pm25IndexDrop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SourceNote provenance="DEMONSTRATION_DATA">
            Operational savings are demo-cluster rollups for judges — not official state MIS.
          </SourceNote>
        </section>

        <section className="rounded-sm border border-[#c5cad3] bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-base font-bold text-[#0b3d91]">
            Without AgriNova vs 70% utilisation projection (25-farm pack)
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={compare}>
              <XAxis dataKey="name" fontSize={11} stroke="#64748b" />
              <YAxis fontSize={11} stroke="#64748b" />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #c5cad3', color: '#0f172a' }} />
              <Legend />
              <Bar dataKey="without" name="Without" fill="#ff9933" radius={[2, 2, 0, 0]} />
              <Bar dataKey="withA" name="With AgriNova" fill="#138808" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-sm border border-slate-200 bg-[#f7f8fa] p-3">
              <p className="text-[11px] text-slate-500">Farmer income (proj.)</p>
              <p className="text-lg font-bold text-[#138808]">{formatINR(proj.withAgrinova70pct.farmerIncomeInr)}</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-[#f7f8fa] p-3">
              <p className="text-[11px] text-slate-500">Buyer green-tax relief</p>
              <p className="text-lg font-bold">{formatINR(proj.withAgrinova70pct.buyerTaxReliefInr)}</p>
              <p className="text-[10px] text-slate-500">@{BUYER_TAX_INR_PER_TCO2E}/tCO₂e indicative</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-[#f7f8fa] p-3">
              <p className="text-[11px] text-slate-500">tCO₂e avoided (proj.)</p>
              <p className="text-lg font-bold">{proj.withAgrinova70pct.co2eAvoidedT}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">{proj.method}</p>
        </section>

        <section className="rounded-sm border border-[#c5cad3] bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-base font-bold text-[#0b3d91]">Policy AI (OpenAI)</h2>
          <div className="overflow-hidden rounded-sm border border-slate-200">
            <AgentChat
              role="government"
              title="AgriNova Policy Analyst"
              subtitle="Heatmap, operational savings, district utilisation"
            />
          </div>
        </section>

        <p className="pb-8 text-center text-xs text-slate-500">
          Officials and farmers: use <Link className="text-[#0b3d91] underline" to="/login">Login</Link>
          {' '}and select your role.
        </p>
      </div>
    </div>
  )
}
