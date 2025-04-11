import Link from "next/link"
import CategoryUI from "@/components/CategoryUi"
import { Brain,  } from "lucide-react"
import InteractiveCategoryExplorer from "@/components/InteractiveCategoryExplorer"
 
const Footer = ({className}: {className: string}) => {
  return (
    <footer className={`mt-36 mb-16 ${className} `}>
      <InteractiveCategoryExplorer />
      
      <div className="flex flex-col gap-6 justify-between items-start sm:flex-row">
        <div className="flex-1 flex flex-col space-y-4">
          <Link href={'/'} className="flex items-center gap-4">
            <Brain />
            <span className="block font-semibold text-sm sm:text-base">NOFAREHIKE GENERATOR</span>
            <span className="block font-semibold text-sm sm:text-base bg-purple-500 text-white px-1 rounded-[3px]">
                Riddle
            </span>
          </Link>
          <p className="text-[12px]">
            <span className="border-b-2 border-b-[#1C3144]/60">AI Riddle Generator</span> is a fun extension of NoFareHike, bringing brain teasers to your everyday interactions.
          </p>
          <p className="text-[12px]">Created to help you challenge minds and spark critical thinking in any situation with just a few clicks.</p>
          <p className="text-[12px]">Have feedback or riddle suggestions? Let us know on <a href={'https://x.com/emannsunday'} target="_blank" rel="noopener noreferrer">X</a></p>
          <p className="text-[10px]">&copy; Copyright{new Date().getFullYear()} .</p>
        </div>
        
        <div className="flex-1">
          <h2 className="text-base font-bold mb-2">Quick Links</h2>
          <ul className="text-xs font-light flex flex-col space-y-2">
            <li className="hover:underline">
              <Link href='/'>
                Riddes AI
              </Link>
            </li>
            <li className="hover:underline">
              <Link href='/riddles/categories'>
                Categories
              </Link>
            </li>
            <li className="hover:underline">
              <Link href='/riddles/trending'>
                Trending Riddles
              </Link>
            </li>
            <li className="hover:underline">
              <Link href='/riddles/impossible'>
                Impossible Riddles
              </Link>
            </li>
            <li className="hover:underline">
              <Link href='/privacy-policy'>
                Privacy Policy
              </Link>
            </li>
            <li className="hover:underline">
              <Link href='/terms-of-service'>
                Terms of Service
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer