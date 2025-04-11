import ContentContainer from "@/components/ContentContainer"
import { HouseWifi } from "lucide-react"

const HowItWorks = () => {
  return (
    <ContentContainer>
      
      <h2 className="text-xl text-[#1C3144] font-bold">How It Works</h2>
      <p className="text-sm">To use...</p>
      <ul className="text-sm list-disc pl-6">
        <li>Select the category of riddle you want to generate.</li>
        <li>Our AI analyzes a vast database of brain-teasing patterns to craft unique and challenging riddles.</li>
        <li>Use the "Generate" button to have the AI create riddles within your selected category.</li>
        <li>Use the "Challenge Me" button to have the AI explore its most complex puzzles.</li>
      </ul>
    </ContentContainer>
  )
}

export default HowItWorks