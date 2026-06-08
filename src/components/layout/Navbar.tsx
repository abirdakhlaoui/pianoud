"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useLang } from "@/components/providers/LangProvider"
import { useTheme } from "@/components/providers/ThemeProvider"
import UnreadBadge from "@/components/layout/UnreadBadge"

const THEMES = [
  { key: "dark",  label: "Dark",  icon: "🌙", ar: "داكن" },
  { key: "light", label: "Light", icon: "☀️", ar: "فاتح" },
  { key: "gold",  label: "Gold",  icon: "✨", ar: "ذهبي" },
] as const

function PianoudLogo({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F0D878"/>
          <stop offset="50%" stopColor="#C9A84C"/>
          <stop offset="100%" stopColor="#8B6914"/>
        </linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8CB7E"/>
          <stop offset="100%" stopColor="#C9A84C"/>
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="23" stroke="url(#g1)" strokeWidth="1.2" fill="none"/>
      <circle cx="24" cy="24" r="18" stroke="rgba(201,168,76,0.15)" strokeWidth="0.8" fill="none"/>
      <rect x="8"  y="16" width="5" height="16" rx="1.5" fill="url(#g2)" opacity="0.9"/>
      <rect x="14" y="16" width="3.5" height="10" rx="1" fill="url(#g1)" opacity="0.5"/>
      <rect x="18" y="16" width="5" height="16" rx="1.5" fill="url(#g2)" opacity="0.9"/>
      <line x1="25" y1="13" x2="25" y2="35" stroke="rgba(201,168,76,0.25)" strokeWidth="0.8"/>
      <ellipse cx="34" cy="27" rx="6" ry="8" stroke="url(#g1)" strokeWidth="1.4" fill="none"/>
      <circle cx="34" cy="27" r="1.8" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="0.8"/>
      <line x1="34" y1="19" x2="36" y2="11" stroke="url(#g1)" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="36.5" cy="10" r="1.2" fill="#C9A84C"/>
      <line x1="30" y1="24" x2="38" y2="24" stroke="rgba(201,168,76,0.3)" strokeWidth="0.6"/>
      <line x1="30" y1="27" x2="38" y2="27" stroke="rgba(201,168,76,0.3)" strokeWidth="0.6"/>
      <line x1="30" y1="30" x2="38" y2="30" stroke="rgba(201,168,76,0.3)" strokeWidth="0.6"/>
      <circle cx="24" cy="24" r="1.5" fill="#C9A84C" opacity="0.6"/>
    </svg>
  )
}

