"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const els = document.querySelectorAll(".reveal")
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
