import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Star, MapPin, ChevronRight, Building2, Plus } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const tabs = ['All', 'Customers', 'Hot Leads', 'Prospects', 'Dormant']

const statusStyles: Record<string, { dot: string; label: string; labelStyle: string }> = {
  customer: { dot: 'bg-emerald-400', label: 'Customer', labelStyle: 'text-emerald-700 bg-emerald-50' },
  hot: { dot: 'bg-rita-gold', label: 'Hot Lead', labelStyle: 'text-rita-gold-dark bg-rita-gold-pale' },
  prospect: { dot: 'bg-blue-400', label: 'Prospect', labelStyle: 'text-blue-700 bg-blue-50' },
  dormant: { dot: 'bg-gray-300', label: 'Dormant', labelStyle: 'text-gray-600 bg-gray-100' },
  closed: { dot: 'bg-red-300', label: 'Closed', labelStyle: 'text-red-700 bg-red-50' },
}

export default function RestaurantList() {
  const navigate = useNavigate()
  const { restaurants } = useStore()
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('All')

  const filtered = restaurants.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
      r.neighborhood.toLowerCase().includes(search.toLowerCase())
    const matchTab = activeTab === 'All' ||
      (activeTab === 'Customers' && r.status === 'customer') ||
      (activeTab === 'Hot Leads' && r.status === 'hot') ||
      (activeTab === 'Prospects' && r.status === 'prospect') ||
      (activeTab === 'Dormant' && r.status === 'dormant')
    return matchSearch && matchTab
  })

  return (
    <div className="bg-rita-ivory min-h-screen">
      <div className="card-forest rounded-none pt-14 pb-5 px-5" style={{ borderRadius: '0 0 28px 28px' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/50 text-xs">Your Territory</p>
            <h1 className="text-white text-xl font-bold">Accounts</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/accounts/add')}
              className="flex items-center gap-1.5 bg-rita-gold px-3 py-2 rounded-xl btn-press"
            >
              <Plus size={14} className="text-rita-black" />
              <span className="text-rita-black text-xs font-bold">Add</span>
            </button>
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
              <SlidersHorizontal size={15} className="text-white/70" />
            </div>
          </div>
        </div>

        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search restaurants, cuisine, area..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-white/30 rounded-2xl py-3 pl-9 pr-4 text-sm border border-white/10 outline-none focus:border-rita-gold/50"
          />
        </div>
      </div>

      <div className="flex gap-2 px-4 pt-4 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-premium btn-press ${
              activeTab === tab
                ? 'bg-rita-forest text-white'
                : 'bg-white text-rita-slate border border-rita-ivory-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 space-y-2">
        <p className="text-rita-muted text-xs font-semibold mb-3">
          {filtered.length} {filtered.length === 1 ? 'account' : 'accounts'}
        </p>

        <motion.div className="space-y-2" layout>
          {filtered.map(restaurant => {
            const s = statusStyles[restaurant.status] ?? statusStyles['prospect']
            return (
              <motion.button
                key={restaurant.id}
                layout
                onClick={() => navigate(`/accounts/${restaurant.id}`)}
                className="w-full card-premium p-4 flex items-center gap-3 text-left btn-press transition-premium"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-11 h-11 rounded-2xl bg-rita-forest/10 flex items-center justify-center flex-shrink-0 relative">
                  <Building2 size={20} className="text-rita-forest/60" />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${s.dot}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-rita-black text-sm font-semibold truncate">{restaurant.name}</p>
                    {restaurant.priority === 'high' && (
                      <span className="text-[9px] font-black text-rita-gold-dark bg-rita-gold-pale px-1.5 py-0.5 rounded-full flex-shrink-0">★ HIGH</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-rita-muted text-xs">{restaurant.cuisine}</span>
                    <span className="text-rita-ivory-mid">·</span>
                    <span className="text-rita-muted text-xs flex items-center gap-0.5">
                      <MapPin size={9} />
                      {restaurant.neighborhood}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${s.labelStyle}`}>
                      {s.label}
                    </span>
                    <span className="text-rita-muted text-[10px]">Last: {restaurant.lastContact}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <Star size={10} className="fill-rita-gold text-rita-gold" />
                    <span className="text-rita-black text-xs font-semibold">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-16 rounded-full bg-rita-ivory-dark overflow-hidden">
                      <div className="h-full rounded-full bg-rita-forest"
                        style={{ width: `${restaurant.closeProbability}%` }} />
                    </div>
                    <span className="text-rita-muted text-[10px]">{restaurant.closeProbability}%</span>
                  </div>
                  <ChevronRight size={13} className="text-rita-ivory-mid" />
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Building2 size={32} className="text-rita-ivory-mid mx-auto mb-3" />
            <p className="text-rita-muted text-sm">No accounts found</p>
            <button
              onClick={() => navigate('/accounts/add')}
              className="mt-3 text-rita-forest text-sm font-semibold"
            >
              + Add your first account
            </button>
          </div>
        )}

        <div className="h-4" />
      </div>
    </div>
  )
}
