import HeroSection from "@/components/home/HeroSection"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import HowItWorks from "@/components/home/HowItWorks"
import IntensiveLessons from "@/components/home/IntensiveLessons"
import Testimonials from "@/components/home/Testimonials"
import InstructorsSection from "@/components/home/InstructorsSection"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WhyChooseUs />
      <HowItWorks />
      <IntensiveLessons />
      <InstructorsSection />
      <Testimonials />
    </main>
  )
}
