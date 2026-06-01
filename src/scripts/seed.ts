import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const pool    = new pg.Pool({ connectionString: process.env.DATABASE_URL! })
const adapter = new PrismaPg(pool)
const prisma  = new PrismaClient({ adapter } as any)

async function main() {
  console.log("Seeding database...")

  const ons  = await prisma.user.findUnique({ where:{ email:"ons@pianoud.com" } })
  const omar = await prisma.user.findUnique({ where:{ email:"omar@pianoud.com" } })

  if (!ons) {
    console.log("❌ ons@pianoud.com not found — create this account first at /auth/signup")
    return
  }

  let onsInstructor = await prisma.instructor.findUnique({ where:{ userId: ons.id } })
  if (!onsInstructor) {
    onsInstructor = await prisma.instructor.create({
      data: { userId:ons.id, bio_en:"Piano teacher.", bio_ar:"مدرّسة بيانو.", instrument:"PIANO", experience:12, rating:4.9 }
    })
    console.log("✅ Ons instructor profile created")
  }

  let omarInstructor = null
  if (omar) {
    omarInstructor = await prisma.instructor.findUnique({ where:{ userId: omar.id } })
    if (!omarInstructor) {
      omarInstructor = await prisma.instructor.create({
        data: { userId:omar.id, bio_en:"Oud player.", bio_ar:"عازف عود.", instrument:"OUD", experience:15, rating:4.8 }
      })
      console.log("✅ Omar instructor profile created")
    }
  }

  const courses = [
    { slug:"piano-fundamentals", title_en:"Piano Fundamentals: From Zero to Advanced", title_ar:"أساسيات البيانو: من الصفر إلى المتقدم", instrument:"PIANO" as const, level:"BEGINNER" as const,     price:184, instructorId:onsInstructor.id },
    { slug:"classical-piano",    title_en:"Classical Piano",                           title_ar:"البيانو الكلاسيكي",                       instrument:"PIANO" as const, level:"ADVANCED" as const,     price:334, instructorId:onsInstructor.id },
    { slug:"arabic-piano",       title_en:"Arabic Piano",                              title_ar:"البيانو العربي",                          instrument:"PIANO" as const, level:"INTERMEDIATE" as const, price:296, instructorId:onsInstructor.id },
    { slug:"piano-kids",         title_en:"Piano KIDS",                                title_ar:"البيانو للأطفال",                         instrument:"PIANO" as const, level:"BEGINNER" as const,     price:120, instructorId:onsInstructor.id },
    { slug:"music-reading",      title_en:"Music Reading",                             title_ar:"قراءة النوتة الموسيقية",                  instrument:"PIANO" as const, level:"BEGINNER" as const,     price:99,  instructorId:onsInstructor.id },
    ...(omarInstructor ? [
      { slug:"arabic-maqam-oud", title_en:"Arabic Maqam & Oud Mastery",  title_ar:"المقامات العربية وإتقان العود", instrument:"OUD" as const, level:"INTERMEDIATE" as const, price:259, instructorId:omarInstructor.id },
      { slug:"oud-beginners",    title_en:"Oud for Beginners",           title_ar:"العود للمبتدئين",               instrument:"OUD" as const, level:"BEGINNER" as const,     price:146, instructorId:omarInstructor.id },
      { slug:"oud-advanced",     title_en:"Oud Advanced",                title_ar:"العود المتقدم",                 instrument:"OUD" as const, level:"ADVANCED" as const,     price:371, instructorId:omarInstructor.id },
      { slug:"oud-harmony",      title_en:"Harmony for Oud",             title_ar:"الهارموني للعود",               instrument:"OUD" as const, level:"INTERMEDIATE" as const, price:220, instructorId:omarInstructor.id },
    ] : []),
  ]

  for (const course of courses) {
    const exists = await prisma.course.findUnique({ where:{ slug:course.slug } })
    if (!exists) {
      await prisma.course.create({
        data: {
          ...course,
          description_en: course.title_en,
          description_ar: course.title_ar,
          thumbnail:      "",
          isPublished:    true,
          isFeatured:     true,
        }
      })
      console.log(`✅ Course created: ${course.title_en}`)
    } else {
      console.log(`⏭️  Exists: ${course.title_en}`)
    }
  }

  // Add test enrollment for student
  const student    = await prisma.user.findUnique({ where:{ email:"abiir@gmail.com" } })
  const pianoFund  = await prisma.course.findUnique({ where:{ slug:"piano-fundamentals" } })

  if (student && pianoFund) {
    const exists = await prisma.enrollment.findUnique({
      where:{ userId_courseId:{ userId:student.id, courseId:pianoFund.id } }
    })
    if (!exists) {
      await prisma.enrollment.create({
        data:{ userId:student.id, courseId:pianoFund.id, status:"ACTIVE", paidAmount:184 }
      })
      console.log("✅ Test enrollment created for student")
    } else {
      console.log("⏭️  Enrollment already exists")
    }
  }

  console.log("\n🎉 Seeding complete!")
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect(); await pool.end() })
