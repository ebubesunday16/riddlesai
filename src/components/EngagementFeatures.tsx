'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { slugify } from '@/utils/func';
import { Award, Bookmark, Brain, Clock, FireExtinguisher, Star, ThumbsUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { impossibleRiddles, trendingRiddles, type TrendingRiddleType } from '@/data/ImpossibleRiddle';
import ChallengeMode from './ChallengeMode';


// Sample data - in production, this would come from your database


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
    hard: <Zap size={12} />,
    extreme: <Star size={12} />
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[difficulty]} flex items-center gap-1`}>
      {icons[difficulty]} {difficulty}
    </span>
  );
};

// RiddleCard component
const RiddleCard = ({ riddle, onBookmark }: { riddle: TrendingRiddleType, onBookmark?: (id: string) => void }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (onBookmark) onBookmark(riddle.id);
  };

  return (
    <div className="bg-white p-4 rounded-[4px] border-2 border-black shadow-[2px_2px_0_0_#163300] mb-3">
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
          href={`/${slugify(riddle.category)}`}
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



// Main component
const EngagementFeatures = ({ currentCategory }: { currentCategory?: string }) => {
  const [bookmarkedRiddles, setBookmarkedRiddles] = useState<string[]>([]);
  
  const handleBookmark = (id: string) => {
    setBookmarkedRiddles(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
    
    // In a real app, you'd save this to localStorage or user account
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-[4px] border-2 border-black shadow-[2px_2px_0_0_#163300]">
        <div className="flex items-center gap-2 mb-4">
          <FireExtinguisher size={20} className="text-orange-500" />
          <h2 className="text-lg font-bold text-[#1C3144]">Trending Riddles</h2>
        </div>
        
        <Tabs defaultValue="popular">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="popular" className="text-xs">Most Popular</TabsTrigger>
            <TabsTrigger value="newest" className="text-xs">Newest</TabsTrigger>
          </TabsList>
          
          <TabsContent value="popular" className="space-y-3">
            {trendingRiddles
              .sort((a, b) => b.likes - a.likes)
              .slice(0, 3)
              .map(riddle => (
                <RiddleCard 
                  key={riddle.id} 
                  riddle={riddle} 
                  onBookmark={handleBookmark} 
                />
              ))
            }
          </TabsContent>
          
          <TabsContent value="newest" className="space-y-3">
            {trendingRiddles
              .filter(riddle => riddle.isNew)
              .concat(trendingRiddles.filter(riddle => !riddle.isNew))
              .slice(0, 3)
              .map(riddle => (
                <RiddleCard 
                  key={riddle.id} 
                  riddle={riddle} 
                  onBookmark={handleBookmark} 
                />
              ))
            }
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-4">
          <Button 
            asChild
            variant="outline"
            className="text-xs border-black hover:bg-[#FFC107] hover:text-black"
          >
            <Link href="riddles/trending">VIEW ALL TRENDING RIDDLES</Link>
          </Button>
        </div>
      </div>
      
     
      
      <div className="bg-white p-4 rounded-[4px] border-2 border-black shadow-[2px_2px_0_0_#163300]">
        <div className="flex items-center gap-2 mb-4">
          <Brain size={20} className="text-purple-600" />
          <h2 className="text-lg font-bold text-[#1C3144]">Impossible Riddles</h2>
        </div>
        
        <p className="text-xs mb-4">Think you're a riddle master? Try our hardest brain-teasers that less than 5% of people can solve!</p>
        
        <div className="space-y-3">
          {impossibleRiddles.slice(0, 2).map(riddle => (
            <RiddleCard 
              key={riddle.id} 
              riddle={riddle} 
              onBookmark={handleBookmark} 
            />
          ))}
        </div>
        
        <div className="text-center mt-4">
          <Button 
            asChild
            variant="outline"
            className="text-xs border-black hover:bg-[#FFC107] hover:text-black"
          >
            <Link href="riddles/impossible">VIEW ALL IMPOSSIBLE RIDDLES</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EngagementFeatures;