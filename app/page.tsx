'use client'

import { useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useAppStore } from '@/store/useAppStore'

// Dynamic imports for client-only components
const SpaceCanvas = dynamic(() => import('@/components/canvas/SpaceCanvas'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })
const LoadingScreen = dynamic(() => import('@/components/ui/LoadingScreen'), { ssr: false })
const CommandPalette = dynamic(() => import('@/components/ui/CommandPalette'), { ssr: false })

import Navbar from '@/components/ui/Navbar'
import ChapterProgress from '@/components/ui/ChapterProgress'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ContactSection from '@/components/sections/ContactSection'

const SECTIONS = 5

export default function Home() {
  const { isLoading, activeSection, setActiveSection } = useAppStore()
  const trackRef = useRef<HTMLDivElement>(null)
  const isMobile = useRef(false)

  // Detect mobile on mount
  useEffect(() => {
    isMobile.current = window.innerWidth < 768
    const handleResize = () => { isMobile.current = window.innerWidth < 768 }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Navigate to a chapter by index
  const navigateTo = useCallback((index: number) => {
    if (isMobile.current) {
      // Mobile: vertical scroll to section
      const sections = document.querySelectorAll('.h-scroll-section')
      sections[index]?.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(index)
    } else {
      // Desktop: translate track
      if (trackRef.current) {
        trackRef.current.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
        trackRef.current.style.transform = `translateX(-${index * 100}vw)`
        setActiveSection(index)
      }
    }
  }, [setActiveSection])

  // Wheel-based horizontal scroll on desktop
  useEffect(() => {
    if (typeof window === 'undefined') return

    let isAnimating = false
    let accumulatedDelta = 0
    const THRESHOLD = 80

    const onWheel = (e: WheelEvent) => {
      if (isMobile.current) return
      e.preventDefault()

      if (isAnimating) return

      accumulatedDelta += e.deltaY || e.deltaX

      if (Math.abs(accumulatedDelta) < THRESHOLD) return

      const direction = accumulatedDelta > 0 ? 1 : -1
      accumulatedDelta = 0

      const next = Math.max(0, Math.min(SECTIONS - 1, activeSection + direction))
      if (next === activeSection) return

      isAnimating = true
      navigateTo(next)

      setTimeout(() => { isAnimating = false }, 1000)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [activeSection, navigateTo])

  // Touch swipe for desktop-mode horizontal navigation
  useEffect(() => {
    let startX = 0
    let startY = 0

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (isMobile.current) return
      const dx = e.changedTouches[0].clientX - startX
      const dy = e.changedTouches[0].clientY - startY
      if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < 50) return
      const direction = dx < 0 ? 1 : -1
      const next = Math.max(0, Math.min(SECTIONS - 1, activeSection + direction))
      navigateTo(next)
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [activeSection, navigateTo])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isMobile.current) return
      if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        navigateTo(Math.min(SECTIONS - 1, activeSection + 1))
      }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        navigateTo(Math.max(0, activeSection - 1))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeSection, navigateTo])

  return (
    <>
      {/* 3D space background */}
      <SpaceCanvas />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Loading screen */}
      <LoadingScreen />

      {/* Command palette */}
      <CommandPalette onNavigate={navigateTo} />

      {/* Navigation */}
      {!isLoading && (
        <>
          <Navbar onChapterClick={navigateTo} />
          <ChapterProgress />
        </>
      )}

      {/* Main horizontal scroll container */}
      <main className="h-scroll-outer" aria-label="Portfolio sections">
        <div
          ref={trackRef}
          className="h-scroll-track"
          style={{ transform: 'translateX(0)' }}
        >
          <HeroSection onNext={() => navigateTo(1)} />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </div>
      </main>
    </>
  )
}
