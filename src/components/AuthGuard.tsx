// src/components/AuthGuard.tsx
"use client";

import { useEffect, useState, ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

// --- Define your routes here for easy management ---
const PROTECTED_ROUTES = ['/post-task', '/dashboard', '/profile', '/services/browse-tasks'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Wait until the auth status is finished loading from your context
    if (isLoading) {
      return;
    }

    const isAuthPage = AUTH_ROUTES.includes(pathname);
    const isProtectedPage = PROTECTED_ROUTES.includes(pathname);

    // If user is logged in, redirect them away from auth pages
    if (token && isAuthPage) {
      router.replace('/dashboard'); // Or your default logged-in page
      return;
    }

    // If user is not logged in, redirect them away from protected pages
    if (!token && isProtectedPage) {
      router.replace('/sign-in');
      return;
    }

    // If none of the redirect conditions are met, the user is authorized to see the page
    setIsVerified(true);

  }, [isLoading, token, pathname, router]);

  // Show a loading spinner while checking auth or before verification is complete
  if (isLoading || !isVerified) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <div className="spinner"></div>
        <style jsx global>{`
          .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #09f;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If authorized, render the page's content
  return <>{children}</>;
};

export default AuthGuard;