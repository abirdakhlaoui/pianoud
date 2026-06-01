"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

const LESSONS = [
  { id:"l1", title:"Welcome & Course Overview", free:true  },
  { id:"l2", title:"Understanding the Basics",  free:true  },
  { id:"l3", title:"First Techniques",          free:false },
  { id:"l4", title:"Practice Session 1",        free:false },
  { id:"l5", title:"Advanced Topics",           free:false },
]

export default function CourseVideosPage() {
  const params   = useParams()
  const id       = params.id as string
  const { isAr } = useLang()
  const [videos, setVideos] = useState<Record<string,string>>({})
  const [saved, setSaved]   = useState(false)

  function extractId(url: string) {
    const m = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([\w-]{11})/)
    return m ? m[1] : url
  }

  const inputStyle: React.CSSProperties = {
    flex:1, padding:"10px 16px", borderRadius:8,
    border:"1px solid var(--border)", background:"var(--ink)",
    color:"var(--cream)", fontSize:13, outline:"none",
  }

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container" style={{ maxWidth:700 }}>

        <div style={{ marginBottom:40 }}>
          <Link href={"/dashboard/instructor/courses/" + id + "/edit"} style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
            {isAr ? "← تعديل الدورة" : "← Edit Course"}
          </Link>
          <h1 className="font-display" style={{ fontSize:32, fontWeight:400, color:"var(--cream)", marginTop:12 }}>
            {isAr ? "إدارة الفيديوهات" : "Manage Videos"}
          </h1>
        </div>

        {saved && (
          <div style={{ padding:"12px 20px", borderRadius:10, background:"rgba(52,211,153,0.1)", border:"1px solid rgba(52,211,153,0.3)", color:"#34d399", marginBottom:24 }}>
            {isAr ? "تم الحفظ ✓" : "Saved ✓"}
          </div>
        )}

        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {LESSONS.map((lesson, i) => {
            const videoId = videos[lesson.id] || ""
            const previewUrl = "https://www.youtube.com/watch?v=" + videoId
            return (
              <div key={lesson.id} className="card" style={{ padding:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:"var(--gold-pale)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"var(--gold)" }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize:15, fontWeight:600, color:"var(--cream)" }}>{lesson.title}</span>
                  {lesson.free && (
                    <span style={{ fontSize:10, padding:"2px 8px", borderRadius:4, background:"rgba(52,211,153,0.1)", color:"#34d399", fontWeight:700 }}>FREE</span>
                  )}
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <input
                    type="text"
                    value={videoId}
                    onChange={e => setVideos(prev => ({ ...prev, [lesson.id]: extractId(e.target.value) }))}
                    placeholder="https://www.youtube.com/watch?v=..."
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "var(--gold)"}
                    onBlur={e  => e.target.style.borderColor = "var(--border)"} />
                  {videoId && (
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding:"10px 16px", fontSize:12, flexShrink:0 }}>
                      {isAr ? "معاينة" : "Preview"}
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <button onClick={() => setSaved(true)} className="btn-gold" style={{ width:"100%", justifyContent:"center", padding:14, fontSize:15, marginTop:24 }}>
          {isAr ? "حفظ الفيديوهات" : "Save Videos"}
        </button>
      </div>
    </main>
  )
}
