import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Check, Mic, MicOff, Star, Mail, Calendar, FileText,
  MessageSquare, TrendingUp, Clock, Sparkles
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

const outcomes = [
  { id: 'signed', label: 'Signed! 🎉', color: 'bg-emerald-500 text-white', selected: false },
  { id: 'interested', label: 'Very Interested', color: 'bg-rita-forest text-white', selected: false },
  { id: 'proposal', label: 'Needs Proposal', color: 'bg-blue-500 text-white', selected: false },
  { id: 'followup', label: 'Follow Up Needed', color: 'bg-amber-500 text-white', selected: false },
  { id: 'notready', label: 'Not Ready Yet', color: 'bg-gray-400 text-white', selected: false },
  { id: 'nogo', label: 'Not a Fit', color: 'bg-red-400 text-white', selected: false },
]

const aiOutputs = [
  { icon: FileText, label: 'CRM Note', desc: 'Auto-written from your voice note', ready: true },
  { icon: Mail, label: 'Follow-up Email', desc: 'Draft ready for your review', ready: true },
  { icon: Calendar, label: 'Calendar Event', desc: 'Next meeting scheduled', ready: true },
  { icon: MessageSquare, label: 'Text Message', desc: 'Thank-you text ready to send', ready: true },
  { icon: TrendingUp, label: 'Pipeline Update', desc: 'CRM stage moved to Proposal', ready: true },
  { icon: Clock, label: 'Follow-up Task', desc: 'Reminder set for Thu 10 AM', ready: true },
]

