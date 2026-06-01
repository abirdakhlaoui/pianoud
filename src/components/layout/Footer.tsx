"use client"

import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

export default function Footer() {
  const { isAr } = useLang()

  return (
    <footer style={{ background:"var(--ink-soft)", borderTop:"1px solid var(--border)", padding:"60px 0 32px" }} dir={isAr?"rtl":"ltr"}>
      <div className="container">
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:48 }} className="footer-grid">

          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration:"none", display:"inline-block", marginBottom:16 }}>
              <span className="font-display" style={{ fontSize:24, fontWeight:700, background:"linear-gradient(135deg,#F0D878,#C9A84C,#8B6914)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Pianoud
              </span>
              <div style={{ fontSize:9, color:"rgba(201,168,76,0.4)", letterSpacing:3, textTransform:"uppercase", marginTop:2 }}>
                Online Music Academy
              </div>
            </Link>
            <p style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.8, maxWidth:280, marginBottom:20 }}>
              {isAr
                ? "منصة تعليم البيانو والعود أونلاين. دروس احترافية بالعربية والإنجليزية لجميع المستويات."
                : "Online Piano & Oud learning platform. Professional bilingual courses for all levels."}
            </p>
            <div style={{ display:"flex", gap:10 }}>
              {[
                { label:"YouTube",   color:"#f87171", href:"#" },
                { label:"Instagram", color:"#c084fc", href:"#" },
                { label:"Facebook",  color:"#60a5fa", href:"#" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize:11, padding:"5px 12px", borderRadius:6, border:"1px solid var(--border)", color:"var(--text-muted)", textDecoration:"none", transition:"all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=s.color; (e.currentTarget as HTMLElement).style.color=s.color }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; (e.currentTarget as HTMLElement).style.color="var(--text-muted)" }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 style={{ fontSize:13, fontWeight:700, color:"var(--cream)", letterSpacing:2, textTransform:"uppercase", marginBottom:20 }}>
              {isAr?"الدورات":"Courses"}
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                { en:"Piano Fundamentals", ar:"أساسيات البيانو",  href:"/courses/piano-fundamentals" },
                { en:"Oud for Beginners",  ar:"العود للمبتدئين",  href:"/courses/oud-beginners"      },
                { en:"Arabic Piano",       ar:"البيانو العربي",   href:"/courses/arabic-piano"       },
                { en:"Piano KIDS",         ar:"البيانو للأطفال",  href:"/courses/piano-kids"         },
                { en:"View All",           ar:"جميع الدورات",     href:"/courses"                    },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  style={{ fontSize:14, color:"var(--text-muted)", textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color="var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color="var(--text-muted)")}>
                  {isAr?link.ar:link.en}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 style={{ fontSize:13, fontWeight:700, color:"var(--cream)", letterSpacing:2, textTransform:"uppercase", marginBottom:20 }}>
              {isAr?"الشركة":"Company"}
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                { en:"About Us",     ar:"عن Pianoud",    href:"/about"       },
                { en:"Instructors",  ar:"المدرّسون",     href:"/instructors" },
                { en:"Contact",      ar:"تواصل معنا",    href:"/contact"     },
                { en:"Search",       ar:"البحث",         href:"/search"      },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  style={{ fontSize:14, color:"var(--text-muted)", textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color="var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color="var(--text-muted)")}>
                  {isAr?link.ar:link.en}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 style={{ fontSize:13, fontWeight:700, color:"var(--cream)", letterSpacing:2, textTransform:"uppercase", marginBottom:20 }}>
              {isAr?"الحساب":"Account"}
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                { en:"Sign In",     ar:"تسجيل الدخول",  href:"/auth/signin"   },
                { en:"Sign Up",     ar:"إنشاء حساب",    href:"/auth/signup"   },
                { en:"Dashboard",   ar:"لوحة التحكم",   href:"/dashboard"     },
                { en:"My Progress", ar:"تقدّمي",         href:"/dashboard/progress" },
                { en:"Settings",    ar:"الإعدادات",      href:"/dashboard/settings" },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  style={{ fontSize:14, color:"var(--text-muted)", textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color="var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color="var(--text-muted)")}>
                  {isAr?link.ar:link.en}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="gold-line" style={{ marginBottom:24 }}/>

        {/* Bottom */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <p style={{ fontSize:13, color:"var(--text-muted)" }}>
            © {new Date().getFullYear()} Pianoud — Online Music Academy.{" "}
            {isAr?"جميع الحقوق محفوظة.":"All rights reserved."}
          </p>
          <div style={{ display:"flex", gap:16 }}>
            <Link href="/contact" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}
              onMouseEnter={e => (e.currentTarget.style.color="var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color="var(--text-muted)")}>
              {isAr?"سياسة الخصوصية":"Privacy Policy"}
            </Link>
            <Link href="/contact" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}
              onMouseEnter={e => (e.currentTarget.style.color="var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color="var(--text-muted)")}>
              {isAr?"الشروط والأحكام":"Terms of Service"}
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        @media(max-width:900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:600px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
