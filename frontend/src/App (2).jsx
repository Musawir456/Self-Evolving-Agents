import { useState } from 'react'
import ApiKeySetup from './components/ApiKeySetup'
import Dashboard from './components/Dashboard'

function App() {
  const [apiKey, setApiKey] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {!isInitialized ? (
        <ApiKeySetup 
          onApiKeySubmit={(key) => {
            setApiKey(key)
            setIsInitialized(true)
          }} 
        />
      ) : (
        <Dashboard apiKey={apiKey} onLogout={() => {
          setApiKey(null)
          setIsInitialized(false)
        }} />
      )}
    </div>
  )
}

export default App
