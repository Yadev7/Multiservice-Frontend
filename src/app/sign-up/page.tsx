"use client";

import { t } from "i18next";
import { useTranslation } from "react-i18next";
// import React, { createContext, useContext, useState } from "react";


// --- SVG Icons ---
const UserIcon = ({ ...props }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

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

const CheckCircleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

// --- Reusable Components ---

// Alert component for success/error messages
const Alert = ({ message, type }: { message: string; type: "success" | "error" }) => {
  const baseClasses = "p-4 rounded-lg mb-4 text-sm font-medium text-center";
  const typeClasses = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
  };
  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      {message}
    </div>
  );
};

// Custom Radio Button Card for User Type Selection
const UserTypeCard = ({ value, title, description, selected, onChange }) => (
    <div
        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300 hover:border-gray-400'}`}
        onClick={() => onChange(value)}
    >
        <div className="flex items-start">
            <div className="flex-shrink-0">
                <UserIcon className={`h-6 w-6 mr-4 mt-1 ${selected ? 'text-blue-600' : 'text-gray-500'}`} />
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">{title}</h3>
                    {selected && <CheckCircleIcon className="h-5 w-5 text-blue-500" />}
                </div>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    </div>
);


// The main SignUpPage component
const SignUpPage = () => {
    const { i18n } = useTranslation();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        userType: "CLIENT", // Default value updated to uppercase
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    // const handleUserTypeChange = (value: string) => {
    //     setForm({ ...form, userType: value });
    // };
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const API_URL = "http://localhost:3001/api/v1/auth/email/register";
        
        // FIX: Both CLIENT and PROVIDER are types of 'User'.
        // They should share the same roleId that corresponds to the 'User' role in the database.
        // Assuming the 'User' role has an ID of 2, as client registration was working.
        const roleId = 2; 

        const payload = { ...form, roleId };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorMessage = `Request failed: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = Array.isArray(errorData.message)
                        ? errorData.message.join(", ")
                        : errorData.message || "An unexpected error occurred.";
                } catch (jsonError) {
                    console.error("Could not parse error response as JSON:", jsonError);
                }
            }
            
            setSuccess(true);
            // Redirect to sign-in page after a short delay to show the success message
            setTimeout(() => {
                window.location.href = '/sign-in';
            }, 2000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    // const nextStep = () => setStep(step + 1);
    // const prevStep = () => setStep(step - 1);

    return (
        <div className="min-h-screen bg-white text-gray-800 flex font-sans">
            {/* Left Column: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-bold mb-2">Créer un compte</h2>
                    <p className="text-gray-600 mb-8">
                        Rejoignez notre communauté de clients et de prestataires ! Créez un compte pour commencer à trouver ou offrir des services.
                    </p>
                    
                    {error && <Alert message={error} type="error" />}
                    {success && <Alert message="Inscription réussie ! Redirection en cours..." type="success" />}

                    <form onSubmit={handleSubmit}>
                        {/* {step === 1 && (
                            <div className="space-y-4">
                               <UserTypeCard
                                    value="CLIENT"
                                    title="Je suis un client"
                                    description="Je souhaite chercher et demander des services."
                                    selected={form.userType === 'CLIENT'}
                                    onChange={handleUserTypeChange}
                                />
                               <UserTypeCard
                                    value="PROVIDER"
                                    title="Je suis un provider"
                                    description="Je souhaite présenter mes services pour les clients."
                                    selected={form.userType === 'PROVIDER'}
                                    onChange={handleUserTypeChange}
                                />
                            </div>
                        )} */}


                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                        <input id="firstName" type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                        <input id="lastName" type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input id="email" type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={passwordVisible ? "text" : "password"}
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
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
                                                                                                    <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-8 font-semibold transition disabled:bg-teal-400">
                                    {loading ? "Création..." : "Créer un compte"}
                                </button>
                            </div>
 

                        {/* Navigation and Submission */}
                        {/* <div className="mt-8 flex items-center justify-between">
                            {step === 1 && <div />}
                            {step === 2 && (
                                <button type="button" onClick={prevStep} className="text-sm font-semibold text-gray-600 hover:text-gray-800">
                                    Précédent
                                </button>
                            )}
                            
                            {step === 1 && (
                                <button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-8 font-semibold transition cursor-pointer">
                                    Continuer
                                </button>
                            )}

                            {step === 2 && (
                                <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-8 font-semibold transition disabled:bg-teal-400">
                                    {loading ? "Création..." : "Créer un compte"}
                                </button>
                            )}
                        </div> */}
                    </form>

                    {/* Progress Bar */}
                    {/* <div className="mt-8">
                        <div className="relative h-1 w-full bg-gray-200 rounded-full">
                            <div className="absolute top-0 left-0 h-1 bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${(step / 2) * 100}%` }}></div>
                        </div>
                    </div> */}
                    
                    {/* START: Social Login Section */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Ou s'inscrire avec
                            </span>
                        </div>
                    </div>
{/* 
                    <div className="space-y-4">
                        <button
                            type="button"
                            onClick={handleGoogleSignUp}
                            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C41.38,36.168,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            <span className="text-sm font-medium text-gray-800">S'inscrire avec Google</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleFacebookSignUp}
                            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#166eeb] transition cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-1.5 c-1.1,0-1.5,0.49-1.5,1.4v1.6H16l-0.5,3H13v6.8C18.56,20.87,22,16.84,22,12z" />
                            </svg>
                            <span className="text-sm font-medium">S'inscrire avec Facebook</span>
                        </button>
                    </div> */}
                    {/* END: Social Login Section */}


                    <p className="mt-8 text-center text-sm text-gray-600">
                        Vous avez déjà un compte?{" "}
                        <a href="/sign-in" className="text-blue-600 hover:underline font-semibold">
                           {t("sign_in")}
                        </a>
                    </p>
                </div>
            </div>

            {/* Right Column: Promo */}
            <div className="hidden lg:flex w-1/2 bg-teal-50 flex-col items-center justify-center p-12">
                <div className="max-w-lg w-full">
                     <h2 className="text-4xl font-bold text-teal-800 mb-4 leading-tight">
                        Trouvez des services,<br/>offrez votre expertise
                     </h2>
                     <p className="text-teal-700 mb-12">
                        Rejoignez Baghi aujourd'hui et connectez-vous avec des clients et des fournisseurs de services.
                     </p>
                     <div className="space-y-6">
                         {/* Feature Cards */}
                         <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
                             <h3 className="font-bold text-lg text-teal-900 mb-2">Communauté Vérifiée</h3>
                             <p className="text-sm text-teal-800">Rejoignez des milliers de clients et de prestataires de services vérifiés. Collaborez en toute confiance.</p>
                         </div>
                          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
                             <h3 className="font-bold text-lg text-teal-900 mb-2">Matching Intelligent</h3>
                             <p className="text-sm text-teal-800">Notre IA vous aide à trouver facilement le service ou le client qui correspond à vos besoins.</p>
                         </div>
                          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
                             <h3 className="font-bold text-lg text-teal-900 mb-2">Sécurisé & Protégé</h3>
                             <p className="text-sm text-teal-800">Profils vérifiés, paiements sécurisés et une assistance complète pour votre tranquillité d'esprit.</p>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
