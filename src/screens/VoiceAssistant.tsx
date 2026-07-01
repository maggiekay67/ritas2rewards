import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Mic, MicOff, MapPin, FileText, Calendar, MessageSquare, ChevronRight, Clock } from 'lucide-react'

const commands = [
  { phrase: '"Start my day"', action: 'Opens AI briefing and route' },
  { phrase: '"Next stop"', action: 'Navigates to next route stop' },
  { phrase: '"Record a note"', action: 'Starts voice note recording' },
  { phrase: '"Create follow-up"', action: 'Schedules a follow-up task' },
  { phrase: '"How did it go?"', action: 'Starts after-visit flow' },
  { phrase: '"Send recap"', action: 'Drafts post-visit email' },
  { phrase: '"What\'s nearby?"', action: 'Opens nearby opportunities' },
  { phrase: '"Reschedule stop"', action: 'Rearranges route stop' },
]

const recentNotes = [
  {
    id: 'v1',
    restaurant: "Rosetta's Kitchen",
    duration: '0:42',
    timestamp: 'Today 2:18 PM',
    transcript: "Marco seems ready to expand the contract. Mentioned Culver City location opening in September. Wants to discuss loyalty program for the new spot before launch. Follow up with multi-location pricing.",
    converted: ['CRM Note', 'Follow-up Task', 'Email Draft']
  },
  {
    id: 'v2',
    restaurant: 'Ember & Oak',
    duration: '0:28',
    timestamp: 'Today 12:05 PM',
    transcript: "Devon was warm, asked about the loyalty ROI calculator. He wants to see numbers specific to WeHo. Loves the idea of a VIP tier for their regulars. Good momentum.",
    converted: ['CRM Note', 'Reminder']
  },
]

export default function VoiceAssistant() {
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecorded, setHasRecorded] = useState(false)
  const [activeTab, setActiveTab] = useState<'notes' | 'commands'>('notes')

  const handleMicPress = () => {
    if (isRecording) {
      setIsRecording(false)
      setHasRecorded(true)
    } else {
      setIsRecording(true)
      setHasRecorded(false)
    }
  }

  return (
    <div className="bg-rita-ivory min-h-screen">
      {/* Header */}
      <div className="card-forest rounded-none pt-14 pb-6 px-5" style={{ borderRadius: '0 0 32px 32px' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <ChevronLeft size={18} className="text-white" />
          </button>
          <div>
            <p className="text-white/50 text-xs">Hands-Free</p>
            <h1 className="text-white text-xl font-bold">Voice Assistant</h1>
          </div>
        </div>
      </div>

      {/* Voice interface */}
      <div className="px-4 pt-6">
        <div className="card-premium p-8 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {isRecording ? (
              <motion.div
                key="recording"
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <p className="text-rita-forest text-sm font-semibold mb-4">Listening...</p>

                {/* Waveform */}
                <div className="flex items-center gap-1 h-12 mb-6">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="waveform-bar"
                      style={{
                        height: Math.random() * 30 + 10,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={handleMicPress}
                  className="w-20 h-20 rounded-full flex items-center justify-center relative"
                  style={{ background: 'linear-gradient(135deg, #1B3A2A, #0F2018)', boxShadow: '0 0 0 16px rgba(201,168,76,0.1), 0 8px 32px rgba(27,58,42,0.4)' }}
                >
                  <div className="absolute inset-0 rounded-full border-4 border-rita-gold/30 animate-ping" />
                  <Mic size={28} className="text-white" />
                </button>

                <p className="text-rita-muted text-xs mt-4">Tap to stop</p>
              </motion.div>
            ) : hasRecorded ? (
              <motion.div
                key="processed"
                className="flex flex-col items-center w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
                  <span className="text-2xl">✓</span>
                </div>
                <p className="text-rita-black font-bold text-base mb-1">Note Captured</p>
                <p className="text-rita-muted text-xs mb-4">AI is processing your recording...</p>

                <div className="w-full bg-rita-ivory rounded-2xl p-4 mb-4">
                  <p className="text-rita-black text-sm leading-relaxed italic">
                    "Marco confirmed September opening for Culver City location. Wants multi-location pricing by end of week..."
                  </p>
                </div>

                <div className="flex gap-2 w-full">
                  {['CRM Note', 'Follow-up', 'Email Draft'].map(action => (
                    <div key={action} className="flex-1 bg-rita-forest/8 rounded-xl p-2 text-center">
                      <p className="text-rita-forest text-[10px] font-bold">✓ {action}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setHasRecorded(false); navigate('/after-visit') }}
                  className="mt-4 w-full py-3 rounded-xl bg-rita-forest text-white text-sm font-bold btn-press"
                >
                  Complete After-Visit Flow →
                </button>

                <button onClick={() => setHasRecorded(false)} className="mt-2 text-rita-muted text-xs">
                  Record another
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-rita-muted text-sm mb-6 text-center">
                  Say a command or tap<br />to record a note
                </p>

                <button
                  onClick={handleMicPress}
                  className="w-24 h-24 rounded-full flex items-center justify-center btn-press transition-premium"
                  style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #9A7E35 100%)', boxShadow: '0 8px 32px rgba(201,168,76,0.4)' }}
                >
                  <Mic size={32} className="text-white" />
                </button>

                <p className="text-rita-muted text-xs mt-4">Hold to record a voice note</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 mt-5">
        {['notes', 'commands'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold btn-press transition-premium ${
              activeTab === tab ? 'bg-rita-forest text-white' : 'bg-white text-rita-slate border border-rita-ivory-dark'
            }`}
          >
            {tab === 'notes' ? 'Recent Notes' : 'Commands'}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 space-y-3">
        {activeTab === 'notes' ? (
          recentNotes.map(note => (
            <div key={note.id} className="card-premium p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-rita-black font-semibold text-sm">{note.restaurant}</p>
                <div className="flex items-center gap-2">
                  <span className="text-rita-muted text-xs flex items-center gap-1">
                    <Clock size={10} />
                    {note.duration}
                  </span>
                  <span className="text-rita-muted text-[10px]">{note.timestamp}</span>
                </div>
              </div>
              <p className="text-rita-slate text-xs leading-relaxed mb-3">{note.transcript}</p>
              <div className="flex items-center gap-1 flex-wrap">
                {note.converted.map(item => (
                  <span key={item} className="text-[9px] font-bold bg-rita-forest/8 text-rita-forest px-2 py-0.5 rounded-full">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="card-premium divide-y divide-rita-ivory-dark">
            {commands.map(({ phrase, action }) => (
              <div key={phrase} className="flex items-center gap-3 p-3.5">
                <Mic size={13} className="text-rita-gold flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-rita-black text-sm font-semibold">{phrase}</p>
                  <p className="text-rita-muted text-xs">{action}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Drive mode banner */}
        <div className="card-forest p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <MapPin size={18} className="text-rita-gold" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Drive Mode</p>
            <p className="text-white/50 text-xs">Hands-free while on the road</p>
          </div>
          <ChevronRight size={16} className="text-white/30" />
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
