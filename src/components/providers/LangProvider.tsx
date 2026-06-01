"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Lang = "en" | "ar"

const LangContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  isAr: boolean
}>({ lang: "en", setLang: () => {}, isAr: false })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")

  useEffect(() => {
    const saved = localStorage.getItem("pianoud_lang") as Lang
    if (saved) {
      setLangState(saved)
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = saved
    }
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem("pianoud_lang", l)
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = l
  }

  return (
    <LangContext.Provider value={{ lang, setLang, isAr: lang === "ar" }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
