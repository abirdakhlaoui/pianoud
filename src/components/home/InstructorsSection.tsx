"use client"

import Image from "next/image"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

const INSTRUCTORS = [
  { id:"1", name_en:"Ons Wafa Romdhani", name_ar:"أنس الوفاء رمضاني", instrument:"PIANO", specialty_en:"Classical & Contemporary Piano", specialty_ar:"البيانو الكلاسيكي والمعاصر", experience:12, rating:4.9, students:1254, courses:3, photo:"/ons.jpeg" },
  { id:"2", name_en:"Omar Algour",        name_ar:"عمر الغور",        instrument:"OUD",   specialty_en:"Arabic Maqam & Oud Performance",  specialty_ar:"المقامات العربية وأداء العود",  experience:15, rating:4.8, students:1835, courses:3, photo:"/omar.jpeg" },
]

export default function InstructorsSection() {
  const { isAr } = useLang()

  return (
    <section dir={isAr?"rtl":"ltr"} style={{ padding:"120px 0", background:"var(--ink-soft)", borderTop:"1px solid var(--border)" }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:72 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:32, height:1, background:"var(--gold)", opacity:0.6 }}/>
            <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase" }}>
              {isAr ? "مدرّسونا" : "Our Instructors"}
            </span>
            <div style={{ width:32, height:1, background:"var(--gold)", opacity:0.6 }}/>
          </div>
          <h2 className="font-display" style={{ fontSize:"clamp(36px,5vw,60px)", fontWeight:300, color:"var(--cream)", lineHeight:1.1 }}>
            {isAr
              ? <>تعلّم من <span className="gradient-text" style={{fontWeight:800}}>خبراء حقيقيين</span></>
              : <>Learn from <span className="gradient-text" style={{fontWeight:800}}>real experts</span></>}
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:32, maxWidth:860, margin:"0 auto" }}>
          {INSTRUCTORS.map((inst: any) => (
            <Link key={inst.id} href={`/instructors`} style={{ textDecoration:"none" }}>
              <article style={{
                borderRadius:24,
                overflow:"hidden",
                border:"1px solid var(--border)",
                background:"var(--ink-card)",
                transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "rgba(201,168,76,0.3)"
                  el.style.transform = "translateY(-6px)"
                  el.style.boxShadow = "0 24px 60px rgba(0,0,0,0.5)"
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "var(--border)"
                  el.style.transform = "translateY(0)"
                  el.style.boxShadow = "none"
                }}>

                {/* Photo */}
                <div style={{ position:"relative", height:280, overflow:"hidden", background:"var(--ink)" }}>
                  <Image src={inst.photo} alt={inst.name_en} fill style={{ objectFit:"cover", objectPosition:"top" }}/>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, var(--ink-card) 0%, transparent 60%)" }}/>
                  {/* Instrument badge */}
                  <div style={{ position:"absolute", top:16, right:16 }}>
                    <span style={{ fontSize:11, fontWeight:700, padding:"5px 14px", borderRadius:999, letterSpacing:1,
                      color: inst.instrument==="PIANO" ? "#60a5fa" : "var(--gold)",
                      background: inst.instrument==="PIANO" ? "rgba(96,165,250,0.15)" : "rgba(201,168,76,0.15)",
                      backdropFilter:"blur(10px)",
                      border:`1px solid ${inst.instrument==="PIANO" ? "rgba(96,165,250,0.3)" : "rgba(201,168,76,0.3)"}`,
                    }}>
                      {inst.instrument==="PIANO" ? (isAr?"بيانو":"Piano") : (isAr?"عود":"Oud")}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding:"24px 28px 28px" }}>
                  <h3 className="font-display" style={{ fontSize:22, fontWeight:700, color:"var(--cream)", marginBottom:4 }}>
                    {isAr ? inst.name_ar : inst.name_en}
                  </h3>
                  <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:20 }}>
                    {isAr ? inst.specialty_ar : inst.specialty_en}
                  </p>
                  <div className="gold-line" style={{ marginBottom:20 }}/>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                    {[
                      { value:`${inst.experience}`, label_en:"yrs exp",  label_ar:"سنة" },
                      { value:`${inst.rating}★`,    label_en:"rating",   label_ar:"تقييم" },
                      { value:inst.students.toLocaleString(), label_en:"students", label_ar:"طالب" },
                    ].map((stat: any, i: any) => (
                      <div key={i} style={{ textAlign:"center", padding:"12px 8px", background:"var(--ink)", borderRadius:10 }}>
                        <div style={{ fontSize:16, fontWeight:700, color:"var(--cream)" }}>{stat.value}</div>
                        <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:3 }}>{isAr?stat.label_ar:stat.label_en}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div style={{ textAlign:"center", marginTop:48 }}>
          <Link href="/instructors" className="btn-outline">
            {isAr ? "عرض الملفات الكاملة" : "View Full Profiles"}
          </Link>
        </div>
      </div>
    </section>
  )
}
