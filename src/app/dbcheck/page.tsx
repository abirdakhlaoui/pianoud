import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function DbCheck() {
  let data: any = null, error = ""
  try {
    const instructors = await prisma.instructor.findMany({
      include: {
        user: { select: { name: true, email: true } },
        courses: { select: { title_en: true, instrument: true, slug: true } },
      },
    })
    const enrollments = await prisma.enrollment.count()
    data = { instructors, enrollments }
  } catch (e: any) {
    error = String(e?.message || e)
  }

  return (
    <main style={{ padding: 100, fontFamily: "monospace", color: "#000", background: "#fff", minHeight: "100vh" }}>
      <h1>DB Check</h1>
      {error && <pre style={{ background: "#fee", padding: 20, whiteSpace: "pre-wrap" }}>{error}</pre>}
      {data && (
        <>
          <p>Total enrollments: <b>{data.enrollments}</b></p>
          {data.instructors.map((inst: any) => (
            <div key={inst.id} style={{ marginBottom: 24, padding: 16, border: "1px solid #ccc", borderRadius: 8 }}>
              <h3>{inst.user?.name} ({inst.user?.email})</h3>
              <p style={{ fontSize: 12, color: "#888" }}>instructorId: {inst.id}</p>
              {inst.courses.length === 0 ? <p>(no courses)</p> : (
                <ul>{inst.courses.map((c: any, i: number) => (
                  <li key={i}>{c.title_en} [{c.instrument}] ({c.slug})</li>
                ))}</ul>
              )}
            </div>
          ))}
        </>
      )}
    </main>
  )
}
