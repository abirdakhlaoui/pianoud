// In-memory rate limiter — no external service needed
// For production at scale, switch to @upstash/ratelimit

const requests = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60_000 // 1 minute
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const key = identifier

  const entry = requests.get(key)

  if (!entry || now > entry.resetAt) {
    // New window
    requests.set(key, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: limit - 1, resetAt: now + windowMs }
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt }
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, val] of requests.entries()) {
    if (now > val.resetAt) requests.delete(key)
  }
}, 300_000)

// Preset limiters
export const authLimiter     = (ip: string) => rateLimit(`auth:${ip}`,     5,  60_000)  // 5 per minute
export const apiLimiter      = (ip: string) => rateLimit(`api:${ip}`,      60, 60_000)  // 60 per minute
export const paymentLimiter  = (ip: string) => rateLimit(`payment:${ip}`,  3,  60_000)  // 3 per minute
export const uploadLimiter   = (ip: string) => rateLimit(`upload:${ip}`,   10, 60_000)  // 10 per minute
