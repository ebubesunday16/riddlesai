'use client';

import { Button } from '@/components/ui/button';
import { slugify } from '@/utils/func';
import { Award, Bookmark, Brain, Star, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { impossibleRiddles, type TrendingRiddleType } from '@/data/ImpossibleRiddle';
import { toast } from 'sonner';

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
    extreme: <Star size={12} />
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[difficulty]} flex items-center gap-1`}>
      {icons[difficulty]} {difficulty}
    </span>
  );
};

// RiddleCard component (enhanced with real-time like/bookmark features)
const RiddleCard = ({ 
  riddle, 
  onBookmark,
  isBookmarked,
  onLike,
  likeCount,
  onSolve,
  isSolved
}: { 
  riddle: TrendingRiddleType, 
  onBookmark: (id: string) => void,
  isBookmarked: boolean,
  onLike: (id: string) => void,
  likeCount: number,
  onSolve: (id: string) => void,
  isSolved: boolean
}) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Show already solved state
  useEffect(() => {
    if (isSolved) {
      setIsCorrect(true);
      setHasAttempted(true);
    }
  }, [isSolved]);

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
      description: `You ${likeCount > riddle.likes ? 'liked' : 'unliked'} this riddle`,
      icon: likeCount > riddle.likes ? '👍' : '👎',
      position: 'bottom-right',
    });
  };

  const checkAnswer = () => {
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = riddle.answer.trim().toLowerCase();
    
    const correct = normalizedUserAnswer === normalizedCorrectAnswer;
    setIsCorrect(correct);
    setHasAttempted(true);
    
    if (correct && !isSolved) {
      onSolve(riddle.id);
      toast('Congratulations!', {
        description: 'You solved an impossible riddle!',
        icon: '🏆',
        position: 'bottom-right',
        duration: 5000,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-[4px] border-2 border-black shadow-[2px_2px_0_0_#163300] mb-8">
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2">
          <DifficultyBadge difficulty={riddle.difficulty} />
          {riddle.isNew && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full border border-blue-200">
              New
            </span>
          )}
          {isSolved && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
              <Award size={12} /> Solved
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
            aria-label={likeCount > riddle.likes ? "Unlike" : "Like"}
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
      
      <h3 className="font-medium text-base mb-4">{riddle.question}</h3>
      
      {!isAnswerVisible ? (
        <div className="mt-4 space-y-3">
          <div className="flex flex-col space-y-2">
            <label htmlFor={`answer-${riddle.id}`} className="text-sm font-medium">
              Your Answer:
            </label>
            <input
              id={`answer-${riddle.id}`}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Type your answer here..."
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={checkAnswer}
              className="text-xs bg-[#163300] hover:bg-[#0e2200]"
              disabled={!userAnswer.trim()}
            >
              Check Answer
            </Button>
            
            <Button 
              variant="outline"
              className="text-xs border-black hover:bg-[#FFC107] hover:text-black"
              onClick={() => setIsAnswerVisible(true)}
            >
              Give Up & Reveal
            </Button>
          </div>
          
          {hasAttempted && (
            <div className={`mt-2 p-3 rounded text-sm ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isCorrect ? (
                <div className="flex items-center gap-2">
                  <Award className="text-green-600" size={16} />
                  <span>Correct! Well done solving this impossible riddle!</span>
                </div>
              ) : (
                <span>That's not correct. Try again or reveal the answer.</span>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <span className="font-semibold">Answer:</span> {riddle.answer}
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Explanation:</span> {riddle.explanation || "This riddle requires thinking outside the box."}
          </p>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
        {!isAnswerVisible && (
          <Button 
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500 hover:text-gray-700"
            onClick={() => setIsAnswerVisible(true)}
          >
            Reveal Answer
          </Button>
        )}
        
        {isAnswerVisible && (
          <Button 
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500 hover:text-gray-700"
            onClick={() => setIsAnswerVisible(false)}
          >
            Hide Answer
          </Button>
        )}
        
        <Link 
          href={`/riddles/${slugify(riddle.category)}`}
          className="text-xs text-gray-600 hover:underline"
        >
          {riddle.category}
        </Link>
      </div>
    </div>
  );
};

