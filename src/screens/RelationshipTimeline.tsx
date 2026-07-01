import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft, Phone, Mail, MessageSquare, Calendar, FileText,
  Mic, MapPin, FileCheck, Plus
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

const typeConfig = {
  call: { icon: Phone, label: 'Call', color: 'bg-blue-100 text-blue-600', dot: 'bg-blue-400' },
  email: { icon: Mail, label: 'Email', color: 'bg-violet-100 text-violet-600', dot: 'bg-violet-400' },
  text: { icon: MessageSquare, label: 'Text', color: 'bg-emerald-100 text-emerald-600', dot: 'bg-emerald-400' },
  meeting: { icon: Calendar, label: 'Meeting', color: 'bg-amber-100 text-amber-600', dot: 'bg-amber-400' },
  note: { icon: FileText, label: 'Note', color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
  voice: { icon: Mic, label: 'Voice Note', color: 'bg-pink-100 text-pink-600', dot: 'bg-pink-400' },
  visit: { icon: MapPin, label: 'Visit', color: 'bg-rita-forest/10 text-rita-forest', dot: 'bg-rita-forest-mid' },
  document: { icon: FileText, label: 'Document', color: 'bg-orange-100 text-orange-600', dot: 'bg-orange-400' },
  contract: { icon: FileCheck, label: 'Contract', color: 'bg-rita-gold-pale text-rita-gold-dark', dot: 'bg-rita-gold' },
}

const allTypes = ['All', 'Visit', 'Call', 'Email', 'Meeting', 'Note', 'Contract']

export default function RelationshipTimeline() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { restaurants, timeline } = useStore()
  const r = restaurants.find(res => res.id === id)
  const [activeFilter, setActiveFilter] = useState('All')

  const entries = timeline.filter(e => {
    if (e.restaurantId !== id) return false
    if (activeFilter === 'All') return true
    return e.type.toLowerCase() === activeFilter.toLowerCase()
  })

  if (!r) return null

  return (
    <div className="bg-rita-ivory min-h-screen">
      {/* Header */}
      <div className="card-forest rounded-none pt-14 pb-5 px-5" style={{ borderRadius: '0 0 28px 28px' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <ChevronLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <p className="text-white/50 text-xs truncate">{r.name}</p>
            <h1 className="text-white text-lg font-bold">Relationship Timeline</h1>
          </div>
          <button
            onClick={() => navigate('/voice')}
            className="flex items-center gap-1.5 bg-rita-gold px-3 py-2 rounded-xl"
          >
            <Plus size={13} className="text-rita-black" />
            <span className="text-rita-black text-xs font-bold">Log</span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mt-4">
          {[
            { label: 'Interactions', value: timeline.filter(e => e.restaurantId === id).length.toString() },
            { label: 'Last Contact', value: r.lastContact },
            { label: 'Next Step', value: 'Today' },
          ].map(({ label, value }) => (
            <div key={label} className="flex-1 bg-white/8 rounded-2xl p-2.5 text-center">
              <p className="text-white/40 text-[9px] uppercase tracking-widest font-semibold">{label}</p>
              <p className="text-white text-sm font-bold mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 pt-4 overflow-x-auto scrollbar-hide pb-1">
        {allTypes.map(type => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-premium btn-press ${
              activeFilter === type
                ? 'bg-rita-forest text-white'
                : 'bg-white text-rita-slate border border-rita-ivory-dark'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4">
        {entries.length === 0 ? (
          <div className="text-center py-16 text-rita-muted">
            <FileText size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No {activeFilter.toLowerCase()} entries yet</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline spine */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-rita-ivory-dark rounded-full" />

            <div className="space-y-4">
              {entries.map((entry, idx) => {
                const cfg = typeConfig[entry.type as keyof typeof typeConfig]
                const Icon = cfg.icon
                return (
                  <motion.div
                    key={entry.id}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 z-10">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${cfg.color}`}>
                        <Icon size={16} />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="flex-1 card-premium p-4 mb-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-rita-muted">
                            {cfg.label}
                          </span>
                          <p className="text-rita-black text-sm font-semibold leading-snug mt-0.5">
                            {entry.summary}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-rita-muted text-[10px] font-semibold">{entry.date}</p>
                          <p className="text-rita-muted text-[10px]">{entry.time}</p>
                        </div>
                      </div>

                      {entry.outcome && (
                        <div className="mt-2 pt-2 border-t border-rita-ivory-dark">
                          <p className="text-rita-slate text-xs leading-relaxed">{entry.outcome}</p>
                        </div>
                      )}

                      {entry.duration && (
                        <p className="text-rita-muted text-[10px] mt-1">Duration: {entry.duration}</p>
                      )}

                      {entry.nextStep && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-rita-gold flex-shrink-0" />
                          <p className="text-rita-gold-dark text-[10px] font-semibold">Next: {entry.nextStep}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}
        <div className="h-4" />
      </div>
    </div>
  )
}
