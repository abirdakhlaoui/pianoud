import { config } from "dotenv"
config()
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const instructors = await prisma.instructor.findMany({
  include: {
    user: { select: { name: true, email: true } },
    courses: { select: { title_en: true, instrument: true, slug: true } },
  },
})

for (const inst of instructors) {
  console.log(`\n=== ${inst.user?.name} (${inst.user?.email}) — id: ${inst.id} ===`)
  if (inst.courses.length === 0) console.log("  (no courses)")
  for (const c of inst.courses) console.log(`  - ${c.title_en} [${c.instrument}] (${c.slug})`)
}

const enr = await prisma.enrollment.count()
console.log(`\nTotal enrollments: ${enr}`)
await prisma.$disconnect()
