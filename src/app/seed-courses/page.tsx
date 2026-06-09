import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function SeedCourses() {
  const log: string[] = []
  try {
    // Find Omar (oud instructor)
    const omarUser = await prisma.user.findUnique({ where: { email: "omar@pianoud.com" } })
    if (!omarUser) { log.push("ERROR: omar@pianoud.com not found") }
    const omar = omarUser ? await prisma.instructor.findUnique({ where: { userId: omarUser.id } }) : null
    if (!omar) { log.push("ERROR: Omar instructor record not found") }

    if (omar) {
      const newCourses = [
        {
          slug: "music-theory-abrsm",
          title_en: "Music Theory ABRSM",
          title_ar: "نظرية الموسيقى ABRSM",
          description_en: "Teaching music theory — analyzing symbols, Western scales, circle of fifths and fourths, clefs, key signatures, meters, and basics of harmony and composition.",
          description_ar: "تدريس نظريّات الموسيقى: تحليل الرّموز، السلالم الغربيّة، الدّائرة الخماسيّة والرّباعية، المفاتيح، دليل المقام، الأوزان، وأساسّيات الهارموني والتّأليف.",
          thumbnail: "/course-abrsm.jpeg",
          instrument: "PIANO" as const,
          level: "INTERMEDIATE" as const,
          price: 220,
          instructorId: omar.id,
          isPublished: true,
        },
        {
          slug: "oud-kids",
          title_en: "Oud for Kids",
          title_ar: "العود للأطفال",
          description_en: "A fun, age-appropriate Oud program for children, building musical foundations through playful and engaging methods.",
          description_ar: "برنامج عود ممتع ومناسب للأطفال، يبني الأسس الموسيقية بطرق محبّبة وتفاعلية.",
          thumbnail: "/course-oudkids.jpeg",
          instrument: "OUD" as const,
          level: "BEGINNER" as const,
          price: 220,
          instructorId: omar.id,
          isPublished: true,
        },
      ]

      for (const c of newCourses) {
        await prisma.course.upsert({
          where: { slug: c.slug },
          update: { instructorId: c.instructorId, isPublished: true },
          create: c,
        })
        log.push(`✓ Upserted: ${c.title_en} (${c.slug})`)
      }
    }
  } catch (e: any) {
    log.push("EXCEPTION: " + String(e?.message || e))
  }

  return (
    <main style={{ padding: 100, fontFamily: "monospace", color: "#000", background: "#fff", minHeight: "100vh" }}>
      <h1>Seed Courses</h1>
      <pre style={{ background: "#f0f0f0", padding: 20, borderRadius: 8, whiteSpace: "pre-wrap" }}>
        {log.join("\n")}
      </pre>
    </main>
  )
}
