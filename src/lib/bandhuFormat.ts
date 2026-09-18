export function stripMarkdownStars(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/gs, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/(^|\s)\*([^*\n]+)\*(?=\s|$|[.,;:])/g, '$1$2')
    .trim()
}

export type BandhuBlock = { heading?: string; lines: string[] }

const HEADINGS = new Set([
  'ANSWER',
  'WHAT TO DO',
  'STEPS',
  'NUMBERS',
  'WATCH OUT',
  'NEXT',
  'WHY',
  'NOTE',
  'RESULT',
])

export function parseBandhuReply(raw: string): BandhuBlock[] {
  const text = stripMarkdownStars(raw)
  const lines = text.split(/\r?\n/)
  const blocks: BandhuBlock[] = []
  let current: BandhuBlock = { lines: [] }

  function push() {
    if (current.heading || current.lines.some((l) => l.trim())) blocks.push(current)
    current = { lines: [] }
  }

  for (const line of lines) {
    const trimmed = line.trim()
    const key = trimmed.replace(/:$/, '').toUpperCase()
    if (HEADINGS.has(key)) {
      push()
      current = { heading: key, lines: [] }
      continue
    }
    if (!trimmed) {
      if (current.lines.length) push()
      continue
    }
    current.lines.push(trimmed)
  }
  push()
  return blocks.length ? blocks : [{ lines: [text] }]
}

export const BANDHU_STRUCTURE_RULE = `OUTPUT RULES (mandatory):
- Do not use markdown. Do not use asterisks (*), hashes (#), or bold markers.
- Do not write **text** or *text*.
- Use these section labels on their own lines, in this order when relevant:

ANSWER
one or two short sentences

WHAT TO DO
1. first action
2. second action
3. third action

NUMBERS
only working figures if needed (acres, tonnes, Rs, moisture). Omit if none.

WATCH OUT
one caution line

NEXT
one next step on AgriNova or in the field

Keep each line short. Farm language. No essays.`
