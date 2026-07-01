import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, TrendingUp, Calendar, Mic, Navigation, Building2, Scan, ChevronRight, Star, Clock, CloudSun, Zap } from 'lucide-react'
import { restaurants, todayRoute, dailyBriefing } from '../data/mockData'

const quickActions = [
  { label: 'Optimize Route', icon: Navigation, color: 'text-rita-forest', bg: 'bg-rita-forest/8', path: '/route' },
  { label: 'Nearby', icon: MapPin, color: 'text-rita-gold-dark', bg: 'bg-rita-gold/10', path: '/nearby' },
  { label: 'Voice Note', icon: Mic, color: 'text-violet-600', bg: 'bg-violet-50', path: '/voice' },
  { label: 'Open CRM', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50', path: '/accounts' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { ease: [0.4, 0, 0.2, 1], duration: 0.4 } }
}

export default function Home() {
  const navigate = useNavigate()
  const { weather, route, insights } = dailyBriefing

  const priorityStops = todayRoute.map(stop => ({
    ...stop,
    restaurant: restaurants.find(r => r.id === stop.restaurantId)!
  }))

  const statusColor = (status: string) => {
    if (status === 'customer') return 'bg-emerald-400'
    if (status === 'hot') return 'bg-rita-gold'
    if (status === 'prospect') return 'bg-blue-400'
    return 'bg-rita-muted/40'
  }

  return (
    <div className="bg-rita-ivory min-h-screen">
      {/* Header */}
      <div className="card-forest mx-0 rounded-none pt-14 pb-6 px-5"
        style={{ borderRadius: '0 0 32px 32px' }}>
        {/* Status strip */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <CloudSun size={13} />
            <span>{weather.temp}° {weather.condition}</span>
          </div>
          <div className="text-white/40 text-xs">Mon, Jun 30</div>
        </div>

        {/* Greeting */}
        <div className="mb-5">
          <p className="text-white/50 text-sm font-medium">Good morning,</p>
          <h1 className="text-white text-3xl font-bold tracking-tight mt-0.5">Maggie</h1>
        </div>

        {/* Today's Route Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/8 rounded-2xl p-3">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Today's Route</p>
            <p className="text-white text-xl font-bold mt-1">{route.stops} Stops</p>
            <p className="text-white/50 text-xs mt-0.5">{route.miles} mi · {route.driveTime}</p>
          </div>
          <div className="bg-white/8 rounded-2xl p-3">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Pipeline</p>
            <p className="text-white text-xl font-bold mt-1">{route.revenue}</p>
            <p className="text-white/50 text-xs mt-0.5">active opportunities</p>
          </div>
        </div>
      </div>

      <motion.div
        className="px-4 pt-5 space-y-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* AI Insight Banner */}
        <motion.div variants={item}>
          <button
            onClick={() => navigate('/briefing')}
            className="w-full card-gold p-4 flex items-start gap-3 text-left btn-press transition-premium"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #A8883C 100%)' }}>
              <Zap size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-rita-gold-dark text-[10px] uppercase tracking-widest font-bold">AI Briefing</p>
              <p className="text-rita-black text-sm font-semibold mt-0.5 leading-snug">
                {insights[0].title}
              </p>
              <p className="text-rita-slate text-xs mt-1 leading-relaxed line-clamp-2">
                {insights[0].body}
              </p>
            </div>
            <ChevronRight size={16} className="text-rita-gold flex-shrink-0 mt-1" />
          </button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map(({ label, icon: Icon, color, bg, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white border border-rita-ivory-dark btn-press transition-premium"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
                  <Icon size={18} className={color} />
                </div>
                <span className="text-[9px] font-semibold text-rita-slate text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Priority Stops Today */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider">Priority Stops</h2>
            <button onClick={() => navigate('/route')} className="text-rita-forest text-xs font-semibold flex items-center gap-1">
              See route <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {priorityStops.map((stop, idx) => (
              <button
                key={stop.id}
                onClick={() => navigate(`/accounts/${stop.restaurantId}`)}
                className="w-full card-premium p-3.5 flex items-center gap-3 text-left btn-press transition-premium"
              >
                <div className="w-8 h-8 rounded-xl bg-rita-forest/8 flex items-center justify-center flex-shrink-0 text-xs font-black text-rita-forest">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`priority-dot ${statusColor(stop.restaurant.status)}`} />
                    <p className="text-rita-black text-sm font-semibold truncate">{stop.restaurant.name}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-rita-muted text-xs">{stop.time}</span>
                    <span className="text-rita-ivory-mid">·</span>
                    <span className="text-rita-slate text-xs">{stop.restaurant.neighborhood}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="flex items-center gap-1 text-rita-muted text-xs justify-end">
                    <Star size={10} className="fill-rita-gold text-rita-gold" />
                    <span>{stop.restaurant.rating}</span>
                  </div>
                  <span className="text-xs text-rita-forest font-semibold capitalize">{stop.type.replace('-', ' ')}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Today's Appointments */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider">Appointments</h2>
            <button className="text-rita-forest text-xs font-semibold flex items-center gap-1">
              Calendar <ChevronRight size={12} />
            </button>
          </div>
          <div className="card-premium divide-y divide-rita-ivory-dark">
            {[
              { time: '10:00 AM', title: 'Pacific Rim — Decision Meeting', tag: 'High Priority', tagColor: 'text-rita-gold-dark bg-rita-gold-pale' },
              { time: '2:00 PM', title: "Rosetta's — Q3 Campaign Review", tag: 'Follow-up', tagColor: 'text-emerald-700 bg-emerald-50' },
              { time: '4:30 PM', title: 'Ember & Oak — Loyalty Pitch', tag: 'Prospect', tagColor: 'text-blue-700 bg-blue-50' },
            ].map((appt) => (
              <div key={appt.time} className="flex items-center gap-3 p-3.5">
                <div className="flex-shrink-0 text-center w-14">
                  <p className="text-rita-black text-xs font-bold">{appt.time.split(' ')[0]}</p>
                  <p className="text-rita-muted text-[10px]">{appt.time.split(' ')[1]}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-rita-black text-xs font-semibold leading-snug">{appt.title}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${appt.tagColor}`}>
                  {appt.tag}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance snapshot */}
        <motion.div variants={item}>
          <button
            onClick={() => navigate('/performance')}
            className="w-full card-forest p-4 flex items-center justify-between btn-press transition-premium"
          >
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">June Performance</p>
              <p className="text-white text-2xl font-bold mt-1">$148,500</p>
              <p className="text-white/50 text-xs mt-0.5">of $175K target · 85%</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-rita-gold">
                <TrendingUp size={14} />
                <span className="text-sm font-bold">+23%</span>
              </div>
              <p className="text-white/40 text-xs mt-1">vs last month</p>
              <p className="text-white/30 text-xs mt-2 flex items-center gap-1 justify-end">
                View Details <ChevronRight size={11} />
              </p>
            </div>
          </button>
        </motion.div>

        {/* Mileage / tasks */}
        <motion.div variants={item}>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Miles Today', value: '0', icon: MapPin },
              { label: 'Tasks Due', value: '3', icon: Calendar },
              { label: 'Win Rate', value: '28%', icon: TrendingUp },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="card-premium p-3 text-center">
                <Icon size={16} className="text-rita-muted mx-auto mb-1" />
                <p className="text-rita-black text-lg font-bold">{value}</p>
                <p className="text-rita-muted text-[9px] font-semibold uppercase tracking-wide mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* After Visit CTA */}
        <motion.div variants={item}>
          <button
            onClick={() => navigate('/after-visit')}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-rita-ivory-mid btn-press transition-premium hover:border-rita-forest/30"
          >
            <div className="w-9 h-9 rounded-xl bg-rita-forest/8 flex items-center justify-center">
              <Clock size={18} className="text-rita-forest" />
            </div>
            <div className="text-left">
              <p className="text-rita-black text-sm font-semibold">Just Left a Restaurant?</p>
              <p className="text-rita-muted text-xs">Log your visit in 10 seconds with AI</p>
            </div>
            <ChevronRight size={16} className="text-rita-muted ml-auto" />
          </button>
        </motion.div>

        <div className="h-4" />
      </motion.div>
    </div>
  )
}
