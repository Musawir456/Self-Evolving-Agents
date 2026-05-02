# Self-Evolving AI Agents

A complete implementation of self-evolving agents that improve through feedback loops. This project demonstrates how AI agents can automatically optimize their performance without human intervention.

## What Are Self-Evolving Agents?

Self-evolving agents are AI systems that:
- Execute tasks with current configuration
- Evaluate their own performance across multiple criteria
- Generate improved strategies based on feedback
- Continuously adapt without human intervention

## Features

### Backend (FastAPI)
- RESTful API for agent operations
- Self-evolving agent with feedback loops
- Multi-criteria evaluation system (relevance, quality, completeness, length)
- Prompt version management
- LangGraph integration for orchestration

### Frontend (React)
- API key management interface
- Real-time task execution
- Evolution progress visualization
- Interactive architecture diagrams
- Prompt history tracking

### Jupyter Notebook
- Complete implementation with examples
- Data visualizations using matplotlib
- Mermaid diagram integration
- Step-by-step explanations

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- OpenAI API key

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies with uv:
```bash
uv sync
```

3. Run the server:
```bash
uv run python run.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Jupyter Notebook

1. Install Jupyter and dependencies:
```bash
pip install jupyter openai python-dotenv graphviz matplotlib pandas seaborn
```

2. Start Jupyter:
```bash
jupyter notebook self_evolving_agents.ipynb
```

3. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=sk-...
```

## API Documentation

### POST `/initialize`
Initialize a new agent with API key.

**Request:**
```json
{
  "api_key": "sk-...",
  "model": "gpt-4o-mini",
  "initial_prompt": "You are a helpful assistant."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Agent initialized successfully",
  "model": "gpt-4o-mini"
}
```

### POST `/execute`
Execute a task with self-evolution.

**Request:**
```json
{
  "api_key": "sk-...",
  "task_description": "Summarize the following text",
  "input_text": "Your text here...",
  "max_iterations": 3
}
```

**Response:**
```json
{
  "success": true,
  "output": "Final output text...",
  "iterations": 2,
  "final_score": 0.87,
  "evaluation_history": [...],
  "prompt_versions": [...]
}
```

### GET `/agent-status/{api_key}`
Get current agent status and prompt version.

### DELETE `/agent/{api_key}`
Remove an agent instance.

### GET `/health`
Health check endpoint.

## Architecture

### Feedback Loop Process

1. **Execute**: Agent processes task with current prompt
2. **Evaluate**: Multi-criteria assessment of output
3. **Decide**: Check if score meets target threshold
4. **Improve**: Meta-prompt agent generates better prompt
5. **Update**: Prompt manager stores new version
6. **Repeat**: Loop continues until target or max iterations

### Core Components

#### 1. Agent System
Executes tasks using LLM with versioned prompts.

#### 2. Multi-Criteria Evaluator
Evaluates outputs across four dimensions:
- **Relevance**: Alignment with input and task
- **Quality**: Coherence, grammar, presentation
- **Completeness**: Coverage of all aspects
- **Length**: Appropriate word count

#### 3. Prompt Manager
Version control system for prompts with:
- Full history tracking
- Metadata storage
- Rollback capability

#### 4. Meta-Prompt Agent
Analyzes feedback and generates improved prompts using meta-learning.

## Example Usage

### Python (Backend)
```python
from backend.agent import SelfEvolvingAgent, AgentConfig

config = AgentConfig(
    api_key="your-api-key",
    model="gpt-4o-mini",
    initial_prompt="You are a helpful assistant."
)

agent = SelfEvolvingAgent(config)

result = await agent.execute_with_evolution(
    task_description="Summarize this text",
    input_text="Long text here...",
    max_iterations=3
)

print(f"Final score: {result['final_score']}")
print(f"Output: {result['final_output']}")
```

### JavaScript (Frontend)
```javascript
// Initialize agent
const response = await axios.post('http://localhost:8000/initialize', {
  api_key: apiKey,
  model: 'gpt-4o-mini'
})

// Execute task
const result = await axios.post('http://localhost:8000/execute', {
  api_key: apiKey,
  task_description: 'Summarize this text',
  input_text: 'Your text...',
  max_iterations: 3
})

console.log('Final score:', result.data.final_score)
```

## Configuration

### Environment Variables

Create a `.env` file in the project root:
```
OPENAI_API_KEY=sk-...
```

### Backend Configuration

Modify `backend/src/backend/agent.py`:
```python
class AgentConfig(BaseModel):
    api_key: str
    model: str = "gpt-4o-mini"
    initial_prompt: str = "You are a helpful assistant."
    temperature: float = 0.7
    max_tokens: int = 2000
```

### Evaluation Thresholds

Modify `backend/src/backend/evaluator.py`:
```python
class Evaluator:
    def __init__(self, client, pass_threshold: float = 0.75):
        self.pass_threshold = pass_threshold
```

## Use Cases

### Content Generation
- Blog posts that improve over iterations
- Marketing copy with quality assurance
- Technical documentation with consistency

### Customer Service
- Email responses that adapt to tone
- Chat messages with quality control
- Support tickets with completeness checks

### Code Assistance
- Code generation with error reduction
- Documentation that improves clarity
- Code reviews with consistent standards

### Research & Analysis
- Literature reviews that get more comprehensive
- Data summaries that improve accuracy
- Report generation with quality gates

## Performance Considerations

### Cost Optimization
- Each iteration costs API tokens
- Use `max_iterations` to control costs
- Consider caching for repeated tasks

### Model Selection
- `gpt-4o-mini`: Fast and cheap, good for most tasks
- `gpt-4`: Better for complex reasoning
- Adjust based on domain complexity

### Evaluation Speed
- LLM evaluators are slower but more accurate
- Deterministic checks are fast but rigid
- Balance based on requirements

## Contributing

Contributions welcome! Areas for improvement:
- Additional evaluation criteria
- More agent orchestration patterns
- Integration with vector databases
- Performance monitoring dashboard
- Cost tracking and optimization

## License

MIT License - feel free to use in your projects!

---

Built with passion for autonomous AI systems. Happy evolving! 🚀
