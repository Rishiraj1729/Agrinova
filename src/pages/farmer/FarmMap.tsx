import { useNavigate } from 'react-router-dom'
import { PlotCanvas } from '../../components/PlotCanvas'
import { SoilProfileCard } from '../../components/SoilProfileCard'
import { Button } from '../../components/ui/Button'
import { estimateStrawFromParcels, useAuth } from '../../contexts/AuthContext'
import { SourceNote } from '../../components/SourceNote'

export default function FarmMapPage() {
  const { user, updateSession } = useAuth()
  const navigate = useNavigate()
  if (!user) return null

  const straw = estimateStrawFromParcels(user.parcels)

  return (
    <div className="animate-fade-in space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold">Map your sown plots</h1>
        <p className="text-sm text-nv-muted mt-1">
          Draw sown fields on the real OpenStreetMap around Madhyamgram. Mark parcels for sale — AgriNova estimates straw and ranks pathways.
        </p>
      </div>

      <PlotCanvas
        parcels={user.parcels}
        onChange={(parcels) => updateSession({ parcels })}
      />

      <SourceNote provenance="PUBLIC_DATA">
        Basemap OpenStreetMap. Parcel acres from geodesic polygon area. Straw ≈ 2 t/acre paddy (IARI-style factor).
      </SourceNote>

      <SoilProfileCard
        soil={user.soil}
        onChange={(soil) => updateSession({ soil })}
        onAskAi={() => navigate('/farmer/kisansathi?soil=1')}
      />

      <div className="flex flex-wrap gap-2">
        <Button
          disabled={straw < 0.5}
          onClick={() => navigate(`/farmer/sell?qty=${straw.toFixed(1)}`)}
        >
          List ~{straw.toFixed(1)} t for sale
        </Button>
        <Button variant="outline" onClick={() => navigate('/farmer/kisansathi')}>
          Optimise with Kisan AI
        </Button>
      </div>
    </div>
  )
}
