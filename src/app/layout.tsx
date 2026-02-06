'use client';

import './globals.css'
import Header from '../components/Header'
import type { ReactNode } from 'react'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { ReduxProvider } from '../store/redux-provider' // ✅ import your ReduxProvider
import { AuthProvider } from '../context/AuthContext';
import AuthGuard from '../components/AuthGuard';
import { ThemeProvider } from 'next-themes'

import '../i18n/index'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 z-index-0">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
      <AuthProvider>
      <AuthGuard>
        <ReduxProvider> {/* ✅ Redux context */}
          {/* <LanguageProvider> ✅ Language/i18n context */}
            <Header />
            <main>
              {children}
            </main>
            {/* <Footer /> */}
          {/* </LanguageProvider> */}
        </ReduxProvider>
        </AuthGuard>
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