export default function Navbar() {
  const { data: session } = useSession()
  const { lang, setLang, isAr } = useLang()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const user = session?.user as any
  const current = THEMES.find((t: any) => t.key === theme)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = isAr
    ? [
        { label: "الدورات",   href: "/courses" },
        { label: "المدرّسون", href: "/instructors" },
        { label: "عن المنصة", href: "/about" },
      ]
    : [
        { label: "Courses",     href: "/courses" },
        { label: "Instructors", href: "/instructors" },
        { label: "About",       href: "/about" },
      ]

  function getDashboardLink() {
    if (!user) return "/auth/signin"
    if (user.role === "ADMIN")      return "/dashboard/admin"
    if (user.role === "INSTRUCTOR") return "/dashboard/instructor"
    return "/dashboard"
  }

  return (
    <>
      {/* Backdrops */}
      {themeOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:48 }} onClick={() => setThemeOpen(false)}/>
      )}
      {userMenu && (
        <div style={{ position:"fixed", inset:0, zIndex:48 }} onClick={() => setUserMenu(false)}/>
      )}

      <header dir={isAr ? "rtl" : "ltr"} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? "10px 0" : "18px 0",
        background: scrolled ? "rgba(20,16,10,0.92)" : "rgba(20,16,10,0.45)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div className="container" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none", flexShrink:0 }}>
            <PianoudLogo size={42}/>
            <div style={{ display:"flex", flexDirection:"column", lineHeight:1 }}>
              <span className="font-display" style={{
                fontSize:22, fontWeight:700, letterSpacing:1,
                background:"linear-gradient(135deg,#F0D878 0%,#C9A84C 60%,#8B6914 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>
                Pianoud
              </span>
              <span style={{ fontSize:8, fontWeight:600, color:"rgba(201,168,76,0.5)", letterSpacing:3, textTransform:"uppercase", marginTop:1 }}>
                {isAr ? "موسيقى • تعليم" : "Music • Academy"}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden-mobile" style={{ display:"flex", alignItems:"center", gap:32 }}>
            {links.map((link: any) => (
              <Link key={link.href} href={link.href} className="nav-link"
                style={{ fontSize:14, fontWeight:600, color:"#F5F0E8", textDecoration:"none", transition:"color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-light)")}
                onMouseLeave={e => (e.currentTarget.style.color = "#F5F0E8")}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="hidden-mobile" style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>

            {/* Theme switcher */}
            <div style={{ position:"relative", zIndex:49 }}>
              <button
                onClick={(e) => { e.stopPropagation(); setThemeOpen(o => !o); setUserMenu(false) }}
                style={{
                  display:"flex", alignItems:"center", gap:6,
                  padding:"7px 14px", borderRadius:8,
                  border:"1px solid var(--border)",
                  background:"var(--gold-pale)",
                  color:"var(--gold)", fontSize:12, fontWeight:600,
                  cursor:"pointer",
                }}
              >
                <span>{current?.icon}</span>
                <span>{isAr ? current?.ar : current?.label}</span>
                <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                  <path d={themeOpen ? "M2 6.5l3-3 3 3" : "M2 3.5l3 3 3-3"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {themeOpen && (
                <div style={{
                  position:"absolute",
                  top:"calc(100% + 10px)",
                  right: isAr ? "auto" : 0,
                  left: isAr ? 0 : "auto",
                  width:170,
                  background:"var(--ink-card)",
                  border:"1px solid var(--border)",
                  borderRadius:12, overflow:"hidden",
                  zIndex:49,
                  boxShadow:"0 20px 60px rgba(0,0,0,0.5)",
                }}>
                  <div style={{ padding:"8px" }}>
                    {THEMES.map((t: any) => (
                      <button
                        key={t.key}
                        onClick={(e) => { e.stopPropagation(); setTheme(t.key); setThemeOpen(false) }}
                        style={{
                          width:"100%", display:"flex", alignItems:"center", gap:10,
                          padding:"10px 12px", borderRadius:8,
                          border:"none", cursor:"pointer",
                          background: theme===t.key ? "var(--gold-pale)" : "transparent",
                          color: theme===t.key ? "var(--gold)" : "var(--text-muted)",
                          fontSize:13, fontWeight: theme===t.key ? 700 : 500,
                          textAlign:"left",
                        }}
                        onMouseEnter={e => { if (theme!==t.key) (e.currentTarget as HTMLElement).style.background="var(--gold-pale)" }}
                        onMouseLeave={e => { if (theme!==t.key) (e.currentTarget as HTMLElement).style.background="transparent" }}
                      >
                        <span style={{ fontSize:16 }}>{t.icon}</span>
                        <span>{isAr ? t.ar : t.label}</span>
                        {theme===t.key && <span style={{ marginLeft:"auto", color:"var(--gold)" }}>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search */}
            <Link href="/search" style={{ padding:"7px", borderRadius:8, border:"1px solid var(--border)", background:"var(--gold-pale)", color:"var(--gold)", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", width:36, height:36 }}>🔍</Link>

            {/* Language */}
            <button onClick={() => setLang(isAr ? "en" : "ar")} style={{
              padding:"7px 14px", borderRadius:8,
              border:"1px solid var(--border)",
              background:"var(--gold-pale)",
              color:"var(--gold)", fontSize:12, fontWeight:600,
              cursor:"pointer",
            }}>
              {isAr ? "EN" : "عربي"}
            </button>

            {/* User menu */}
            {session ? (
              <div style={{ position:"relative", zIndex:49 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setUserMenu(o => !o); setThemeOpen(false) }}
                  style={{
                    display:"flex", alignItems:"center", gap:9,
                    padding:"7px 14px", borderRadius:10,
                    border:"1px solid var(--border)",
                    background:"var(--ink-card)",
                    cursor:"pointer",
                  }}
                >
                  <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#E8CB7E,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:"#0A0A0A" }}>
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span style={{ fontSize:13, color:"var(--cream)", fontWeight:500 }}>{user?.name?.split(" ")[0]}</span>
                  <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                    <path d="M2 3.5l3 3 3-3" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>

                {userMenu && (
                  <div style={{
                    position:"absolute",
                    top:"calc(100% + 10px)",
                    right: isAr ? "auto" : 0,
                    left: isAr ? 0 : "auto",
                    width:220,
                    background:"var(--ink-card)",
                    border:"1px solid var(--border)",
                    borderRadius:14, overflow:"hidden",
                    zIndex:49,
                    boxShadow:"0 20px 60px rgba(0,0,0,0.4)",
                  }}>
                    <div style={{ padding:"14px 18px", borderBottom:"1px solid var(--border)" }}>
                      <div style={{ fontSize:13, fontWeight:700, color:"var(--cream)" }}>{user?.name}</div>
                      <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:2 }}>{user?.email}</div>
                      <div style={{
                        display:"inline-block", fontSize:9, fontWeight:800, marginTop:6,
                        padding:"2px 8px", borderRadius:4, letterSpacing:1.5, textTransform:"uppercase",
                        background: user?.role==="ADMIN" ? "rgba(248,113,113,0.15)" : user?.role==="INSTRUCTOR" ? "rgba(96,165,250,0.15)" : "rgba(52,211,153,0.15)",
                        color: user?.role==="ADMIN" ? "#f87171" : user?.role==="INSTRUCTOR" ? "#60a5fa" : "#34d399",
                      }}>
                        {user?.role}
                      </div>
                    </div>
                    {[
                      { en:"My Dashboard", ar:"لوحتي",     href:getDashboardLink() },
                      { en:"My Courses",   ar:"دوراتي",    href:"/dashboard" },
                    { en:"Homework",      ar:"الواجبات",   href:"/dashboard/homework" },
                    { en:"Messages",      ar:"الرسائل",    href:"/dashboard/messages", badge:true },
                      { en:"Settings",     ar:"الإعدادات", href:"/dashboard/settings" },
                    ].map((item: any) => (
                      <Link key={item.href} href={item.href}
                        style={{ display:"block", padding:"11px 18px", fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="var(--gold-pale)"; (e.currentTarget as HTMLElement).style.color="var(--cream)" }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.color="var(--text-muted)" }}
                        onClick={() => setUserMenu(false)}>
                        {isAr ? item.ar : item.en}
                      </Link>
                    ))}
                    <button onClick={() => signOut({ callbackUrl:"/" })} style={{
                      width:"100%", textAlign: isAr ? "right" : "left",
                      padding:"11px 18px", fontSize:13, color:"#f87171",
                      background:"none", border:"none",
                      borderTop:"1px solid var(--border)",
                      cursor:"pointer",
                    }}>
                      {isAr ? "تسجيل الخروج" : "Sign Out"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/signin" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none", fontWeight:500 }}>
                  {isAr ? "دخول" : "Sign in"}
                </Link>
                <Link href="/auth/signup" className="btn-gold" style={{ padding:"10px 22px", fontSize:13, borderRadius:10 }}>
                  {isAr ? "ابدأ الآن" : "Get Started"}
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="show-mobile"
            style={{ display:"none", background:"none", border:"none", color:"var(--gold)", cursor:"pointer", padding:4 }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              {menuOpen
                ? <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                : <><line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background:"var(--ink-soft)", backdropFilter:"blur(20px)", borderTop:"1px solid var(--border)", padding:"24px 32px", display:"flex", flexDirection:"column", gap:20 }}>
            {links.map((link: any) => (
              <Link key={link.href} href={link.href}
                style={{ color:"var(--text-muted)", textDecoration:"none", fontSize:16 }}
                onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="gold-line"/>
            {/* Mobile theme buttons */}
            <div style={{ display:"flex", gap:8 }}>
              {THEMES.map((t: any) => (
                <button key={t.key} onClick={() => setTheme(t.key)} style={{
                  flex:1, padding:"9px 4px", borderRadius:8,
                  border:"1px solid",
                  borderColor: theme===t.key ? "var(--gold)" : "var(--border)",
                  background: theme===t.key ? "var(--gold-pale)" : "transparent",
                  color: theme===t.key ? "var(--gold)" : "var(--text-muted)",
                  fontSize:12, fontWeight:600, cursor:"pointer",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                }}>
                  <span style={{ fontSize:18 }}>{t.icon}</span>
                  <span>{isAr ? t.ar : t.label}</span>
                </button>
              ))}
            </div>
            {session ? (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <Link href={getDashboardLink()} className="btn-gold" style={{ textAlign:"center", justifyContent:"center" }} onClick={() => setMenuOpen(false)}>
                  {isAr ? "لوحتي" : "My Dashboard"}
                </Link>
                <button onClick={() => signOut({ callbackUrl:"/" })} className="btn-outline" style={{ width:"100%", justifyContent:"center" }}>
                  {isAr ? "تسجيل الخروج" : "Sign Out"}
                </button>
              </div>
            ) : (
              <div style={{ display:"flex", gap:12 }}>
                <Link href="/auth/signin" style={{ color:"var(--text-muted)", fontSize:14, textDecoration:"none" }}>{isAr?"دخول":"Sign in"}</Link>
                <Link href="/auth/signup" className="btn-gold" style={{ padding:"10px 20px", fontSize:13 }}>{isAr?"ابدأ الآن":"Get Started"}</Link>
              </div>
            )}
          </div>
        )}
      </header>

      <style>{`
        .hidden-mobile { display: flex !important; }
        .show-mobile   { display: none !important; }
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: block !important; }
        }
      `}</style>
    </>
  )
}
