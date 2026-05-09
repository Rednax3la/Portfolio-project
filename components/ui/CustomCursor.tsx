'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

export default function CustomCursor() {
  const { cursorVariant, setCursorPos, setCursorVariant } = useAppStore()
  const cursorRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 })

  const trailX = useSpring(mouseX, { stiffness: 150, damping: 30 })
  const trailY = useSpring(mouseY, { stiffness: 150, damping: 30 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setCursorPos(e.clientX, e.clientY)
    }

    const handleHover = () => setCursorVariant('hover')
    const handleLeave = () => setCursorVariant('default')
    const handleDown = () => setCursorVariant('click')
    const handleUp = () => setCursorVariant('default')

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)

    const interactables = document.querySelectorAll('a, button, [data-cursor="hover"]')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [mouseX, mouseY, setCursorPos, setCursorVariant])

  const variants = {
    default: { scale: 1, opacity: 1 },
    hover: { scale: 2.2, opacity: 0.9 },
    click: { scale: 0.7, opacity: 1 },
    hidden: { scale: 0, opacity: 0 },
  }

  return (
    <>
      {/* Trail / outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-electric/40"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 36,
          height: 36,
        }}
        animate={variants[cursorVariant]}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />

      {/* Core dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-electric"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          boxShadow: '0 0 10px rgba(30,144,255,0.8), 0 0 20px rgba(30,144,255,0.4)',
        }}
      />
    </>
  )
}
