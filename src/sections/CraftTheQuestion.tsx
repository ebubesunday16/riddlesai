import ContentContainer from "@/components/ContentContainer"
import { PuzzleIcon } from "lucide-react"

const CraftTheQuestion = () => {
  return (
    <ContentContainer>

      <h2 className="text-xl text-[#1C3144] font-bold"><PuzzleIcon size={20} className="inline-block"/> We craft the question, you find the answer...</h2>
      <p className="text-sm">
        At AI Riddle Generator, we are building a brain teaser factory 🧩 where we harness the power of AI to bring mental challenges to any situation.
      </p>
      <p className="text-sm">
        For us, the goal is simple. Stimulate critical thinking with the perfect riddle. Finding good riddles online can be exhausting.
      </p>
      <p className="text-sm">We want to help you... </p>
      
      <ul className="text-sm list-disc pl-6">
        <li>Exercise your brain with thought-provoking puzzles</li>
        <li>Engage friends and family with challenging mental games</li>
        <li className="underline">Become the ultimate riddler in your social circle, guaranteed</li>
      </ul>
    </ContentContainer>
  )
}

export default CraftTheQuestion