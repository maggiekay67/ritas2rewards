interface BadgeProps {
  label: string
  variant?: 'green' | 'gold' | 'red' | 'blue' | 'gray' | 'ivory'
  size?: 'sm' | 'md'
}

const variants = {
  green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  gold: 'bg-rita-gold-pale text-rita-gold-dark border-rita-gold/20',
  red: 'bg-red-50 text-red-700 border-red-100',
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  gray: 'bg-gray-100 text-gray-600 border-gray-200',
  ivory: 'bg-rita-ivory-dark text-rita-slate border-rita-ivory-mid',
}

export default function Badge({ label, variant = 'gray', size = 'sm' }: BadgeProps) {
  return (
    <span className={`
      inline-flex items-center border font-semibold tracking-wide rounded-full
      ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'}
      ${variants[variant]}
    `}>
      {label}
    </span>
  )
}
