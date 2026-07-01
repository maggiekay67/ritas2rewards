import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, Reorder } from 'framer-motion'
import { Navigation, Clock, MapPin, ChevronRight, GripVertical, Zap, RotateCcw, Plus } from 'lucide-react'
import { restaurants, todayRoute } from '../data/mockData'

export default function RoutePlanner() {
  const navigate = useNavigate()
  const [stops, setStops] = useState(
    todayRoute.map(stop => ({
      ...stop,
      restaurant: restaurants.find(r => r.id === stop.restaurantId)!
    }))
  )
  const [optimized, setOptimized] = useState(false)

  const typeColor: Record<string, string> = {
    appointment: 'bg-rita-gold text-white',
    'follow-up': 'bg-emerald-500 text-white',
    prospect: 'bg-blue-500 text-white',
    'check-in': 'bg-violet-500 text-white',
  }

  const statusDot: Record<string, string> = {
    customer: 'bg-emerald-400',
    hot: 'bg-rita-gold',
    prospect: 'bg-blue-400',
    dormant: 'bg-gray-300',
  }

  return (
    <div className="bg-rita-ivory min-h-screen">
      {/* Map area */}
      <div className="map-bg relative h-52 overflow-hidden" style={{ borderRadius: '0 0 32px 32px' }}>
        {/* Map grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }} />

        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 430 208" preserveAspectRatio="none">
          <path d="M 215 40 Q 280 70 300 120 Q 320 160 240 175 Q 160 190 120 140 Q 80 90 130 60 Q 160 45 215 40"
            stroke="#C9A84C" strokeWidth="2.5" fill="none" strokeDasharray="8 5" opacity="0.7" />
        </svg>

        {/* Stop markers */}
        {[
          { x: '50%', y: '22%', label: '1', active: true },
          { x: '70%', y: '55%', label: '2' },
          { x: '56%', y: '82%', label: '3' },
          { x: '30%', y: '65%', label: '4' },
        ].map(({ x, y, label, active }) => (
          <div
            key={label}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y }}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-float ${active ? 'bg-rita-gold text-white' : 'bg-white text-rita-forest border-2 border-rita-forest'}`}>
              {label}
            </div>
            {active && <div className="absolute inset-0 rounded-full bg-rita-gold/30 animate-ping" />}
          </div>
        ))}

        {/* Header overlay */}
        <div className="absolute top-0 left-0 right-0 pt-14 px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-xs font-medium">Today's Route</p>
              <h1 className="text-white text-xl font-bold">Jun 30 · 4 Stops</h1>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="flex gap-3">
            {[
              { icon: Clock, label: '1h 42m drive' },
              { icon: MapPin, label: '28.3 miles' },
              { icon: Navigation, label: 'Optimized' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md rounded-full px-3 py-1.5">
                <Icon size={10} className="text-rita-gold" />
                <span className="text-white text-[10px] font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-4">
        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setOptimized(!optimized)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm btn-press transition-premium"
            style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #A8883C 100%)', color: '#080C0A' }}
          >
            <Zap size={15} />
            {optimized ? 'Route Optimized ✓' : 'Optimize Route'}
          </button>
          <button className="w-12 h-12 rounded-xl bg-white border border-rita-ivory-dark flex items-center justify-center btn-press">
            <RotateCcw size={16} className="text-rita-slate" />
          </button>
          <button className="w-12 h-12 rounded-xl bg-white border border-rita-ivory-dark flex items-center justify-center btn-press">
            <Plus size={16} className="text-rita-slate" />
          </button>
        </div>

        {/* Stop list header */}
        <div className="flex items-center justify-between">
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider">Stops · Drag to reorder</h2>
          <span className="text-rita-muted text-xs">~{stops.reduce((a, s) => a + s.estimatedDuration, 0)} min total</span>
        </div>

        {/* Draggable stops */}
        <Reorder.Group values={stops} onReorder={setStops} className="space-y-2">
          {stops.map((stop, idx) => (
            <Reorder.Item key={stop.id} value={stop}>
              <motion.div
                className="card-premium p-4 flex items-center gap-3 cursor-grab active:cursor-grabbing relative"
                whileDrag={{ scale: 1.02, shadow: '0 8px 32px rgba(0,0,0,0.15)' }}
              >
                {/* Connector line */}
                {idx < stops.length - 1 && (
                  <div className="route-line" style={{ top: '48px', bottom: '-16px' }} />
                )}

                {/* Order badge */}
                <div className="w-8 h-8 rounded-xl bg-rita-forest flex items-center justify-center flex-shrink-0 text-xs font-black text-white z-10">
                  {idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`priority-dot ${statusDot[stop.restaurant.status] || 'bg-gray-300'}`} />
                    <p className="text-rita-black text-sm font-semibold truncate">{stop.restaurant.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {stop.time && <span className="text-rita-muted text-xs">{stop.time}</span>}
                    <span className="text-rita-muted text-xs">·</span>
                    <span className="text-rita-muted text-xs">{stop.restaurant.neighborhood}</span>
                    <span className="text-rita-muted text-xs">·</span>
                    <span className="text-rita-muted text-xs">{stop.estimatedDuration}m</span>
                  </div>
                  <p className="text-rita-slate text-xs mt-1 leading-relaxed line-clamp-1">{stop.notes}</p>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide ${typeColor[stop.type]}`}>
                    {stop.type.replace('-', ' ')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => navigate(`/accounts/${stop.restaurantId}`)}
                      className="text-rita-forest"
                    >
                      <ChevronRight size={14} />
                    </button>
                    <GripVertical size={14} className="text-rita-ivory-mid" />
                  </div>
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Navigate CTA */}
        <button
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm btn-press transition-premium"
          style={{ background: 'linear-gradient(135deg, #1B3A2A 0%, #0F2018 100%)', color: 'white' }}
        >
          <Navigation size={17} />
          Start Navigation · Stop 1
        </button>

        <div className="h-4" />
      </div>
    </div>
  )
}
