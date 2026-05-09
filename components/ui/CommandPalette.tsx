'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Github, Mail, ExternalLink } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { SITE, NAV_CHAPTERS } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface Command {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  action: () => void
  group: string
}

interface CommandPaletteProps {
  onNavigate: (index: number) => void
}

export default function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const { isCmdPaletteOpen, setCmdPalette } = useAppStore()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const COMMANDS: Command[] = [
    ...NAV_CHAPTERS.map((chapter, i) => ({
      id: `nav-${chapter.id}`,
      label: `Go to ${chapter.label}`,
      description: `Navigate to ${chapter.label} section`,
      icon: <ArrowRight size={14} />,
      action: () => { onNavigate(i); setCmdPalette(false) },
      group: 'Navigate',
    })),
    {
      id: 'github',
      label: 'Open GitHub',
      description: 'View all repositories on GitHub',
      icon: <Github size={14} />,
      action: () => window.open(SITE.github, '_blank'),
      group: 'Links',
    },
    {
      id: 'email',
      label: 'Send Email',
      description: SITE.email,
      icon: <Mail size={14} />,
      action: () => window.open(`mailto:${SITE.email}`, '_blank'),
      group: 'Links',
    },
  ]

  const filtered = COMMANDS.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  )

  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = []
    acc[cmd.group].push(cmd)
    return acc
  }, {})

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdPalette(!isCmdPaletteOpen)
      }
      if (e.key === 'Escape') setCmdPalette(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isCmdPaletteOpen, setCmdPalette])

  useEffect(() => {
    if (isCmdPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isCmdPaletteOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isCmdPaletteOpen) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        filtered[selectedIndex].action()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isCmdPaletteOpen, filtered, selectedIndex])

  let flatIndex = 0

  return (
    <AnimatePresence>
      {isCmdPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9990] bg-space-void/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCmdPalette(false)}
          />

          {/* Palette */}
          <motion.div
            className="fixed top-[20%] left-1/2 z-[9991] w-full max-w-lg -translate-x-1/2 glass-strong rounded-xl overflow-hidden shadow-glow-lg"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-electric/15">
              <Search size={16} className="text-ink-faint flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent font-mono text-sm text-ink placeholder-ink-faint outline-none"
              />
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-space-navy border border-electric/20 text-ink-faint flex-shrink-0">ESC</kbd>
            </div>

            {/* Commands */}
            <div className="max-h-80 overflow-y-auto no-scrollbar py-2">
              {Object.entries(grouped).map(([group, cmds]) => (
                <div key={group}>
                  <p className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                    {group}
                  </p>
                  {cmds.map((cmd) => {
                    const isSelected = flatIndex === selectedIndex
                    const currentIndex = flatIndex++
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150',
                          isSelected ? 'bg-electric/10 text-electric' : 'text-ink-muted hover:bg-electric/5'
                        )}
                        data-cursor="hover"
                      >
                        <span className={cn('flex-shrink-0', isSelected ? 'text-electric' : 'text-ink-faint')}>
                          {cmd.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{cmd.label}</p>
                          <p className="text-xs text-ink-faint truncate">{cmd.description}</p>
                        </div>
                        {isSelected && <ArrowRight size={14} className="flex-shrink-0 text-electric" />}
                      </button>
                    )
                  })}
                </div>
              ))}

              {filtered.length === 0 && (
                <p className="px-4 py-6 text-center font-mono text-xs text-ink-faint">
                  No commands found for &quot;{query}&quot;
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-electric/10 flex items-center gap-4">
              <span className="font-mono text-[10px] text-ink-faint">↑↓ navigate</span>
              <span className="font-mono text-[10px] text-ink-faint">↵ select</span>
              <span className="font-mono text-[10px] text-ink-faint">esc close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
