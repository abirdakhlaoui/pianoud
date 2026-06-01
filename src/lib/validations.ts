import { z } from "zod"

export const registerSchema = z.object({
  name:     z.string().min(2, "Name must be at least 2 characters").max(50),
  email:    z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100),
})

export const loginSchema = z.object({
  email:    z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const courseSchema = z.object({
  title_en:       z.string().min(5).max(100),
  title_ar:       z.string().min(5).max(100),
  description_en: z.string().min(20).max(2000),
  description_ar: z.string().min(20).max(2000),
  instrument:     z.enum(["PIANO", "OUD"]),
  level:          z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  price_sar:      z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price"),
})

export const reviewSchema = z.object({
  rating:   z.number().min(1).max(5),
  comment:  z.string().min(10).max(500),
  courseId: z.string().min(1),
})

export const progressSchema = z.object({
  lessonId:      z.string().min(1),
  completed:     z.boolean().optional(),
  watchedSeconds: z.number().min(0).optional(),
})

export const roleSchema = z.object({
  userId: z.string().min(1),
  role:   z.enum(["STUDENT", "INSTRUCTOR", "ADMIN"]),
})
