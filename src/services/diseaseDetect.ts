import type { Lang } from '../types'
import { PLANT_DISEASE_KB, type DiseaseScanResult } from '../data/plantDiseases'
import { supabase } from '../lib/supabase'

const LANG_LABEL: Record<Lang, string> = {
  en: 'English',
  hi: 'Hindi (Devanagari)',
  bn: 'Bengali (Bangla script)',
  pa: 'Punjabi (Gurmukhi)',
}

function heuristicFallback(cropHint: string, lang: Lang): DiseaseScanResult {
  const crop = cropHint || 'Rice'
  const hit =
    PLANT_DISEASE_KB.find((d) => d.crops.some((c) => crop.toLowerCase().includes(c.toLowerCase()))) ??
    PLANT_DISEASE_KB[PLANT_DISEASE_KB.length - 1]
  return {
    crop,
    disease: hit.name,
    confidence: 0.42,
    severity: 'medium',
    symptoms: hit.symptoms,
    firstActions: hit.actions,
    whenToEscalate: hit.escalate,
    modelNote:
      lang === 'hi'
        ? 'ऑफ़लाइन अनुमान — OpenAI उपलब्ध नहीं। यह प्रयोगशाला निदान नहीं है।'
        : lang === 'bn'
          ? 'অফলাইন অনুমান — এটি ল্যাব নির্ণয় নয়।'
          : lang === 'pa'
            ? 'ਆਫਲਾਈਨ ਅਨੁਮਾਨ — ਇਹ ਲੈਬ ਨਿਦਾਨ ਨਹੀਂ।'
            : 'Offline heuristic — not a laboratory diagnosis. Enable OpenAI for vision analysis.',
    fromApi: false,
  }
}

export async function fileToDataUrl(file: File, maxSide = 1024): Promise<string> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height))
  const w = Math.max(1, Math.round(bitmap.width * scale))
  const h = Math.max(1, Math.round(bitmap.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unavailable')
  ctx.drawImage(bitmap, 0, 0, w, h)
  return canvas.toDataURL('image/jpeg', 0.82)
}

export async function analyzePlantDisease(opts: {
  file: File
  cropHint?: string
  lang: Lang
  profileId?: string
}): Promise<DiseaseScanResult> {
  const { file, cropHint = 'Rice', lang, profileId } = opts
  const key = import.meta.env.VITE_OPENAI_API_KEY as string | undefined
  const dataUrl = await fileToDataUrl(file)

  let result: DiseaseScanResult

  if (!key?.startsWith('sk-')) {
    result = heuristicFallback(cropHint, lang)
  } else {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.2,
          max_tokens: 700,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: `You are AgriNova Kisan Bandhu plant-health assistant for Indian smallholders (rice, wheat, maize, cotton, sugarcane).
Return ONLY JSON with keys: crop, disease, confidence (0-1), severity ("low"|"medium"|"high"), symptoms (string[]), firstActions (string[]), whenToEscalate (string), disclaimer (string).
Be conservative. Prefer common field diseases in India. Never claim lab certainty. Write ALL human-readable strings in ${LANG_LABEL[lang]}.`,
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Crop hint: ${cropHint}. Analyse this leaf/plant photo for likely disease or abiotic stress.`,
                },
                { type: 'image_url', image_url: { url: dataUrl } },
              ],
            },
          ],
        }),
      })
      if (!res.ok) {
        result = heuristicFallback(cropHint, lang)
        result.modelNote = `Vision API ${res.status}; used educational fallback.`
      } else {
        const data = await res.json()
        const raw = JSON.parse(data.choices?.[0]?.message?.content ?? '{}') as Record<string, unknown>
        result = {
          crop: String(raw.crop ?? cropHint),
          disease: String(raw.disease ?? 'Uncertain — needs field check'),
          confidence: Math.min(1, Math.max(0, Number(raw.confidence ?? 0.5))),
          severity: (['low', 'medium', 'high'].includes(String(raw.severity))
            ? String(raw.severity)
            : 'medium') as DiseaseScanResult['severity'],
          symptoms: Array.isArray(raw.symptoms) ? raw.symptoms.map(String) : [],
          firstActions: Array.isArray(raw.firstActions) ? raw.firstActions.map(String) : [],
          whenToEscalate: String(raw.whenToEscalate ?? ''),
          modelNote: String(
            raw.disclaimer ??
              'OpenAI vision estimate for education — not a certified plant-pathology diagnosis.',
          ),
          fromApi: true,
        }
      }
    } catch {
      result = heuristicFallback(cropHint, lang)
    }
  }

  if (supabase && profileId) {
    try {
      const path = `${profileId}/${Date.now()}-${file.name.replace(/[^\w.-]+/g, '_')}`
      await supabase.storage.from('crop-images').upload(path, file, { upsert: true })
      await supabase.from('disease_scans').insert({
        profile_id: profileId,
        image_path: path,
        crop: result.crop,
        predicted_disease: result.disease,
        confidence: result.confidence,
        advice: result.firstActions.join('; '),
        result,
        model_note: result.modelNote,
      })
    } catch {
      /* non-blocking */
    }
  }

  return result
}

export async function loadDiseaseHistory(profileId: string) {
  if (!supabase) return []
  const { data } = await supabase
    .from('disease_scans')
    .select('*')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: false })
    .limit(8)
  return data ?? []
}
