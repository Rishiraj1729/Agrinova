export default function SolutionSection() {
  const features = [
    {
      icon: '🤝',
      title: 'Direct Buyer Connection',
      desc: 'Biomass plants, paper mills, cattle feed units & biochar producers',
    },
    {
      icon: '🚜',
      title: 'Shared Equipment',
      desc: 'On-demand balers & Happy Seeders — no need to buy expensive machinery',
    },
    {
      icon: '💰',
      title: 'Revenue, Not Cost',
      desc: 'Transform a disposal problem into ₹1,500–3,000/acre income stream',
    },
  ]

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-agri-green">
          The Solution
        </h2>
        <p className="mb-10 text-2xl font-bold md:text-3xl">
          Agrinova — a marketplace that makes selling residue easier than burning
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-agri-border bg-agri-card p-6 transition hover:border-agri-green/40"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-4 text-lg font-bold text-agri-green">{f.title}</h3>
              <p className="mt-2 text-sm text-agri-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
