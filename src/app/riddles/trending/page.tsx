'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { slugify } from '@/utils/func';
import { Bookmark, Brain, FireExtinguisher, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { trendingRiddles, type TrendingRiddleType } from '@/data/ImpossibleRiddle';

// DifficultyBadge component (reused from EngagementFeatures)
const DifficultyBadge = ({ difficulty }: { difficulty: TrendingRiddleType['difficulty'] }) => {
  const colors = {
    easy: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    hard: "bg-red-100 text-red-800 border-red-200", 
    extreme: "bg-purple-100 text-purple-800 border-purple-200"
  };

  const icons = {
    easy: <Brain size={12} />,
    medium: <Brain size={12} />,
    hard: <Brain size={12} />,
    extreme: <Brain size={12} />
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[difficulty]} flex items-center gap-1`}>
      {icons[difficulty]} {difficulty}
    </span>
  );
};

// RiddleCard component (reused and extended from EngagementFeatures)
const RiddleCard = ({ riddle, onBookmark }: { riddle: TrendingRiddleType, onBookmark?: (id: string) => void }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (onBookmark) onBookmark(riddle.id);
  };

  return (
    <div className="bg-white p-4 rounded-[4px] border-2 border-black shadow-[2px_2px_0_0_#163300] mb-6">
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2">
          <DifficultyBadge difficulty={riddle.difficulty} />
          {riddle.isNew && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full border border-blue-200">
              New
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <ThumbsUp size={12} /> {riddle.likes}
          </span>
          <button 
            onClick={toggleBookmark}
            className="hover:text-yellow-500 transition-colors"
          >
            <Bookmark size={16} className={isBookmarked ? "fill-yellow-500 text-yellow-500" : ""} />
          </button>
        </div>
      </div>
      
      <h3 className="font-medium text-sm mb-3">{riddle.question}</h3>
      
      <div className="flex justify-between items-center mt-4">
        <Button 
          variant="outline"
          size="sm"
          className="text-xs border-black hover:bg-[#FFC107] hover:text-black"
          onClick={() => setIsAnswerVisible(!isAnswerVisible)}
        >
          {isAnswerVisible ? "Hide Answer" : "Reveal Answer"}
        </Button>
        
        <Link 
          href={`/riddles/${slugify(riddle.category)}`}
          className="text-xs text-gray-600 hover:underline"
        >
          {riddle.category}
        </Link>
      </div>
      
      {isAnswerVisible && (
        <div className="mt-3 text-sm p-2 bg-gray-50 rounded border border-gray-200">
          <span className="font-semibold">Answer:</span> {riddle.answer}
        </div>
      )}
    </div>
  );
};

// Filter component for trending riddles page
const RiddleFilters = ({ 
  activeFilter, 
  setActiveFilter 
}: { 
  activeFilter: string, 
  setActiveFilter: (filter: string) => void 
}) => {
  const filters = ["All", "Easy", "Medium", "Hard", "Extreme"];
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(filter => (
        <Button
          key={filter}
          variant={activeFilter === filter.toLowerCase() ? "default" : "outline"}
          size="sm"
          className={`text-xs ${activeFilter === filter.toLowerCase() ? "bg-[#163300] text-white" : "border-black hover:bg-[#FFC107] hover:text-black"}`}
          onClick={() => setActiveFilter(filter.toLowerCase())}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};

// Main trending riddles page component
export default function TrendingRiddlesPage() {
  const [activeTab, setActiveTab] = useState("popular");
  const [activeFilter, setActiveFilter] = useState("all");
  const [bookmarkedRiddles, setBookmarkedRiddles] = useState<string[]>([]);
  
  const handleBookmark = (id: string) => {
    setBookmarkedRiddles(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
    // In a real app, you'd save this to localStorage or user account
  };
  
  // Filter and sort riddles based on active tab and filter
  const filteredRiddles = trendingRiddles
    .filter(riddle => activeFilter === "all" || riddle.difficulty === activeFilter)
    .sort((a, b) => {
      if (activeTab === "popular") return b.likes - a.likes;
      if (activeTab === "newest") return riddle.isNew ? -1 : 1;
      return 0;
    });

  return (
    <div className="container mx-auto py-8 ">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FireExtinguisher size={24} className="text-orange-500" />
          <h1 className="text-2xl font-bold text-[#1C3144]">Trending Riddles</h1>
        </div>
        <p className="text-sm text-gray-600">
          Discover our most popular brain teasers that are trending right now.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="popular" className="text-sm">Most Popular</TabsTrigger>
          <TabsTrigger value="newest" className="text-sm">Newest</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <RiddleFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      
      {filteredRiddles.length > 0 ? (
        <div className="space-y-2">
          {filteredRiddles.map(riddle => (
            <RiddleCard 
              key={riddle.id} 
              riddle={riddle} 
              onBookmark={handleBookmark} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p>No riddles found matching these filters.</p>
        </div>
      )}
      
      <div className="mt-8 flex justify-center">
        <Button 
          asChild
          variant="outline"
          className="border-black hover:bg-[#FFC107] hover:text-black"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}