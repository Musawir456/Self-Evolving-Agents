import { useState } from 'react'
import { Play, Loader2, CheckCircle, XCircle, TrendingUp } from 'lucide-react'
import axios from 'axios'
import EvolutionChart from './EvolutionChart'

const API_BASE_URL = 'http://localhost:8000'

export default function TaskExecutor({ apiKey }) {
  const [taskDescription, setTaskDescription] = useState('Create a concise summary of the following text')
  const [inputText, setInputText] = useState('')
  const [maxIterations, setMaxIterations] = useState(3)
  const [targetScore, setTargetScore] = useState(0.80)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const exampleTexts = {
    summary: `Artificial intelligence has made remarkable progress in recent years, particularly in the field of large language models. These models can generate human-like text, answer questions, and perform various language tasks. However, traditional AI agents remain static once deployed - they don't learn from mistakes or adapt without human intervention. Self-evolving agents solve this by implementing feedback loops: execute task, evaluate result, generate improvements, and try again. This enables agents to become more accurate over time without constant human oversight.`,
    email: `I need to decline a job offer from Tech Solutions Inc. for a Senior Developer position. I want to be polite, express gratitude, and keep the door open for future opportunities.`
  }

  const handleExecute = async () => {
    if (!inputText.trim()) {
      setError('Please enter input text')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await axios.post(`${API_BASE_URL}/execute`, {
        api_key: apiKey,
        task_description: taskDescription,
        input_text: inputText,
        max_iterations: maxIterations,
        target_score: targetScore
      })

      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to execute task. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const loadExample = (type) => {
    setInputText(exampleTexts[type])
    if (type === 'summary') {
      setTaskDescription('Create a concise summary of the following text')
    } else {
      setTaskDescription('Write a professional email based on the following requirements')
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Execute Self-Evolving Task</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Description
            </label>
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe what you want the agent to do"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Input Text
              </label>
              <div className="space-x-2">
                <button
                  onClick={() => loadExample('summary')}
                  className="text-xs text-indigo-600 hover:text-indigo-700"
                >
                  Load Summary Example
                </button>
                <button
                  onClick={() => loadExample('email')}
                  className="text-xs text-indigo-600 hover:text-indigo-700"
                >
                  Load Email Example
                </button>
              </div>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter the text for the agent to process"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Iterations: {maxIterations}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={maxIterations}
              onChange={(e) => setMaxIterations(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-1">
              Number of self-improvement cycles allowed
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Score: {targetScore.toFixed(2)} (Higher = Triggers More Evolution)
            </label>
            <input
              type="range"
              min="0.50"
              max="0.99"
              step="0.01"
              value={targetScore}
              onChange={(e) => setTargetScore(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-1">
              Agent evolves only if score is below this threshold
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleExecute}
            disabled={loading}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Execute Task
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Final Output</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                  <span className="text-gray-600">Iterations: {result.iterations}</span>
                </div>
                <div className="flex items-center text-sm">
                  {result.final_score >= 0.8 ? (
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-1 text-yellow-500" />
                  )}
                  <span className="text-gray-600">Score: {result.final_score.toFixed(3)}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-800 whitespace-pre-wrap border border-gray-200">
              {result.output}
            </div>
          </div>

          <EvolutionChart evaluationHistory={result.evaluation_history} />

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolution History</h3>
            <div className="space-y-4">
              {result.evaluation_history.map((iteration, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-700">
                      Iteration {iteration.iteration}
                    </h4>
                    <div className="flex items-center space-x-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        iteration.passed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {iteration.passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
                      </span>
                      <span className="text-sm text-gray-600">
                        Score: {iteration.score.toFixed(3)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {Object.entries(iteration.details).map(([criterion, data]) => (
                      <div key={criterion} className="bg-gray-50 rounded p-2">
                        <div className="text-xs font-medium text-gray-600 capitalize mb-1">
                          {criterion}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">
                            {data.score.toFixed(2)}
                          </span>
                          {data.passed ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <details className="text-xs">
                    <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                      View Output
                    </summary>
                    <div className="mt-2 bg-white rounded p-3 border border-gray-200 text-gray-700">
                      {iteration.output}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prompt Evolution</h3>
            <div className="space-y-3">
              {result.prompt_versions.map((version, idx) => (
                <details key={idx} className="border border-gray-200 rounded-lg p-3">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    Version {version.version} - {version.metadata?.type || 'evolution'}
                  </summary>
                  <div className="mt-3 text-xs text-gray-600 bg-gray-50 rounded p-3">
                    {version.prompt}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
