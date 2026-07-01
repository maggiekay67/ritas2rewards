interface StatCardProps {
  label: string
  value: string
  sub?: string
  icon?: string
  variant?: 'default' | 'forest' | 'gold'
  onClick?: () => void
}

export default function StatCard({ label, value, sub, icon, variant = 'default', onClick }: StatCardProps) {
  const base = 'rounded-2xl p-4 transition-premium btn-press'
  const styles = {
    default: `${base} card-premium`,
    forest: `${base} card-forest text-white`,
    gold: `${base} card-gold`,
  }

  return (
    <div className={styles[variant]} onClick={onClick} role={onClick ? 'button' : undefined}>
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <div className={`text-2xl font-bold tracking-tight ${
        variant === 'forest' ? 'text-white' : variant === 'gold' ? 'text-rita-gold-dark' : 'text-rita-black'
      }`}>
        {value}
      </div>
      <div className={`text-xs font-semibold mt-0.5 tracking-wide uppercase ${
        variant === 'forest' ? 'text-white/60' : 'text-rita-muted'
      }`}>
        {label}
      </div>
      {sub && (
        <div className={`text-xs mt-1 ${
          variant === 'forest' ? 'text-white/50' : 'text-rita-muted'
        }`}>
          {sub}
        </div>
      )}
    </div>
  )
}
