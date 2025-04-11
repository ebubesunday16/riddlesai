'use client'
import { getRiddleTotalKeyword } from '@/utils/func'
import { Loader, Shuffle } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { TrendingRiddleType, bestRiddles } from '@/data/ImpossibleRiddle'

const RiddleGenerator = () => {
    const [currentAnswer, setCurrentAnswer] = useState<TrendingRiddleType | null>(null)
    const [displayText, setDisplayText] = useState('')
    const [displayCategory, setDisplayCategory] = useState('')
    const [showLoading, setShowLoading] = useState(false)
    const [showShuffle, setShowShuffle] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('any')
    const [selectedVibe, setSelectedVibe] = useState('any')
    const [isTyping, setIsTyping] = useState(false)
    const [isTypingCategory, setIsTypingCategory] = useState(false)
    const [fixLoadingConflict, setIsFixLoadingConflict] = useState(false)
    const [countdown, setCountdown] = useState<number | null>(null)
    const [errorMessage, setErrorMessage] = useState('')

    const categories = ["Any", ...getRiddleTotalKeyword()]
    
    // Countdown timer effect
    useEffect(() => {
        let timer: NodeJS.Timeout;
        
        if (countdown !== null && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0 && currentAnswer) {
            // Start typing the answer when countdown reaches 0
            typewriterEffect(currentAnswer.answer, setDisplayCategory, setIsTypingCategory);
            setCountdown(null);
        }
        
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [countdown, currentAnswer]);

    const typewriterEffect = (text: string, setStateFunc: React.Dispatch<React.SetStateAction<string>>, setTypingFunc: React.Dispatch<React.SetStateAction<boolean>>) => {
        setTypingFunc(true)
        let currentText = '';
        let index = 0;
        setStateFunc('');
        
        const interval = setInterval(() => {
            if (index < text.length) {
                currentText += text[index];
                setStateFunc(currentText);
                index++;
            } else {
                clearInterval(interval);
                setTypingFunc(false);
            }
        }, 30);

        return () => clearInterval(interval);
    }

    const generateRandomPrompt = (checkInputs: boolean = false) => {
        setIsFixLoadingConflict(checkInputs)
        setErrorMessage('')
        setDisplayText('')
        setDisplayCategory('')
        setCountdown(null)
        
        const ArrayOfRiddleMatchingSelection = bestRiddles

        // Check if there are any riddles matching the selection
        if (ArrayOfRiddleMatchingSelection.length === 0) {
            setErrorMessage(`No riddles found for category: ${selectedCategory}`);
            return;
        }

        const randomIndex = Math.floor(Math.random() * ArrayOfRiddleMatchingSelection.length)
        const newAnswer = ArrayOfRiddleMatchingSelection[randomIndex]
        setCurrentAnswer(newAnswer)
        handleLoad(checkInputs)
        
        setTimeout(() => {
            typewriterEffect(newAnswer.question, setDisplayText, setIsTyping)
            setShowLoading(false)
            setShowShuffle(true)

            // Start countdown when question is done showing
            setTimeout(() => {
                setCountdown(20); // 10 second countdown
            }, newAnswer.question.length * 30 + 500)
        }, 500)
    }

    const handleLoad = (checkInputs: boolean) => {
        setShowLoading(true)
        if (!checkInputs){
            setShowShuffle(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">
                        Select a Category
                    </label>
                    <select 
                        disabled={true}
                        className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed opacity-70"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {errorMessage && (
                <div className="text-red-500 bg-red-50 p-3 rounded-md">
                    {errorMessage}
                </div>
            )}

            <div className="min-h-[100px] bg-gray-50 p-4 rounded-lg">
                {isTyping || displayText ? (
                    <div className="font-medium">
                        {displayText}
                        {isTyping && <span className="animate-pulse">|</span>}

                        <div className='flex justify-between items-center'>
                            {countdown !== null && (
                                <div className="mt-4 text-lg font-bold">
                                    Answer in: <span className="text-blue-600">{countdown}</span>
                                </div>
                            )}
                            
                            {(isTypingCategory || displayCategory) && (
                                <div className="text-xs text-gray-600 italic mt-4">
                                    {displayCategory}
                                    {isTypingCategory && <span className="animate-pulse">|</span>}
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="self-stretch flex flex-col sm:flex-row justify-between flex-1 pb-4 gap-x-12 gap-y-3">
                <Button 
                    className='border-2 border-black text-xs text-[163300] bg-[#FFC107] hover:bg-[#333333] focus:active:bg-[#333333] hover:text-white active:hover:text-white shadow-[2px_2px_0_0_#163300] flex-1'
                    onClick={() => generateRandomPrompt(true)}
                    disabled={isTyping || isTypingCategory}
                >
                    GENERATE {' '}
                    {fixLoadingConflict && showLoading && (<Loader className="animate-spin inline" />)}
                </Button>
                <Button
                    className='shadow-[2px_2px_0_0_#163300] bg-white text-black hover:bg-[#1f1e1e] active:bg-[#1f1e1e] border-2 border-black text-xs focus:active:bg-[#333333] hover:text-white active:hover:text-white flex-1'
                    onClick={() => generateRandomPrompt(false)}
                    disabled={isTyping || isTypingCategory}
                >
                    Challenge Me {' '}
                    {showShuffle && (<Shuffle className="inline" />)}
                    {!fixLoadingConflict && showLoading && (<Loader className="animate-spin inline" />)}
                </Button>
            </div>
        </div>
    )
}

export default RiddleGenerator