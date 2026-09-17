import { useLanguage } from '../contexts/LanguageContext'
import { cn } from '../lib/utils'
import type { Lang } from '../types'

const labels: Record<Lang, string> = { en: 'EN', hi: 'हिं', bn: 'বাং', pa: 'ਪੰ' }
const order: Lang[] = ['en', 'hi', 'bn', 'pa']

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div className={cn('flex rounded-full bg-nv-elevated p-0.5', className)} role="group" aria-label="Language">
      {order.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={cn(
            'min-w-9 rounded-full px-2 py-1 text-[11px] font-medium transition-colors',
            lang === l ? 'bg-white text-nv-fg shadow-sm' : 'text-nv-muted hover:text-nv-fg',
          )}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  )
}
