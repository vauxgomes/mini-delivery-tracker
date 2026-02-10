import { Route, Routes } from 'react-router'
import { ModeSelection } from './components/navigation/mode-selection'
import DriverPage from './pages/driver-page'
import ObserverPage from './pages/observer-page'

export default function App() {
  return (
    <Routes>
      <Route path="/driver" element={<DriverPage />} />
      <Route path="/observer" element={<ObserverPage />} />

      {/* Selection */}
      <Route path="*" element={<ModeSelection />} />
    </Routes>
  )
}
