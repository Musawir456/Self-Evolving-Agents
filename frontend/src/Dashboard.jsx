import { useState } from 'react'
import { LogOut, Sparkles } from 'lucide-react'
import TaskExecutor from './TaskExecutor'
import ArchitectureDiagram from './ArchitectureDiagram'
import Footer from './Footer'

export default function Dashboard({ apiKey, onLogout }) {
  const [activeTab, setActiveTab] = useState('executor')

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Self-Evolving Agents</h1>
                <p className="text-xs text-gray-500">AI that improves itself</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={onLogout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('executor')}
                className={`${
                  activeTab === 'executor'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Task Executor
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`${
                  activeTab === 'architecture'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Architecture
              </button>
            </nav>
          </div>
        </div>

        <div>
          {activeTab === 'executor' && <TaskExecutor apiKey={apiKey} />}
          {activeTab === 'architecture' && <ArchitectureDiagram />}
        </div>
      </div>
      <Footer />
    </div>
  )
}
