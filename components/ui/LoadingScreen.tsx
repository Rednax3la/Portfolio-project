'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

const BOOT_LINES = [
  'INITIALIZING SYSTEM...',
  'LOADING CONSCIOUSNESS...',
  'MAPPING COORDINATES: NAIROBI, KENYA',
  'CALIBRATING INTELLIGENCE LAYER...',
  'IMPORTING: VERNACULEARN, WRAPSITE, [MORE INCOMING]',
  'ESTABLISHING SIGNAL...',
  'SYSTEM READY.',
]

export default function LoadingScreen() {
  const { isLoading, setLoading } = useAppStore()
  const [progress, setProgress] = useState(0)
  const [lines, setLines] = useState<string[]>([])
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    if (!isLoading) return

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return p + 1.4
      })
    }, 30)

    const lineInterval = setInterval(() => {
      setLineIndex((i) => {
        if (i < BOOT_LINES.length) {
          setLines((prev) => [...prev, BOOT_LINES[i]])
          return i + 1
        }
        clearInterval(lineInterval)
        return i
      })
    }, 300)

    return () => {
      clearInterval(progressInterval)
      clearInterval(lineInterval)
    }
  }, [isLoading, setLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9997] flex flex-col items-center justify-center bg-space-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Monogram */}
          <motion.div
            className="mb-12 flex items-center justify-center w-20 h-20 rounded-full border border-electric/30 shadow-glow-md"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-display text-2xl font-bold text-electric text-glow">AW</span>
          </motion.div>

          {/* Boot lines */}
          <div className="w-80 mb-8 space-y-1">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                className="font-mono text-xs text-ink-muted"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-electric mr-2">›</span>
                {line}
              </motion.p>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-80">
            <div className="flex justify-between mb-2">
              <span className="font-mono text-xs text-ink-faint">LOADING</span>
              <span className="font-mono text-xs text-electric">{Math.floor(progress)}%</span>
            </div>
            <div className="h-px bg-space-navy overflow-hidden">
              <motion.div
                className="h-full bg-electric shadow-glow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Corner decorators */}
          <div className="absolute inset-8 pointer-events-none">
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
