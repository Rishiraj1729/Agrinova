import { toolCards } from '../data/farmerTools'
import type { ToolId } from '../types'

interface FarmerToolsProps {
  onSelectTool: (tool: ToolId) => void
}

export default function FarmerTools({ onSelectTool }: FarmerToolsProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 md:pb-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Kisan Toolkit</h1>
        <p className="mt-1 text-agri-muted">किसान उपकरण · Everything a farmer needs in one place</p>
      </div>

      <div className="mb-8 rounded-xl border border-agri-saffron/30 bg-gradient-to-r from-agri-saffron/10 via-agri-card to-agri-green/10 p-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🇮🇳</span>
          <div>
            <p className="font-bold">Backed by Govt of India priorities</p>
            <p className="text-sm text-agri-muted">
              Stubble burning alerts · MSP prices · PM-KISAN · Soil Health · Climate emissions tracking
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {toolCards.map((tool) => (
          <button
            key={tool.id}
            type="button"
            onClick={() => onSelectTool(tool.id as ToolId)}
            className="group rounded-2xl border border-agri-border bg-agri-card p-6 text-left transition hover:border-agri-green/50 hover:bg-agri-green/5"
          >
            <span className="text-4xl">{tool.icon}</span>
            <h3 className="mt-4 text-lg font-bold group-hover:text-agri-green">{tool.title}</h3>
            <p className="text-sm text-agri-muted">{tool.titleHindi}</p>
            <p className="mt-2 text-sm text-agri-muted">{tool.desc}</p>
            <span className="mt-4 inline-block text-sm font-medium text-agri-green opacity-0 transition group-hover:opacity-100">
              Open →
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
