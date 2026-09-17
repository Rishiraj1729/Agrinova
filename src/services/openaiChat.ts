import type { Lang } from '../types'

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
    return `You are AgriNova Policy Analyst for a district / ULB desk (Punjab burn + West Bengal dump/mix). Cover stubble burning, SWM biodegradable waste, utilised vs dumped tonnes, dual credits. Aggregates only — never farmer phones. ${langRule} Label estimates. Not a statewide forecast.`
  }
  if (role === 'buyer') {
    return `You are AgriNova procurement co-pilot for biomass / compost / paper gates. Moisture specs, match scores, small-lot pickup, buyer CSR credits. Demo numbers only. ${langRule}`
  }
  return `You are Kisan Bandhu for AgriNova — a field companion for Indian smallholders (Punjab + West Bengal).
Help with: crop residue selling, moisture/baling, fair ₹/t, soil cards, sowing after residue removal, Happy Seeder / DSR, mulching, nutrition after plantation, leaf disease questions, and AgriNova credits.
Be decisive and practical. ${langRule}
Label estimates. Not legal/medical/lab diagnosis.`
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
    const fallback =
      lang === 'hi'
        ? 'डेमो मोड: धान का पुआल ~2 टन/एकड़। नमी 15% से कम रखें। AgriNova पर लिस्ट करें — पाँच दिन में पिकअप।'
        : lang === 'bn'
          ? 'ডেমো মোড: ধানের খড় ~২ টন/একর। আর্দ্রতা ≤১৫%। AgriNova-তে লিস্ট করুন — পাঁচ দিনে পিকআপ।'
          : lang === 'pa'
            ? 'ਡੈਮੋ ਮੋਡ: ਝੋਨੇ ਦਾ ਪਰਾਲੀ ~2 ਟਨ/ਏਕੜ। ਨਮੀ ≤15%। AgriNova ਤੇ ਲਿਸਟ ਕਰੋ — ਪੰਜ ਦਿਨ ਵਿੱਚ ਪਿਕਅੱਪ।'
            : 'Demo mode: Map rice acres × 2 t/acre, keep moisture under 15%, list on Sell, earn farmer credits after pickup.'
    return { fromApi: false, content: fallback }
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
        temperature: 0.55,
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
    return { fromApi: true, content: data.choices?.[0]?.message?.content ?? 'No response.' }
  } catch {
    return { fromApi: false, content: 'Network error contacting OpenAI.' }
  }
}
