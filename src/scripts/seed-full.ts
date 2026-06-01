import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import bcrypt from "bcryptjs"
import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

const pool    = new pg.Pool({ connectionString: process.env.DATABASE_URL! })
const adapter = new PrismaPg(pool)
const prisma  = new PrismaClient({ adapter } as any)

const COURSES = [
  { slug:"piano-fundamentals", title_en:"Piano Fundamentals: From Zero to Advanced", title_ar:"أساسيات البيانو", desc_en:"Complete piano course.", desc_ar:"دورة بيانو كاملة.", instrument:"PIANO", level:"BEGINNER",     price:184, rating:4.9, totalStudents:0 },
  { slug:"classical-piano",    title_en:"Classical Piano",     title_ar:"البيانو الكلاسيكي",  desc_en:"Classical mastery.",  desc_ar:"إتقان كلاسيكي.",  instrument:"PIANO", level:"ADVANCED",     price:334, rating:4.8, totalStudents:0 },
  { slug:"arabic-piano",       title_en:"Arabic Piano",        title_ar:"البيانو العربي",      desc_en:"Arabic maqamat.",     desc_ar:"المقامات العربية.", instrument:"PIANO", level:"INTERMEDIATE", price:296, rating:4.9, totalStudents:0 },
  { slug:"piano-kids",         title_en:"Piano KIDS",          title_ar:"البيانو للأطفال",     desc_en:"Fun for kids.",       desc_ar:"ممتع للأطفال.",   instrument:"PIANO", level:"BEGINNER",     price:120, rating:5.0, totalStudents:0 },
  { slug:"music-reading",      title_en:"Music Reading",       title_ar:"قراءة النوتة",        desc_en:"Read sheet music.",   desc_ar:"اقرأ النوتة.",    instrument:"PIANO", level:"BEGINNER",     price:99,  rating:4.7, totalStudents:0 },
  { slug:"arabic-maqam-oud",   title_en:"Arabic Maqam & Oud",  title_ar:"المقامات والعود",    desc_en:"Master the oud.",     desc_ar:"أتقن العود.",     instrument:"OUD",   level:"INTERMEDIATE", price:259, rating:4.9, totalStudents:0 },
  { slug:"oud-beginners",      title_en:"Oud for Beginners",   title_ar:"العود للمبتدئين",     desc_en:"Start the oud.",      desc_ar:"ابدأ العود.",     instrument:"OUD",   level:"BEGINNER",     price:146, rating:4.8, totalStudents:0 },
  { slug:"oud-advanced",       title_en:"Oud Advanced",        title_ar:"العود المتقدم",       desc_en:"Advanced oud.",       desc_ar:"عود متقدم.",      instrument:"OUD",   level:"ADVANCED",     price:371, rating:4.9, totalStudents:0 },
  { slug:"oud-harmony",        title_en:"Harmony for Oud",     title_ar:"الهارموني للعود",     desc_en:"Oud harmony.",        desc_ar:"هارموني العود.",  instrument:"OUD",   level:"INTERMEDIATE", price:220, rating:4.8, totalStudents:0 },
]

async function main() {
  console.log("🌱 Full seed starting...")

  const hash = await bcrypt.hash("Pianoud2025", 12)

  // 1. Create users
  const admin = await prisma.user.upsert({
    where:  { email:"abir@gmail.com" },
    update: {},
    create: { email:"abir@gmail.com", name:"Abir", password:hash, role:"ADMIN" },
  })
  console.log("✅ Admin: abir@gmail.com / Pianoud2025")

  const ons = await prisma.user.upsert({
    where:  { email:"ons@pianoud.com" },
    update: {},
    create: { email:"ons@pianoud.com", name:"Ons Wafa Romdhani", password:hash, role:"INSTRUCTOR" },
  })
  console.log("✅ Instructor: ons@pianoud.com / Pianoud2025")

  const omar = await prisma.user.upsert({
    where:  { email:"omar@pianoud.com" },
    update: {},
    create: { email:"omar@pianoud.com", name:"Omar Algour", password:hash, role:"INSTRUCTOR" },
  })
  console.log("✅ Instructor: omar@pianoud.com / Pianoud2025")

  // 2. Create instructor profiles
  const onsInst = await prisma.instructor.upsert({
    where:  { userId: ons.id },
    update: {},
    create: { userId:ons.id, bio_en:"Piano teacher with academic and practical expertise.", bio_ar:"مدرّسة بيانو ذات خبرة أكاديمية وعملية.", instrument:"PIANO", experience:12, rating:4.9 },
  })
  const omarInst = await prisma.instructor.upsert({
    where:  { userId: omar.id },
    update: {},
    create: { userId:omar.id, bio_en:"Professional Oud player and composer.", bio_ar:"عازف عود محترف ومؤلف موسيقي.", instrument:"OUD", experience:15, rating:4.8 },
  })
  console.log("✅ Instructor profiles created")

  // 3. Create courses
  for (const c of COURSES) {
    const instructorId = c.instrument === "PIANO" ? onsInst.id : omarInst.id
    await prisma.course.upsert({
      where:  { slug: c.slug },
      update: {},
      create: {
        slug:c.slug, title_en:c.title_en, title_ar:c.title_ar,
        description_en:c.desc_en, description_ar:c.desc_ar,
        instrument:c.instrument as any, level:c.level as any,
        price:c.price, rating:c.rating, totalStudents:c.totalStudents,
        isPublished:true, thumbnail:"", instructorId,
      },
    })
  }
  console.log(`✅ ${COURSES.length} courses created`)

  console.log("🎉 Seed complete!")
}

main().catch(console.error).finally(() => prisma.$disconnect())
