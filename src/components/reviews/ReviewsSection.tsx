"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useLang } from "@/components/providers/LangProvider"
import Link from "next/link"

type Review = {
  id: string
  rating: number
  comment: string
  createdAt: string
  user: { name: string }
}

export default function ReviewsSection({ courseSlug }: { courseSlug: string }) {
  const { data: session } = useSession()
  const { isAr }          = useLang()
  const user              = session?.user as any

  const [reviews, setReviews]     = useState<Review[]>([])
  const [avg, setAvg]             = useState(0)
  const [total, setTotal]         = useState(0)
  const [loading, setLoading]     = useState(true)
  const [myRating, setMyRating]   = useState(0)
  const [hoverRating, setHover]   = useState(0)
  const [comment, setComment]     = useState("")
  const [submitting, setSubmit]   = useState(false)
  const [success, setSuccess]     = useState("")
  const [error, setError]         = useState("")
  const [isEnrolled, setEnrolled] = useState(false)

  useEffect(() => {
    fetchReviews()
    if (session) checkEnrollment()
  }, [session])

  async function fetchReviews() {
    const res  = await fetch(`/api/reviews?slug=${courseSlug}`)
    const data = await res.json()
    setReviews(data.reviews || [])
    setAvg(data.avg || 0)
    setTotal(data.total || 0)
    setLoading(false)
  }

  async function checkEnrollment() {
    const res  = await fetch(`/api/enrollment/check?slug=${courseSlug}`)
    const data = await res.json()
    setEnrolled(data.enrolled)
  }

  async function submitReview(e: React.FormEvent) {
    e.preventDefault()
    if (!myRating) { setError(isAr?"اختر تقييماً":"Please select a rating"); return }
    if (comment.length < 10) { setError(isAr?"الرأي قصير جداً (10 أحرف على الأقل)":"Review too short (min 10 chars)"); return }
    setSubmit(true)
    setError("")

    const res  = await fetch("/api/reviews", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ courseSlug, rating: myRating, comment }),
    })
    const data = await res.json()
    setSubmit(false)

    if (res.ok) {
      setSuccess(isAr?"تم نشر تقييمك ✓":"Review published ✓")
      setComment("")
      setMyRating(0)
      fetchReviews()
      setTimeout(() => setSuccess(""), 3000)
    } else {
      setError(data.error || "Error")
    }
  }

  function formatDate(str: string) {
    return new Date(str).toLocaleDateString(isAr ? "ar-SA" : "en-US", { year:"numeric", month:"long", day:"numeric" })
  }

  const ratingBars = [5,4,3,2,1].map((star: any) => ({
    star,
    count: reviews.filter((r: any) => r.rating === star).length,
    pct:   total ? Math.round((reviews.filter((r: any) =>r.rating===star).length/total)*100) : 0,
  }))

  return (
    <div dir={isAr?"rtl":"ltr"}>

      {/* Rating summary */}
      {total > 0 && (
        <div className="card" style={{ padding:28, marginBottom:28, display:"flex", gap:32, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ textAlign:"center", flexShrink:0 }}>
            <div className="font-display gradient-text" style={{ fontSize:56, fontWeight:800, lineHeight:1 }}>{avg}</div>
            <div style={{ display:"flex", gap:2, justifyContent:"center", margin:"8px 0" }}>
              {[1,2,3,4,5].map((s: any) =>(
                <span key={s} style={{ fontSize:20, color:s<=Math.round(avg)?"var(--gold)":"var(--border)" }}>★</span>
              ))}
            </div>
            <div style={{ fontSize:12, color:"var(--text-muted)" }}>
              {total} {isAr?"تقييم":"reviews"}
            </div>
          </div>

          <div style={{ flex:1, minWidth:180 }}>
            {ratingBars.map((bar: any) => (
              <div key={bar.star} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                <span style={{ fontSize:12, color:"var(--text-muted)", width:20, textAlign:"center" }}>{bar.star}★</span>
                <div style={{ flex:1, height:6, background:"var(--border)", borderRadius:3, overflow:"hidden" }}>
                  <div style={{ height:"100%", background:"var(--gold)", borderRadius:3, width:`${bar.pct}%`, transition:"width 0.5s ease" }}/>
                </div>
                <span style={{ fontSize:11, color:"var(--text-muted)", width:28 }}>{bar.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Write a review */}
      {session ? (
        isEnrolled ? (
          <div className="card" style={{ padding:28, marginBottom:28 }}>
            <h3 className="font-display" style={{ fontSize:18, fontWeight:600, color:"var(--cream)", marginBottom:20 }}>
              {isAr ? "✍️ اكتب تقييمك" : "✍️ Write a Review"}
            </h3>

            {success && (
              <div style={{ padding:"10px 16px", borderRadius:8, background:"rgba(52,211,153,0.1)", border:"1px solid rgba(52,211,153,0.3)", color:"#34d399", fontSize:13, marginBottom:16 }}>
                {success}
              </div>
            )}
            {error && (
              <div style={{ padding:"10px 16px", borderRadius:8, background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", color:"#f87171", fontSize:13, marginBottom:16 }}>
                {error}
              </div>
            )}

            <form onSubmit={submitReview} style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {/* Star selector */}
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:10 }}>
                  {isAr ? "تقييمك:" : "Your Rating:"}
                </label>
                <div style={{ display:"flex", gap:6 }}>
                  {[1,2,3,4,5].map((s: any) => (
                    <button key={s} type="button"
                      onClick={() => setMyRating(s)}
                      onMouseEnter={() => setHover(s)}
                      onMouseLeave={() => setHover(0)}
                      style={{ fontSize:32, background:"none", border:"none", cursor:"pointer", transition:"transform 0.1s", transform: (hoverRating||myRating)>=s?"scale(1.2)":"scale(1)" }}>
                      <span style={{ color: (hoverRating||myRating)>=s ? "var(--gold)" : "var(--border)" }}>★</span>
                    </button>
                  ))}
                  {(hoverRating||myRating) > 0 && (
                    <span style={{ fontSize:13, color:"var(--text-muted)", alignSelf:"center", marginLeft:8 }}>
                      {["","⭐ Poor","⭐⭐ Fair","⭐⭐⭐ Good","⭐⭐⭐⭐ Great","⭐⭐⭐⭐⭐ Excellent"][hoverRating||myRating]}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  {isAr ? "تعليقك:" : "Your Review:"}
                </label>
                <textarea value={comment} onChange={e=>setComment(e.target.value)} rows={4}
                  placeholder={isAr
                    ? "شاركنا تجربتك مع هذه الدورة..."
                    : "Share your experience with this course..."}
                  style={{ width:"100%", padding:"12px 16px", borderRadius:8, border:"1px solid var(--border)", background:"var(--ink)", color:"var(--cream)", fontSize:14, outline:"none", resize:"vertical", fontFamily:"var(--font-body)" }}
                  onFocus={e=>e.target.style.borderColor="var(--gold)"}
                  onBlur={e =>e.target.style.borderColor="var(--border)"} />
                <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:4, textAlign: isAr?"left":"right" }}>
                  {comment.length}/500
                </div>
              </div>

              <button type="submit" disabled={submitting} className="btn-gold"
                style={{ alignSelf:"flex-start", padding:"11px 28px", opacity:submitting?0.7:1 }}>
                {submitting ? (isAr?"جاري النشر...":"Publishing...") : (isAr?"نشر التقييم":"Publish Review")}
              </button>
            </form>
          </div>
        ) : (
          <div className="card" style={{ padding:24, marginBottom:28, textAlign:"center" }}>
            <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:16 }}>
              {isAr ? "يجب أن تكون مسجّلاً في الدورة لتترك تقييماً." : "You must be enrolled in this course to leave a review."}
            </p>
            <Link href={`/checkout/${courseSlug}`} className="btn-gold" style={{ padding:"10px 24px", fontSize:13 }}>
              {isAr ? "سجّل الآن" : "Enroll Now"}
            </Link>
          </div>
        )
      ) : (
        <div className="card" style={{ padding:24, marginBottom:28, textAlign:"center" }}>
          <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:16 }}>
            {isAr ? "سجّل دخولك لترك تقييم." : "Sign in to leave a review."}
          </p>
          <Link href="/auth/signin" className="btn-outline" style={{ padding:"10px 24px", fontSize:13 }}>
            {isAr ? "تسجيل الدخول" : "Sign In"}
          </Link>
        </div>
      )}

      {/* Reviews list */}
      {loading ? (
        <div style={{ textAlign:"center", padding:"32px 0", color:"var(--text-muted)" }}>
          {isAr ? "جاري التحميل..." : "Loading reviews..."}
        </div>
      ) : reviews.length === 0 ? (
        <div style={{ textAlign:"center", padding:"40px 0" }}>
          <div style={{ fontSize:40, marginBottom:12 }}>💬</div>
          <p style={{ fontSize:15, color:"var(--text-muted)" }}>
            {isAr ? "لا توجد تقييمات بعد — كن أول من يقيّم!" : "No reviews yet — be the first to review!"}
          </p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {reviews.map((review: any) => (
            <div key={review.id} className="card" style={{ padding:24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#E8CB7E,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:"#0A0A0A", flexShrink:0 }}>
                  {review.user.name[0].toUpperCase()}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600, color:"var(--cream)" }}>{review.user.name}</div>
                  <div style={{ fontSize:11, color:"var(--text-muted)" }}>{formatDate(review.createdAt)}</div>
                </div>
                <div style={{ display:"flex", gap:1 }}>
                  {[1,2,3,4,5].map((s: any) =>(
                    <span key={s} style={{ fontSize:14, color:s<=review.rating?"var(--gold)":"var(--border)" }}>★</span>
                  ))}
                </div>
              </div>
              <p style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.8, fontStyle:"italic" }}>
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
