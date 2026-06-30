import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, User, Brain, AlertTriangle, Target, MessageSquare, Navigation, Clock } from 'lucide-react'
import { restaurants } from '../data/mockData'

export default function RestaurantSnapshot() {
  const { id } = useParams()
  const navigate = useNavigate()
  const r = restaurants.find(res => res.id === id)
  if (!r) return null

  const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }
  const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

  return (
    <div className="bg-rita-ivory min-h-screen">
      {/* Header */}
      <div className="card-forest rounded-none pt-14 pb-6 px-5" style={{ borderRadius: '0 0 32px 32px' }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <ChevronLeft size={18} className="text-white" />
          </button>
          <div>
            <p className="text-white/50 text-xs">Pre-Visit Intelligence</p>
            <h1 className="text-white text-lg font-bold">Restaurant Snapshot</h1>
          </div>
        </div>

        <div className="bg-white/8 rounded-2xl p-4">
          <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold mb-1">Walking Into</p>
          <h2 className="text-white text-xl font-bold">{r.name}</h2>
          <p className="text-white/60 text-sm mt-0.5">{r.address} · {r.neighborhood}</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-white/50 text-xs flex items-center gap-1">
              <Clock size={10} />
              Last contact: {r.lastContact}
            </span>
            <span className="text-white/30">·</span>
            <span className="text-white/50 text-xs">Next: {r.nextFollowUp}</span>
          </div>
        </div>
      </div>

      <motion.div className="px-4 pt-5 space-y-4" variants={stagger} initial="hidden" animate="show">

        {/* AI Pre-Visit Brief */}
        <motion.div variants={fadeUp} className="card-gold p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #A8883C)' }}>
              <Brain size={13} className="text-white" />
            </div>
            <p className="text-rita-gold-dark text-xs font-black uppercase tracking-widest">Rita Pre-Visit Brief</p>
          </div>
          <p className="text-rita-black text-sm leading-relaxed">{r.aiSummary}</p>
        </motion.div>

        {/* Key People */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Key People</h2>
          <div className="card-premium divide-y divide-rita-ivory-dark">
            {[
              { role: 'Owner / Decision Maker', name: r.ownerName, sub: `Birthday: ${r.ownerBirthday}` },
              { role: 'Manager on Duty', name: r.managerName, sub: 'Day-to-day contact' },
            ].map(({ role, name, sub }) => (
              <div key={role} className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-full bg-rita-forest/10 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-rita-forest/60" />
                </div>
                <div className="flex-1">
                  <p className="text-rita-black text-sm font-semibold">{name}</p>
                  <p className="text-rita-muted text-xs">{role}</p>
                  <p className="text-rita-forest text-xs font-medium mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Personal intel */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Personal Intel</h2>
          <div className="card-premium p-4 space-y-3">
            {[
              { label: 'Favorite Sports Team', value: r.favoriteTeam, emoji: '🏆' },
              { label: 'Communication Preference', value: 'Face-to-face + email follow-up', emoji: '💬' },
              { label: 'Best Visit Time', value: 'Tue/Thu 10–11:30 AM', emoji: '⏰' },
              { label: 'Current Promotion', value: r.currentPromotion, emoji: '🎯' },
            ].map(({ label, value, emoji }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="text-base flex-shrink-0">{emoji}</span>
                <div>
                  <p className="text-rita-muted text-xs">{label}</p>
                  <p className="text-rita-black text-sm font-semibold mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pain Points */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Pain Points</h2>
          <div className="card-premium p-4 space-y-2">
            {r.painPoints.map((pain, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <AlertTriangle size={13} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-rita-black text-sm leading-snug">{pain}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Goals */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Their Goals</h2>
          <div className="card-premium p-4 space-y-2">
            {r.goals.map((goal, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Target size={13} className="text-rita-forest mt-0.5 flex-shrink-0" />
                <p className="text-rita-black text-sm leading-snug">{goal}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Suggested Opening */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Suggested Opening</h2>
          <div className="card-premium p-4 bg-rita-forest/4 border border-rita-forest/10">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={13} className="text-rita-forest" />
              <p className="text-rita-forest text-[10px] font-bold uppercase tracking-wider">Rita Suggests</p>
            </div>
            <p className="text-rita-black text-sm leading-relaxed italic">
              "{r.status === 'customer'
                ? `"Hey Marco — congrats on the Lakers game, and I wanted to share some exciting numbers from your loyalty program before we dig into Q3."`
                : `"Hi — I know you're busy so I'll keep this quick. I work with restaurants just like ${r.name} and I have one specific idea that's been working really well for ${r.cuisine} spots. Would you give me 5 minutes?"`}"
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="flex gap-2">
          <button
            onClick={() => navigate(`/accounts/${id}/coach`)}
            className="flex-1 py-4 rounded-2xl bg-rita-forest text-white font-bold text-sm flex items-center justify-center gap-2 btn-press"
          >
            <Brain size={16} />
            Sales Coach
          </button>
          <button className="flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 btn-press border border-rita-ivory-dark bg-white"
            style={{ color: '#1B3A2A' }}>
            <Navigation size={16} />
            Navigate Here
          </button>
        </motion.div>

        <div className="h-4" />
      </motion.div>
    </div>
  )
}
