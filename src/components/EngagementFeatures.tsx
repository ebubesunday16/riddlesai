'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { slugify } from '@/utils/func';
import { Award, Bookmark, Brain, Clock, FireExtinguisher, Star, ThumbsUp, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { impossibleRiddles, trendingRiddles, type TrendingRiddleType } from '@/data/ImpossibleRiddle';
import ChallengeMode from './ChallengeMode';
import { toast } from 'sonner';

// DifficultyBadge component
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
const RiddleCard = ({ 
  riddle, 
  onBookmark, 
  isBookmarked, 
  onLike,
  likeCount 
}: { 
  riddle: TrendingRiddleType, 
  onBookmark: (id: string) => void,
  isBookmarked: boolean,
  onLike: (id: string) => void,
  likeCount: number
}) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const toggleBookmark = () => {
    onBookmark(riddle.id);
    toast(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks', {
      description: isBookmarked ? 
        `"${riddle.question.substring(0, 30)}..." removed from your bookmarks` : 
        `"${riddle.question.substring(0, 30)}..." added to your bookmarks`,
      icon: isBookmarked ? '🔖' : '📌',
      position: 'bottom-right',
    });
  };

  const handleLike = () => {
    onLike(riddle.id);
    toast('Thanks for your feedback!', {
      description: `You ${likeCount > riddle.likes ? 'unliked' : 'liked'} this riddle`,
      icon: likeCount > riddle.likes ? '👎' : '👍',
      position: 'bottom-right',
    });
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
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
          >
            <ThumbsUp size={12} className={likeCount > riddle.likes ? "fill-blue-500 text-blue-500" : ""} /> 
            {likeCount}
          </button>
          <button 
            onClick={toggleBookmark}
            className="hover:text-yellow-500 transition-colors"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
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
          href={`/riddles${slugify(riddle.category)}`}
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
  // State for bookmarked riddles and liked riddles
  const [bookmarkedRiddles, setBookmarkedRiddles] = useState<string[]>([]);
  const [likedRiddles, setLikedRiddles] = useState<Record<string, number>>({});

  // Load saved state from localStorage on component mount
  useEffect(() => {
    const loadSavedState = () => {
      try {
        const savedBookmarks = localStorage.getItem('bookmarkedRiddles');
        const savedLikes = localStorage.getItem('likedRiddles');
        
        if (savedBookmarks) {
          setBookmarkedRiddles(JSON.parse(savedBookmarks));
        }
        
        if (savedLikes) {
          setLikedRiddles(JSON.parse(savedLikes));
        } else {
          // Initialize with default values
          const initialLikes = [...trendingRiddles, ...impossibleRiddles].reduce((acc, riddle) => {
            acc[riddle.id] = riddle.likes;
            return acc;
          }, {} as Record<string, number>);
          setLikedRiddles(initialLikes);
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    };

    loadSavedState();
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (bookmarkedRiddles.length > 0) {
      localStorage.setItem('bookmarkedRiddles', JSON.stringify(bookmarkedRiddles));
    }
  }, [bookmarkedRiddles]);

  useEffect(() => {
    if (Object.keys(likedRiddles).length > 0) {
      localStorage.setItem('likedRiddles', JSON.stringify(likedRiddles));
    }
  }, [likedRiddles]);

  const handleBookmark = (id: string) => {
    setBookmarkedRiddles(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handleLike = (id: string) => {
    setLikedRiddles(prev => {
      const defaultLikes = [...trendingRiddles, ...impossibleRiddles].find(r => r.id === id)?.likes || 0;
      const currentLikes = prev[id] || defaultLikes;
      
      // If current likes are higher than original, reset to original, otherwise increment
      const newLikes = currentLikes > defaultLikes ? defaultLikes : currentLikes + 1;
      
      return {
        ...prev,
        [id]: newLikes
      };
    });
  };

  const getLikeCount = (id: string) => {
    const defaultLikes = [...trendingRiddles, ...impossibleRiddles].find(r => r.id === id)?.likes || 0;
    return likedRiddles[id] !== undefined ? likedRiddles[id] : defaultLikes;
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
              .sort((a, b) => (getLikeCount(b.id) - getLikeCount(a.id)))
              .slice(0, 3)
              .map(riddle => (
                <RiddleCard 
                  key={riddle.id} 
                  riddle={riddle}
                  onBookmark={handleBookmark}
                  isBookmarked={bookmarkedRiddles.includes(riddle.id)}
                  onLike={handleLike}
                  likeCount={getLikeCount(riddle.id)}
                />
              ))
            }
          </TabsContent>
          
          <TabsContent value="newest" className="space-y-3">
            {impossibleRiddles
              .filter(riddle => riddle.isNew)
              .concat(trendingRiddles.filter(riddle => !riddle.isNew))
              .slice(0, 3)
              .map(riddle => (
                <RiddleCard 
                  key={riddle.id} 
                  riddle={riddle}
                  onBookmark={handleBookmark}
                  isBookmarked={bookmarkedRiddles.includes(riddle.id)}
                  onLike={handleLike}
                  likeCount={getLikeCount(riddle.id)}
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
            <Link href="/riddles/trending">VIEW ALL TRENDING RIDDLES</Link>
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
              isBookmarked={bookmarkedRiddles.includes(riddle.id)}
              onLike={handleLike}
              likeCount={getLikeCount(riddle.id)}
            />
          ))}
        </div>
        
        <div className="text-center mt-4">
          <Button 
            asChild
            variant="outline"
            className="text-xs border-black hover:bg-[#FFC107] hover:text-black"
          >
            <Link href="/riddles/impossible">VIEW ALL IMPOSSIBLE RIDDLES</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EngagementFeatures;