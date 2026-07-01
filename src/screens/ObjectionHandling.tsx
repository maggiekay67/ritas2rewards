import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Search, ChevronDown, ChevronUp, DollarSign, Shield, TrendingUp, Clock, Cpu, Users } from 'lucide-react'
import { objections } from '../data/mockData'

const categories = ['All', 'Pricing', 'Timing', 'Competition', 'Tech', 'Trust', 'Loyalty']

const categoryIcons: Record<string, React.ElementType> = {
  Pricing: DollarSign,
  Timing: Clock,
  Competition: TrendingUp,
  Tech: Cpu,
  Trust: Shield,
  Loyalty: Users,
}

export default function ObjectionHandling() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = objections.filter(o => {
    const matchSearch = o.objection.toLowerCase().includes(search.toLowerCase()) ||
      o.category.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || o.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="bg-rita-ivory min-h-screen">
      {/* Header */}
      <div className="card-forest rounded-none pt-14 pb-5 px-5" style={{ borderRadius: '0 0 28px 28px' }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <ChevronLeft size={18} className="text-white" />
          </button>
          <div>
            <p className="text-white/50 text-xs">Always Ready</p>
            <h1 className="text-white text-xl font-bold">Objection Handling</h1>
          </div>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search objections..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-white/30 rounded-2xl py-3 pl-9 pr-4 text-sm border border-white/10 outline-none"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 px-4 pt-4 overflow-x-auto scrollbar-hide pb-1">
        {categories.map(cat => {
          const Icon = categoryIcons[cat]
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-premium btn-press ${
                activeCategory === cat
                  ? 'bg-rita-forest text-white'
                  : 'bg-white text-rita-slate border border-rita-ivory-dark'
              }`}
            >
              {Icon && <Icon size={11} />}
              {cat}
            </button>
          )
        })}
      </div>

      <div className="px-4 pt-4 space-y-3">
        <p className="text-rita-muted text-xs font-semibold">{filtered.length} objections · Tap to reveal full response</p>

        {filtered.map((obj) => {
          const isExpanded = expandedId === obj.id
          const Icon = categoryIcons[obj.category] || Shield

          return (
            <motion.div key={obj.id} layout className="card-premium overflow-hidden">
              <button
                className="w-full p-4 text-left"
                onClick={() => setExpandedId(isExpanded ? null : obj.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rita-forest/8 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-rita-forest" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-rita-muted bg-rita-ivory-dark px-2 py-0.5 rounded-full">
                        {obj.category}
                      </span>
                    </div>
                    <p className="text-rita-black font-semibold text-sm leading-snug italic">
                      "{obj.objection}"
                    </p>
                  </div>
                  {isExpanded
                    ? <ChevronUp size={16} className="text-rita-muted flex-shrink-0 mt-1" />
                    : <ChevronDown size={16} className="text-rita-muted flex-shrink-0 mt-1" />
                  }
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3 border-t border-rita-ivory-dark pt-4">
                      {/* Response */}
                      <div>
                        <p className="text-rita-forest text-[10px] font-black uppercase tracking-widest mb-2">Your Response</p>
                        <p className="text-rita-black text-sm leading-relaxed">{obj.response}</p>
                      </div>

                      {/* ROI Point */}
                      <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                        <p className="text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-1">
                          <TrendingUp size={10} /> ROI Data Point
                        </p>
                        <p className="text-emerald-800 text-sm font-semibold">{obj.roiPoint}</p>
                      </div>

                      {/* Success Story */}
                      <div className="bg-rita-gold-pale rounded-xl p-3 border border-rita-gold/20">
                        <p className="text-rita-gold-dark text-[10px] font-black uppercase tracking-widest mb-1">Success Story</p>
                        <p className="text-rita-black text-sm">{obj.successStory}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {/* Resources */}
        <div>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3 mt-4">Resources</h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'ROI Calculator', emoji: '📊', desc: 'Live revenue projections' },
              { label: 'Case Studies', emoji: '📁', desc: '12 restaurant success stories' },
              { label: 'Competitor Guide', emoji: '⚖️', desc: 'Side-by-side comparison' },
              { label: 'Funding Info', emoji: '💰', desc: 'Financing options available' },
            ].map(({ label, emoji, desc }) => (
              <button key={label} className="card-premium p-4 text-left btn-press transition-premium">
                <span className="text-2xl">{emoji}</span>
                <p className="text-rita-black text-sm font-semibold mt-2">{label}</p>
                <p className="text-rita-muted text-xs mt-0.5">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
