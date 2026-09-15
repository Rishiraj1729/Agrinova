export type AgentRole = 'farmer' | 'government' | 'buyer'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_FARMER = `You are KisanSathi for AgriNova (Punjab). Help with: crop residue selling, moisture/baling, fair ₹/t, soil cards (pH, OC%, N), sowing after residue removal, Happy Seeder / zero-till, Direct Seeded Rice (DSR), mulching, biochar, pulse diversification, and AgriNova carbon credits for seed/fertiliser.
Teach new farming methods step-by-step for smallholders. If the user shares mapped acres, estimate straw (~2 t/acre rice, ~1.6 wheat) and recommend biomass vs biochar vs compost with one clear top pick.
Be concise. Mix simple Hindi terms. Label estimates. Not legal/medical advice.`

const SYSTEM_GOV = `You are AgriNova Policy Analyst for a Punjab Department of Agriculture demo portal. Cover stubble burning, PM2.5 heatmap context (SAFAR-style ~30–40% on peak days), district utilisation, AgriNova operational cluster savings (farmer income, tCO₂e, burn tonnes avoided), dual carbon credits (farmer redeem + buyer green-tax/CSR simulator), and before/after projections for a 25-farm demo cluster — never claim state-wide forecasts from the sample. Aggregates only.`

const SYSTEM_BUYER = `You are AgriNova procurement co-pilot for biomass plants. Help with moisture specs, match scores, RFQs, and how buyer-side carbon credits / indicative green-tax relief work when straw is utilised instead of burned. Demo numbers only.`

export async function sendAgentMessage(
  role: AgentRole,
  history: ChatMessage[],
  userMessage: string,
): Promise<{ content: string; fromApi: boolean }> {
  const key = import.meta.env.VITE_OPENAI_API_KEY as string | undefined
  const system =
    role === 'government' ? SYSTEM_GOV : role === 'buyer' ? SYSTEM_BUYER : SYSTEM_FARMER

  if (!key?.startsWith('sk-')) {
    return {
      fromApi: false,
      content:
        role === 'government'
          ? `Demo mode: Peak Nov PM2.5 episodes often show ~30–40% crop-fire contribution. AgriNova’s 25-farm projection cuts burned tonnes if 70% straw is sold — see Government before/after chart. Not a statewide forecast.`
          : role === 'buyer'
            ? `Demo mode: Prefer ≤15% moisture baled rice straw. Match score penalises wet stacks. Buyer credits ≈ 70% of avoided tCO₂e units; green-tax relief uses ₹1200/tCO₂e indicative — not a tax ruling.`
            : `Demo mode (set VITE_OPENAI_API_KEY in .env.local): Map rice acres × 2 t/acre for straw, keep moisture under 15% for GreenPower, list on Sell, earn farmer credits; redeem urea/seed after completion.`,
    }
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
        max_tokens: 650,
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
