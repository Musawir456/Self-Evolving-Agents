import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#EEF2FF',
    primaryTextColor: '#1E293B',
    primaryBorderColor: '#818CF8',
    lineColor: '#6366F1',
    secondaryColor: '#FEF3C7',
    tertiaryColor: '#DBEAFE',
  },
})

export default function ArchitectureDiagram() {
  const mermaidRef = useRef(null)

  const flowchartDiagram = `graph TB
    A[Input Task] --> B[Agent System]
    B --> C[Prompt Manager]
    C --> D[Execute with Current Prompt]
    D --> E[Generate Output]
    E --> F[Multi-Criteria Evaluator]
    F --> F1[Relevance Check]
    F --> F2[Quality Check]
    F --> F3[Completeness Check]
    F --> F4[Length Check]
    F1 --> G{Score >= Target?}
    F2 --> G
    F3 --> G
    F4 --> G
    G -->|Yes| K[Return Final Output]
    G -->|No| H[Meta-Prompt Agent]
    H --> I[Generate Improved Prompt]
    I --> J[Update Prompt Version]
    J --> C
    
    style A fill:#DBEAFE
    style K fill:#D1FAE5
    style G fill:#FEE2E2
    style H fill:#F3E8FF
    style F fill:#FEF3C7`

  const sequenceDiagram = `sequenceDiagram
    participant U as User
    participant A as Agent
    participant E as Evaluator
    participant M as Meta-Prompt
    
    U->>A: Submit Task
    loop Until Target or Max Iterations
        A->>A: Execute with Current Prompt
        A->>E: Submit Output
        E->>E: Multi-Criteria Evaluation
        E->>A: Return Score & Feedback
        alt Score < Target
            A->>M: Request Improved Prompt
            M->>A: Return New Prompt
            A->>A: Update Prompt Version
        end
    end
    A->>U: Return Final Output`

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.contentLoaded()
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Architecture</h2>
        <div className="prose max-w-none">
          <p className="text-sm text-gray-600 mb-6">
            Self-evolving agents implement a feedback loop architecture where the agent continuously
            monitors its performance and automatically improves its strategies without human intervention.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Flow Architecture</h3>
        <div ref={mermaidRef} className="mermaid">
          {flowchartDiagram}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Sequence Flow</h3>
        <div className="mermaid">
          {sequenceDiagram}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Key Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Agent System</h4>
            <p className="text-xs text-gray-600">
              Core execution engine that processes tasks using the current prompt configuration
              and generates outputs based on the input.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Prompt Manager</h4>
            <p className="text-xs text-gray-600">
              Maintains version control of all prompts, tracks changes, and enables rollback
              to previous versions when needed.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Multi-Criteria Evaluator</h4>
            <p className="text-xs text-gray-600">
              Assesses output quality across multiple dimensions: relevance, quality, completeness,
              and length appropriateness.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Meta-Prompt Agent</h4>
            <p className="text-xs text-gray-600">
              Specialized agent that analyzes feedback and generates improved prompts to address
              identified weaknesses in performance.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Feedback Loop Process</h3>
        <ol className="text-sm text-gray-700 space-y-3">
          <li className="flex">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold mr-3">
              1
            </span>
            <div>
              <span className="font-medium">Initial Execution:</span> Agent processes the task using current prompt
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold mr-3">
              2
            </span>
            <div>
              <span className="font-medium">Evaluation:</span> Output is scored across multiple criteria
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold mr-3">
              3
            </span>
            <div>
              <span className="font-medium">Decision Point:</span> If score meets target, process completes
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold mr-3">
              4
            </span>
            <div>
              <span className="font-medium">Improvement:</span> Meta-prompt agent generates better prompt based on feedback
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold mr-3">
              5
            </span>
            <div>
              <span className="font-medium">Iteration:</span> Process repeats with improved prompt until target reached
            </div>
          </li>
        </ol>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="text-base font-semibold text-indigo-900 mb-3">Why This Works</h3>
        <ul className="text-sm text-indigo-800 space-y-2">
          <li>• <strong>Automated Improvement:</strong> No human intervention needed for optimization</li>
          <li>• <strong>Multi-Dimensional Quality:</strong> Holistic evaluation ensures balanced outputs</li>
          <li>• <strong>Version Control:</strong> Track all changes and enable analysis of improvements</li>
          <li>• <strong>Meta-Learning:</strong> AI improves AI prompts based on performance data</li>
          <li>• <strong>Iterative Refinement:</strong> Gradual convergence toward optimal performance</li>
        </ul>
      </div>
    </div>
  )
}
