import { useRef, useState } from 'react'
import { Camera, Loader2, ShieldAlert } from 'lucide-react'
import { Button } from './ui/Button'
import { analyzePlantDisease } from '../services/diseaseDetect'
import type { DiseaseScanResult } from '../data/plantDiseases'
import { DISEASE_SAMPLES } from '../data/diseaseSamples'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

export function DiseaseScanPanel({ cropHint = 'Rice' }: { cropHint?: string }) {
  const { lang, t } = useLanguage()
  const { user } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DiseaseScanResult | null>(null)

  async function onFile(file: File | undefined) {
    if (!file) return
    setPreview(URL.createObjectURL(file))
    setLoading(true)
    setResult(null)
    try {
      const r = await analyzePlantDisease({
        file,
        cropHint,
        lang,
        profileId: user?.profileId,
      })
      setResult(r)
    } finally {
      setLoading(false)
    }
  }

  function loadSample(id: string) {
    const sample = DISEASE_SAMPLES.find((s) => s.id === id)
    if (!sample) return
    setPreview(sample.imageSrc)
    setLoading(true)
    setResult(null)
    window.setTimeout(() => {
      setResult(sample.result)
      setLoading(false)
    }, 450)
  }

  return (
    <div className="space-y-4 rounded-[28px] border border-nv-border bg-white p-5">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-nv-muted">{t('bandhu.scan.kicker')}</p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight">{t('bandhu.scan.title')}</h3>
        <p className="mt-2 text-sm text-nv-muted">{t('bandhu.scan.sub')}</p>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-nv-muted">Booth samples (known result)</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {DISEASE_SAMPLES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => loadSample(s.id)}
              className="overflow-hidden rounded-2xl border border-nv-border text-left transition hover:border-nv-green"
            >
              <img src={s.imageSrc} alt={s.title} className="h-24 w-full object-cover" />
              <span className="block px-2 py-1.5 text-[11px] font-medium">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-[220px] flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-dashed border-nv-border bg-nv-elevated/50 px-4 text-center transition hover:bg-nv-elevated"
        >
          {preview ? (
            <img src={preview} alt="Leaf" className="h-full max-h-56 w-full object-cover" />
          ) : (
            <>
              <Camera className="h-7 w-7 text-nv-green" />
              <span className="text-sm font-medium">{t('bandhu.scan.upload')}</span>
            </>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => void onFile(e.target.files?.[0])}
        />

        <div className="rounded-3xl border border-nv-border bg-[#f7faf8] p-4">
          {loading && (
            <p className="flex items-center gap-2 text-sm text-nv-muted">
              <Loader2 className="h-4 w-4 animate-spin" /> {t('bandhu.scan.reading')}
            </p>
          )}
          {!loading && !result && (
            <p className="text-sm leading-relaxed text-nv-muted">{t('bandhu.scan.empty')}</p>
          )}
          {result && (
            <div className="space-y-3 animate-fade-in">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-nv-muted">{result.crop}</p>
                <p className="text-lg font-semibold text-nv-fg">{result.disease}</p>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-[11px] text-nv-muted">
                  <span>{t('bandhu.scan.confidence')}</span>
                  <span>{Math.round(result.confidence * 100)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-nv-border">
                  <div
                    className="h-full rounded-full bg-nv-fg transition-all"
                    style={{ width: `${Math.round(result.confidence * 100)}%` }}
                  />
                </div>
              </div>
              {result.symptoms.length > 0 && (
                <ul className="space-y-1 text-sm text-nv-muted">
                  {result.symptoms.map((s) => (
                    <li key={s}>· {s}</li>
                  ))}
                </ul>
              )}
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-nv-green">{t('bandhu.scan.actions')}</p>
                <ul className="mt-1 space-y-1 text-sm text-nv-fg">
                  {result.firstActions.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <p className="flex gap-2 rounded-2xl border border-nv-border bg-white px-3 py-2 text-[12px] leading-relaxed text-nv-muted">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-nv-fg" />
                {result.modelNote}
              </p>
              {result.whenToEscalate && <p className="text-xs text-nv-muted">{result.whenToEscalate}</p>}
              <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
                {t('bandhu.scan.again')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
