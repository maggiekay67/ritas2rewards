import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="screen-dark min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #080C0A 0%, #0F2018 40%, #1B3A2A 100%)' }}>

      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)', top: '-60px' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #3D7A58 0%, transparent 70%)', bottom: '-80px', right: '-40px' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

      {/* Status bar spacer */}
      <div className="h-14" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-[calc(100vh-56px)] px-6 pb-12">

        {/* Top Section */}
        <motion.div
          className="flex flex-col items-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Logo mark */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4 mx-auto"
              style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #9A7E35 100%)', boxShadow: '0 8px 40px rgba(201,168,76,0.4)' }}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                {/* Stylized R lettermark */}
                <path d="M10 8H22C27.5 8 32 12.5 32 18C32 22.5 29 26.2 24.8 27.5L33 36H26L18.5 27.5H16V36H10V8Z" fill="white" opacity="0.95" />
                <path d="M16 14V22H21C23.8 22 26 19.8 26 17C26 14.2 23.8 12 21 12H16" fill="#C9A84C" />
                {/* Small restaurant fork icon */}
                <circle cx="34" cy="10" r="6" fill="rgba(255,255,255,0.15)" />
                <path d="M32 8v5M34 8v5M36 8v5M33 10h4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </motion.div>

          {/* RITA wordmark */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <h1 className="text-[72px] font-black tracking-[-4px] leading-none mb-1"
              style={{
                background: 'linear-gradient(135deg, #F5E8C0 0%, #E8C56E 40%, #C9A84C 70%, #A8883C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              RITA
            </h1>
            <p className="text-rita-ivory/50 text-xs tracking-[0.35em] uppercase font-medium mt-2">
              Field Sales AI
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p className="text-rita-ivory/80 text-xl font-light leading-relaxed tracking-[-0.3px] max-w-[280px]">
              Your AI Field Sales<br />Assistant
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="w-8 h-px bg-rita-gold/40" />
              <p className="text-rita-gold/70 text-sm italic font-light">
                "Know every restaurant before you walk in."
              </p>
              <div className="w-8 h-px bg-rita-gold/40" />
            </div>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {['AI Route Planning', 'Restaurant Intelligence', 'Sales Coaching', 'Voice Assistant'].map((feat) => (
              <span key={feat} className="text-[11px] text-rita-ivory/50 border border-rita-ivory/10 rounded-full px-3 py-1 font-medium tracking-wide">
                {feat}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Illustration area - stylized city silhouette */}
        <motion.div
          className="w-full max-w-sm my-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.0 }}
        >
          <svg viewBox="0 0 380 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full opacity-25">
            {/* City skyline silhouette */}
            <rect x="10" y="80" width="30" height="60" rx="2" fill="#3D7A58" />
            <rect x="15" y="60" width="20" height="80" rx="2" fill="#2D5A40" />
            <rect x="50" y="50" width="25" height="90" rx="2" fill="#3D7A58" />
            <rect x="55" y="35" width="15" height="105" rx="2" fill="#2D5A40" />
            <rect x="60" y="20" width="5" height="120" rx="1" fill="#1B3A2A" />
            <rect x="85" y="65" width="35" height="75" rx="2" fill="#3D7A58" />
            <rect x="130" y="45" width="28" height="95" rx="2" fill="#2D5A40" />
            <rect x="135" y="30" width="18" height="110" rx="2" fill="#1B3A2A" />
            <rect x="168" y="70" width="40" height="70" rx="2" fill="#3D7A58" />
            <rect x="218" y="55" width="32" height="85" rx="2" fill="#2D5A40" />
            <rect x="223" y="38" width="22" height="102" rx="2" fill="#3D7A58" />
            <rect x="260" y="75" width="28" height="65" rx="2" fill="#2D5A40" />
            <rect x="298" y="48" width="35" height="92" rx="2" fill="#3D7A58" />
            <rect x="303" y="32" width="25" height="108" rx="2" fill="#2D5A40" />
            <rect x="342" y="68" width="30" height="72" rx="2" fill="#3D7A58" />
            {/* Street line */}
            <line x1="0" y1="140" x2="380" y2="140" stroke="#C9A84C" strokeWidth="1" opacity="0.3" />
            {/* Road dashes */}
            <line x1="80" y1="140" x2="100" y2="140" stroke="#C9A84C" strokeWidth="1.5" opacity="0.2" />
            <line x1="180" y1="140" x2="200" y2="140" stroke="#C9A84C" strokeWidth="1.5" opacity="0.2" />
            <line x1="280" y1="140" x2="300" y2="140" stroke="#C9A84C" strokeWidth="1.5" opacity="0.2" />
            {/* Gold dots (restaurants) */}
            <circle cx="70" cy="105" r="4" fill="#C9A84C" opacity="0.8" />
            <circle cx="160" cy="98" r="4" fill="#C9A84C" opacity="0.8" />
            <circle cx="250" cy="110" r="4" fill="#C9A84C" opacity="0.8" />
            <circle cx="320" cy="95" r="4" fill="#C9A84C" opacity="0.8" />
            {/* Connection lines between restaurants */}
            <line x1="70" y1="105" x2="160" y2="98" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
            <line x1="160" y1="98" x2="250" y2="110" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
            <line x1="250" y1="110" x2="320" y2="95" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
          </svg>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="w-full space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <button
            onClick={() => navigate('/home')}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base tracking-wide btn-press transition-premium"
            style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #A8883C 100%)', boxShadow: '0 4px 24px rgba(201,168,76,0.4)', color: '#080C0A' }}
          >
            <Sparkles size={18} />
            Start My Day
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate('/home')}
            className="w-full py-4 rounded-2xl font-semibold text-sm tracking-wide btn-press transition-premium text-rita-ivory/70 border border-rita-ivory/15 hover:border-rita-ivory/30"
          >
            Log In
          </button>

          <p className="text-center text-rita-ivory/25 text-xs pt-2">
            Restaurant Intelligence · Route Optimization · AI Coaching
          </p>
        </motion.div>
      </div>
    </div>
  )
}
