import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, Search, FileText, DollarSign, Video, Mail, MessageSquare,
  BookOpen, Shield, BarChart2, Calculator, ChevronRight, Download, Eye
} from 'lucide-react'

interface ToolkitItem {
  label: string
  desc: string
  type: 'PDF' | 'Video' | 'Template' | 'Calculator' | 'Link'
  tag?: string
}

interface ToolkitCategory {
  id: string
  label: string
  icon: React.ElementType
  color: string
  bg: string
  count: number
  items: ToolkitItem[]
}

const toolkit: ToolkitCategory[] = [
  {
    id: 'contracts',
    label: 'Contracts & Agreements',
    icon: FileText,
    color: 'text-rita-forest',
    bg: 'bg-rita-forest/8',
    count: 4,
    items: [
      { label: 'Standard Agreement', desc: '12-month loyalty partnership', type: 'PDF' },
      { label: 'Month-to-Month', desc: 'Flexible starter agreement', type: 'PDF' },
      { label: 'Multi-Location Addendum', desc: 'For restaurant groups', type: 'PDF', tag: 'NEW' },
      { label: 'Trial Agreement', desc: '30-day pilot terms', type: 'PDF' },
    ]
  },
  {
    id: 'pricing',
    label: 'Pricing & Packages',
    icon: DollarSign,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    count: 3,
    items: [
      { label: 'Current Rate Card', desc: 'All tiers and pricing', type: 'PDF' },
      { label: 'ROI Calculator', desc: 'Live revenue projections', type: 'Calculator' },
      { label: 'Funding Options', desc: 'Financing & payment plans', type: 'PDF' },
    ]
  },
  {
    id: 'presentations',
    label: 'Presentations',
    icon: BarChart2,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    count: 5,
    items: [
      { label: 'Main Pitch Deck', desc: 'Full product overview', type: 'Link' },
      { label: 'Quick Leave-Behind', desc: '1-page summary', type: 'PDF' },
      { label: 'ROI Case Study Deck', desc: '5 restaurant success stories', type: 'Link' },
      { label: 'Competitor Comparison', desc: 'Side-by-side feature matrix', type: 'PDF' },
      { label: 'Multi-Location Overview', desc: 'Enterprise pitch', type: 'Link', tag: 'HOT' },
    ]
  },
  {
    id: 'case-studies',
    label: 'Case Studies',
    icon: BookOpen,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    count: 12,
    items: [
      { label: "Rosetta's Kitchen — 23% Revenue Lift", desc: 'Italian, Beverly Hills', type: 'PDF' },
      { label: 'Nomad Kitchen — Win-Back Campaign', desc: 'Contemporary, Arts District', type: 'PDF' },
      { label: 'Pacific Rim — Multi-Location', desc: 'Pan-Asian, 3 locations', type: 'PDF' },
      { label: 'View All 12 Studies', desc: 'Full case study library', type: 'Link' },
    ]
  },
  {
    id: 'videos',
    label: 'Videos',
    icon: Video,
    color: 'text-red-500',
    bg: 'bg-red-50',
    count: 8,
    items: [
      { label: 'Product Demo (2 min)', desc: 'Quick overview for prospects', type: 'Video' },
      { label: 'Customer Testimonials', desc: 'Real owners in their restaurants', type: 'Video' },
      { label: 'Platform Walkthrough', desc: 'Full feature tour', type: 'Video' },
      { label: 'Getting Started Guide', desc: 'Onboarding in 3 steps', type: 'Video' },
    ]
  },
  {
    id: 'email',
    label: 'Email Templates',
    icon: Mail,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    count: 10,
    items: [
      { label: 'Cold Outreach #1', desc: 'First-time contact', type: 'Template' },
      { label: 'Post-Visit Follow-up', desc: 'After meeting recap', type: 'Template' },
      { label: 'Proposal Send', desc: 'Attaching the proposal', type: 'Template' },
      { label: 'Win-Back', desc: 'Re-engaging dormant prospects', type: 'Template' },
      { label: 'Check-In', desc: 'Monthly customer touchpoint', type: 'Template' },
    ]
  },
  {
    id: 'text',
    label: 'Text Templates',
    icon: MessageSquare,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    count: 6,
    items: [
      { label: 'Intro Text', desc: 'Cold SMS outreach', type: 'Template' },
      { label: 'Meeting Reminder', desc: '2hr before appointment', type: 'Template' },
      { label: 'Post-Visit Thanks', desc: 'Same-day appreciation', type: 'Template' },
    ]
  },
  {
    id: 'objections',
    label: 'Objection Library',
    icon: Shield,
    color: 'text-rita-gold-dark',
    bg: 'bg-rita-gold-pale',
    count: 6,
    items: [
      { label: 'View Objection Handler', desc: 'Full response library', type: 'Link' },
    ]
  },
]

