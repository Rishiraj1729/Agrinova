import { useEffect, useRef, useState } from 'react'
import { Bot, Mic, MicOff, Send, Sparkles, Volume2, VolumeX } from 'lucide-react'
import { Button } from './ui/Button'
import { Textarea } from './ui/Input'
import { sendAgentMessage, type AgentRole, type ChatMessage } from '../services/openaiChat'

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
}: {
  role: AgentRole
  title: string
  subtitle: string
  seedPrompt?: string
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState(seedPrompt ?? '')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [speakReplies, setSpeakReplies] = useState(true)
  const recRef = useRef<SpeechRec | null>(null)
  const hasKey = Boolean((import.meta.env.VITE_OPENAI_API_KEY as string)?.startsWith('sk-'))
  const voiceOk = typeof window !== 'undefined' && !!getSpeechRecognition()

  useEffect(() => {
    if (seedPrompt) setInput(seedPrompt)
  }, [seedPrompt])

  useEffect(() => () => {
    recRef.current?.stop()
    window.speechSynthesis?.cancel()
  }, [])

  function speak(text: string) {
    if (!speakReplies || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text.slice(0, 600))
    u.lang = 'en-IN'
    u.rate = 1
    window.speechSynthesis.speak(u)
  }

  async function sendText(userMsg: string) {
    if (!userMsg.trim() || loading) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: userMsg }])
    setLoading(true)
    const { content } = await sendAgentMessage(role, messages, userMsg)
    setMessages((m) => [...m, { role: 'assistant', content }])
    setLoading(false)
    speak(content)
  }

  async function send() {
    await sendText(input.trim())
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
    rec.lang = 'hi-IN'
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
    <div className="flex h-[min(520px,70vh)] flex-col overflow-hidden rounded-xl border border-nv-border bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-nv-border bg-nv-elevated/80 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-nv-green/15">
          <Bot className="h-5 w-5 text-nv-green" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-nv-fg">{title}</p>
          <p className="truncate text-xs text-nv-muted">{subtitle}</p>
        </div>
        <button
          type="button"
          title={speakReplies ? 'Mute voice replies' : 'Speak replies'}
          onClick={() => {
            setSpeakReplies((v) => !v)
            window.speechSynthesis?.cancel()
          }}
          className="rounded-lg border border-nv-border bg-white p-2 text-nv-muted hover:text-nv-fg"
        >
          {speakReplies ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] ${
            hasKey ? 'border-nv-green/40 text-nv-green' : 'border-nv-border text-nv-muted'
          }`}
        >
          {hasKey ? 'OpenAI live' : 'Demo fallback'}
        </span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="flex items-start gap-2 text-sm text-nv-muted">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-nv-saffron" />
            Type or tap the mic — Hindi/English. Answers use OpenAI when configured.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${
              m.role === 'user'
                ? 'ml-auto bg-nv-green/15 text-nv-fg'
                : 'bg-nv-elevated text-nv-muted'
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && <p className="animate-pulse text-xs text-nv-muted">Thinking…</p>}
      </div>
      <div className="flex gap-2 border-t border-nv-border p-3">
        <Textarea
          className="max-h-24 min-h-[44px]"
          placeholder={
            role === 'farmer' ? 'Type or speak in Hindi / English…' : 'Ask for district policy summary…'
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              void send()
            }
          }}
        />
        {voiceOk && (
          <Button
            variant={listening ? 'primary' : 'outline'}
            onClick={toggleMic}
            disabled={loading}
            className="shrink-0 self-end"
            title="Voice input"
          >
            {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
        )}
        <Button onClick={() => void send()} disabled={loading} className="shrink-0 self-end">
          <Send className="h-4 w-4" />
        </Button>
      </div>
      {!hasKey && (
        <p className="px-3 pb-2 text-[10px] text-nv-muted">
          Add <code className="text-nv-fg">VITE_OPENAI_API_KEY</code> to{' '}
          <code className="text-nv-fg">.env.local</code>
        </p>
      )}
    </div>
  )
}
