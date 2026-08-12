import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import {
  restaurants as defaultRestaurants,
  timelineEntries as defaultEntries,
  Restaurant,
  TimelineEntry,
} from '../data/mockData'

interface Store {
  restaurants: Restaurant[]
  timeline: TimelineEntry[]
  addTimelineEntry: (entry: Omit<TimelineEntry, 'id'>) => void
  addRestaurant: (r: Omit<Restaurant, 'id'>) => void
  updateRestaurant: (id: string, patch: Partial<Restaurant>) => void
}

const StoreContext = createContext<Store | null>(null)

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full — silent fail
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() =>
    loadFromStorage('rita_restaurants', defaultRestaurants)
  )
  const [timeline, setTimeline] = useState<TimelineEntry[]>(() =>
    loadFromStorage('rita_timeline', defaultEntries)
  )

  useEffect(() => { saveToStorage('rita_restaurants', restaurants) }, [restaurants])
  useEffect(() => { saveToStorage('rita_timeline', timeline) }, [timeline])

  const addTimelineEntry = useCallback((entry: Omit<TimelineEntry, 'id'>) => {
    const newEntry: TimelineEntry = { ...entry, id: `t_${Date.now()}` }
    setTimeline(prev => [newEntry, ...prev])
  }, [])

  const addRestaurant = useCallback((r: Omit<Restaurant, 'id'>) => {
    const newR: Restaurant = { ...r, id: `r_${Date.now()}` }
    setRestaurants(prev => [...prev, newR])
  }, [])

  const updateRestaurant = useCallback((id: string, patch: Partial<Restaurant>) => {
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r))
  }, [])

  return (
    <StoreContext.Provider value={{ restaurants, timeline, addTimelineEntry, addRestaurant, updateRestaurant }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be inside StoreProvider')
  return ctx
}
