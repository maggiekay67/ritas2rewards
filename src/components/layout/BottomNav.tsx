import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Map, Navigation, Building2, TrendingUp } from 'lucide-react'

const tabs = [
  { label: 'Home', icon: Home, path: '/home' },
  { label: 'Route', icon: Map, path: '/route' },
  { label: 'Nearby', icon: Navigation, path: '/nearby' },
  { label: 'Accounts', icon: Building2, path: '/accounts' },
  { label: 'Results', icon: TrendingUp, path: '/performance' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="bottom-nav pb-safe">
      <div className="flex items-center justify-around px-2 h-16">
        {tabs.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path || location.pathname.startsWith(path + '/')
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 py-2 px-3 rounded-2xl transition-premium btn-press flex-1"
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? 'text-rita-forest' : 'text-rita-muted'}
              />
              <span className={`text-[10px] font-semibold tracking-wide ${active ? 'text-rita-forest' : 'text-rita-muted'}`}>
                {label}
              </span>
              {active && (
                <span className="absolute bottom-0 w-1 h-1 rounded-full bg-rita-gold" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