// Progress component for impossible riddles
const ImpossibleProgress = ({ solvedCount, totalCount }: { solvedCount: number, totalCount: number }) => {
  // Calculate progress percentage
  const progressPercentage = (solvedCount / totalCount) * 100;
  
  return (
    <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-md">
      <h3 className="font-semibold mb-2 flex items-center gap-2">
        <Award size={18} className="text-purple-600" />
        <span>Your Impossible Riddle Progress</span>
      </h3>
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <p>Solved: <span className="font-medium">{solvedCount}/{totalCount}</span></p>
        </div>
        <div className="w-64 bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-purple-600 h-2.5 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Only 5% of people can solve all of these riddles. Can you?
      </p>
    </div>
  );
};

// Main impossible riddles page component
export default function ImpossibleRiddlesPage() {
  const [bookmarkedRiddles, setBookmarkedRiddles] = useState<string[]>([]);
  const [likedRiddles, setLikedRiddles] = useState<Record<string, number>>({});
  const [solvedRiddles, setSolvedRiddles] = useState<string[]>([]);
  
  // Load saved state from localStorage on component mount
  useEffect(() => {
    const loadSavedState = () => {
      try {
        const savedBookmarks = localStorage.getItem('bookmarkedRiddles');
        const savedLikes = localStorage.getItem('likedRiddles');
        const savedSolved = localStorage.getItem('solvedRiddles');
        
        if (savedBookmarks) {
          setBookmarkedRiddles(JSON.parse(savedBookmarks));
        }
        
        if (savedLikes) {
          setLikedRiddles(JSON.parse(savedLikes));
        } else {
          // Initialize with default values
          const initialLikes = impossibleRiddles.reduce((acc, riddle) => {
            acc[riddle.id] = riddle.likes;
            return acc;
          }, {} as Record<string, number>);
          setLikedRiddles(initialLikes);
        }
        
        if (savedSolved) {
          setSolvedRiddles(JSON.parse(savedSolved));
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    };

    loadSavedState();
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bookmarkedRiddles', JSON.stringify(bookmarkedRiddles));
  }, [bookmarkedRiddles]);

  useEffect(() => {
    if (Object.keys(likedRiddles).length > 0) {
      localStorage.setItem('likedRiddles', JSON.stringify(likedRiddles));
    }
  }, [likedRiddles]);
  
  useEffect(() => {
    localStorage.setItem('solvedRiddles', JSON.stringify(solvedRiddles));
  }, [solvedRiddles]);
  
  const handleBookmark = (id: string) => {
    setBookmarkedRiddles(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handleLike = (id: string) => {
    setLikedRiddles(prev => {
      const defaultLikes = impossibleRiddles.find(r => r.id === id)?.likes || 0;
      const currentLikes = prev[id] || defaultLikes;
      
      // If current likes are higher than original, reset to original, otherwise increment
      const newLikes = currentLikes > defaultLikes ? defaultLikes : currentLikes + 1;
      
      return {
        ...prev,
        [id]: newLikes
      };
    });
  };

  const handleSolve = (id: string) => {
    if (!solvedRiddles.includes(id)) {
      setSolvedRiddles(prev => [...prev, id]);
    }
  };

  const getLikeCount = (id: string) => {
    const defaultLikes = impossibleRiddles.find(r => r.id === id)?.likes || 0;
    return likedRiddles[id] !== undefined ? likedRiddles[id] : defaultLikes;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={24} className="text-purple-600" />
          <h1 className="text-2xl font-bold text-[#1C3144]">Impossible Riddles</h1>
        </div>
        <p className="text-sm text-gray-600">
          Think you're a riddle master? These impossible brain-teasers are solved by less than 5% of people. Challenge yourself!
        </p>
      </div>
      
      <ImpossibleProgress 
        solvedCount={solvedRiddles.length} 
        totalCount={impossibleRiddles.length} 
      />
      
      <div className="space-y-6">
        {impossibleRiddles.map(riddle => (
          <RiddleCard 
            key={riddle.id} 
            riddle={riddle} 
            onBookmark={handleBookmark}
            isBookmarked={bookmarkedRiddles.includes(riddle.id)}
            onLike={handleLike}
            likeCount={getLikeCount(riddle.id)}
            onSolve={handleSolve}
            isSolved={solvedRiddles.includes(riddle.id)}
          />
        ))}
      </div>
      
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