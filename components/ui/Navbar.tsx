'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import { NAV_CHAPTERS, SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface NavbarProps {
  onChapterClick: (index: number) => void
}

export default function Navbar({ onChapterClick }: NavbarProps) {
  const { activeSection, isCmdPaletteOpen, setCmdPalette } = useAppStore()

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <button
        onClick={() => onChapterClick(0)}
        className="font-display text-sm font-bold tracking-widest text-electric hover:text-electric-glow transition-colors duration-300"
        data-cursor="hover"
      >
        AW
      </button>

      {/* Chapter navigation */}
      <div className="hidden md:flex items-center gap-1">
        {NAV_CHAPTERS.map((chapter, i) => (
          <button
            key={chapter.id}
            onClick={() => onChapterClick(i)}
            data-cursor="hover"
            className={cn(
              'relative px-4 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300',
              activeSection === i
                ? 'text-electric'
                : 'text-ink-faint hover:text-ink-muted'
            )}
          >
            {activeSection === i && (
              <motion.span
                layoutId="nav-indicator"
                className="absolute inset-0 rounded-sm bg-electric/10 border border-electric/20"
                transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              />
            )}
            <span className="relative z-10">
              <span className="text-electric/40 mr-1">0{i + 1}</span>
              {chapter.label}
            </span>
          </button>
        ))}
      </div>

      {/* CMD palette trigger */}
      <button
        onClick={() => setCmdPalette(!isCmdPaletteOpen)}
        data-cursor="hover"
        className="flex items-center gap-2 px-3 py-1.5 glass rounded-md text-ink-muted hover:text-electric hover:border-electric/30 transition-all duration-300 font-mono text-xs"
      >
        <span className="hidden sm:inline">CMD</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-space-navy border border-electric/20 text-electric">⌘K</kbd>
      </button>
    </motion.nav>
  )
}