export default function AfterVisit() {
  const navigate = useNavigate()
  const { addTimelineEntry } = useStore()
  const [step, setStep] = useState(1)
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null)
  const [rating, setRating] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [noteRecorded, setNoteRecorded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false)
      setNoteRecorded(true)
    } else {
      setIsRecording(true)
    }
  }

  const handleProcess = () => {
    setProcessing(true)
    setTimeout(() => {
      const now = new Date()
      addTimelineEntry({
        restaurantId: 'r1',
        type: 'visit',
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        summary: `Visit logged — ${outcomes.find(o => o.id === selectedOutcome)?.label ?? 'Completed'}`,
        outcome: 'Logged via Rita after-visit flow',
        nextStep: 'Follow up as planned',
      })
      setProcessing(false)
      setDone(true)
    }, 2000)
  }

  const canContinue = step === 1 ? selectedOutcome !== null && rating > 0 : noteRecorded

  return (
    <div className="bg-rita-ivory min-h-screen">
      {/* Header */}
      <div className="card-forest rounded-none pt-14 pb-6 px-5" style={{ borderRadius: '0 0 32px 32px' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <ChevronLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <p className="text-white/50 text-xs">Post-Visit</p>
            <h1 className="text-white text-xl font-bold">How Did It Go?</h1>
          </div>
          {/* Step indicator */}
          <div className="flex gap-1.5">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 rounded-full transition-all ${s <= step || done ? 'bg-rita-gold w-6' : 'bg-white/20 w-1.5'}`} />
            ))}
          </div>
        </div>

        {!done && (
          <div className="mt-4 bg-white/8 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rita-gold/20 flex items-center justify-center">
              <span className="text-lg">🏢</span>
            </div>
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">Visit Logged</p>
              <p className="text-white font-semibold text-sm">Rosetta's Kitchen & Bar</p>
              <p className="text-white/40 text-xs mt-0.5">Beverly Hills · Today 2:00 PM</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 pt-5">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {step === 1 && (
                <>
                  <div>
                    <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">How Did It Go?</h2>
                    <div className="grid grid-cols-2 gap-2">
                      {outcomes.map(o => (
                        <button
                          key={o.id}
                          onClick={() => setSelectedOutcome(o.id)}
                          className={`py-3 px-4 rounded-xl text-sm font-bold btn-press transition-premium border-2 ${
                            selectedOutcome === o.id
                              ? `${o.color} border-transparent shadow-lg scale-[1.02]`
                              : 'bg-white text-rita-slate border-rita-ivory-dark'
                          }`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-3">Energy in the Room</h2>
                    <div className="card-premium p-4 flex items-center justify-center gap-3">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="transition-premium btn-press"
                        >
                          <Star
                            size={32}
                            className={star <= rating ? 'fill-rita-gold text-rita-gold' : 'text-rita-ivory-mid'}
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <p className="text-center text-rita-muted text-xs mt-2">
                        {['', 'Cold — tough read', 'Lukewarm', 'Warm and engaged', 'Excited, asked questions', 'On fire — ready to close'][rating]}
                      </p>
                    )}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <h2 className="text-rita-black text-sm font-bold uppercase tracking-wider mb-1">Record Your Note</h2>
                    <p className="text-rita-muted text-xs mb-4">Speak naturally — Rita will convert this to a CRM note, email draft, and tasks automatically.</p>

                    <div className="card-premium p-8 flex flex-col items-center">
                      <button
                        onClick={handleRecord}
                        className="relative w-24 h-24 rounded-full flex items-center justify-center btn-press"
                        style={{
                          background: isRecording
                            ? 'linear-gradient(135deg, #1B3A2A, #0F2018)'
                            : 'linear-gradient(135deg, #C9A84C, #9A7E35)',
                          boxShadow: isRecording
                            ? '0 0 0 16px rgba(27,58,42,0.15), 0 8px 32px rgba(27,58,42,0.4)'
                            : '0 8px 32px rgba(201,168,76,0.4)'
                        }}
                      >
                        {isRecording && <div className="absolute inset-0 rounded-full border-4 border-rita-gold/30 animate-ping" />}
                        {noteRecorded
                          ? <Check size={32} className="text-white" />
                          : isRecording
                          ? <MicOff size={32} className="text-white" />
                          : <Mic size={32} className="text-white" />
                        }
                      </button>

                      <p className="mt-4 text-sm font-semibold text-rita-black">
                        {noteRecorded ? 'Note recorded!' : isRecording ? 'Listening...' : 'Tap to record'}
                      </p>

                      {isRecording && (
                        <div className="flex items-center gap-1 mt-4 h-8">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className="waveform-bar" style={{ height: Math.random() * 24 + 4 }} />
                          ))}
                        </div>
                      )}

                      {noteRecorded && (
                        <motion.div
                          className="mt-4 bg-rita-ivory rounded-xl p-4 w-full text-left"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <p className="text-rita-slate text-xs leading-relaxed italic">
                            "Marco is ready to move forward on the contract. He mentioned the Culver City opening in September and wants multi-location pricing. Follow up with proposal by Thursday. Great energy today — Lakers chat landed well."
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <button
                disabled={!canContinue}
                onClick={() => {
                  if (step < 2) setStep(s => s + 1)
                  else handleProcess()
                }}
                className="w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 btn-press transition-premium disabled:opacity-40"
                style={{
                  background: canContinue
                    ? 'linear-gradient(135deg, #1B3A2A, #0F2018)'
                    : undefined,
                  backgroundColor: !canContinue ? '#EAE4D8' : undefined,
                  color: canContinue ? 'white' : '#8B8B8B'
                }}
              >
                {processing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Rita is processing...
                  </>
                ) : step < 2 ? (
                  <>Continue <ChevronRight size={16} /></>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Everything with AI
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="card-premium p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                  <Sparkles size={28} className="text-emerald-500" />
                </div>
                <h2 className="text-rita-black text-xl font-bold">Rita's Got It</h2>
                <p className="text-rita-muted text-sm mt-1">Everything has been created and synced automatically.</p>
              </div>

              <h3 className="text-rita-black text-sm font-bold uppercase tracking-wider">AI Created For You</h3>

              <div className="card-premium divide-y divide-rita-ivory-dark">
                {aiOutputs.map(({ icon: Icon, label, desc, ready }) => (
                  <div key={label} className="flex items-center gap-3 p-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-rita-black text-sm font-semibold">{label}</p>
                      <p className="text-rita-muted text-xs">{desc}</p>
                    </div>
                    {ready && <Check size={16} className="text-emerald-500 flex-shrink-0" />}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigate('/home')}
                  className="py-4 rounded-2xl bg-rita-forest text-white font-bold text-sm btn-press"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => navigate('/route')}
                  className="py-4 rounded-2xl bg-white border border-rita-ivory-dark text-rita-forest font-bold text-sm btn-press"
                >
                  Next Stop →
                </button>
              </div>

              <div className="h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
