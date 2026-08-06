export const WHATSAPP_NUMBER = "966566896225"

export function whatsappBookingLink(courseName: string, packageLabel: string, price: number, isAr: boolean) {
  const msg = isAr
    ? `مرحباً، أرغب في حجز باقة "${packageLabel}" لدورة ${courseName} بسعر ${price} ر.س.`
    : `Hi! I'd like to book the "${packageLabel}" package for ${courseName} at ${price} SAR.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export function whatsappAssessmentLink(courseName: string, isAr: boolean) {
  const msg = isAr
    ? `مرحباً، أرغب في حجز جلسة تقييم مجانية لدورة ${courseName}.`
    : `Hi! I'd like to book a free assessment session for ${courseName}.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}
