import type { Lang } from '../types'
import { BANDHU_STRUCTURE_RULE, stripMarkdownStars } from '../lib/bandhuFormat'

export type AgentRole = 'farmer' | 'government' | 'buyer'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const LANG_LINE: Record<Lang, string> = {
  en: 'Reply in clear English. Short farm sentences.',
  hi: 'उत्तर देवनागरी हिन्दी में दें। छोटे वाक्य। अंग्रेज़ी केवल ज़रूरी शब्द।',
  bn: 'উত্তর বাংলায় দিন। ছোট বাক্য। প্রয়োজনে সহজ ইংরেজি শব্দ।',
  pa: 'ਜਵਾਬ ਗੁਰਮੁਖੀ ਪੰਜਾਬੀ ਵਿੱਚ ਦਿਓ। ਛੋਟੇ ਵਾਕ।',
}

function systemFor(role: AgentRole, lang: Lang) {
  const langRule = LANG_LINE[lang]
  if (role === 'government') {
    return `You are AgriNova Policy Analyst for a West Bengal ULB / district desk (Madhyamgram–Barasat dump, mix, and leftover straw). Cover utilised vs dumped tonnes, SWM biodegradable waste, compost pads, and dual credits. Aggregates only — never farmer phones. ${langRule} Label estimates. Not a statewide forecast.
${BANDHU_STRUCTURE_RULE}`
  }
  if (role === 'buyer') {
    return `You are AgriNova procurement co-pilot for West Bengal compost / paper / biomass gates around Madhyamgram and Barasat. Moisture specs, match scores, small-lot pickup, buyer CSR credits. Demo numbers only. Wet lots go compost-first. ${langRule}
${BANDHU_STRUCTURE_RULE}`
  }
  return `You are Kisan Bandhu for AgriNova — a field companion for West Bengal smallholders (Madhyamgram, Barasat, North 24 Parganas). Default advice is peri-urban paddy leftover: dump, rot, mix into municipal waste — not a Punjab burn clock unless the farmer names Punjab.
Help with: crop residue selling, moisture/baling, fair Rs/t, soil cards, sowing after residue removal, compost-first for wet heaps, neighbourhood pools for 1.5–3 acres, nutrition after plantation, leaf disease questions, and AgriNova credits.
Be decisive and practical. ${langRule}
Label estimates. Not legal/medical/lab diagnosis.
${BANDHU_STRUCTURE_RULE}`
}

const FALLBACK: Record<Lang, string> = {
  en: `ANSWER
Demo mode is on. For 3 acres paddy, working straw is about 6 t.

WHAT TO DO
1. Keep the heap off the drain.
2. Write moisture on the slip at the lane.
3. List on Sell for a 5-day pickup to the Madhyamgram compost pad.

NUMBERS
3 acres x 2 t/acre = 6 t. Working gate about Rs 700/t if the lot is clean.

WATCH OUT
Wet mixed straw will be refused at the paper desk.

NEXT
Open Sell, or tap a sample leaf in Scan.`,
  hi: `ANSWER
डेमो मोड चालू है। 3 एकड़ धान पर लगभग 6 टन पुआल।

WHAT TO DO
1. ढेर नाले से दूर रखें।
2. नमी पर्ची पर लिखें।
3. Sell पर लिस्ट करें — पाँच दिन में मध्यमग्राम कंपोस्ट पैड पिकअप।

NUMBERS
3 एकड़ x 2 टन/एकड़ = 6 टन। साफ लॉट पर करीब 700 रुपये/टन।

WATCH OUT
गीला मिला-जुला पुआल पेपर डेस्क नहीं लेगा।

NEXT
Sell खोलें, या Scan में नमूना पत्ती देखें।`,
  bn: `ANSWER
ডেমো মোড চালু। ৩ একর ধানে কাজের খড় প্রায় ৬ টন।

WHAT TO DO
1. স্তূপ নালা থেকে সরিয়ে রাখুন।
2. আর্দ্রতা স্লিপে লিখুন।
3. Sell-এ লিস্ট করুন — পাঁচ দিনে মধ্যমগ্রাম কম্পোস্ট প্যাড পিকআপ।

NUMBERS
৩ একর x ২ টন/একর = ৬ টন। পরিষ্কার লটে প্রায় ৭০০ টাকা/টন।

WATCH OUT
ভেজা মিশ্র খড় কাগজের ডেস্ক নেবে না।

NEXT
Sell খুলুন, অথবা Scan-এ নমুনা পাতা চাপুন।`,
  pa: `ANSWER
ਡੈਮੋ ਮੋਡ ਚਾਲੂ ਹੈ। 3 ਏਕੜ ਝੋਨੇ ਤੇ ਲਗਭਗ 6 ਟਨ ਪਰਾਲੀ।

WHAT TO DO
1. ਢੇਰ ਨਾਲੇ ਤੋਂ ਦੂਰ ਰੱਖੋ।
2. ਨਮੀ ਪਰਚੀ ਤੇ ਲਿਖੋ।
3. Sell ਤੇ ਲਿਸਟ ਕਰੋ — ਪੰਜ ਦਿਨ ਵਿੱਚ ਮੱਧਯਮਗ੍ਰਾਮ ਕੰਪੋਸਟ ਪੈਡ ਪਿਕਅੱਪ।

NUMBERS
3 ਏਕੜ x 2 ਟਨ/ਏਕੜ = 6 ਟਨ। ਸਾਫ਼ ਲਾਟ ਤੇ ਲਗਭਗ 700 ਰੁਪਏ/ਟਨ।

WATCH OUT
ਗਿੱਲੀ ਮਿਲੀ ਪਰਾਲੀ ਪੇਪਰ ਡੈਸਕ ਨਹੀਂ ਲਵੇਗਾ।

NEXT
Sell ਖੋਲ੍ਹੋ, ਜਾਂ Scan ਵਿੱਚ ਨਮੂਨਾ ਪੱਤਾ ਦਬਾਓ।`,
}

export async function sendAgentMessage(
  role: AgentRole,
  history: ChatMessage[],
  userMessage: string,
  lang: Lang = 'en',
): Promise<{ content: string; fromApi: boolean }> {
  const key = import.meta.env.VITE_OPENAI_API_KEY as string | undefined
  const system = systemFor(role, lang)

  if (!key?.startsWith('sk-')) {
    return { fromApi: false, content: FALLBACK[lang] ?? FALLBACK.en }
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.45,
        max_tokens: 700,
        messages: [
          { role: 'system', content: system },
          ...history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
          { role: 'user', content: userMessage },
        ],
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      return { fromApi: false, content: `API error (${res.status}). ${err.slice(0, 140)}` }
    }
    const data = await res.json()
    const raw = data.choices?.[0]?.message?.content ?? 'No response.'
    return { fromApi: true, content: stripMarkdownStars(raw) }
  } catch {
    return { fromApi: false, content: 'Network error contacting OpenAI.' }
  }
}
