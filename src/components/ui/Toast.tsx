import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { CheckCircle2, Info, X, AlertTriangle } from 'lucide-react'
import { cn } from '../../lib/utils'

type ToastTone = 'success' | 'info' | 'warning'

interface Toast {
  id: number
  title: string
  detail?: string
  tone: ToastTone
}

interface ToastContextValue {
  notify: (title: string, detail?: string, tone?: ToastTone) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const toneIcon = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
}

const toneStyle: Record<ToastTone, string> = {
  success: 'border-nv-green/40 text-nv-green',
  info: 'border-nv-navy/30 text-nv-navy',
  warning: 'border-nv-saffron/50 text-nv-credit',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const notify = useCallback((title: string, detail?: string, tone: ToastTone = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, title, detail, tone }])
  }, [])

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[200] flex w-[min(92vw,22rem)] flex-col gap-2">
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastCard({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  const Icon = toneIcon[toast.tone]

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 4200)
    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  return (
    <div
      role="status"
      className={cn(
        'animate-fade-in pointer-events-auto flex items-start gap-3 rounded-xl border-l-4 border border-nv-border bg-white p-3 shadow-lg',
        toneStyle[toast.tone],
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-nv-fg">{toast.title}</p>
        {toast.detail && <p className="mt-0.5 text-xs text-nv-muted">{toast.detail}</p>}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-nv-muted hover:text-nv-fg"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