const typeIcons: Record<string, React.ElementType> = {
  PDF: FileText,
  Video: Video,
  Template: Mail,
  Calculator: Calculator,
  Link: Eye,
}

export default function SalesToolkit() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = toolkit.filter(cat =>
    cat.label.toLowerCase().includes(search.toLowerCase()) ||
    cat.items.some(item => item.label.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="bg-rita-ivory min-h-screen">
      {/* Header */}
      <div className="card-forest rounded-none pt-14 pb-5 px-5" style={{ borderRadius: '0 0 28px 28px' }}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <ChevronLeft size={18} className="text-white" />
          </button>
          <div>
            <p className="text-white/50 text-xs">Always Prepared</p>
            <h1 className="text-white text-xl font-bold">Sales Toolkit</h1>
          </div>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-white/30 rounded-2xl py-3 pl-9 pr-4 text-sm border border-white/10 outline-none"
          />
        </div>
      </div>

      <div className="px-4 pt-4 space-y-2">
        <p className="text-rita-muted text-xs font-semibold mb-3">
          {toolkit.reduce((a, c) => a + c.count, 0)} resources · All offline capable
        </p>

        {filtered.map(cat => {
          const Icon = cat.icon
          const isExpanded = expandedId === cat.id
          return (
            <motion.div key={cat.id} layout className="card-premium overflow-hidden">
              <button
                className="w-full p-4 text-left"
                onClick={() => setExpandedId(isExpanded ? null : cat.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.bg}`}>
                    <Icon size={18} className={cat.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-rita-black font-semibold text-sm">{cat.label}</p>
                    <p className="text-rita-muted text-xs">{cat.count} resources</p>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`text-rita-muted transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-rita-ivory-dark divide-y divide-rita-ivory-dark">
                      {cat.items.map((item) => {
                        const TypeIcon = typeIcons[item.type] || FileText
                        return (
                          <div key={item.label} className="flex items-center gap-3 px-4 py-3">
                            <TypeIcon size={14} className="text-rita-muted flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-rita-black text-sm font-medium truncate">{item.label}</p>
                                {item.tag && (
                                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-rita-gold text-white flex-shrink-0">
                                    {item.tag}
                                  </span>
                                )}
                              </div>
                              <p className="text-rita-muted text-xs">{item.desc}</p>
                            </div>
                            <div className="flex gap-1.5">
                              {(item.type === 'PDF' || item.type === 'Template') && (
                                <button className="w-8 h-8 rounded-xl bg-rita-ivory-dark flex items-center justify-center">
                                  <Download size={13} className="text-rita-slate" />
                                </button>
                              )}
                              <button
                                onClick={() => item.label.includes('Objection') && navigate('/objections')}
                                className="w-8 h-8 rounded-xl bg-rita-forest/8 flex items-center justify-center"
                              >
                                <Eye size={13} className="text-rita-forest" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        <div className="h-4" />
      </div>
    </div>
  )
}
