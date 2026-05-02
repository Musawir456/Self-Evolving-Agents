import { useState } from 'react'
import { Key, Sparkles } from 'lucide-react'
import axios from 'axios'
import Footer from './Footer'

const API_BASE_URL = 'http://localhost:8000'

export default function ApiKeySetup({ onApiKeySubmit }) {
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(`${API_BASE_URL}/initialize`, {
        api_key: apiKey,
        model: 'gpt-4o-mini',
        initial_prompt: 'You are a helpful assistant that generates concise and accurate responses.'
      })

      if (response.data.success) {
        onApiKeySubmit(apiKey)
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to initialize agent. Please check your API key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Sparkles className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Self-Evolving Agents
          </h1>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Experience AI agents that improve through feedback loops
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                OpenAI API Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="sk-..."
                  required
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Your API key is used only for this session and never stored
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Initializing...' : 'Initialize Agent'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-700 mb-2">What are Self-Evolving Agents?</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Continuously improve through feedback loops</li>
              <li>• Self-evaluate and auto-optimize prompts</li>
              <li>• Adapt without human intervention</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
