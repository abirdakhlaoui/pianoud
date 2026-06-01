import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function InstructorDashboard() {
  const session = await auth()
  if (!session) redirect("/auth/signin")
  const user = session.user as any
  if (user.role !== "INSTRUCTOR" && user.role !== "ADMIN") redirect("/dashboard")

  const instructor = await prisma.instructor.findUnique({ where:{ userId: user.id } })

  const [totalStudents, totalCourses, unreadMessages, totalHomework] = await Promise.all([
    instructor ? prisma.enrollment.count({
      where: { course: { instructorId: instructor.id } }
    }) : Promise.resolve(0),
    instructor ? prisma.course.count({ where:{ instructorId: instructor.id } }) : Promise.resolve(0),
    prisma.message.count({ where:{ receiverId: user.id, read: false } }),
    prisma.homework.count({ where:{ instructorId: user.id } }),
  ])

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:60, background:"var(--ink)" }}>
      <div className="container">

        <div style={{ marginBottom:40 }}>
          <p style={{ color:"var(--gold)", fontSize:12, fontWeight:600, letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>
            Instructor Dashboard
          </p>
          <h1 className="font-display" style={{ fontSize:40, fontWeight:400, color:"var(--cream)" }}>
            Hello, <span className="gradient-text" style={{ fontWeight:700 }}>{user.name}</span>
          </h1>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:20, marginBottom:40 }}>
          {[
            { label:"My Courses",      value: totalCourses,   icon:"🎓" },
            { label:"Total Students",  value: totalStudents,  icon:"👥" },
            { label:"Homework Given",  value: totalHomework,  icon:"📝" },
            { label:"Unread Messages", value: unreadMessages, icon:"💬" },
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
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:16 }}>
          {[
            { label:"My Courses",        href:"/dashboard/instructor/courses",       icon:"🎓", desc:"Manage your courses" },
            { label:"My Students",      href:"/dashboard/instructor/students",      icon:"👥", desc:"View enrolled students" },
            { label:"Create Course",     href:"/dashboard/instructor/courses/new",   icon:"➕", desc:"Add a new course" },
            { label:"Live Sessions",     href:"/dashboard/instructor/meetings",      icon:"📅", desc:"Schedule with students" },
            { label:"Homework",          href:"/dashboard/homework",                 icon:"📝", desc:"Create & review homework", badge: 0 },
            { label:"Messages",          href:"/dashboard/messages",                 icon:"💬", desc:"Chat with students", badge: unreadMessages },
            { label:"Settings",          href:"/dashboard/settings",                 icon:"⚙️", desc:"Profile settings" },
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

      </div>
    </main>
  )
}
