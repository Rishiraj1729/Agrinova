import { useEffect, useRef, useState } from 'react'
import { Leaf, Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react'
import { Button } from './ui/Button'
import { Textarea } from './ui/Input'
import { sendAgentMessage, type AgentRole, type ChatMessage } from '../services/openaiChat'
import { SPEECH_LOCALE, useLanguage } from '../contexts/LanguageContext'
import type { Lang } from '../types'
import { parseBandhuReply, stripMarkdownStars } from '../lib/bandhuFormat'

function BandhuBody({ content }: { content: string }) {
  const blocks = parseBandhuReply(content)
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <div key={`${block.heading ?? 'p'}-${i}`}>
          {block.heading ? (
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9bb5a6]">
              {block.heading}
            </p>
          ) : null}
          <div className="space-y-1.5">
            {block.lines.map((line, j) => {
              const numbered = line.match(/^(\d+)[.)]\s+(.*)$/)
              if (numbered) {
                return (
                  <p key={j} className="flex gap-2">
                    <span className="shrink-0 font-semibold text-[#9bb5a6]">{numbered[1]}.</span>
                    <span>{numbered[2]}</span>
                  </p>
                )
              }
              return <p key={j}>{line}</p>
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

type SpeechRec = {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  onresult: ((ev: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
}

function getSpeechRecognition(): (new () => SpeechRec) | null {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRec
    webkitSpeechRecognition?: new () => SpeechRec
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export function AgentChat({
  role,
  title,
  subtitle,
  seedPrompt,
  prompts,
  promptLabels,
  contextLine,
}: {
  role: AgentRole
  title: string
  subtitle: string
  seedPrompt?: string
  prompts?: string[]
  promptLabels?: string[]
  contextLine?: string
}) {
  const { lang } = useLanguage()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState(seedPrompt ?? '')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [speakReplies, setSpeakReplies] = useState(true)
  const recRef = useRef<SpeechRec | null>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const hasKey = Boolean((import.meta.env.VITE_OPENAI_API_KEY as string)?.startsWith('sk-'))
  const voiceOk = typeof window !== 'undefined' && !!getSpeechRecognition()

  useEffect(() => {
    if (seedPrompt) setInput(seedPrompt)
  }, [seedPrompt])

  useEffect(() => () => {
    recRef.current?.stop()
    window.speechSynthesis?.cancel()
  }, [])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  function speak(text: string, l: Lang) {
    if (!speakReplies || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(stripMarkdownStars(text).slice(0, 600))
    u.lang = SPEECH_LOCALE[l]
    u.rate = 1
    window.speechSynthesis.speak(u)
  }

  async function sendText(userMsg: string) {
    if (!userMsg.trim() || loading) return
    const prefixed = contextLine ? `${contextLine}\n\n${userMsg}` : userMsg
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: userMsg }])
    setLoading(true)
    const { content } = await sendAgentMessage(role, messages, prefixed, lang)
    setMessages((m) => [...m, { role: 'assistant', content }])
    setLoading(false)
    speak(content, lang)
  }

  function toggleMic() {
    const Ctor = getSpeechRecognition()
    if (!Ctor) return
    if (listening) {
      recRef.current?.stop()
      setListening(false)
      return
    }
    const rec = new Ctor()
    rec.lang = SPEECH_LOCALE[lang]
    rec.continuous = false
    rec.interimResults = false
    rec.onresult = (ev) => {
      const transcript = ev.results[0]?.[0]?.transcript ?? ''
      if (transcript) void sendText(transcript)
    }
    rec.onerror = () => setListening(false)
    rec.onend = () => setListening(false)
    recRef.current = rec
    rec.start()
    setListening(true)
  }

  return (
    <div className="flex min-h-[560px] flex-col overflow-hidden rounded-[28px] border border-nv-border bg-[#0f1f18] text-[#f3f6f2] shadow-[0_24px_60px_-28px_rgba(15,40,28,0.55)]">
      <div className="relative overflow-hidden border-b border-white/10 px-5 py-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(61,107,84,0.45),transparent_45%),radial-gradient(circle_at_90%_0%,rgba(154,107,50,0.28),transparent_40%)]" />
        <div className="relative flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nv-leaf/30 ring-1 ring-white/15">
            <Leaf className="h-5 w-5 text-[#d7ebe0]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#9bb5a6]">Kisan Bandhu</p>
            <p className="mt-1 text-lg font-semibold tracking-tight">{title}</p>
            <p className="mt-1 text-sm text-[#b7c9be]">{subtitle}</p>
          </div>
          <button
            type="button"
            title={speakReplies ? 'Mute' : 'Speak'}
            onClick={() => {
              setSpeakReplies((v) => !v)
              window.speechSynthesis?.cancel()
            }}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-[#c5d6cc] hover:bg-white/10"
          >
            {speakReplies ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
        <div className="relative mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-[#c5d6cc]">
            {lang.toUpperCase()} · EN/हिं/বাং/ਪੰ
          </span>
          <span
            className={`rounded-full border px-2.5 py-1 text-[10px] ${
              hasKey ? 'border-emerald-400/30 text-emerald-200' : 'border-white/10 text-[#9bb5a6]'
            }`}
          >
            {hasKey ? 'OpenAI live' : 'Demo fallback'}
          </span>
        </div>
      </div>

      <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="max-w-md text-sm leading-relaxed text-[#b7c9be]">
              Field decisions in labelled sections — no asterisks. Residue, moisture, nutrition, leaf health. Not a generic chatbot.
            </p>
            {prompts && prompts.length > 0 && (
              <div className="grid gap-2 sm:grid-cols-2">
                {prompts.map((p, i) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => void sendText(p)}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-left transition hover:bg-white/[0.07]"
                  >
                    <span className="block text-sm font-medium text-[#eef5f0]">{promptLabels?.[i] ?? 'Ask'}</span>
                    <span className="mt-1 block text-[11px] leading-relaxed text-[#9bb5a6] line-clamp-2">{p}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' ? (
              <div className="flex max-w-[92%] gap-3">
                <div className="mt-1 w-1 shrink-0 rounded-full bg-nv-leaf" />
                <div className="rounded-2xl rounded-tl-md bg-[#173328] px-4 py-3 text-sm leading-relaxed text-[#e7f0ea]">
                  <BandhuBody content={m.content} />
                </div>
              </div>
            ) : (
              <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-[#9a6b32] px-4 py-3 text-sm leading-relaxed text-white">
                {m.content}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <p className="animate-pulse text-xs tracking-wide text-[#9bb5a6]">Bandhu is reading the field…</p>
        )}
      </div>

      <div className="border-t border-white/10 bg-[#0c1914] p-3">
        <div className="flex gap-2">
          <Textarea
            className="max-h-28 min-h-[48px] border-white/10 bg-[#13261e] text-[#eef5f0] placeholder:text-[#7f9789]"
            placeholder="EN · हिन्दी · বাংলা · ਪੰਜਾਬੀ"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void sendText(input.trim())
              }
            }}
          />
          {voiceOk && (
            <Button
              variant={listening ? 'primary' : 'outline'}
              onClick={toggleMic}
              disabled={loading}
              className="shrink-0 self-end border-white/15"
              title="Voice"
            >
              {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          )}
          <Button onClick={() => void sendText(input.trim())} disabled={loading} className="shrink-0 self-end">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
