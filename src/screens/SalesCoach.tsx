import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft, Brain, Clock, MessageSquare, AlertCircle,
  Lightbulb, HelpCircle, Target, ChevronRight, Zap
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

function ConfidenceRing({ value }: { value: number }) {
  const size = 96
  const r = 38
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EAE4D8" strokeWidth="7" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="url(#goldGrad)" strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C56E" />
            <stop offset="100%" stopColor="#C9A84C" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-rita-black text-2xl font-black leading-none">{value}%</p>
        <p className="text-rita-muted text-[9px] font-semibold uppercase tracking-wider mt-0.5">Close</p>
      </div>
    </div>
  )
}

export default function SalesCoach() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { restaurants } = useStore()

  const restaurant = id ? restaurants.find(r => r.id === id) : restaurants[0]
  const r = restaurant || restaurants[0]

  const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }
  const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

  const coachData = {
    bestTime: 'Tue & Thu, 10:00–11:30 AM',
    commStyle: 'Data-driven → relationship close',
    topObjections: ['Budget / timing', 'Already have a system', 'Not a priority now'],
    opening: `Hey ${r.ownerName.split(' ')[0]} — quick one before the lunch rush. I was looking at restaurants that match our best-performing accounts and you guys checked every box. I have one specific idea. Two minutes?`,
    questions: [
      `What's the biggest thing keeping you from growing repeat business right now?`,
      `How are you currently staying in touch with your best customers?`,
      `If you could know which customers are about to go cold — what would you do with that?`,
      `What does success look like for you in the next 6 months?`,
    ],
    closingTech: 'Summary close: recap their goals → map to your solution → ask for 30-day trial vs. full commitment',
    aiScore: 87,
    personalityType: r.closeProbability > 70 ? 'Data-Driven Achiever' : 'Relationship Builder',
    visitPreference: r.closeProbability > 70 ? 'Morning, pre-lunch' : 'Flexible, likes long conversations',
  }

  return (
    <div className="bg-rita-ivory min-h-screen">
      {/* Header */}
      <div className="card-forest rounded-none pt-14 pb-6 px-5" style={{ borderRadius: '0 0 32px 32px' }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <ChevronLeft size={18} className="text-white" />
          </button>
          <div>
            <p className="text-white/50 text-xs">AI-Powered</p>
            <h1 className="text-white text-xl font-bold">Sales Coach</h1>
          </div>
        </div>

        {/* Account selector */}
        <button
          onClick={() => navigate('/accounts')}
          className="w-full bg-white/10 rounded-2xl p-3.5 flex items-center gap-3 text-left"
        >
          <Brain size={18} className="text-rita-gold" />
          <div className="flex-1 min-w-0">
            <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">Coaching for</p>
            <p className="text-white font-semibold text-sm truncate">{r.name}</p>
          </div>
          <ChevronRight size={14} className="text-white/30" />
        </button>
      </div>

      <motion.div className="px-4 pt-5 space-y-4" variants={stagger} initial="hidden" animate="show">

        {/* Close Probability + AI Score */}
        <motion.div variants={fadeUp} className="card-premium p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-rita-muted text-[10px] uppercase tracking-widest font-semibold mb-1">Predicted Outcomes</p>
              <ConfidenceRing value={r.closeProbability} />
              <p className="text-rita-muted text-xs mt-2">Likelihood to close</p>
            </div>
            <div className="space-y-3">
              <div className="text-right">
                <p className="text-rita-muted text-[10px] uppercase tracking-widest font-semibold">AI Coach Score</p>
                <p className="text-2xl font-black text-rita-black mt-0.5">{coachData.aiScore}<span className="text-sm text-rita-muted font-normal">/100</span></p>
                <div className="h-1.5 w-24 rounded-full bg-rita-ivory-dark mt-1 ml-auto">
                  <div className="h-full rounded-full bg-rita-gold" style={{ width: `${coachData.aiScore}%` }} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-rita-muted text-[10px] uppercase tracking-widest font-semibold">Personality</p>
                <p className="text-rita-black text-xs font-bold mt-0.5">{coachData.personalityType}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timing + Communication */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-2">
          <div className="card-premium p-4">
            <Clock size={14} className="text-rita-forest mb-2" />
            <p className="text-rita-muted text-[10px] uppercase tracking-widest font-semibold">Best Time to Visit</p>
            <p className="text-rita-black text-sm font-bold mt-1 leading-snug">{coachData.bestTime}</p>
          </div>
          <div className="card-premium p-4">
            <MessageSquare size={14} className="text-rita-forest mb-2" />
            <p className="text-rita-muted text-[10px] uppercase tracking-widest font-semibold">Comm Style</p>
            <p className="text-rita-black text-sm font-bold mt-1 leading-snug">{coachData.commStyle}</p>
          </div>
        </motion.div>

        {/* Suggested Opening */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Suggested Opening Line</h2>
          <div className="card-gold p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={13} className="text-rita-gold-dark" />
              <p className="text-rita-gold-dark text-[10px] font-black uppercase tracking-widest">Rita Suggests</p>
            </div>
            <p className="text-rita-black text-sm leading-relaxed italic">"{coachData.opening}"</p>
          </div>
        </motion.div>

        {/* Likely Objections */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider">Likely Objections</h2>
            <button onClick={() => navigate('/objections')} className="text-rita-forest text-xs font-semibold flex items-center gap-1">
              Prep <ChevronRight size={12} />
            </button>
          </div>
          <div className="card-premium p-4 space-y-2">
            {coachData.topObjections.map((obj, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <AlertCircle size={13} className="text-amber-500 flex-shrink-0" />
                <p className="text-rita-black text-sm">{obj}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Questions to Ask */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Questions to Ask</h2>
          <div className="card-premium divide-y divide-rita-ivory-dark">
            {coachData.questions.map((q, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <HelpCircle size={13} className="text-rita-forest mt-0.5 flex-shrink-0" />
                <p className="text-rita-black text-sm leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Closing Technique */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Recommended Close</h2>
          <div className="card-premium p-4 bg-rita-forest/4 border border-rita-forest/10">
            <div className="flex items-center gap-2 mb-2">
              <Target size={14} className="text-rita-forest" />
              <p className="text-rita-forest text-[10px] font-black uppercase tracking-widest">Strategy</p>
            </div>
            <p className="text-rita-black text-sm leading-relaxed">{coachData.closingTech}</p>
          </div>
        </motion.div>

        {/* Personality insight */}
        <motion.div variants={fadeUp}>
          <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Personality Engine</h2>
          <div className="card-premium p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-rita-gold/15 flex items-center justify-center">
                <Lightbulb size={16} className="text-rita-gold-dark" />
              </div>
              <div>
                <p className="text-rita-black text-sm font-bold">{coachData.personalityType}</p>
                <p className="text-rita-muted text-xs">AI-detected communication profile</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { trait: 'Prefers Numbers', value: r.closeProbability > 60 ? 85 : 40, color: 'bg-rita-forest' },
                { trait: 'Relationship-Focused', value: r.closeProbability > 60 ? 60 : 90, color: 'bg-rita-gold' },
                { trait: 'Quick Conversations', value: r.closeProbability > 70 ? 75 : 35, color: 'bg-blue-400' },
                { trait: 'Morning Visits', value: r.closeProbability > 60 ? 80 : 50, color: 'bg-violet-400' },
              ].map(({ trait, value, color }) => (
                <div key={trait}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-rita-slate text-xs">{trait}</span>
                    <span className="text-rita-muted text-xs">{value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-rita-ivory-dark">
                    <motion.div
                      className={`h-full rounded-full ${color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
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
