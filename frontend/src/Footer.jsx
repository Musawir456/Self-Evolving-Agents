import { Github, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Built by</span>
          <a 
            href="https://aianytime.net" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            AI Anytime
          </a>
          <span>with</span>
          <span className="text-red-500">❤️</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href="https://aianytime.net"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>aianytime.net</span>
          </a>
          <a
            href="https://github.com/AIAnytime"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>@AIAnytime</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
