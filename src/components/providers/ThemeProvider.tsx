"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Theme = "dark" | "light" | "gold"

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (t: Theme) => void
}>({ theme: "light", setTheme: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = (localStorage.getItem("pianoud_theme") as Theme) || "light"
    setThemeState(saved)
    applyTheme(saved)
  }, [])

  function applyTheme(t: Theme) {
    // Remove all theme classes
    document.documentElement.classList.remove("theme-dark", "theme-light", "theme-gold")
    // Add new theme class
    document.documentElement.classList.add(`theme-${t}`)
    localStorage.setItem("pianoud_theme", t)
    setThemeState(t)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
