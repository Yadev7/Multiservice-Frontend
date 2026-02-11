"use client";

import Link from 'next/link';
import { Menu, X, Info, Mail, Star } from "lucide-react"; // Added icons for better UX
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        // Logic for profile dropdown (if implemented)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  const closeAllMenus = () => { setIsMobileMenuOpen(false); };

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

          {/* Desktop Navigation (New) */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t('header.about_us') || 'About Us'}
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t('header.contact_us') || 'Contact Us'}
            </Link>
            {/* <Link href="/reports" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {t('header.reports') || 'Reports'}
            </Link> */}
          </nav>

          {/* Actions Section (Language & Auth) */}
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

            <Link href="/sign-in" onClick={closeAllMenus} className="bg-blue-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-500 hover:scale-105 transition-all duration-300 hover:shadow-lg">
              {t("header.sign_in")}
            </Link>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-4 pb-6">
            <nav className="flex flex-col space-y-2 px-2">
              <Link href="/" onClick={closeAllMenus} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">{t("home")}</Link>
              <Link href="/services/all-services" onClick={closeAllMenus} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">{t("all_services")}</Link>
              <Link href="/worker/find-workers" onClick={closeAllMenus} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">{t("find_workers")}</Link>
              
              <hr className="my-2 border-gray-100 dark:border-gray-800" />
              
              {/* Added Links for Mobile */}
              <Link href="/about" onClick={closeAllMenus} className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                <Info className="w-4 h-4 mr-2" /> {t('header.about_us') || 'About Us'}
              </Link>
              <Link href="/contact" onClick={closeAllMenus} className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                <Mail className="w-4 h-4 mr-2" /> {t('header.contact_us') || 'Contact Us'}
              </Link>
              <Link href="/reports" onClick={closeAllMenus} className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                <Star className="w-4 h-4 mr-2" /> {t('header.reports') || 'Reports & Ratings'}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;