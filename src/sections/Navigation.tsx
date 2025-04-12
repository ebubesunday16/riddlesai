'use client';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/data/constantValue';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

// If you don't have menuItems defined, here's an example structure

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [isNavItem, setIsNavItem] = useState(false)
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [itemHover, setIsItemHover] = useState(false)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const closeMenu = (e: React.MouseEvent) => {
      if (isOpen && (e.target as Element).closest('.hamburger-container') === null) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [isOpen]);

  return (

    <nav className="flex items-center space-x-4 ">
            <ul className="hidden sm:flex sm:gap-4 ">
              {menuItems.length>0 &&(menuItems.map((menu) => (

                
                <li 
                key={menu.id}
                className='relative'
                onClick={() => setIsNavItem(prev => !prev)
                
                }
                >
                  <div className='flex gap-2 justify-between items-center'>
                    <Link href={menu.href} className=" text-xs ">
                      {menu.label}
                    </Link>
                      {menu.content && (<ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        isNavItem ? 'rotate-180' : ''
                        }`}
                      />)}
                  </div>

                  {isNavItem && menu.content && (
                    <div className="absolute top-full -right-4 w-48 mt-5 bg-white rounded-md shadow-Btn border-2 border-black">
                      <ul className="py-1">
                        {menu.content.map((menuitem) => (
                          <li
                            key={menu.id}
                            className=" border-b"
                          >
                            <Link
                              href={menuitem.href}
                              className="block py-1 px-4 text-xs text-gray-700 hover:bg-gray-100 transition-colors"
                            >

                              {menuitem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>)}
                  
                </li>
              )))}
            </ul>
              <Button className='shadow-[2px_2px_0_0_#163300]'
              
                >
              <div className="hamburger-container relative">
      {/* Button container */}
      <div className="flex items-center gap-2">
      <span onClick={() => signIn("google")}>LOGIN</span>
      <div 
        onClick={toggleMenu}
        className="flex items-center justify-center rounded-md  focus:outline-none sm:hidden"
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <ChevronDown
          size={24}
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full -right-4 w-48 mt-5 bg-white rounded-md shadow-Btn border-2 border-black px-2">
    <ul className="py-1">
      {menuItems.map((menu) => (
        <li
          key={menu.id}
          className=" border-b"
          onMouseEnter={() => setHoveredId(menu.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Link
            href={menu.href}
            className="block py-1 text-xs text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {menu.label}
            {hoveredId === menu.id && menu.content && (
              <div className=" mt-2  ">
                {menu.content.map((item, index) => (
                  <div className='flex items-center justify-start gap-[1px]'>
                    <div>
                      <ChevronRight className=''/>  
                      </div>
                    <Link
                      key={index}
                      href={item.href}
                      className="block py-1 pl-1 text-[10px] text-gray-700 hover:bg-gray-100 transition-colors hover:underline-offset-2 hover:underline"
                    >
                        {item.label} 

                    </Link>
                      

                  </div>
                ))}
              </div>
            )}
          </Link>
          {/* Only show submenu if item has content and is being hovered */}
        </li>
      ))}
    </ul>
        </div>
      )}
    </div>
              </Button>
              

        </nav>

    
  );
};

export default Navigation;