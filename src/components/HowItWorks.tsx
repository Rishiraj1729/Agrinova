const steps = [
  {
    step: 1,
    title: 'List your residue',
    desc: 'Enter crop type, quantity, and location on the app',
  },
  {
    step: 2,
    title: 'Get matched',
    desc: 'System finds the nearest buyer or aggregator for you',
  },
  {
    step: 3,
    title: 'Book equipment',
    desc: 'Reserve shared baling equipment for a pickup-ready slot',
  },
  {
    step: 4,
    title: 'Logistics pickup',
    desc: 'Partner handles transport from your field to the buyer',
  },
  {
    step: 5,
    title: 'Receive payment',
    desc: 'Payment deposited directly to your account via the platform',
  },
]

export default function HowItWorks() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-agri-green">
          How It Works
        </h2>
        <p className="mb-10 text-2xl font-bold md:text-3xl">5 simple steps</p>
        <div className="space-y-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="flex items-start gap-4 rounded-xl border border-agri-border bg-agri-card p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-agri-green/20 text-lg font-bold text-agri-green">
                {s.step}
              </div>
              <div>
                <h3 className="font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-agri-muted">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
