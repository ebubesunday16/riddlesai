'use client'
import { Award, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { TrendingRiddleType, bestRiddles } from "@/data/ImpossibleRiddle";
import React, { useState, useEffect } from "react";

const ChallengeTimer = ({ seconds, onComplete }: { seconds: number, onComplete: () => void }) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    
    useEffect(() => {
      if (timeLeft <= 0) {
        onComplete();
        return;
      }
      
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }, [timeLeft, onComplete]);
    
    return (
      <div className="flex items-center gap-2 text-sm mb-4">
        <Clock size={16} className="text-gray-600" />
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-red-500 h-2 rounded-full transition-all duration-1000 ease-linear" 
            style={{ width: `${(timeLeft / seconds) * 100}%` }}
          ></div>
        </div>
        <span className="text-xs font-mono">{timeLeft}s</span>
      </div>
    );
  };
  
  // Challenge Mode component
const ChallengeMode = () => {
    const [isActive, setIsActive] = useState(false);
    const [currentRiddle, setCurrentRiddle] = React.useState<TrendingRiddleType | null>(null);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    
    const startChallenge = () => {
      // Pick a random riddle from the impossible ones
      const randomIndex = Math.floor(Math.random() * bestRiddles.length);
      setCurrentRiddle(bestRiddles[randomIndex]);
      setIsActive(true);
      setHasAnswered(false);
      setShowAnswer(false);
    };
    
    const handleTimeUp = () => {
      setHasAnswered(true);
    };
    
    return (
      <div className="bg-white p-4 rounded-[4px] border-2 border-black shadow-[2px_2px_0_0_#163300]">
        <div className="flex items-center gap-2 mb-4">
          <Award size={20} className="text-purple-600" />
          <h2 className="text-lg font-bold text-[#1C3144]">Challenge Mode</h2>
        </div>
        
        {!isActive ? (
          <div className="text-center py-4">
            <p className="text-sm mb-4">Test your riddle-solving skills against the clock! Can you solve a challenging riddle in 60 seconds?</p>
            <Button
              onClick={startChallenge}
              className="shadow-[2px_2px_0_0_#163300] border-2 border-black text-xs text-[#163300] bg-[#FFC107] hover:bg-[#333333] hover:text-white"
            >
              START CHALLENGE
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {!hasAnswered && <ChallengeTimer seconds={60} onComplete={handleTimeUp} />}
            
            <div className="p-3 bg-gray-50 rounded-md">
              <h3 className="font-medium text-sm mb-2">{currentRiddle?.question}</h3>
            </div>
            
            {hasAnswered ? (
              <div className="space-y-4">
                <Button
                  onClick={() => setShowAnswer(true)}
                  className="w-full shadow-[2px_2px_0_0_#163300] border-2 border-black text-xs text-[#163300] bg-white hover:bg-[#FFC107]"
                  disabled={showAnswer}
                >
                  REVEAL ANSWER
                </Button>
                
                {showAnswer && (
                  <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                    <p className="text-sm font-semibold">Answer: {currentRiddle?.answer}</p>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <Button
                    onClick={startChallenge}
                    className="shadow-[2px_2px_0_0_#163300] border-2 border-black text-xs text-[#163300] bg-[#FFC107] hover:bg-[#333333] hover:text-white"
                  >
                    TRY ANOTHER
                  </Button>
                  
                  <Button
                    onClick={() => setIsActive(false)}
                    variant="outline"
                    className="text-xs border-black"
                  >
                    EXIT CHALLENGE
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={handleTimeUp}
                className="w-full shadow-[2px_2px_0_0_#163300] border-2 border-black text-xs text-[#163300] bg-white hover:bg-[#FFC107]"
              >
                I KNOW THE ANSWER
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };

  export default ChallengeMode