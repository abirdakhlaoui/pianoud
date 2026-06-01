"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type User = {
  id:        string
  name:      string
  email:     string
  role:      any
  createdAt: any
  _count:    { enrollments: number }
}

const ROLE_STYLE: Record<string,{bg:string;color:string}> = {
  ADMIN:      { bg:"rgba(248,113,113,0.15)", color:"#f87171" },
  INSTRUCTOR: { bg:"rgba(96,165,250,0.15)",  color:"#60a5fa" },
  STUDENT:    { bg:"rgba(52,211,153,0.15)",  color:"#34d399" },
}

export default function AdminUsersClient({ users, currentUserId }: { users: User[]; currentUserId: string }) {
  const router  = useRouter()
  const [list, setList]         = useState<User[]>(users)
  const [search, setSearch]     = useState("")
  const [filter, setFilter]     = useState("ALL")
  const [loading, setLoading]   = useState<string|null>(null)
  const [confirm, setConfirm]   = useState<string|null>(null)
  const [msg, setMsg]           = useState("")

  const filtered = list.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "ALL" || u.role === filter
    return matchSearch && matchFilter
  })

  async function changeRole(userId: string, role: string) {
    setLoading(userId + role)
    const res = await fetch("/api/admin/users/role", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ userId, role }),
    })
    if (res.ok) {
      setList(prev => prev.map(u => u.id===userId ? { ...u, role } : u))
      setMsg(`Role updated to ${role} ✓`)
      setTimeout(() => setMsg(""), 3000)
    }
    setLoading(null)
  }

  async function deleteUser(userId: string) {
    setLoading("delete" + userId)
    const res = await fetch(`/api/admin/users/${userId}`, { method:"DELETE" })
    if (res.ok) {
      setList(prev => prev.filter(u => u.id !== userId))
      setConfirm(null)
      setMsg("User deleted ✓")
      setTimeout(() => setMsg(""), 3000)
    }
    setLoading(null)
  }

  const counts = {
    ALL:        list.length,
    STUDENT:    list.filter(u=>u.role==="STUDENT").length,
    INSTRUCTOR: list.filter(u=>u.role==="INSTRUCTOR").length,
    ADMIN:      list.filter(u=>u.role==="ADMIN").length,
  }

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:60, background:"var(--ink)" }}>
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom:32 }}>
          <Link href="/dashboard/admin" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
            ← Admin Panel
          </Link>
          <h1 className="font-display" style={{ fontSize:40, fontWeight:400, color:"var(--cream)", marginTop:12 }}>
            Manage Users
          </h1>
          <p style={{ color:"var(--text-muted)", fontSize:14, marginTop:4 }}>{list.length} total users</p>
        </div>

        {/* Success message */}
        {msg && (
          <div style={{ padding:"12px 20px", borderRadius:10, background:"rgba(52,211,153,0.1)", border:"1px solid rgba(52,211,153,0.3)", color:"#34d399", fontSize:14, marginBottom:24, fontWeight:500 }}>
            {msg}
          </div>
        )}

        {/* Filters */}
        <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex:1, minWidth:240, padding:"10px 16px", borderRadius:8, border:"1px solid var(--border)", background:"var(--ink-card)", color:"var(--cream)", fontSize:14, outline:"none" }}
            onFocus={e=>e.target.style.borderColor="var(--gold)"}
            onBlur={e =>e.target.style.borderColor="var(--border)"} />

          <div style={{ display:"flex", gap:8 }}>
            {(["ALL","STUDENT","INSTRUCTOR","ADMIN"] as const).map(role => (
              <button key={role} onClick={() => setFilter(role)} style={{
                padding:"9px 16px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer",
                border:"1px solid",
                borderColor: filter===role ? "var(--gold)" : "var(--border)",
                background: filter===role ? "var(--gold-pale)" : "transparent",
                color: filter===role ? "var(--gold)" : "var(--text-muted)",
              }}>
                {role} ({counts[role]})
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ overflow:"hidden" }}>
          {/* Header */}
          <div style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr auto", gap:16, padding:"14px 24px", background:"var(--ink-soft)", borderBottom:"1px solid var(--border)" }}>
            {["USER","EMAIL","ROLE","COURSES","JOINED","ACTIONS"].map(h => (
              <span key={h} style={{ fontSize:11, fontWeight:700, color:"var(--text-muted)", letterSpacing:1.5 }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div style={{ padding:"40px", textAlign:"center", color:"var(--text-muted)", fontSize:14 }}>
              No users found
            </div>
          ) : filtered.map((u, i) => {
            const rs = ROLE_STYLE[u.role]
            const isMe = u.id === currentUserId
            return (
              <div key={u.id} style={{
                display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr auto",
                gap:16, padding:"16px 24px", alignItems:"center",
                borderBottom: i<filtered.length-1 ? "1px solid var(--border)" : "none",
                background: isMe ? "rgba(201,168,76,0.03)" : "transparent",
              }}>

                {/* User */}
                <div style={{ display:"flex", alignItems:"center", gap:12, minWidth:0 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#E8CB7E,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"#0A0A0A", flexShrink:0 }}>
                    {u.name[0].toUpperCase()}
                  </div>
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:"var(--cream)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {u.name} {isMe && <span style={{ fontSize:10, color:"var(--gold)" }}>(you)</span>}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div style={{ fontSize:13, color:"var(--text-muted)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {u.email}
                </div>

                {/* Role */}
                <div>
                  <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:6, letterSpacing:1, background:rs.bg, color:rs.color }}>
                    {u.role}
                  </span>
                </div>

                {/* Enrollments */}
                <div style={{ fontSize:13, color:"var(--text-muted)", textAlign:"center" }}>
                  {u._count.enrollments}
                </div>

                {/* Joined */}
                <div style={{ fontSize:12, color:"var(--text-muted)" }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </div>

                {/* Actions */}
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {!isMe && u.role !== "STUDENT" && (
                    <button onClick={() => changeRole(u.id,"STUDENT")}
                      disabled={loading===u.id+"STUDENT"}
                      style={{ padding:"5px 10px", fontSize:11, fontWeight:600, borderRadius:6, border:"1px solid rgba(52,211,153,0.3)", background:"rgba(52,211,153,0.08)", color:"#34d399", cursor:"pointer", opacity:loading===u.id+"STUDENT"?0.5:1 }}>
                      Student
                    </button>
                  )}
                  {!isMe && u.role !== "INSTRUCTOR" && (
                    <button onClick={() => changeRole(u.id,"INSTRUCTOR")}
                      disabled={loading===u.id+"INSTRUCTOR"}
                      style={{ padding:"5px 10px", fontSize:11, fontWeight:600, borderRadius:6, border:"1px solid rgba(96,165,250,0.3)", background:"rgba(96,165,250,0.08)", color:"#60a5fa", cursor:"pointer", opacity:loading===u.id+"INSTRUCTOR"?0.5:1 }}>
                      Instructor
                    </button>
                  )}
                  {!isMe && u.role !== "ADMIN" && (
                    <button onClick={() => changeRole(u.id,"ADMIN")}
                      disabled={loading===u.id+"ADMIN"}
                      style={{ padding:"5px 10px", fontSize:11, fontWeight:600, borderRadius:6, border:"1px solid rgba(248,113,113,0.3)", background:"rgba(248,113,113,0.08)", color:"#f87171", cursor:"pointer", opacity:loading===u.id+"ADMIN"?0.5:1 }}>
                      Admin
                    </button>
                  )}
                  {!isMe && (
                    confirm === u.id ? (
                      <div style={{ display:"flex", gap:4 }}>
                        <button onClick={() => deleteUser(u.id)}
                          disabled={loading==="delete"+u.id}
                          style={{ padding:"5px 10px", fontSize:11, fontWeight:700, borderRadius:6, border:"1px solid #f87171", background:"#f87171", color:"#fff", cursor:"pointer" }}>
                          {loading==="delete"+u.id ? "..." : "Confirm"}
                        </button>
                        <button onClick={() => setConfirm(null)}
                          style={{ padding:"5px 10px", fontSize:11, borderRadius:6, border:"1px solid var(--border)", background:"transparent", color:"var(--text-muted)", cursor:"pointer" }}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirm(u.id)}
                        style={{ padding:"5px 10px", fontSize:11, fontWeight:600, borderRadius:6, border:"1px solid rgba(248,113,113,0.2)", background:"transparent", color:"#f87171", cursor:"pointer" }}>
                        🗑️
                      </button>
                    )
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
