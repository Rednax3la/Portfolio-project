'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Github, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react'
import { PROJECTS } from '@/lib/constants'
import { cn } from '@/lib/utils'

function StatusBadge({ status }: { status: string }) {
  const isActive = status === 'ACTIVE'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-widest border',
        isActive
          ? 'text-electric border-electric/30 bg-electric/10'
          : 'text-ink-faint border-ink-faint/20 bg-ink-faint/5'
      )}
    >
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse-glow" />
      )}
      {status}
    </span>
  )
}

export default function ProjectsSection() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const project = PROJECTS[active]

  return (
    <section className="h-scroll-section flex items-center justify-center px-6 md:px-16">
      <div ref={ref} className="w-full max-w-6xl pt-20 md:pt-0">

        {/* Section header */}
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs text-electric tracking-widest mb-2">03 // BUILDS</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            Mission <span className="text-electric">Control.</span>
          </h2>
          <p className="mt-2 font-body text-sm text-ink-muted">Real products. Real problems. Real solutions.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

          {/* Project selector */}
          <motion.div
            className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                data-cursor="hover"
                className={cn(
                  'flex-shrink-0 text-left p-4 rounded-xl border transition-all duration-300',
                  active === i
                    ? 'glass-strong border-electric/25 shadow-glow-sm'
                    : 'glass border-electric/10 hover:border-electric/20'
                )}
              >
                <p className="font-mono text-[10px] text-ink-faint mb-1">{p.codename}</p>
                <p
                  className={cn(
                    'font-display text-sm font-semibold transition-colors',
                    active === i ? 'text-electric' : 'text-ink-muted'
                  )}
                >
                  {p.name}
                </p>
                <div className="mt-2">
                  <StatusBadge status={p.status} />
                </div>
              </button>
            ))}

            {/* Placeholder for future projects */}
            <div className="flex-shrink-0 p-4 rounded-xl border border-dashed border-electric/10 opacity-40">
              <p className="font-mono text-[10px] text-ink-faint mb-1">INCOMING</p>
              <p className="font-display text-sm font-semibold text-ink-faint">More Projects</p>
              <p className="font-mono text-[10px] text-ink-faint mt-1">COMING SOON</p>
            </div>
          </motion.div>

          {/* Active project detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              className="relative glass-strong rounded-2xl p-6 md:p-8 border-electric/15"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Mission header */}
              <div className="flex items-start justify-between mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-mono text-xs text-electric tracking-widest">{project.codename}</p>
                    <StatusBadge status={project.status} />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-ink">{project.name}</h3>
                  <p className="mt-1 font-body text-sm text-ink-muted italic">{project.tagline}</p>
                </div>

                {/* Glow orb accent */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{
                    background: `radial-gradient(circle at center, ${project.color}20, transparent)`,
                    border: `1px solid ${project.color}30`,
                    color: project.color,
                    boxShadow: `0 0 20px ${project.color}20`,
                  }}
                >
                  {project.name[0]}
                </div>
              </div>

              {/* Divider */}
              <div className="line-electric mb-6" />

              {/* Problem statement */}
              <div className="mb-5 p-3 rounded-lg bg-space-void/60 border border-electric/10">
                <p className="font-mono text-[10px] text-electric mb-1 tracking-widest">PROBLEM</p>
                <p className="font-body text-sm text-ink-muted">{project.problem}</p>
              </div>

              {/* Description */}
              <p className="font-body text-sm md:text-base text-ink-muted leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="mb-6">
                <p className="font-mono text-[10px] text-ink-faint tracking-widest mb-3">TECH STACK</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full font-mono text-xs text-ink-muted border border-electric/15 bg-electric/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="flex items-center gap-2 px-5 py-2.5 glass rounded-lg border-electric/20 font-display text-sm font-semibold text-ink-muted hover:text-electric hover:border-electric/40 transition-all duration-300"
                >
                  <Github size={15} />
                  View Source
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="flex items-center gap-2 px-5 py-2.5 bg-electric rounded-lg font-display text-sm font-semibold text-white shadow-glow-sm hover:shadow-glow-md hover:bg-electric/90 transition-all duration-300"
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                )}
              </div>

              {/* Corner decorators */}
              <div className="absolute inset-4 pointer-events-none hidden md:block">
                <div className="hud-corner hud-corner-tr" />
                <div className="hud-corner hud-corner-bl" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows on mobile */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            disabled={active === 0}
            className="p-2 glass rounded-full border-electric/20 text-ink-muted disabled:opacity-30 hover:text-electric transition-colors"
            data-cursor="hover"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="font-mono text-xs text-ink-faint">
            {active + 1} / {PROJECTS.length}
          </span>
          <button
            onClick={() => setActive((a) => Math.min(PROJECTS.length - 1, a + 1))}
            disabled={active === PROJECTS.length - 1}
            className="p-2 glass rounded-full border-electric/20 text-ink-muted disabled:opacity-30 hover:text-electric transition-colors"
            data-cursor="hover"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
