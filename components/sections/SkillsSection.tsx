'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SKILLS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const LEVEL_COLOR: Record<string, string> = {
  Expert: '#1E90FF',
  Advanced: '#38BDF8',
  Proficient: '#60A5FA',
  Intermediate: '#8BA5C8',
  Fluent: '#1E90FF',
  Learning: '#4A6080',
}

const LEVEL_OPACITY: Record<string, number> = {
  Expert: 1,
  Advanced: 0.85,
  Proficient: 0.7,
  Intermediate: 0.55,
  Fluent: 0.9,
  Learning: 0.4,
}

interface SkillNode {
  name: string
  level: string
  used: string
  cluster: string
}

function SkillPill({ skill, isActive, onClick }: {
  skill: SkillNode
  isActive: boolean
  onClick: () => void
}) {
  const color = LEVEL_COLOR[skill.level] ?? '#8BA5C8'
  const opacity = LEVEL_OPACITY[skill.level] ?? 0.5

  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      className={cn(
        'relative px-3 py-1.5 rounded-full border font-mono text-xs transition-all duration-300',
        isActive
          ? 'border-electric/50 bg-electric/15 text-electric shadow-glow-sm'
          : 'border-electric/15 bg-space-void/50 text-ink-muted hover:border-electric/30 hover:text-ink'
      )}
      style={{
        boxShadow: isActive ? `0 0 15px ${color}30` : undefined,
      }}
    >
      {/* Level glow dot */}
      <span
        className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color, opacity }}
      />
      {skill.name}
    </button>
  )
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null)
  const [activeCluster, setActiveCluster] = useState<string | null>(null)

  const allSkills: SkillNode[] = Object.entries(SKILLS).flatMap(([cluster, skills]) =>
    skills.map((s) => ({ ...s, cluster }))
  )

  return (
    <section className="h-scroll-section flex items-center justify-center px-6 md:px-16 overflow-y-auto">
      <div ref={ref} className="w-full max-w-5xl py-20 md:py-0">

        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs text-electric tracking-widest mb-2">04 // INTELLIGENCE</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink">
            The <span className="text-electric">Stack.</span>
          </h2>
          <p className="mt-2 font-body text-sm text-ink-muted">
            Not percentages. Not bars. Click any node to see where it was used.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

          {/* Skill clusters */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {Object.entries(SKILLS).map(([cluster, skills], ci) => (
              <motion.div
                key={cluster}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * ci }}
              >
                {/* Cluster header */}
                <button
                  onClick={() => setActiveCluster(activeCluster === cluster ? null : cluster)}
                  data-cursor="hover"
                  className="flex items-center gap-3 mb-3 group"
                >
                  <div
                    className={cn(
                      'w-1.5 h-1.5 rounded-full transition-all duration-300',
                      activeCluster === cluster ? 'bg-electric shadow-glow-sm' : 'bg-electric/30'
                    )}
                  />
                  <p className="font-mono text-xs tracking-widest text-ink-faint group-hover:text-ink-muted transition-colors">
                    {cluster.toUpperCase()}
                  </p>
                  <div className="h-px flex-1 bg-electric/10" />
                  <span className="font-mono text-[10px] text-ink-faint">{skills.length}</span>
                </button>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => {
                    const node: SkillNode = { ...skill, cluster }
                    return (
                      <SkillPill
                        key={skill.name}
                        skill={node}
                        isActive={activeSkill?.name === skill.name}
                        onClick={() =>
                          setActiveSkill(activeSkill?.name === skill.name ? null : node)
                        }
                      />
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Detail panel */}
          <motion.div
            className="lg:sticky lg:top-24"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill.name}
                  className="glass-strong rounded-2xl p-6 border-electric/15"
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Level indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: LEVEL_COLOR[activeSkill.level] ?? '#8BA5C8' }}
                    />
                    <span className="font-mono text-[10px] tracking-widest"
                      style={{ color: LEVEL_COLOR[activeSkill.level] ?? '#8BA5C8' }}>
                      {activeSkill.level.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-ink mb-1">{activeSkill.name}</h3>
                  <p className="font-mono text-[10px] text-ink-faint mb-4">{activeSkill.cluster}</p>

                  <div className="line-electric mb-4" />

                  <div>
                    <p className="font-mono text-[10px] text-electric tracking-widest mb-2">USED IN</p>
                    <p className="font-body text-sm text-ink-muted leading-relaxed">{activeSkill.used}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="glass rounded-2xl p-6 border-electric/10 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-10 h-10 rounded-full border border-electric/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-electric text-xs font-mono">?</span>
                  </div>
                  <p className="font-mono text-xs text-ink-faint leading-relaxed">
                    Select any skill to see<br />its usage and context.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Legend */}
            <div className="mt-4 glass rounded-xl p-4">
              <p className="font-mono text-[10px] text-ink-faint tracking-widest mb-3">PROFICIENCY</p>
              <div className="space-y-2">
                {Object.entries(LEVEL_COLOR).slice(0, 4).map(([level, color]) => (
                  <div key={level} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="font-mono text-[10px] text-ink-faint">{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
