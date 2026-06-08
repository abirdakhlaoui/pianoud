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
      {/* Background image — visible with ken-burns zoom */}
      <div className="hero-bg-img" style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url(/background.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} />
      {/* Elegant dark gradient overlay for text readability (rawaee-style) */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(180deg, rgba(15,12,8,0.55) 0%, rgba(15,12,8,0.40) 40%, rgba(15,12,8,0.65) 100%)",
      }} />
      {/* Gold glow accent */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(184,137,59,0.18) 0%, transparent 70%)",
      }} />

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
              color: "#FFFFFF",
              textShadow: "0 2px 24px rgba(0,0,0,0.45)",
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
            color: "rgba(255,255,255,0.92)",
            textShadow: "0 1px 12px rgba(0,0,0,0.4)",
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

        {/* Courses section title */}
        <div style={{ textAlign: "center", marginTop: 90, marginBottom: 8,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.55s",
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.5 }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", letterSpacing: 4, textTransform: "uppercase" }}>
              {isAr ? "دوراتنا" : "Our Courses"}
            </span>
            <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.5 }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(30px,4.5vw,48px)", fontWeight: 400, color: "var(--cream)", lineHeight: 1.15, marginBottom: 14 }}>
            {isAr
              ? <>اكتشف <span className="gradient-text" style={{ fontWeight: 800 }}>شغفك الموسيقي</span></>
              : <>Discover Your <span className="gradient-text" style={{ fontWeight: 800 }}>Musical Passion</span></>}
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
            {isAr
              ? "ثمانية مسارات تعليمية احترافية — اختر آلتك أو تخصصك وابدأ رحلتك الموسيقية اليوم."
              : "Eight professional learning paths — choose your instrument or specialty and start your musical journey today."}
          </p>
        </div>

        {/* Course cards grid */}
        <div className="hero-courses-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 40,
          maxWidth: 1000, marginLeft: "auto", marginRight: "auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.65s",
        }}>
          {[
            { emoji: "🎹", img: "/course-piano.jpeg",   name_en: "Piano",                  name_ar: "البيانو",                  href: "/piano",   color: "#60a5fa", price: 55 },
            { emoji: "🪕", img: "/course-oud.jpeg",     name_en: "Oud",                    name_ar: "العود",                    href: "/oud",     color: "var(--gold)", price: 55 },
            { emoji: "🎶", img: "/course-maqamat.jpeg", name_en: "Arabic Music Theory",    name_ar: "نظرية الموسيقى العربية",   href: "/maqamat", color: "#f87171", price: 55 },
            { emoji: "📘", img: "/course-abrsm.jpeg",   name_en: "Music Theory ABRSM",     name_ar: "نظرية الموسيقى ABRSM",     href: "/abrsm", color: "#fbbf24", price: 55 },
            { emoji: "🎼", img: "/course-harmony.jpeg", name_en: "Harmony & Counterpoint", name_ar: "الهارموني والكونتربوان",   href: "/harmony", color: "#a78bfa", price: 55 },
            { emoji: "📖", img: "/course-reading.jpeg", name_en: "Reading & Rhythm",       name_ar: "القراءة والإيقاع",         href: "/reading", color: "#34d399", price: 55 },
            { emoji: "🧒", img: "/course-kids.jpeg",    name_en: "Piano for Kids",         name_ar: "البيانو للأطفال",          href: "/kids",    color: "#f472b6", price: 55 },
            { emoji: "👦", img: "/course-oudkids.jpeg", name_en: "Oud for Kids",           name_ar: "العود للأطفال",            href: "/oudkids", color: "#22d3ee", price: 55 },
          ].map((inst, idx) => (
            <Link key={inst.name_en} href={inst.href} style={{ textDecoration: "none" }}>
              <div className="course-card" style={{
                borderRadius: 18, overflow: "hidden",
                border: "1px solid var(--border)",
                background: "var(--ink-card)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
                transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.7 + idx * 0.12}s, opacity 0.6s ease ${0.7 + idx * 0.12}s, box-shadow 0.35s ease, border-color 0.35s ease`,
                cursor: "pointer",
              }}
                onMouseEnter={e => { const c = e.currentTarget; c.style.transform = "translateY(-8px)"; c.style.boxShadow = "0 20px 50px rgba(0,0,0,0.14)"; c.style.borderColor = inst.color; const img = c.querySelector("img"); if (img) (img as HTMLElement).style.transform = "scale(1.08)" }}
                onMouseLeave={e => { const c = e.currentTarget; c.style.transform = "translateY(0)"; c.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; c.style.borderColor = "var(--border)"; const img = c.querySelector("img"); if (img) (img as HTMLElement).style.transform = "scale(1)" }}>
                <div style={{ width: "100%", height: 180, overflow: "hidden", position: "relative" }}>
                  <img src={inst.img} alt={inst.name_en} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.45) 100%)" }} />
                  <div style={{ position: "absolute", top: 14, left: isAr ? "auto" : 14, right: isAr ? 14 : "auto", padding: "5px 12px", borderRadius: 999, background: inst.color, color: "#fff", fontSize: 12, fontWeight: 800, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                    {isAr ? "من $" + inst.price : "From $" + inst.price}
                  </div>
                </div>
                <div style={{ padding: "20px 22px", borderTop: "3px solid " + inst.color }}>
                  <div style={{ fontSize: 19, fontWeight: 700, color: "var(--cream)", marginBottom: 8 }}>{isAr ? inst.name_ar : inst.name_en}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: inst.color, fontWeight: 700 }}>
                    {isAr ? "اعرف المزيد ←" : "Learn more →"}
                  </div>
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
