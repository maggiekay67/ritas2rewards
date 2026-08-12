import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'
import Welcome from './screens/Welcome'
import Home from './screens/Home'
import DailyBriefing from './screens/DailyBriefing'
import RoutePlanner from './screens/RoutePlanner'
import RestaurantList from './screens/RestaurantList'
import RestaurantIntelligence from './screens/RestaurantIntelligence'
import RestaurantSnapshot from './screens/RestaurantSnapshot'
import RelationshipTimeline from './screens/RelationshipTimeline'
import SalesCoach from './screens/SalesCoach'
import ObjectionHandling from './screens/ObjectionHandling'
import NearbyOpportunities from './screens/NearbyOpportunities'
import SalesToolkit from './screens/SalesToolkit'
import Performance from './screens/Performance'
import VoiceAssistant from './screens/VoiceAssistant'
import AfterVisit from './screens/AfterVisit'
import AddRestaurant from './screens/AddRestaurant'
import AppShell from './components/layout/AppShell'

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<AppShell><Home /></AppShell>} />
            <Route path="/briefing" element={<AppShell><DailyBriefing /></AppShell>} />
            <Route path="/route" element={<AppShell><RoutePlanner /></AppShell>} />
            <Route path="/accounts" element={<AppShell><RestaurantList /></AppShell>} />
            <Route path="/accounts/add" element={<AppShell><AddRestaurant /></AppShell>} />
            <Route path="/accounts/:id" element={<AppShell><RestaurantIntelligence /></AppShell>} />
            <Route path="/accounts/:id/snapshot" element={<AppShell><RestaurantSnapshot /></AppShell>} />
            <Route path="/accounts/:id/timeline" element={<AppShell><RelationshipTimeline /></AppShell>} />
            <Route path="/accounts/:id/coach" element={<AppShell><SalesCoach /></AppShell>} />
            <Route path="/coach" element={<AppShell><SalesCoach /></AppShell>} />
            <Route path="/objections" element={<AppShell><ObjectionHandling /></AppShell>} />
            <Route path="/nearby" element={<AppShell><NearbyOpportunities /></AppShell>} />
            <Route path="/toolkit" element={<AppShell><SalesToolkit /></AppShell>} />
            <Route path="/performance" element={<AppShell><Performance /></AppShell>} />
            <Route path="/voice" element={<AppShell><VoiceAssistant /></AppShell>} />
            <Route path="/after-visit" element={<AppShell><AfterVisit /></AppShell>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StoreProvider>
  )
}
