'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Github, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  message: string
}

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [konamiProgress, setKonamiProgress] = useState(0)
  const [easterEgg, setEasterEgg] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  // Konami code easter egg
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiProgress]) {
        const next = konamiProgress + 1
        setKonamiProgress(next)
        if (next === KONAMI.length) {
          setEasterEgg(true)
          setKonamiProgress(0)
        }
      } else {
        setKonamiProgress(0)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [konamiProgress])

  const onSubmit = async (data: FormData) => {
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSent(true)
      reset()
    } catch {
      // Fallback: open mailto
      window.open(
        `mailto:${SITE.email}?subject=Portfolio Contact from ${data.name}&body=${encodeURIComponent(data.message)}`,
        '_blank'
      )
      setSent(true)
      reset()
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="h-scroll-section flex items-center justify-center px-6 md:px-16 overflow-y-auto">
      <div ref={ref} className="w-full max-w-4xl py-20 md:py-0">

        {/* Header */}
        <motion.div
          className="mb-10 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs text-electric tracking-widest mb-2">05 // SIGNAL</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-ink leading-tight">
            Let&apos;s Build
            <br />
            <span className="text-electric">Something.</span>
          </h2>
          <p className="mt-4 font-body text-sm md:text-base text-ink-muted max-w-lg mx-auto md:mx-0 leading-relaxed">
            Open to collaboration, startup conversations, and interesting problems.
            If you&apos;re building something that matters — let&apos;s talk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Contact channels */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {[
              {
                icon: <Mail size={18} />,
                label: 'Email',
                value: SITE.email,
                href: `mailto:${SITE.email}`,
                desc: 'Best for serious opportunities',
              },
              {
                icon: <Github size={18} />,
                label: 'GitHub',
                value: '@Rednax3la',
                href: SITE.github,
                desc: 'See what I\'m building',
              },
              {
                icon: <MessageSquare size={18} />,
                label: 'WhatsApp',
                value: SITE.phone,
                href: `https://wa.me/${SITE.phone.replace(/\D/g, '')}`,
                desc: 'For quick conversations',
              },
            ].map((channel, i) => (
              <motion.a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="flex items-start gap-4 p-4 glass rounded-xl border border-electric/10 hover:border-electric/25 transition-all duration-300 group"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i + 0.2 }}
              >
                <div className="p-2.5 rounded-lg bg-electric/10 text-electric group-hover:bg-electric/15 transition-colors flex-shrink-0">
                  {channel.icon}
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-ink group-hover:text-electric transition-colors">
                    {channel.label}
                  </p>
                  <p className="font-mono text-xs text-ink-muted">{channel.value}</p>
                  <p className="font-body text-xs text-ink-faint mt-0.5">{channel.desc}</p>
                </div>
              </motion.a>
            ))}

            {/* Konami hint */}
            <p className="font-mono text-[10px] text-ink-faint/40 mt-4 text-center">
              psst: try the konami code
            </p>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  className="glass-strong rounded-2xl p-8 border-electric/15 flex flex-col items-center justify-center text-center h-full min-h-64"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <CheckCircle size={40} className="text-electric mb-4 shadow-glow-sm" />
                  <h3 className="font-display text-lg font-bold text-ink mb-2">Signal received.</h3>
                  <p className="font-body text-sm text-ink-muted">I&apos;ll be in touch shortly.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 font-mono text-xs text-ink-faint hover:text-electric transition-colors"
                    data-cursor="hover"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="glass-strong rounded-2xl p-6 border-electric/15 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="font-mono text-[10px] text-electric tracking-widest mb-2">DIRECT MESSAGE</p>

                  {[
                    { field: 'name' as const, label: 'Your Name', placeholder: 'John Doe', type: 'text' },
                    { field: 'email' as const, label: 'Email Address', placeholder: 'john@company.com', type: 'email' },
                  ].map(({ field, label, placeholder, type }) => (
                    <div key={field}>
                      <label className="block font-mono text-[10px] text-ink-faint mb-1.5 tracking-widest uppercase">
                        {label}
                      </label>
                      <input
                        {...register(field, { required: true, ...(field === 'email' && { pattern: /^\S+@\S+\.\S+$/ }) })}
                        type={type}
                        placeholder={placeholder}
                        className={cn(
                          'w-full bg-space-void/80 border rounded-lg px-4 py-2.5 font-body text-sm text-ink placeholder-ink-faint/50 outline-none transition-all duration-300',
                          errors[field]
                            ? 'border-red-500/50 focus:border-red-500'
                            : 'border-electric/15 focus:border-electric/40 focus:shadow-glow-sm'
                        )}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block font-mono text-[10px] text-ink-faint mb-1.5 tracking-widest uppercase">
                      Message
                    </label>
                    <textarea
                      {...register('message', { required: true })}
                      placeholder="What are you building?"
                      rows={4}
                      className={cn(
                        'w-full bg-space-void/80 border rounded-lg px-4 py-2.5 font-body text-sm text-ink placeholder-ink-faint/50 outline-none transition-all duration-300 resize-none',
                        errors.message
                          ? 'border-red-500/50 focus:border-red-500'
                          : 'border-electric/15 focus:border-electric/40 focus:shadow-glow-sm'
                      )}
                    />
                  </div>

                  {error && <p className="font-mono text-xs text-red-400">{error}</p>}

                  <button
                    type="submit"
                    disabled={sending}
                    data-cursor="hover"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-electric text-white font-display text-sm font-semibold rounded-lg shadow-glow-sm hover:shadow-glow-md hover:bg-electric/90 transition-all duration-300 disabled:opacity-50"
                  >
                    {sending ? (
                      <span className="font-mono text-xs animate-pulse">TRANSMITTING...</span>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Signal
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Easter egg: Konami code reveal */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            className="fixed inset-0 z-[9995] flex items-center justify-center bg-space-void/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEasterEgg(false)}
          >
            <motion.div
              className="glass-strong rounded-2xl p-8 max-w-md text-center border-electric/30 shadow-glow-lg"
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-mono text-xs text-electric tracking-widest mb-4">// CLASSIFIED</p>
              <h3 className="font-display text-2xl font-bold text-ink mb-4">
                You found it. 👾
              </h3>
              <p className="font-body text-sm text-ink-muted leading-relaxed mb-6">
                Fun fact: I almost named Vernaculearn &quot;LinguaFrik&quot;. I&apos;m glad I didn&apos;t.
                <br /><br />
                Also: there are more things in development than listed here. Watch the GitHub.
              </p>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-electric text-white rounded-lg font-display text-sm font-semibold shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
                data-cursor="hover"
              >
                <Github size={15} />
                Watch GitHub
              </a>
              <button
                onClick={() => setEasterEgg(false)}
                className="block mt-4 mx-auto font-mono text-xs text-ink-faint hover:text-electric transition-colors"
                data-cursor="hover"
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
