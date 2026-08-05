interface SuccessProps {
  amount: number
  buyerName: string
  onDashboard: () => void
}

export default function Success({ amount, buyerName, onDashboard }: SuccessProps) {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center animate-fade-in">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-agri-green/20 text-5xl pulse-green">
        💰
      </div>
      <h1 className="text-3xl font-bold text-agri-green">Payment Received!</h1>
      <p className="mt-4 text-4xl font-bold">₹{amount.toLocaleString('en-IN')}</p>
      <p className="mt-2 text-agri-muted">
        From <strong className="text-white">{buyerName}</strong> via Agrinova
      </p>

      <div className="mt-8 rounded-xl border border-agri-border bg-agri-card p-6 text-left">
        <h2 className="mb-4 font-bold">What you achieved</h2>
        <ul className="space-y-2 text-sm text-agri-muted">
          <li>✅ Residue sold instead of burned</li>
          <li>✅ NGT fine risk eliminated</li>
          <li>✅ Soil organic carbon preserved</li>
          <li>✅ Air pollution reduced at source</li>
        </ul>
      </div>

      <button
        type="button"
        onClick={onDashboard}
        className="mt-8 rounded-xl bg-agri-green px-8 py-4 font-bold text-agri-dark hover:bg-agri-green-dim"
      >
        Back to Dashboard
      </button>
    </div>
  )
}
