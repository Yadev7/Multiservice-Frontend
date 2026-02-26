"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";


// --- SVG Icons ---
const EyeIcon = ({ ...props }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ ...props }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { t } = useTranslation();


  const getBannerImage = () => {
    switch (i18n.language) {
      case 'ar': return "/signIn-ar.png";
      case 'fr': return "/signIn-fr.png";
      default: return "/signIn-en.png";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        // CRITICAL: This allows the browser to receive and store the HTTP-only cookies
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        // Special check for 401 Unauthorized
        if (response.status === 401) {
          throw new Error("Credentials are incorrect");
        }
        throw new Error(data.message || "Failed to log in");
      }

      console.log("Login successful. Cookies set.");

      
      // 2. Redirect to members
      window.location.href = "/members";

    } catch (err: unknown) {
      console.error("Login failed:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex font-sans">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-3">{t('sign_in.title')}</h2>
          <p className="text-gray-600 mb-8">{t('sign_in.description')}</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('sign_in.email')}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder={t('sign_in.email_placeholder')}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('sign_in.password')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder={t('sign_in.password_placeholder')}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                >
                  {passwordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 font-semibold transition disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : t('sign_in.sign_in_button')}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-8 border-t border-gray-200 pt-6">
            <p className="mb-4">{t('sign_in.gestion_account')}</p>
            <a href="/forgot-password" className="block font-medium text-black hover:underline">
              {t('sign_in.forgot_password')}
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Illustration */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12 relative bg-gray-50">
        <Image
          src={getBannerImage()}
          alt="Sign In Illustration"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
      </div>
    </div>
  );
}