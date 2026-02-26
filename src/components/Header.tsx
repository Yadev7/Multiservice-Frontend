"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react"; 
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Dropdown State
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  
  const { user, logout: clearAuthContext } = useAuth();
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     await fetch("http://localhost:3001/logout", { 
  //       method: "POST", 
  //       credentials: "include" 
  //     });
  //     clearAuthContext(); 
  //     setIsProfileOpen(false);
  //     router.push("/sign-in");
  //     closeAllMenus();
  //   } catch (err) {
  //     console.error("Logout error:", err);
  //   }
  // };


//   const handleLogout = async () => {
//   try {
//     // 1. Call backend to clear HTTP-only cookies
//     await fetch("http://localhost:3001/logout", { 
//       method: "POST", 
//       credentials: "include" 
//     });

//     // 2. Clear Client-side Storage
//     localStorage.clear();
//     sessionStorage.clear();

//     // 3. Clear non-HTTP-only cookies manually
//     document.cookie.split(";").forEach((c) => {
//       document.cookie = c
//         .replace(/^ +/, "")
//         .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
//     });

//     // 4. Reset Auth Context and Redirect
//     clearAuthContext(); 
//     setIsProfileOpen(false);
//     router.push("/sign-in");
//     closeAllMenus();
//   } catch (err) {
//     console.error("Logout error:", err);
//   }
// };



const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:3001/logout", { 
      method: "POST", 
      credentials: "include" // Vital to ensure the browser sends the cookie to be cleared
    });

    if (response.ok) {
      // 1. Clear local state first
      clearAuthContext(); 
      
      // 2. Clear any non-httpOnly data
      localStorage.removeItem('user'); 
      
      // 3. Use router.replace to prevent "Back" button from re-accessing the page
      setIsProfileOpen(false);
      router.replace("/sign-in");
      
      // 4. Force a refresh ONLY if the context didn't trigger a re-render
      // router.refresh(); 
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
};

  const closeAllMenus = () => { 
    setIsMobileMenuOpen(false); 
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={closeAllMenus} className="flex items-center group">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {t('header.title')}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t('header.about_us') || 'About Us'}
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t('header.contact_us') || 'Contact Us'}
            </Link>
          </nav>

          {/* Actions Section */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <select 
              value={i18n.language} 
              onChange={(e) => i18n.changeLanguage(e.target.value)} 
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg text-sm px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="fr">Français</option>
            </select>

            {/* AUTH SECTION */}
            {user ? (
              <div className="relative" ref={profileDropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-1 pr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 border border-transparent hover:border-gray-200"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white overflow-hidden border-2 border-white shadow-sm">
                    {user.picture ? (
                      <Image src={user.picture} alt="Profile" width={32} height={32} className="w-full h-full object-cover" />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                     {user?.name || user?.email?.split('@')[0] }
                    </p>
                    <p className="text-[10px] text-gray-500 leading-tight">{user.role}</p>
                  </div>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 dark:border-gray-800">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user.email}</p>
                    </div>
                    
                    <Link 
                      href="/profile" 
                      onClick={closeAllMenus}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <User size={16} />
                      <span>{t('header.profile') || 'My Profile'}</span>
                    </Link>

                    {/* <Link 
                      href="/settings" 
                      onClick={closeAllMenus}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Settings size={16} />
                      <span>{t('header.settings') || 'Settings'}</span>
                    </Link> */}

                    <div className="border-t border-gray-50 dark:border-gray-800 mt-2 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 w-full transition-colors"
                      >
                        <LogOut size={16} />
                        <span>{t('header.logout') || 'Logout'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/sign-in" 
                onClick={closeAllMenus} 
                className="bg-blue-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-500 hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                {t("header.sign_in")}
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-4 pb-6">
            <nav className="flex flex-col space-y-1 px-2">
              {user && (
                <div className="flex items-center space-x-3 px-3 py-4 border-b border-gray-50 dark:border-gray-800 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {user.picture ? <Image src={user.picture} alt="Profile" width={40} height={40} className="w-full h-full rounded-full object-cover" /> : <User size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{user.email}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
              )}
              <Link href="/" onClick={closeAllMenus} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">{t("home")}</Link>
              <Link href="/profile" onClick={closeAllMenus} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">{t("header.profile") || 'Profile'}</Link>
              
              <hr className="my-2 border-gray-100 dark:border-gray-800" />
              
              {user && (
                <button 
                    onClick={handleLogout} 
                    className="flex items-center text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> {t("header.logout") || "Logout"}
                  </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;