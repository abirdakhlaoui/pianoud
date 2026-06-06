"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"
import StatsBar from "@/components/home/StatsBar"

function PianoKeysDecoration({ opacity = 0.06 }: { opacity?: number }) {
  const pattern = [1,0,1,0,1,1,0,1,0,1,0,1]
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 2, opacity }}>
      {Array.from({ length: 28 }).map((_: any, i: any) => {
        const isBlack = pattern[i % 12]
        return (
          <div key={i} style={{
            width: isBlack ? 14 : 22,
            height: isBlack ? 56 : 90,
            background: isBlack
              ? "linear-gradient(180deg, rgba(201,168,76,0.4) 0%, rgba(201,168,76,0.1) 100%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
            border: isBlack
              ? "1px solid rgba(201,168,76,0.3)"
              : "1px solid rgba(255,255,255,0.06)",
            borderRadius: "0 0 4px 4px",
            marginLeft: isBlack ? -6 : 0,
            marginRight: isBlack ? -6 : 0,
            zIndex: isBlack ? 1 : 0,
            position: "relative",
          }} />
        )
      })}
    </div>
  )
}

export default function HeroSection() {
  const { isAr } = useLang()
  const [visible, setVisible] = useState(false)
  const [mouseX, setMouseX]   = useState(0)
  const [mouseY, setMouseY]   = useState(0)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
    const handleMouse = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      setMouseX((e.clientX - rect.width / 2) / rect.width)
      setMouseY((e.clientY - rect.height / 2) / rect.height)
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <section ref={ref} dir={isAr ? "rtl" : "ltr"} style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      background: "var(--ink)",
    }}>

      {/* Gradient mesh background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-20%", left: "30%",
          width: "60vw", height: "60vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)",
          filter: "blur(80px)",
          transform: `translate(${mouseX * -20}px, ${mouseY * -20}px)`,
          transition: "transform 0.8s ease",
        }}/>
        <div style={{
          position: "absolute", bottom: "0%", right: "10%",
          width: "40vw", height: "40vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(120,60,200,0.04) 0%, transparent 65%)",
          filter: "blur(60px)",
          transform: `translate(${mouseX * 15}px, ${mouseY * 15}px)`,
          transition: "transform 0.8s ease",
        }}/>
        <div style={{
          position: "absolute", top: "40%", left: "-5%",
          width: "30vw", height: "30vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}/>
      </div>

      {/* Diagonal gold accent line */}
      <div style={{
        position: "absolute",
        top: 0, right: "15%",
        width: 1, height: "100%",
        background: "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.08) 70%, transparent 100%)",
        pointerEvents: "none",
      }}/>

      {/* Piano keys top decoration */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
      }}>
        <PianoKeysDecoration opacity={0.07} />
      </div>

      {/* Floating notes */}
      {[
        { left: "8%",  top: "20%", size: 20, delay: "0s",    dur: 7 },
        { left: "88%", top: "35%", size: 15, delay: "1.5s",  dur: 9 },
        { left: "5%",  top: "65%", size: 13, delay: "0.8s",  dur: 8 },
        { left: "92%", top: "70%", size: 18, delay: "2s",    dur: 6 },
        { left: "48%", top: "8%",  size: 11, delay: "1s",    dur: 10 },
        { left: "75%", top: "15%", size: 16, delay: "3s",    dur: 7 },
      ].map((n: any, i: any) => (
        <span key={i} style={{
          position: "absolute", left: n.left, top: n.top,
          fontSize: n.size, color: "var(--gold)", opacity: 0.1,
          animation: `float ${n.dur}s ease-in-out infinite`,
          animationDelay: n.delay,
          pointerEvents: "none", userSelect: "none",
          fontFamily: "serif",
        }}>
          {["♪","♫","♩","♬","𝄞","♭"][i]}
        </span>
      ))}

      {/* Main content */}
      <div className="container" style={{ paddingTop: 140, paddingBottom: 100, position: "relative", zIndex: 2 }}>
        <div style={{
          maxWidth: 860, margin: "0 auto", textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 20px", borderRadius: 999, marginBottom: 40,
            border: "1px solid rgba(201,168,76,0.25)",
            background: "rgba(201,168,76,0.05)",
            backdropFilter: "blur(10px)",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.2s",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", display: "inline-block", animation: "pulse 2s ease infinite" }}/>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: 3, textTransform: "uppercase" }}>
              {isAr ? "أكاديمية البيانو والعود" : "Piano & Oud Academy"}
            </span>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", display: "inline-block", animation: "pulse 2s ease infinite 1s" }}/>
          </div>

          {/* Main heading */}
          <h1 className="font-display" style={{ lineHeight: 1.05, marginBottom: 28 }}>
            <span style={{
              display: "block",
              fontSize: "clamp(48px, 9vw, 96px)",
              fontWeight: 300,
              color: "var(--cream)",
              letterSpacing: "-1px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}>
              {isAr ? "أتقن فن" : "Master the Art of"}
            </span>
            <span style={{
              display: "block",
              fontSize: "clamp(48px, 9vw, 96px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1,
              marginTop: 8,
              background: "linear-gradient(135deg, #F0D878 0%, #C9A84C 40%, #E8B84B 65%, #8B6914 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
            }}>
              {isAr ? "الموسيقى الشرقية والغربية" : "Eastern & Western Music"}
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(16px, 2.2vw, 20px)",
            color: "var(--text-muted)",
            maxWidth: 600,
            margin: "0 auto 52px",
            lineHeight: 1.8,
            fontWeight: 300,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.9s ease 0.35s",
          }}>
            {isAr
              ? "تعلّم البيانو والعود مع مدرسين متخصصين. دورات ثنائية اللغة ومنهج منظّم لجميع المستويات."
              : "Learn Piano and Oud from specialized instructors. Bilingual courses and a structured curriculum for all levels."}
          </p>

          {/* CTA buttons */}
          <div style={{
            display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
            marginBottom: 80,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.45s",
          }}>
            <Link href="/courses" className="btn-gold" style={{ fontSize: 15, padding: "16px 40px", borderRadius: 12 }}>
              {isAr ? "استعرض الدورات" : "Explore Courses"}
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d={isAr ? "M10 8H3M6 5L3 8l3 3" : "M6 8h7M10 5l3 3-3 3"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/instructors" className="btn-outline" style={{ fontSize: 15, padding: "16px 40px", borderRadius: 12 }}>
              {isAr ? "تعرّف على المدرسين" : "Meet Instructors"}
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.9s ease 0.55s",
          }}>
            <StatsBar />
          </div>
        </div>

        {/* Instrument cards floating */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 20, marginTop: 80,
          flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.65s",
        }}>
          {[
            { emoji: "🎹", img: "/course-piano.png",   name_en: "Piano",                  name_ar: "البيانو",                  href: "/piano",   color: "#60a5fa" },
            { emoji: "🪕", img: "/course-oud.png",     name_en: "Oud",                    name_ar: "العود",                    href: "/oud",     color: "var(--gold)" },
            { emoji: "🎶", img: "/course-maqamat.png", name_en: "Arabic Music Theory",    name_ar: "نظرية الموسيقى العربية",   href: "/maqamat", color: "#f87171" },
            { emoji: "📘", img: "/course-abrsm.png",   name_en: "Music Theory ABRSM",     name_ar: "نظرية الموسيقى ABRSM",     href: "/courses", color: "#fbbf24" },
            { emoji: "🎼", img: "/course-harmony.png", name_en: "Harmony & Counterpoint", name_ar: "الهارموني والكونتربوان",   href: "/courses", color: "#a78bfa" },
            { emoji: "📖", img: "/course-reading.png", name_en: "Reading & Rhythm",       name_ar: "القراءة والإيقاع",         href: "/reading", color: "#34d399" },
          ].map((inst) => (
            <Link key={inst.name_en} href={inst.href} style={{ textDecoration: "none" }}>
              <div className="course-pill" style={{
                padding: "14px 22px", borderRadius: 14,
                border: "1px solid var(--border)",
                background: "var(--ink-card)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                display: "flex", alignItems: "center", gap: 12,
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = inst.color; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)" }}>
                <img src={inst.img} alt={inst.name_en} style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--cream)" }}>{isAr ? inst.name_ar : inst.name_en}</div>
                  <div style={{ fontSize: 12, color: inst.color, marginTop: 2, fontWeight: 600 }}>{isAr ? "اعرف المزيد ←" : "Learn more →"}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom piano keys decoration */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        display: "flex", justifyContent: "center",
        pointerEvents: "none", overflow: "hidden",
      }}>
        <PianoKeysDecoration opacity={0.05} />
      </div>

      {/* Bottom gold line */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)" }}/>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.35, zIndex: 2 }}>
        <span style={{ fontSize: 9, letterSpacing: 4, color: "var(--text-muted)", textTransform: "uppercase" }}>scroll</span>
        <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, var(--gold), transparent)", animation: "pulse 2s ease infinite" }}/>
      </div>

      <style>{`
        @keyframes float  { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:translateY(-16px) rotate(3deg)} 66%{transform:translateY(8px) rotate(-2deg)} }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </section>
  )
}
