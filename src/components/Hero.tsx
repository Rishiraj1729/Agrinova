interface HeroProps {
  onGetStarted: () => void
  onOpenTools: () => void
}

export default function Hero({ onGetStarted, onOpenTools }: HeroProps) {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(74,222,128,0.08)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl text-center animate-fade-in">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-agri-green">
          किसानों के लिए · Marketplace for Farmers
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          Turning Crop Residue Into{' '}
          <span className="text-agri-green">Farmer Income</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-agri-muted">
          A marketplace solution to end stubble burning — connect with buyers,
          book equipment, and earn ₹1,500–3,000 per acre instead of burning.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onGetStarted}
            className="pulse-green rounded-xl bg-agri-green px-8 py-4 text-lg font-bold text-agri-dark transition hover:bg-agri-green-dim"
          >
            पराली बेचें · Sell Residue →
          </button>
          <button
            type="button"
            onClick={onOpenTools}
            className="rounded-xl border border-agri-border px-8 py-4 text-lg font-medium text-white transition hover:border-agri-green/50"
          >
            🧰 Kisan Toolkit
          </button>
        </div>
      </div>
    </section>
  )
}
