'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TIMELINE, SITE } from '@/lib/constants'

function TimelineItem({ entry, index }: { entry: typeof TIMELINE[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 pb-8 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-electric/15" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-1 -translate-x-[4.5px]">
        <div className="w-2.5 h-2.5 rounded-full border border-electric bg-space-void shadow-glow-sm" />
      </div>

      {/* Year */}
      <p className="font-mono text-xs text-electric mb-1 tracking-widest">{entry.year}</p>

      {/* Title */}
      <h3 className="font-display text-base font-semibold text-ink mb-1.5">{entry.title}</h3>

      {/* Body */}
      <p className="font-body text-sm text-ink-muted leading-relaxed">{entry.body}</p>
    </motion.div>
  )
}

export default function AboutSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headingRef, { once: true })

  return (
    <section className="h-scroll-section flex items-center justify-center px-6 md:px-16">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start pt-20 md:pt-0">

        {/* Left: Portrait + identity card */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Portrait placeholder — replace with actual photo */}
          <div className="relative w-full max-w-xs mx-auto md:mx-0 aspect-[3/4] rounded-2xl overflow-hidden glass border-electric/20">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #050A14 0%, #0D1F3C 50%, #050A14 100%)',
              }}
            />
            {/* Monogram fallback */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-24 h-24 rounded-full border border-electric/30 flex items-center justify-center shadow-glow-md">
                <span className="font-display text-4xl font-bold text-electric">AW</span>
              </div>
              <p className="font-mono text-xs text-ink-faint text-center px-4">
                REPLACE WITH<br />CINEMATIC PORTRAIT
              </p>
            </div>
            {/* Overlay gradient */}
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-space-void to-transparent" />
            {/* Corner decorators */}
            <div className="absolute inset-3 pointer-events-none">
              <div className="hud-corner hud-corner-tl" style={{ width: 14, height: 14 }} />
              <div className="hud-corner hud-corner-br" style={{ width: 14, height: 14 }} />
            </div>
          </div>

          {/* Identity card */}
          <div className="glass rounded-xl p-5 space-y-3">
            <p className="font-mono text-[10px] text-electric tracking-widest">IDENTITY CARD</p>
            <div className="space-y-2">
              {[
                ['NAME', 'Alexander Wambugu'],
                ['ROLE', 'Builder / Data Scientist'],
                ['BASE', 'Nairobi, Kenya'],
                ['STATUS', 'Graduate → Founder'],
                ['GITHUB', '@Rednax3la'],
              ].map(([key, val]) => (
                <div key={key} className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-ink-faint w-16 flex-shrink-0">{key}</span>
                  <span className="font-body text-sm text-ink">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Narrative + Timeline */}
        <div ref={headingRef} className="space-y-8">
          {/* Section label */}
          <div>
            <p className="font-mono text-xs text-electric tracking-widest mb-3">02 // ORIGIN</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight">
              From Student
              <br />
              <span className="text-electric">to Founder.</span>
            </h2>
          </div>

          {/* Narrative */}
          <div className="space-y-4">
            <p className="font-body text-sm md:text-base text-ink-muted leading-relaxed">
              I didn't start in tech because I loved code. I started because data was the most powerful language
              I'd found for understanding the world. Somewhere between a Python notebook and a broken API at 2am,
              that changed.
            </p>
            <p className="font-body text-sm md:text-base text-ink-muted leading-relaxed">
              Now I build things that matter. Products that solve problems African builders have ignored for too long.
              Not because it's easy — because it's necessary.
            </p>
          </div>

          {/* Timeline */}
          <div className="pt-4">
            {TIMELINE.map((entry, i) => (
              <TimelineItem key={entry.year} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
