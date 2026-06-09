import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"

export default async function SeedEnroll() {
  const log: string[] = []
  try {
    const student = await prisma.user.findUnique({ where: { email: "dakhlaouii.abir@gmail.com" } })
    if (!student) { log.push("ERROR: student not found"); }
    else {
      // Enroll in piano-fundamentals (Ons) and oud-beginners (Omar)
      for (const slug of ["piano-fundamentals", "oud-beginners"]) {
        const course = await prisma.course.findUnique({ where: { slug } })
        if (!course) { log.push(`Course ${slug} not found`); continue }
        const existing = await prisma.enrollment.findFirst({ where: { userId: student.id, courseId: course.id } })
        if (existing) { log.push(`Already enrolled in ${slug}`); continue }
        await prisma.enrollment.create({
          data: { userId: student.id, courseId: course.id, status: "ACTIVE" },
        })
        log.push(`✓ Enrolled student in ${slug}`)
      }
    }
  } catch (e: any) {
    log.push("EXCEPTION: " + String(e?.message || e))
  }
  return (
    <main style={{ padding: 100, fontFamily: "monospace", color: "#000", background: "#fff", minHeight: "100vh" }}>
      <h1>Seed Enrollment</h1>
      <pre style={{ background: "#f0f0f0", padding: 20, borderRadius: 8, whiteSpace: "pre-wrap" }}>{log.join("\n")}</pre>
    </main>
  )
}
