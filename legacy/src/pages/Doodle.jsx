import { useRef, useState, useEffect } from 'react'
import Toolbar from '../components/Toolbar'
import './Page.css'
import './Doodle.css'

const COLORS = [
  '#52681D',
  '#BAC67A',
  '#6B7C4A',
  '#8A9B6E',
  '#1d1d1f',
  '#FF8A80',
  '#86868b',
]

function Doodle() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState('pencil')
  const [color, setColor] = useState(COLORS[0])
  const [lineWidth, setLineWidth] = useState(2)
  const ctxRef = useRef(null)
  const lastPointRef = useRef(null)
  const stateRef = useRef({ tool, color, lineWidth, isDrawing })
  stateRef.current = { tool, color, lineWidth, isDrawing }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'
    ctx.scale(dpr, dpr)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctxRef.current = ctx
    return () => {}
  }, [])

  const getPoint = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startDraw = (e) => {
    e.preventDefault()
    const point = getPoint(e)
    if (!point) return
    lastPointRef.current = point
    setIsDrawing(true)
  }

  const draw = (e) => {
    e.preventDefault()
    const { isDrawing: drawing, tool: t, color: c, lineWidth: w } = stateRef.current
    if (!drawing) return
    const point = getPoint(e)
    if (!point || !ctxRef.current || !canvasRef.current) return
    const ctx = ctxRef.current
    const last = lastPointRef.current
    if (!last) return
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(point.x, point.y)
    if (t === 'eraser') {
      ctx.strokeStyle = '#fffef9'
      ctx.lineWidth = w * 6
    } else {
      ctx.strokeStyle = c
      ctx.lineWidth = w
    }
    ctx.stroke()
    lastPointRef.current = point
  }

  const endDraw = (e) => {
    e.preventDefault()
    setIsDrawing(false)
    lastPointRef.current = null
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas || !ctxRef.current) return
    const ctx = ctxRef.current
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const handleTouchMove = (e) => draw(e)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', endDraw)
    canvas.addEventListener('touchcancel', endDraw)
    return () => {
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', endDraw)
      canvas.removeEventListener('touchcancel', endDraw)
    }
  }, [])

  const noteDate = new Date()
  const formattedDate = noteDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const formattedTime = noteDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <div className="page doodle-page">
      <div className="page-header">
        <Toolbar />
        <div className="page-date">{formattedDate} at {formattedTime}</div>
        <div className="doodle-toolbar">
          <div className="doodle-tools">
            <button
              className={`doodle-tool-btn ${tool === 'pencil' ? 'active' : ''}`}
              onClick={() => setTool('pencil')}
              title="Pencil"
              data-cursor-pointer
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={`doodle-tool-btn ${tool === 'eraser' ? 'active' : ''}`}
              onClick={() => setTool('eraser')}
              title="Eraser"
              data-cursor-pointer
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 20H7L3 16a2 2 0 010-2.83L15 2a2 2 0 012.83 0l4.24 4.24a2 2 0 010 2.83L11 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 8l-6 6M12 8l-6 6" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
            <button
              className="doodle-tool-btn clear-btn"
              onClick={clearCanvas}
              title="Clear"
              data-cursor-pointer
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="doodle-colors">
            {COLORS.map((c) => (
              <button
                key={c}
                className={`doodle-color-btn ${color === c ? 'active' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => { setTool('pencil'); setColor(c); }}
                title={c}
                data-cursor-pointer
              />
            ))}
          </div>
          <div className="doodle-size">
            <label className="doodle-size-label">size</label>
            <input
              type="range"
              min="1"
              max="6"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="doodle-size-slider"
            />
          </div>
        </div>
      </div>
      <div className="doodle-content">
        <div className="doodle-paper">
          <canvas
            ref={canvasRef}
            className="doodle-canvas"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
          />
        </div>
        <p className="doodle-hint">scribble something — it's your note</p>
      </div>
    </div>
  )
}

export default Doodle
