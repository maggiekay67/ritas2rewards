import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Building2 } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { Restaurant } from '../data/mockData'

export default function AddRestaurant() {
  const navigate = useNavigate()
  const { addRestaurant } = useStore()

  const [form, setForm] = useState({
    name: '',
    cuisine: '',
    address: '',
    neighborhood: '',
    phone: '',
    website: '',
    ownerName: '',
    managerName: '',
    status: 'prospect' as Restaurant['status'],
    priority: 'medium' as Restaurant['priority'],
    notes: '',
  })

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = () => {
    if (!form.name.trim()) return
    addRestaurant({
      ...form,
      instagram: '',
      instagramFollowers: '—',
      tiktokActivity: 'Unknown',
      deliveryPlatforms: [],
      hasLoyalty: false,
      expansionStatus: 'stable',
      closeProbability: 50,
      lastContact: 'Never',
      nextFollowUp: '—',
      decisionMaker: form.ownerName || '—',
      ownerBirthday: '—',
      favoriteTeam: '—',
      painPoints: [],
      goals: [],
      currentPromotion: '—',
      aiSummary: form.notes || 'No notes yet. Visit and log your first interaction to start building the AI profile.',
      openedDate: new Date().toISOString().split('T')[0],
      hours: '—',
      revenue: '—',
      employees: 0,
      locations: 1,
      distance: '—',
      rating: 0,
      coordinates: { lat: 0, lng: 0 },
    })
    navigate('/accounts')
  }

  const inputClass = "w-full bg-white border border-rita-ivory-dark rounded-2xl py-3 px-4 text-sm text-rita-black outline-none focus:border-rita-gold transition-premium"
  const labelClass = "text-rita-muted text-xs font-semibold uppercase tracking-wider mb-1.5 block"

  return (
    <div className="bg-rita-ivory min-h-screen">
      <div className="card-forest rounded-none pt-14 pb-5 px-5" style={{ borderRadius: '0 0 28px 28px' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/accounts')} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <ChevronLeft size={18} className="text-white" />
          </button>
          <div>
            <p className="text-white/50 text-xs">New Account</p>
            <h1 className="text-white text-xl font-bold">Add Restaurant</h1>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-4">
        {/* Basic Info */}
        <div className="card-premium p-4 space-y-4">
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider">Basic Info</h2>

          <div>
            <label className={labelClass}>Restaurant Name *</label>
            <input className={inputClass} placeholder="e.g. The Golden Table" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Cuisine Type</label>
            <input className={inputClass} placeholder="e.g. Italian, Mexican, Japanese" value={form.cuisine} onChange={e => set('cuisine', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input className={inputClass} placeholder="Street address" value={form.address} onChange={e => set('address', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Neighborhood / City</label>
            <input className={inputClass} placeholder="e.g. West Hollywood" value={form.neighborhood} onChange={e => set('neighborhood', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input className={inputClass} placeholder="(310) 555-0100" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Website</label>
            <input className={inputClass} placeholder="restaurant.com" value={form.website} onChange={e => set('website', e.target.value)} />
          </div>
        </div>

        {/* Contacts */}
        <div className="card-premium p-4 space-y-4">
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider">Key Contacts</h2>
          <div>
            <label className={labelClass}>Owner / Decision Maker</label>
            <input className={inputClass} placeholder="Full name" value={form.ownerName} onChange={e => set('ownerName', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Manager</label>
            <input className={inputClass} placeholder="Full name" value={form.managerName} onChange={e => set('managerName', e.target.value)} />
          </div>
        </div>

        {/* Status */}
        <div className="card-premium p-4 space-y-4">
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider">Status</h2>

          <div>
            <label className={labelClass}>Account Status</label>
            <div className="grid grid-cols-3 gap-2">
              {(['prospect', 'hot', 'customer'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => set('status', s)}
                  className={`py-2.5 rounded-xl text-xs font-bold btn-press transition-premium capitalize ${
                    form.status === s
                      ? 'bg-rita-forest text-white'
                      : 'bg-rita-ivory-dark text-rita-slate'
                  }`}
                >
                  {s === 'hot' ? 'Hot Lead' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {(['high', 'medium', 'low'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => set('priority', p)}
                  className={`py-2.5 rounded-xl text-xs font-bold btn-press transition-premium capitalize ${
                    form.priority === p
                      ? 'bg-rita-gold text-white'
                      : 'bg-rita-ivory-dark text-rita-slate'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="card-premium p-4">
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">First Impressions</h2>
          <textarea
            className={`${inputClass} resize-none`}
            rows={4}
            placeholder="What do you know about this place? What's the opportunity? Any personal notes..."
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
          />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={!form.name.trim()}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm btn-press transition-premium disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #1B3A2A, #0F2018)', color: 'white' }}
        >
          <Building2 size={17} />
          Save Account
        </button>

        <div className="h-4" />
      </div>
    </div>
  )
}
