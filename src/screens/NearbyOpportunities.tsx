import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navigation, MapPin, Filter, List, Map, Building2, Star, ChevronRight, Radar } from 'lucide-react'
import { nearbyOpportunities } from '../data/mockData'

const filters = ['All', 'Prospects', 'Dormant', 'New Openings', 'Competitors']

const typeConfig: Record<string, { label: string; color: string; dot: string }> = {
  prospect: { label: 'Prospect', color: 'text-blue-700 bg-blue-50 border-blue-100', dot: 'bg-blue-400' },
  dormant: { label: 'Dormant', color: 'text-gray-600 bg-gray-100 border-gray-200', dot: 'bg-gray-400' },
  new: { label: 'New Opening', color: 'text-violet-700 bg-violet-50 border-violet-100', dot: 'bg-violet-400' },
  competitor: { label: 'Competitor', color: 'text-amber-700 bg-amber-50 border-amber-100', dot: 'bg-amber-400' },
}

const fitColor = (fit: string) => {
  if (fit === 'High') return 'text-emerald-700 bg-emerald-50'
  if (fit === 'Medium') return 'text-amber-700 bg-amber-50'
  return 'text-gray-600 bg-gray-100'
}

export default function NearbyOpportunities() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = nearbyOpportunities.filter(o => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Prospects') return o.type === 'prospect'
    if (activeFilter === 'Dormant') return o.type === 'dormant'
    if (activeFilter === 'New Openings') return o.type === 'new'
    if (activeFilter === 'Competitors') return o.type === 'competitor'
    return true
  })

  return (
    <div className="bg-rita-ivory min-h-screen">
      {/* Map view header */}
      <div className="map-bg relative overflow-hidden" style={{ height: viewMode === 'map' ? '55vh' : '200px', borderRadius: '0 0 32px 32px', transition: 'height 0.4s ease' }}>
        {/* Grid */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }} />

        {/* Radar pulse - your location */}
        <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <div className="w-4 h-4 rounded-full bg-rita-gold z-20 relative flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-rita-gold/40 animate-ping" style={{ width: 60, height: 60, top: -22, left: -22 }} />
          <div className="absolute rounded-full border border-rita-gold/20" style={{ width: 120, height: 120, top: -52, left: -52 }} />
          <div className="absolute rounded-full border border-rita-gold/10" style={{ width: 200, height: 200, top: -92, left: -92 }} />
        </div>

        {/* Nearby opportunity dots */}
        {[
          { x: '62%', y: '35%', type: 'prospect', label: '1' },
          { x: '72%', y: '55%', type: 'dormant', label: '2' },
          { x: '38%', y: '40%', type: 'new', label: '3' },
          { x: '30%', y: '62%', type: 'competitor', label: '4' },
          { x: '58%', y: '72%', type: 'prospect', label: '5' },
          { x: '45%', y: '28%', type: 'prospect', label: '6' },
        ].map(({ x, y, type, label }) => (
          <div
            key={label}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y }}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black shadow-md ${
              type === 'prospect' ? 'bg-blue-500 text-white' :
              type === 'dormant' ? 'bg-gray-400 text-white' :
              type === 'new' ? 'bg-violet-500 text-white' :
              'bg-amber-500 text-white'
            }`}>
              {label}
            </div>
          </div>
        ))}

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 pt-14 px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-xs">You Are Here</p>
              <h1 className="text-white text-xl font-bold">Nearby</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-2 rounded-xl"
              >
                {viewMode === 'list' ? <Map size={13} className="text-white" /> : <List size={13} className="text-white" />}
                <span className="text-white text-xs font-semibold">{viewMode === 'list' ? 'Map' : 'List'}</span>
              </button>
              <button className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Filter size={14} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex gap-2">
            <div className="bg-black/30 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-2">
              <Radar size={12} className="text-rita-gold" />
              <span className="text-white text-xs font-semibold">{nearbyOpportunities.length} within 2 miles</span>
            </div>
            <div className="bg-black/30 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-2">
              <Star size={12} className="text-rita-gold fill-rita-gold" />
              <span className="text-white text-xs font-semibold">4 high-fit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 pt-4 overflow-x-auto scrollbar-hide pb-1">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-premium btn-press ${
              activeFilter === f
                ? 'bg-rita-forest text-white'
                : 'bg-white text-rita-slate border border-rita-ivory-dark'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 space-y-2">
        <p className="text-rita-muted text-xs font-semibold mb-3">{filtered.length} opportunities nearby</p>

        {filtered.map((opp, idx) => {
          const tc = typeConfig[opp.type]
          return (
            <motion.div
              key={opp.id}
              className="card-premium p-4 flex items-center gap-3 btn-press transition-premium"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {/* Number badge */}
              <div className="w-9 h-9 rounded-xl bg-rita-forest flex items-center justify-center flex-shrink-0 text-sm font-black text-white">
                {idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`priority-dot ${tc.dot}`} />
                  <p className="text-rita-black text-sm font-semibold truncate">{opp.name}</p>
                </div>
                <p className="text-rita-muted text-xs mt-0.5 leading-relaxed">{opp.reason}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${tc.color}`}>
                    {tc.label}
                  </span>
                  <span className="text-rita-muted text-[10px] flex items-center gap-1">
                    <MapPin size={9} />
                    {opp.distance}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${fitColor(opp.fit)}`}>
                  {opp.fit} fit
                </span>
                <button className="flex items-center gap-1 text-rita-forest text-xs font-semibold">
                  <Navigation size={11} />
                  Go
                </button>
              </div>
            </motion.div>
          )
        })}

        {/* Quick prospect CTA */}
        <div className="card-forest p-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Building2 size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Scan Any Restaurant</p>
              <p className="text-white/50 text-xs mt-0.5">Instant AI intelligence on unknown businesses</p>
            </div>
            <ChevronRight size={16} className="text-white/30" />
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
