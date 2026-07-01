import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, TrendingUp, Target, Award, Phone, Mail, Calendar, MapPin, Clock, Brain } from 'lucide-react'
import { performanceData } from '../data/mockData'

function ProgressBar({ value, max, color = 'bg-rita-forest' }: { value: number; max: number; color?: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="h-1.5 rounded-full bg-rita-ivory-dark overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  )
}

export default function Performance() {
  const navigate = useNavigate()
  const { today, month, week, aiScore, routeEfficiency, timeSavedHours } = performanceData

  const monthPct = Math.round((month.revenue / month.target) * 100)

  const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }
  const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

  return (
    <div className="bg-rita-ivory min-h-screen">
      {/* Header */}
      <div className="card-forest rounded-none pt-14 pb-6 px-5" style={{ borderRadius: '0 0 32px 32px' }}>
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <ChevronLeft size={18} className="text-white" />
          </button>
          <div>
            <p className="text-white/50 text-xs">June 2026</p>
            <h1 className="text-white text-xl font-bold">Performance</h1>
          </div>
        </div>

        {/* Revenue gauge */}
        <div className="bg-white/8 rounded-2xl p-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Monthly Revenue</p>
              <p className="text-white text-3xl font-black mt-0.5">${(month.revenue / 1000).toFixed(1)}K</p>
              <p className="text-white/50 text-xs mt-0.5">of ${(month.target / 1000).toFixed(0)}K target</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-rita-gold">
                <TrendingUp size={14} />
                <span className="text-base font-bold">+23%</span>
              </div>
              <p className="text-white/40 text-xs">vs last month</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-white/40 mb-1">
              <span>{monthPct}% to goal</span>
              <span>${((month.target - month.revenue) / 1000).toFixed(1)}K remaining</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #C9A84C, #E8C56E)' }}
                initial={{ width: 0 }}
                animate={{ width: `${monthPct}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      <motion.div className="px-4 pt-5 space-y-4" variants={stagger} initial="hidden" animate="show">

        {/* Today's Activity */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Today's Activity</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Visits', value: today.visits, icon: MapPin, color: 'text-rita-forest', bg: 'bg-rita-forest/8' },
              { label: 'Calls', value: today.calls, icon: Phone, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Emails', value: today.emails, icon: Mail, color: 'text-violet-600', bg: 'bg-violet-50' },
              { label: 'Meetings', value: today.meetings, icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Follow-ups', value: today.followUps, icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'AI Score', value: aiScore, icon: Brain, color: 'text-rita-gold-dark', bg: 'bg-rita-gold-pale' },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="card-premium p-3 text-center">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2 ${bg}`}>
                  <Icon size={15} className={color} />
                </div>
                <p className="text-rita-black text-xl font-black">{value}{label === 'AI Score' ? '' : ''}</p>
                <p className="text-rita-muted text-[9px] font-semibold uppercase tracking-wide mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Activity */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Weekly Revenue</h2>
          <div className="card-premium p-4">
            <div className="flex items-end gap-2 h-24">
              {week.map(({ day, revenue }) => {
                const maxRev = Math.max(...week.map(w => w.revenue))
                const height = (revenue / maxRev) * 100
                const isToday = day === 'Today'
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      className={`w-full rounded-t-lg ${isToday ? '' : 'bg-rita-forest/15'}`}
                      style={{
                        height: `${height}%`,
                        background: isToday ? 'linear-gradient(180deg, #C9A84C, #A8883C)' : undefined,
                        minHeight: 4
                      }}
                      initial={{ scaleY: 0, originY: 1 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    />
                    <p className={`text-[9px] font-semibold ${isToday ? 'text-rita-gold-dark' : 'text-rita-muted'}`}>
                      {day.slice(0, 3)}
                    </p>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-rita-ivory-dark">
              <p className="text-rita-muted text-xs">Week total</p>
              <p className="text-rita-black font-bold text-sm">${(week.reduce((a, w) => a + w.revenue, 0) / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </motion.div>

        {/* KPIs */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Key Metrics</h2>
          <div className="card-premium p-4 space-y-4">
            {[
              { label: 'Conversion Rate', value: `${month.conversionRate}%`, target: '30%', progress: month.conversionRate, max: 30, color: 'bg-rita-forest' },
              { label: 'Visits This Month', value: month.visits.toString(), target: '60', progress: month.visits, max: 60, color: 'bg-blue-400' },
              { label: 'Deals Closed', value: month.deals.toString(), target: '6', progress: month.deals, max: 6, color: 'bg-emerald-400' },
              { label: 'Route Efficiency', value: `${routeEfficiency}%`, target: '95%', progress: routeEfficiency, max: 95, color: 'bg-rita-gold' },
            ].map(({ label, value, target, progress, max, color }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-rita-slate text-xs font-medium">{label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-rita-black text-sm font-bold">{value}</span>
                    <span className="text-rita-muted text-xs">/ {target}</span>
                  </div>
                </div>
                <ProgressBar value={progress} max={max} color={color} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Commission + Time Saved */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-2">
          <div className="card-forest p-4">
            <Award size={18} className="text-rita-gold mb-2" />
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Est. Commission</p>
            <p className="text-white text-2xl font-black mt-1">${(month.commissionEstimate / 1000).toFixed(1)}K</p>
            <p className="text-white/40 text-xs mt-0.5">this month</p>
          </div>
          <div className="card-premium p-4">
            <Clock size={18} className="text-rita-forest mb-2" />
            <p className="text-rita-muted text-[10px] uppercase tracking-widest font-semibold">Time Saved</p>
            <p className="text-rita-black text-2xl font-black mt-1">{timeSavedHours}h</p>
            <p className="text-rita-muted text-xs mt-0.5">via AI routing</p>
          </div>
        </motion.div>

        {/* AI Coaching Score breakdown */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">AI Coaching Score</h2>
          <div className="card-premium p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#EAE4D8" strokeWidth="6" />
                  <motion.circle
                    cx="40" cy="40" r="34" fill="none"
                    stroke="url(#scoreGrad)" strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 34}
                    initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - aiScore / 100) }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E8C56E" />
                      <stop offset="100%" stopColor="#C9A84C" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-rita-black text-xl font-black leading-none">{aiScore}</p>
                  <p className="text-rita-muted text-[9px]">/100</p>
                </div>
              </div>
              <div>
                <p className="text-rita-black font-bold text-base">Excellent</p>
                <p className="text-rita-muted text-xs leading-relaxed mt-0.5">
                  You're in the top 15% of reps this quarter. Focus on conversion rate to hit Elite status.
                </p>
              </div>
            </div>
            <div className="space-y-2 pt-3 border-t border-rita-ivory-dark">
              {[
                { label: 'Pre-Visit Prep', score: 94 },
                { label: 'Follow-up Speed', score: 88 },
                { label: 'Note Quality', score: 82 },
                { label: 'Objection Handling', score: 79 },
              ].map(({ label, score }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-rita-slate text-xs w-32 flex-shrink-0">{label}</span>
                  <div className="flex-1">
                    <ProgressBar value={score} max={100} color={score >= 85 ? 'bg-emerald-400' : score >= 75 ? 'bg-rita-gold' : 'bg-amber-400'} />
                  </div>
                  <span className="text-rita-black text-xs font-bold w-8 text-right">{score}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="h-4" />
      </motion.div>
    </div>
  )
}
