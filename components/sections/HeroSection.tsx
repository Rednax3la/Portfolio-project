'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { SITE } from '@/lib/constants'

const TYPEWRITER_PHRASES = [
  'Builder.',
  'Data Scientist.',
  'African Innovator.',
  'Founder in Progress.',
]

function useTypewriter(phrases: string[], speed = 80, pauseMs = 1800) {
  const [display, setDisplay] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    let timeout: NodeJS.Timeout

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex))
        setCharIndex((i) => i + 1)
      }, speed)
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIndex - 1))
        setCharIndex((i) => i - 1)
      }, speed / 2)
    } else {
      setDeleting(false)
      setPhraseIndex((i) => (i + 1) % phrases.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, phraseIndex, phrases, speed, pauseMs])

  return display
}

export default function HeroSection({ onNext }: { onNext: () => void }) {
  const typed = useTypewriter(TYPEWRITER_PHRASES)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="h-scroll-section flex flex-col items-center justify-center relative px-6">
      {/* Ambient glow behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(30,144,255,0.08) 0%, transparent 70%)' }}
        />
      </div>

      {/* Orbital decorator rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          className="w-[500px] h-[500px] rounded-full border border-electric/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full border border-electric/[0.03]"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Coordinates HUD */}
      <motion.div
        className="absolute top-24 left-6 md:left-12 font-mono text-xs text-ink-faint space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p><span className="text-electric/50">LAT</span> {SITE.coordinates.split(',')[0]}</p>
        <p><span className="text-electric/50">LON</span> {SITE.coordinates.split(',')[1]}</p>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* System label */}
        <motion.p variants={item} className="font-mono text-xs text-electric tracking-[0.3em] mb-6">
          SYSTEM ONLINE // PORTFOLIO v2.0
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-tight text-ink"
        >
          ALEXANDER
          <br />
          <span className="text-glow" style={{ color: '#1E90FF' }}>
            WAMBUGU
          </span>
        </motion.h1>

        {/* Separator */}
        <motion.div variants={item} className="line-electric my-8 mx-auto w-32" />

        {/* Typewriter */}
        <motion.div variants={item} className="h-10 flex items-center justify-center">
          <p className="font-display text-[clamp(1rem,3vw,1.75rem)] font-semibold text-ink-muted">
            {typed}
            <span className="animate-cursor-blink text-electric">|</span>
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="mt-6 font-body text-base md:text-lg text-ink-muted max-w-xl mx-auto leading-relaxed"
        >
          {SITE.tagline}
          <br />
          <span className="text-ink-faint text-sm">Based in {SITE.location}. Building for the world.</span>
        </motion.p>

        {/* CTA */}
        <motion.div variants={item} className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="flex items-center gap-2 px-6 py-3 bg-electric text-white font-display text-sm font-semibold rounded-lg shadow-glow-sm hover:shadow-glow-md hover:bg-electric/90 transition-all duration-300"
          >
            View GitHub
            <ChevronRight size={16} />
          </a>
          <button
            onClick={onNext}
            data-cursor="hover"
            className="flex items-center gap-2 px-6 py-3 glass border-electric/20 text-ink-muted font-display text-sm font-semibold rounded-lg hover:text-electric hover:border-electric/40 transition-all duration-300"
          >
            Explore My Work
            <ChevronRight size={16} />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 right-8 font-mono text-xs text-ink-faint flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.div
          className="w-8 h-px bg-electric/40"
          animate={{ scaleX: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Corner HUD decorators */}
      <div className="absolute inset-4 pointer-events-none hidden md:block">
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />
      </div>
    </section>
  )
}
