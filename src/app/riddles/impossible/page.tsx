'use client';

import { Button } from '@/components/ui/button';
import { slugify } from '@/utils/func';
import { Award, Bookmark, Brain, Star, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { impossibleRiddles, type TrendingRiddleType } from '@/data/ImpossibleRiddle';

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

// RiddleCard component (reused from EngagementFeatures)
const RiddleCard = ({ riddle, onBookmark }: { riddle: TrendingRiddleType, onBookmark?: (id: string) => void }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (onBookmark) onBookmark(riddle.id);
  };

  const checkAnswer = () => {
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = riddle.answer.trim().toLowerCase();
    
    setIsCorrect(normalizedUserAnswer === normalizedCorrectAnswer);
    setHasAttempted(true);
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
          href={`/${slugify(riddle.category)}`}
          className="text-xs text-gray-600 hover:underline"
        >
          {riddle.category}
        </Link>
      </div>
    </div>
  );
};

// Progress component for impossible riddles
const ImpossibleProgress = () => {
  return (
    <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-md">
      <h3 className="font-semibold mb-2 flex items-center gap-2">
        <Award size={18} className="text-purple-600" />
        <span>Your Impossible Riddle Progress</span>
      </h3>
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <p>Solved: <span className="font-medium">0/{impossibleRiddles.length}</span></p>
        </div>
        <div className="w-64 bg-gray-200 rounded-full h-2.5">
          <div className="bg-purple-600 h-2.5 rounded-full w-0"></div>
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
  
  const handleBookmark = (id: string) => {
    setBookmarkedRiddles(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
    // In a real app, you'd save this to localStorage or user account
  };

  return (
    <div className="container mx-auto  py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={24} className="text-purple-600" />
          <h1 className="text-2xl font-bold text-[#1C3144]">Impossible Riddles</h1>
        </div>
        <p className="text-sm text-gray-600">
          Think you're a riddle master? These impossible brain-teasers are solved by less than 5% of people. Challenge yourself!
        </p>
      </div>
      
      <ImpossibleProgress />
      
      <div className="space-y-6">
        {impossibleRiddles.map(riddle => (
          <RiddleCard 
            key={riddle.id} 
            riddle={riddle} 
            onBookmark={handleBookmark} 
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