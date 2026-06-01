import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function StudentDashboard() {
  const session = await auth()
  if (!session) redirect("/auth/signin")
  const user = session.user as any

  const [enrollments, completedLessons, unreadMessages] = await Promise.all([
    prisma.enrollment.findMany({
      where: { userId: user.id },
      include: { course: { select: { title_en:true, title_ar:true, instrument:true, level:true, slug:true } } },
      orderBy: { enrolledAt:"desc" },
    }),
    prisma.progress.count({ where: { userId: user.id, completed: true } }),
    prisma.message.count({ where: { receiverId: user.id, read: false } }),
  ])

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:60, background:"var(--ink)" }}>
      <div className="container">

        <div style={{ marginBottom:40 }}>
          <p style={{ color:"var(--gold)", fontSize:12, fontWeight:600, letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>
            Student Dashboard
          </p>
          <h1 className="font-display" style={{ fontSize:40, fontWeight:400, color:"var(--cream)" }}>
            Welcome back, <span className="gradient-text" style={{ fontWeight:700 }}>{user.name}</span>
          </h1>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:20, marginBottom:40 }}>
          {[
            { label:"Enrolled Courses",  value: enrollments.length,  icon:"📚" },
            { label:"Lessons Completed", value: completedLessons,    icon:"✅" },
            { label:"Unread Messages",   value: unreadMessages,      icon:"💬" },
            { label:"Certificates",      value: enrollments.filter((e: any) =>e.status==="COMPLETED").length, icon:"🏆" },
          ].map((stat: any) => (
            <div key={stat.label} className="card" style={{ padding:24, display:"flex", alignItems:"center", gap:16 }}>
              <span style={{ fontSize:32 }}>{stat.icon}</span>
              <div>
                <div className="font-display" style={{ fontSize:28, fontWeight:700, color:"var(--cream)" }}>{stat.value}</div>
                <div style={{ fontSize:13, color:"var(--text-muted)", marginTop:2 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:16, marginBottom:40 }}>
          {[
            { label:"Browse Courses",  href:"/courses",               icon:"🎓", desc:"Find new courses" },
            { label:"My Progress",      href:"/dashboard/progress",    icon:"📊", desc:"Track your learning" },
            { label:"My Homework",     href:"/dashboard/homework",    icon:"📝", desc:"View & submit homework" },
            { label:"Live Sessions",    href:"/dashboard/meetings",    icon:"📅", desc:"View scheduled sessions" },
            { label:"Messages",        href:"/dashboard/messages",    icon:"💬", desc:"Chat with instructor", badge: unreadMessages },
            { label:"Settings",        href:"/dashboard/settings",    icon:"⚙️", desc:"Account settings" },
            { label:"Certificates",     href:"/dashboard/certificate", icon:"🎓", desc:"Download your certificates" },
          ].map((item: any) => (
            <Link key={item.href} href={item.href} style={{ textDecoration:"none" }}>
              <div className="card" style={{ padding:24, position:"relative" }}>
                {item.badge ? (
                  <div style={{ position:"absolute", top:16, right:16, width:20, height:20, borderRadius:"50%", background:"#f87171", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:"#fff" }}>
                    {item.badge}
                  </div>
                ) : null}
                <span style={{ fontSize:32, display:"block", marginBottom:12 }}>{item.icon}</span>
                <div style={{ fontSize:15, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>{item.label}</div>
                <div style={{ fontSize:13, color:"var(--text-muted)" }}>{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* My courses */}
        {enrollments.length === 0 ? (
          <div className="card" style={{ padding:40, textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🎵</div>
            <p style={{ fontSize:18, color:"var(--text-muted)", marginBottom:20 }}>
              You haven't enrolled in any courses yet.
            </p>
            <Link href="/courses" className="btn-gold">Browse Courses</Link>
          </div>
        ) : (
          <div>
            <h2 className="font-display" style={{ fontSize:24, fontWeight:600, color:"var(--cream)", marginBottom:20 }}>
              My Courses
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {enrollments.map((enrollment: any) => (
                <div key={enrollment.id} className="card" style={{ padding:22, display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
                  <div style={{ width:52, height:52, borderRadius:10, background: enrollment.course.instrument==="PIANO" ? "linear-gradient(135deg,#0d1117,#1a1a2e)" : "linear-gradient(135deg,#0d1117,#1a0a00)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>
                    {enrollment.course.instrument==="PIANO" ? "🎹" : "🪘"}
                  </div>
                  <div style={{ flex:1, minWidth:200 }}>
                    <div style={{ fontSize:15, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
                      {enrollment.course.title_en}
                    </div>
                    <div style={{ fontSize:12, color:"var(--text-muted)" }}>
                      {enrollment.course.level} • Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span style={{ fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:999,
                    background: enrollment.status==="ACTIVE" ? "rgba(52,211,153,0.1)" : "rgba(201,168,76,0.1)",
                    color: enrollment.status==="ACTIVE" ? "#34d399" : "var(--gold)",
                  }}>
                    {enrollment.status}
                  </span>
                  <div style={{ display:"flex", gap:8 }}>
                    <Link href={`/courses/${enrollment.course.slug}/learn`} className="btn-gold" style={{ padding:"8px 16px", fontSize:13 }}>Continue →</Link>
                    <Link href={`/dashboard/certificate?slug=${enrollment.course.slug}`} className="btn-outline" style={{ padding:"8px 14px", fontSize:12 }}>🎓</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
