import { BrainLogo } from "@/customSVG"
import Link from "next/link"
import Navigation from "./Navigation"
import { Brain } from "lucide-react"

const Header = ({className}: {className: string}) => {
    return (
      <header className={`flex items-center justify-between mt-6 gap-2 ${className}`}>
          {/* Logo SETUP */}
          <Link href={'/'} className="flex items-center gap-4">
              <Brain />
              <span className="block font-semibold text-sm sm:text-base">NOFAREHIKE GENERATOR</span>
              <span className="font-semibold text-sm sm:text-base bg-purple-500 text-white px-1 rounded-[3px] sm:block hidden">
                  Riddle
              </span>
          </Link>
          {/* NavItems SETUP */}
          <Navigation />
      </header>
    )
}

export default Header