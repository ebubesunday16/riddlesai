import EngagementFeatures from "@/components/EngagementFeatures";
import RiddleGenerator from "@/components/Generator";
import InteractiveCategoryExplorer from "@/components/InteractiveCategoryExplorer";
import CraftTheQuestion from "@/sections/CraftTheQuestion";
import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <RiddleGenerator />
      <HowItWorks />
      <CraftTheQuestion />
      <EngagementFeatures />
      <InteractiveCategoryExplorer />

      

    </div>
  );
}
