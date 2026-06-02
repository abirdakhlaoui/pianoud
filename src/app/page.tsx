import HeroSection from "@/components/home/HeroSection"
import PianoSection from "@/components/home/PianoSection"
import OudSection from "@/components/home/OudSection"
import MaqamatSection from "@/components/home/MaqamatSection"
import ReadingSection from "@/components/home/ReadingSection"
import InstructorsSection from "@/components/home/InstructorsSection"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PianoSection />
      <OudSection />
      <MaqamatSection />
      <ReadingSection />
      <InstructorsSection />
    </main>
  )
}
