'use client'
import { Button } from '@/components/ui/button'
import { RiddleArray, RiddleArrayType } from '@/data/riddle'
import { slugify, toTitleCase } from '@/utils/func'
import { Award, Bookmark, Brain, Clock, Puzzle, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type CategoryStats = {
  count: number
  avgDifficulty: number
  trending: boolean
}

// Get top 5 categories with correct counts
const getTopCategories = (): {categories: string[], categoryStats: Record<string, CategoryStats>} => {
  // Get all keywords, normalize them
  const keywordCounts: Record<string, number> = {};
  const categoryDifficulties: Record<string, number[]> = {};
  
  // Count occurrences of each keyword and collect riddle lengths for difficulty calculation
  RiddleArray.forEach(riddle => {
    const normalizedKeyword = riddle.keyword.replace(/-/g, ' ');
    
    // Only count keywords with 1-2 words
    if (normalizedKeyword.trim().split(/\s+/).length <= 2) {
      if (!keywordCounts[normalizedKeyword]) {
        keywordCounts[normalizedKeyword] = 0;
        categoryDifficulties[normalizedKeyword] = [];
      }
      keywordCounts[normalizedKeyword]++;
      categoryDifficulties[normalizedKeyword].push(riddle.riddle.length);
    }
  });
  
  // Convert to array of [keyword, count] pairs for sorting
  const keywordPairs = Object.entries(keywordCounts);
  
  // Sort by count (descending) and take top 5
  const topKeywords = keywordPairs
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(pair => pair[0]);
  
  // Calculate stats for top keywords
  const stats: Record<string, CategoryStats> = {};
  topKeywords.forEach(keyword => {
    // Calculate average difficulty based on riddle length
    const lengths = categoryDifficulties[keyword];
    const avgLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
    const difficulty = Math.min(5, Math.max(1, Math.floor(1 + avgLength / 50)));
    
    // Determine trending status (using consistent hashing)
    const trendingSeed = keyword.charCodeAt(0) + (keyword.charCodeAt(1) || 0);
    const trending = trendingSeed % 5 === 0; // ~20% of categories will be trending
    
    stats[keyword] = {
      count: keywordCounts[keyword],
      avgDifficulty: difficulty,
      trending
    };
  });
  
  return {
    categories: topKeywords,
    categoryStats: stats
  };
};

const InteractiveCategoryExplorer = () => {
  // Get top categories and stats at component mount
  const { categories, categoryStats } = getTopCategories();
  const [stats] = useState<Record<string, CategoryStats>>(categoryStats);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [randomRiddle, setRandomRiddle] = useState<RiddleArrayType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  
  const getDifficultyColor = (difficulty: number) => {
    switch(difficulty) {
      case 1: return 'bg-green-200 text-green-800';
      case 2: return 'bg-emerald-200 text-emerald-800';
      case 3: return 'bg-yellow-200 text-yellow-800';
      case 4: return 'bg-orange-200 text-orange-800';
      case 5: return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };
  
  const handleCategoryClick = (category: string) => {
    // Reset answer visibility when changing categories
    setShowAnswer(false);
    
    if (activeCategory === category) {
      setActiveCategory(null);
      setRandomRiddle(null);
      return;
    }
    
    setActiveCategory(category);
    setIsLoading(true);
    
    // Find riddles in this category
    const riddlesInCategory = RiddleArray.filter(riddle => 
      riddle.keyword.replace(/-/g, ' ') === category
    );
    
    // Select a random riddle
    if (riddlesInCategory.length > 0) {
      const randomIndex = Math.floor(Math.random() * riddlesInCategory.length);
      // Short timeout to show loading state
      setTimeout(() => {
        setRandomRiddle(riddlesInCategory[randomIndex]);
        setIsLoading(false);
      }, 300);
    } else {
      setRandomRiddle(null);
      setIsLoading(false);
    }
  };

  const getAnotherRiddle = () => {
    if (!activeCategory) return;
    
    setIsLoading(true);
    setShowAnswer(false);
    
    const riddlesInCategory = RiddleArray.filter(
      riddle => riddle.keyword.replace(/-/g, ' ') === activeCategory
    );
    
    if (riddlesInCategory.length > 0) {
      let newRiddle;
      
      // Try to get a different riddle than the current one
      if (riddlesInCategory.length > 1 && randomRiddle) {
        const filteredRiddles = riddlesInCategory.filter(r => r.id !== randomRiddle.id);
        const randomIndex = Math.floor(Math.random() * filteredRiddles.length);
        newRiddle = filteredRiddles[randomIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * riddlesInCategory.length);
        newRiddle = riddlesInCategory[randomIndex];
      }
      
      setTimeout(() => {
        setRandomRiddle(newRiddle);
        setIsLoading(false);
      }, 300);
    } else {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-4 mb-16 rounded-lg border-2 border-black bg-[#FEFAE8] shadow-[4px_4px_0_0_#163300]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="text-purple-600" size={22} />
          <h2 className="text-xl font-bold text-[#1C3144]">Top 5 Riddle Categories</h2>
        </div>
        <div className="text-xs text-[#163300] flex items-center">
          <Clock size={14} className="mr-1" />
          <span>Updated daily</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`p-3 border-2 border-black rounded-md cursor-pointer hover:bg-[#FEFAE8] transition duration-150 ${
              activeCategory === category 
                ? 'bg-[#FFC107] shadow-[2px_2px_0_0_#163300]' 
                : 'bg-white shadow-[1px_1px_0_0_#163300]'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-sm">{toTitleCase(category)}</span>
              {stats[category]?.trending && (
                <span className="flex items-center text-xs bg-purple-100 text-purple-800 px-1 rounded">
                  <TrendingUp size={10} className="mr-0.5" /> Hot
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{stats[category]?.count || 0} riddles</span>
              
              <span className={`px-1.5 py-0.5 rounded text-xs flex items-center ${
                getDifficultyColor(stats[category]?.avgDifficulty || 3)
              }`}>
                <Brain size={10} className="mr-1" />
                Lvl {stats[category]?.avgDifficulty || 3}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {activeCategory && (
        <div className="border-2 border-black rounded-md p-4 bg-white mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold flex items-center">
              <Puzzle size={16} className="mr-2 text-purple-600" />
              {toTitleCase(activeCategory)} Preview
            </h3>
            <Button
              asChild
              size="sm"
              className="shadow-[2px_2px_0_0_#163300] border-2 border-black text-xs bg-[#FFC107] hover:bg-[#333333] hover:text-white"
            >
              <Link href={`/riddles/${slugify(activeCategory)}`}>
                View All {stats[activeCategory]?.count || 0} Riddles
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="h-20 flex items-center justify-center">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          ) : randomRiddle ? (
            <div className="space-y-3">
              <div className="font-medium text-sm">{randomRiddle.riddle}</div>
              <div 
                className="relative overflow-hidden cursor-pointer"
                onClick={() => setShowAnswer(prev => !prev)}
              >
                <div className={`text-xs italic bg-gray-50 p-2 rounded ${showAnswer ? '' : 'blur-md'}`}>
                  {randomRiddle.answer}
                </div>
                {!showAnswer && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 pointer-events-none">
                    <span className="bg-white px-2 py-1 rounded shadow-sm">Tap to reveal answer</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-20 flex items-center justify-center text-sm text-gray-500">
              No riddles available in this category
            </div>
          )}
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs border border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  setActiveCategory(null);
                  setRandomRiddle(null);
                }}
              >
                Close
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs border border-gray-300 hover:bg-gray-50"
                onClick={getAnotherRiddle}
                disabled={!activeCategory || stats[activeCategory]?.count <= 1}
              >
                Another Riddle
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-50"
              aria-label="Save this riddle"
            >
              <Bookmark size={14} className="mr-1" /> Save
            </Button>
          </div>
        </div>
      )}
      
      <div className="border-t border-dashed border-gray-300 pt-4">
        <div className="flex justify-between">
          <span className="text-xs text-gray-600 flex items-center">
            <Award size={14} className="mr-1" /> Popular Categories
          </span>
          <Link 
            href="/riddles/categories" 
            className="text-xs text-purple-600 hover:underline flex items-center"
          >
            View All <Sparkles size={12} className="ml-1" />
          </Link>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {categories.map(category => (
            <Link
              key={category}
              href={`/riddles/${slugify(category)}`}
              className="px-2 py-1 bg-[#FFC107] hover:bg-[#E5AC06] border border-black rounded text-xs shadow-[1px_1px_0_0_#163300] transition-colors"
            >
              {toTitleCase(category)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InteractiveCategoryExplorer