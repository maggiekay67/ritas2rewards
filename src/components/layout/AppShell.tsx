import { ReactNode } from 'react'
import BottomNav from './BottomNav'

interface AppShellProps {
  children: ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen bg-rita-ivory">
      <main className="screen">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
