import { useEffect, useRef } from 'react'

export default function EvolutionChart({ evaluationHistory }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !evaluationHistory) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    const padding = 40
    const chartWidth = width - 2 * padding
    const chartHeight = height - 2 * padding

    ctx.fillStyle = '#f9fafb'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()

      ctx.fillStyle = '#6b7280'
      ctx.font = '11px system-ui'
      ctx.textAlign = 'right'
      ctx.fillText((1 - i * 0.25).toFixed(2), padding - 10, y + 4)
    }

    ctx.strokeStyle = '#4f46e5'
    ctx.lineWidth = 2
    ctx.beginPath()

    evaluationHistory.forEach((item, idx) => {
      const x = padding + (chartWidth / (evaluationHistory.length - 1)) * idx
      const y = padding + chartHeight * (1 - item.score)

      if (idx === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    evaluationHistory.forEach((item, idx) => {
      const x = padding + (chartWidth / (evaluationHistory.length - 1)) * idx
      const y = padding + chartHeight * (1 - item.score)

      ctx.fillStyle = item.passed ? '#10b981' : '#f59e0b'
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, 2 * Math.PI)
      ctx.fill()

      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillStyle = '#374151'
      ctx.font = '11px system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(`It ${item.iteration}`, x, height - padding + 20)
    })

    ctx.strokeStyle = '#ef4444'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    const targetY = padding + chartHeight * (1 - 0.8)
    ctx.beginPath()
    ctx.moveTo(padding, targetY)
    ctx.lineTo(width - padding, targetY)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = '#ef4444'
    ctx.font = '10px system-ui'
    ctx.textAlign = 'left'
    ctx.fillText('Target: 0.80', width - padding + 5, targetY + 4)

    ctx.fillStyle = '#111827'
    ctx.font = 'bold 12px system-ui'
    ctx.textAlign = 'center'
    ctx.fillText('Evolution Progress', width / 2, 20)

  }, [evaluationHistory])

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Evolution</h3>
      <canvas ref={canvasRef} width={800} height={300} className="w-full" />
      <div className="mt-4 flex items-center justify-center space-x-6 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-gray-600">Passed</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-gray-600">Needs Improvement</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-0.5 bg-red-500 mr-2" style={{width: '20px'}}></div>
          <span className="text-gray-600">Target Score</span>
        </div>
      </div>
    </div>
  )
}
