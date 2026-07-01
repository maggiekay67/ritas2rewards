import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft, Star, Phone, Globe, Instagram, MapPin, Users, DollarSign,
  ChevronRight, ExternalLink, Brain, Clock, TrendingUp, Package, Mic
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function RestaurantIntelligence() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { restaurants } = useStore()
  const r = restaurants.find(res => res.id === id)

  if (!r) return null

  const statusConfig: Record<string, { label: string; style: string }> = {
    customer: { label: 'Active Customer', style: 'bg-emerald-500 text-white' },
    hot: { label: 'Hot Lead', style: 'bg-rita-gold text-white' },
    prospect: { label: 'Prospect', style: 'bg-blue-500 text-white' },
    dormant: { label: 'Dormant', style: 'bg-gray-400 text-white' },
  }
  const sc = statusConfig[r.status]

  const expansionConfig: Record<string, { label: string; style: string }> = {
    expanding: { label: 'Expanding', style: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
    stable: { label: 'Stable', style: 'text-blue-700 bg-blue-50 border-blue-100' },
    exploring: { label: 'Exploring Growth', style: 'text-amber-700 bg-amber-50 border-amber-100' },
    new: { label: 'New Opening', style: 'text-violet-700 bg-violet-50 border-violet-100' },
  }
  const ec = expansionConfig[r.expansionStatus]

  const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }
  const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

  return (
    <div className="bg-rita-ivory min-h-screen">
      {/* Hero */}
      <div className="card-forest rounded-none relative overflow-hidden" style={{ borderRadius: '0 0 32px 32px' }}>
        {/* Ambient pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />

        <div className="relative pt-14 pb-6 px-5">
          {/* Back + actions */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={() => navigate('/accounts')} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <ChevronLeft size={18} className="text-white" />
            </button>
            <div className="flex gap-2">
              <button onClick={() => navigate(`/accounts/${id}/snapshot`)} className="flex items-center gap-1.5 bg-rita-gold px-3 py-1.5 rounded-xl">
                <Brain size={12} className="text-rita-black" />
                <span className="text-rita-black text-xs font-bold">Snapshot</span>
              </button>
              <button onClick={() => navigate(`/accounts/${id}/coach`)} className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
                <TrendingUp size={12} className="text-white" />
                <span className="text-white text-xs font-bold">Coach</span>
              </button>
            </div>
          </div>

          {/* Restaurant identity */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-black text-white">{r.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${sc.style}`}>{sc.label}</span>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${ec.style}`}>{ec.label}</span>
              </div>
              <h1 className="text-white text-xl font-bold mt-2 leading-snug">{r.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Star size={12} className="fill-rita-gold text-rita-gold" />
                <span className="text-white/80 text-sm font-semibold">{r.rating}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/60 text-sm">{r.cuisine}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/60 text-sm">{r.locations} location{r.locations > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Key metrics row */}
          <div className="flex gap-3 mt-5">
            {[
              { label: 'Revenue', value: r.revenue },
              { label: 'Employees', value: r.employees.toString() },
              { label: 'Close %', value: `${r.closeProbability}%` },
            ].map(({ label, value }) => (
              <div key={label} className="flex-1 bg-white/8 rounded-2xl p-3 text-center">
                <p className="text-white/40 text-[9px] uppercase tracking-widest font-semibold">{label}</p>
                <p className="text-white font-bold text-base mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div className="px-4 pt-5 space-y-4" variants={stagger} initial="hidden" animate="show">

        {/* AI Summary */}
        <motion.div variants={fadeUp} className="card-gold p-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain size={14} className="text-rita-gold-dark" />
            <p className="text-rita-gold-dark text-[10px] font-black uppercase tracking-widest">Rita AI Summary</p>
          </div>
          <p className="text-rita-black text-sm leading-relaxed">{r.aiSummary}</p>
        </motion.div>

        {/* Quick actions row */}
        <motion.div variants={fadeUp} className="flex gap-2">
          {/* Tap-to-call */}
          <a
            href={r.phone ? `tel:${r.phone.replace(/\D/g, '')}` : undefined}
            className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-white border border-rita-ivory-dark btn-press transition-premium"
          >
            <Phone size={17} className="text-rita-forest" />
            <span className="text-[9px] font-semibold text-rita-slate">Call</span>
          </a>
          {/* Tap-to-navigate */}
          <a
            href={r.address ? `https://maps.apple.com/?q=${encodeURIComponent(r.address + ' ' + r.neighborhood)}` : undefined}
            target="_blank" rel="noreferrer"
            className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-white border border-rita-ivory-dark btn-press transition-premium"
          >
            <MapPin size={17} className="text-rita-forest" />
            <span className="text-[9px] font-semibold text-rita-slate">Navigate</span>
          </a>
          {[
            { label: 'Timeline', icon: Clock, path: `/accounts/${id}/timeline` },
            { label: 'Coach', icon: TrendingUp, path: `/accounts/${id}/coach` },
            { label: 'Voice', icon: Mic, path: '/voice' },
          ].map(({ label, icon: Icon, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-white border border-rita-ivory-dark btn-press transition-premium"
            >
              <Icon size={17} className="text-rita-forest" />
              <span className="text-[9px] font-semibold text-rita-slate">{label}</span>
            </button>
          ))}
        </motion.div>

        {/* Business Snapshot */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Business Snapshot</h2>
          <div className="card-premium divide-y divide-rita-ivory-dark">
            {[
              { label: 'Cuisine', value: r.cuisine, icon: Package },
              { label: 'Address', value: `${r.address}, ${r.neighborhood}`, icon: MapPin },
              { label: 'Hours', value: r.hours, icon: Clock },
              { label: 'Employees', value: r.employees.toString(), icon: Users },
              { label: 'Est. Revenue', value: r.revenue, icon: DollarSign },
              { label: 'Locations', value: r.locations.toString(), icon: MapPin },
              { label: 'Opened', value: new Date(r.openedDate).getFullYear().toString(), icon: Clock },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3">
                <Icon size={14} className="text-rita-muted flex-shrink-0" />
                <span className="text-rita-muted text-xs w-20 flex-shrink-0">{label}</span>
                <span className="text-rita-black text-xs font-semibold flex-1 text-right">{value}</span>
              </div>
            ))}
            {/* Tappable phone + website */}
            <a href={`tel:${r.phone.replace(/\D/g,'')}`} className="flex items-center gap-3 px-4 py-3">
              <Phone size={14} className="text-rita-muted flex-shrink-0" />
              <span className="text-rita-muted text-xs w-20 flex-shrink-0">Phone</span>
              <span className="text-rita-forest text-xs font-semibold flex-1 text-right underline">{r.phone}</span>
            </a>
            <a href={`https://${r.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3">
              <Globe size={14} className="text-rita-muted flex-shrink-0" />
              <span className="text-rita-muted text-xs w-20 flex-shrink-0">Website</span>
              <span className="text-rita-forest text-xs font-semibold flex-1 text-right underline">{r.website}</span>
            </a>
          </div>
        </motion.div>

        {/* Social & Digital */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Social & Digital</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="card-premium p-4">
              <div className="flex items-center gap-2 mb-2">
                <Instagram size={14} className="text-pink-500" />
                <span className="text-xs font-semibold text-rita-black">Instagram</span>
              </div>
              <p className="text-lg font-bold text-rita-black">{r.instagramFollowers}</p>
              <p className="text-xs text-rita-muted">{r.instagram}</p>
            </div>
            <div className="card-premium p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">🎵</span>
                <span className="text-xs font-semibold text-rita-black">TikTok</span>
              </div>
              <p className="text-lg font-bold text-rita-black">{r.tiktokActivity}</p>
              <p className="text-xs text-rita-muted">engagement level</p>
            </div>
            <div className="card-premium p-4 col-span-2">
              <p className="text-xs font-semibold text-rita-black mb-2">Delivery Platforms</p>
              <div className="flex gap-2 flex-wrap">
                {r.deliveryPlatforms.map(p => (
                  <span key={p} className="text-[10px] font-semibold bg-rita-forest/8 text-rita-forest px-2.5 py-1 rounded-full">{p}</span>
                ))}
                {!r.hasLoyalty && (
                  <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-100">No Loyalty Program</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CRM Status */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">CRM Status</h2>
          <div className="card-premium divide-y divide-rita-ivory-dark">
            {[
              { label: 'Last Contact', value: r.lastContact },
              { label: 'Next Follow-up', value: r.nextFollowUp },
              { label: 'Decision Maker', value: r.decisionMaker },
              { label: 'Owner', value: r.ownerName },
              { label: 'Manager', value: r.managerName },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-4 py-3">
                <span className="text-rita-muted text-xs">{label}</span>
                <span className="text-rita-black text-xs font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Navigation actions */}
        <motion.div variants={fadeUp} className="space-y-2">
          {[
            { label: 'View Full Timeline', path: `/accounts/${id}/timeline`, icon: Clock },
            { label: 'AI Pre-Visit Snapshot', path: `/accounts/${id}/snapshot`, icon: Brain },
            { label: 'Open Objection Handler', path: '/objections', icon: TrendingUp },
          ].map(({ label, path, icon: Icon }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="w-full card-premium px-4 py-4 flex items-center gap-3 btn-press transition-premium text-left"
            >
              <Icon size={16} className="text-rita-forest" />
              <span className="flex-1 text-rita-black text-sm font-semibold">{label}</span>
              <ExternalLink size={13} className="text-rita-muted" />
            </button>
          ))}
        </motion.div>

        <div className="h-4" />
      </motion.div>
    </div>
  )
}
