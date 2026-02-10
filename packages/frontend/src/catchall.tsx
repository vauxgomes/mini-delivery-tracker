import App from './App'
import { ThemeProvider } from './components/theme/theme-provider'

export default function Component() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  )
}
