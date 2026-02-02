import { useState, useEffect, useRef } from 'react'
import './CustomCursor.css'

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isOverSidebar, setIsOverSidebar] = useState(false)
  const posRef = useRef(position)

  useEffect(() => {
    posRef.current = position
  }, [position])

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    const handlePointerCheck = () => {
      const { x, y } = posRef.current
      const target = document.elementFromPoint(x, y)
      if (!target) return
      const pointer = target.closest('a, button, [role="button"], .note-item, input, select, textarea, [data-cursor-pointer]')
      const overSidebar = target.closest('.sidebar, .note-list-container, .note-list, .mac-landing')
      setIsPointer(!!pointer)
      setIsOverSidebar(!!overSidebar)
    }

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)
    document.documentElement.addEventListener('mouseenter', handleEnter)
    const interval = setInterval(handlePointerCheck, 50)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      document.documentElement.removeEventListener('mouseenter', handleEnter)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return
    document.documentElement.classList.add('custom-cursor-active')
    return () => document.documentElement.classList.remove('custom-cursor-active')
  }, [isVisible])

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator?.maxTouchPoints > 0)
  if (isTouchDevice) return null

  return (
    <div
      className={`custom-cursor ${isVisible ? 'visible' : ''} ${isPointer ? 'pointer' : ''} ${isOverSidebar ? 'light-bg' : ''}`}
      style={{ left: position.x, top: position.y }}
      aria-hidden="true"
    >
      <svg className="cursor-pencil" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 2l7.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export default CustomCursor
