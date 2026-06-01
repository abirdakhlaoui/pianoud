import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function AdminDashboard() {
  const session = await auth()
  if (!session) redirect("/auth/signin")
  const user = session.user as any
  if (user.role !== "ADMIN") redirect("/dashboard")

  const [totalUsers, totalCourses, totalEnrollments, revenueData, recentUsers, recentEnrollments] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.enrollment.aggregate({ _sum:{ paidAmount:true } }),
    prisma.user.findMany({ orderBy:{ createdAt:"desc" }, take:6, select:{ id:true, name:true, email:true, role:true, createdAt:true } }),
    prisma.enrollment.findMany({
      orderBy:{ enrolledAt:"desc" }, take:5,
      include:{
        user:   { select:{ name:true, email:true } },
        course: { select:{ title_en:true, instrument:true, price:true } },
      }
    }),
  ])

  const revenue = revenueData._sum.paidAmount || 0

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:60, background:"var(--ink)" }}>
      <div className="container">

        <div style={{ marginBottom:40 }}>
          <p style={{ color:"var(--gold)", fontSize:12, fontWeight:600, letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>Admin Panel</p>
          <h1 className="font-display" style={{ fontSize:40, fontWeight:400, color:"var(--cream)" }}>
            Welcome, <span className="gradient-text" style={{ fontWeight:700 }}>{user.name}</span>
          </h1>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:20, marginBottom:40 }}>
          {[
            { label:"Total Users",       value:totalUsers,                   icon:"👥", color:"#60a5fa" },
            { label:"Total Courses",     value:totalCourses,                 icon:"🎓", color:"var(--gold)" },
            { label:"Total Enrollments", value:totalEnrollments,             icon:"📋", color:"#34d399" },
            { label:"Total Revenue",     value:`${revenue.toFixed(0)} SAR`,  icon:"💰", color:"#fbbf24" },
          ].map((stat: any) => (
            <div key={stat.label} className="card" style={{ padding:24, display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ width:48, height:48, borderRadius:12, background:`${stat.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>
                {stat.icon}
              </div>
              <div>
                <div className="font-display" style={{ fontSize:26, fontWeight:700, color:stat.color }}>{stat.value}</div>
                <div style={{ fontSize:13, color:"var(--text-muted)", marginTop:2 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:16, marginBottom:48 }}>
          {[
            { label:"Manage Users",    href:"/dashboard/admin/users",   icon:"👥", desc:"View & manage all users" },
            { label:"All Courses",     href:"/courses",                  icon:"🎓", desc:"Browse all courses" },
            { label:"Messages",        href:"/dashboard/messages",       icon:"💬", desc:"Platform messages" },
            { label:"Homework",        href:"/dashboard/homework",       icon:"📝", desc:"View all homework" },
            { label:"Enrollments",     href:"/dashboard/admin/enrollments", icon:"📋", desc:"Manage enrollments manually" },
          ].map((item: any) => (
            <Link key={item.href} href={item.href} style={{ textDecoration:"none" }}>
              <div className="card" style={{ padding:24 }}>
                <span style={{ fontSize:32, display:"block", marginBottom:12 }}>{item.icon}</span>
                <div style={{ fontSize:15, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>{item.label}</div>
                <div style={{ fontSize:13, color:"var(--text-muted)" }}>{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent data */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>

          {/* Recent users */}
          <div className="card" style={{ padding:28 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)" }}>Recent Users</h2>
              <Link href="/dashboard/admin/users" style={{ fontSize:13, color:"var(--gold)", textDecoration:"none" }}>View all →</Link>
            </div>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {recentUsers.map((u: any, i: any) => (
                <div key={u.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom: i<recentUsers.length-1?"1px solid var(--border)":"none" }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"var(--gold)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#0A0A0A", flexShrink:0 }}>
                    {u.name[0].toUpperCase()}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:"var(--cream)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{u.name}</div>
                    <div style={{ fontSize:11, color:"var(--text-muted)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{u.email}</div>
                  </div>
                  <span style={{ fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:4, flexShrink:0,
                    background: u.role==="ADMIN"?"rgba(248,113,113,0.1)":u.role==="INSTRUCTOR"?"rgba(96,165,250,0.1)":"rgba(52,211,153,0.1)",
                    color: u.role==="ADMIN"?"#f87171":u.role==="INSTRUCTOR"?"#60a5fa":"#34d399",
                  }}>
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent enrollments */}
          <div className="card" style={{ padding:28 }}>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:24 }}>
              Recent Enrollments
            </h2>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {recentEnrollments.length === 0 ? (
                <p style={{ fontSize:14, color:"var(--text-muted)" }}>No enrollments yet.</p>
              ) : recentEnrollments.map((e: any, i: any) => (
                <div key={e.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom: i<recentEnrollments.length-1?"1px solid var(--border)":"none" }}>
                  <span style={{ fontSize:24, flexShrink:0 }}>{e.course.instrument==="PIANO"?"🎹":"🪘"}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:"var(--cream)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.user.name}</div>
                    <div style={{ fontSize:11, color:"var(--text-muted)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.course.title_en}</div>
                  </div>
                  <div style={{ fontSize:13, fontWeight:600, color:"var(--gold)", flexShrink:0 }}>
                    {e.paidAmount} SAR
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
