'use client'

import { create } from 'zustand'

interface AppState {
  isLoading: boolean
  activeSection: number
  isCmdPaletteOpen: boolean
  cursorVariant: 'default' | 'hover' | 'click' | 'hidden'
  cursorPos: { x: number; y: number }

  setLoading: (v: boolean) => void
  setActiveSection: (v: number) => void
  setCmdPalette: (v: boolean) => void
  setCursorVariant: (v: AppState['cursorVariant']) => void
  setCursorPos: (x: number, y: number) => void
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  activeSection: 0,
  isCmdPaletteOpen: false,
  cursorVariant: 'default',
  cursorPos: { x: 0, y: 0 },

  setLoading: (v) => set({ isLoading: v }),
  setActiveSection: (v) => set({ activeSection: v }),
  setCmdPalette: (v) => set({ isCmdPaletteOpen: v }),
  setCursorVariant: (v) => set({ cursorVariant: v }),
  setCursorPos: (x, y) => set({ cursorPos: { x, y } }),
}))
