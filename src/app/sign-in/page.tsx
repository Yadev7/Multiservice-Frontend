"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
// SVG Icon for password visibility toggle
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


// Main Sign-In Page Component
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

    const { t } = useTranslation();

  // This effect is kept from the original code for client-side hydration.
  useEffect(() => {
    // On mount, you might want to check for an existing token.
    // This logic can be adapted as needed.
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/email/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.errors
          ? Object.values(data.errors).join(", ")
          : data.message || "Failed to log in";
        throw new Error(errorMessage);
      }

      console.log("Login successful:", data);
      // Store tokens and redirect as per your application's logic
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      if (data.user?.userType === "PROVIDER") {
        window.location.href = "/post-task";
      } else if (data.user?.userType === "CLIENT") {
        window.location.href = "/services/browse-tasks";
      } else {
        window.location.href = "/admin";
      }
    } catch (err: unknown) {
      console.error("Login failed:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  return (
    <div className="min-h-screen bg-white text-gray-800 flex font-sans">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* <div className="mb-8">
            <h1 className="text-2xl font-bold text-teal-600">TAKEPACK</h1>
          </div> */}

          <h2 className="text-4xl font-bold mb-3">{t('sign_in.title')}</h2>
          <p className="text-gray-600 mb-8">
            {t('sign_in.description')}
          </p>

          {/* Social Logins */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C41.38,36.168,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              <span className="text-sm font-medium text-gray-700 cursor-pointer">avec Google</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-1.5 c-1.1,0-1.5,0.49-1.5,1.4v1.6H16l-0.5,3H13v6.8C18.56,20.87,22,16.84,22,12z" />
              </svg>
              <span className="text-sm font-medium text-gray-800 cursor-pointer"> avec Facebook </span>
            </button>
          </div> */}

          {/* Separator */}
          {/* <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Ou</span>
            </div>
          </div> */}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('sign_in.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t('sign_in.email_placeholder')}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none transition-all duration-300 ease-in-out
                focus:border-blue-500 
                focus:ring-4 
                focus:ring-blue-500/20 
                focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('sign_in.password')}
              </label>
              <div className="relative">
            <input
              id="password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              autoComplete="current-password"
              placeholder={t('sign_in.password_placeholder')}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none transition-all duration-300 ease-in-out
                focus:border-blue-500 
                focus:ring-4 
                focus:ring-blue-500/20 
                focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                >
                  {passwordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 font-semibold transition disabled:bg-teal-400 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Connexion..." : t('sign_in.sign_in_button')}
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-600 mt-8 border-t border-gray-200 pt-6">
            <p className="mb-4">{t('sign_in.gestion_account')}</p>
            <div className="space-y-4">
              <a href="/forgot-password" className="block font-medium text-black-600 hover:text-black-500">
                {t('sign_in.forgot_password')}
              </a>
              {/* <a href="/sign-up" className="block w-full bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg p-3 font-semibold transition">
                Créer un nouveau compte
              </a> */}
            </div>
          </div>
        </div>
      </div>


      {/* Right Column: Welcome Message & Image */}
<div className="hidden lg:flex w-1/2 items-center justify-center p-12 relative">
  {/* We use 'fill' here so the image expands to the parent container. 
      Ensure the parent has 'relative' and defined dimensions.
  */}
  <Image
    src="/signIn.png"
    alt="Sign In Illustration"
    fill
    priority // Loads the image faster as it's above the fold
    className="object-cover"
    sizes="(max-width: 1024px) 100vw, 50vw"
  />
</div>
    </div>
  );
}
