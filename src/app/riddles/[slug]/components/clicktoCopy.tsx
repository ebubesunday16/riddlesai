'use client'
import { Copy, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

const ClickToCopy = ({content} : {content: string}) => {
    const [isLove, setIsLove] = useState(false)
    const [isCopy, setIsCopy] = useState(false)
    const [likes, setLikes] = useState(0)
    const [hasLiked, setHasLiked] = useState(false)
    const [hasCopied, setHasCopied] = useState(false)

    // Initialize likes from localStorage or generate random number
    useEffect(() => {
        const storedLikes = localStorage.getItem(`likes-${content}`)
        const storedHasLiked = localStorage.getItem(`hasLiked-${content}`)
       
        if (storedLikes) {
            setLikes(parseInt(storedLikes))
        } else {
            const randomLikes = Math.floor(Math.random() * 200) + 1
            setLikes(randomLikes)
            localStorage.setItem(`likes-${content}`, randomLikes.toString())
        }

        if (storedHasLiked) {
            setHasLiked(storedHasLiked === 'true')
        }
    }, [content])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content)
            setHasCopied(true)
            // Show "Copied!" briefly
            setTimeout(() => {
                setHasCopied(false)
            }, 2000)
        } catch (err) {
            console.error('Failed to copy text:', err)
        }
    }

    const handleLike = () => {
        if (hasLiked) {
            // Unlike: Decrease likes and remove from localStorage
            const newLikes = likes - 1
            setLikes(newLikes)
            setHasLiked(false)
            localStorage.setItem(`likes-${content}`, newLikes.toString())
            localStorage.removeItem(`hasLiked-${content}`)
        } else {
            // Like: Increase likes and add to localStorage
            const newLikes = likes + 1
            setLikes(newLikes)
            setHasLiked(true)
            localStorage.setItem(`likes-${content}`, newLikes.toString())
            localStorage.setItem(`hasLiked-${content}`, 'true')
        }
    }

    return (
        <div className={`flex border-2 border-[#1C3144] shadow-Btn rounded-[6px] ${hasCopied && 'bg-[#FFC107]'}`}
        >
            <div
                className={`border-r-2 border-[#1C3144] p-[4px] flex gap-[4px] items-center cursor-pointer ${hasLiked ? 'text-red-500' : ''}`}
                onMouseEnter={() => setIsLove(true)}
                onMouseLeave={() => setIsLove(false)}
                onClick={handleLike}
            >
                {isLove ? (
                    <span className='text-xs'>{hasLiked ? 'Unlike' : 'Love'}</span>
                ) : (
                    <span className='text-xs'>{likes}</span>
                )}
                <Heart size={18} fill={hasLiked ? 'currentColor' : 'none'} />
            </div>
            <div
                className='p-[4px] flex gap-[4px] items-center cursor-pointer'
                onMouseEnter={() => setIsCopy(true)}
                onMouseLeave={() => setIsCopy(false)}
                onClick={handleCopy}
            >
                {isCopy && (hasCopied ? (
                    <span className='text-xs'>Copied</span>
                ) : (
                    <span className='text-xs'>Copy</span>

                ))
                
                
                }
                <Copy size={18} />
            </div>
        </div>
    )
}

export default ClickToCopy