'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import { NAV_CHAPTERS } from '@/lib/constants'

export default function ChapterProgress() {
  const { activeSection } = useAppStore()

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-3">
      {/* Line track */}
      <div className="relative flex items-center gap-2">
        {NAV_CHAPTERS.map((_, i) => (
          <div key={i} className="relative flex items-center">
            <motion.div
              className="rounded-full transition-all duration-500"
              animate={{
                width: activeSection === i ? 24 : 6,
                height: 6,
                backgroundColor:
                  activeSection === i
                    ? '#1E90FF'
                    : i < activeSection
                    ? 'rgba(30,144,255,0.4)'
                    : 'rgba(30,144,255,0.15)',
                boxShadow: activeSection === i ? '0 0 10px rgba(30,144,255,0.6)' : 'none',
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        ))}
      </div>

      {/* Current chapter label */}
      <motion.span
        key={activeSection}
        className="font-mono text-xs text-ink-muted"
        initial={{ opacity: 0, x: 6 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -6 }}
        transition={{ duration: 0.3 }}
      >
        {String(activeSection + 1).padStart(2, '0')} / {String(NAV_CHAPTERS.length).padStart(2, '0')}
      </motion.span>
    </div>
  )
}
