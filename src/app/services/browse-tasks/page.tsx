"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the map component without SSR
const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

// --- Data and Types (defined outside components) ---
const serviceProviders = [
  { id: 1, name: 'Carlos Rodriguez', service: 'Plumbing', rating: 4.8, reviewCount: 124, distance: '2.5 miles', imageUrl: '/PlumbingCarlos.png', isAvailable: true },
  { id: 2, name: 'Maria Garcia', service: 'Cleaning', rating: 4.9, reviewCount: 210, distance: '1.8 miles', imageUrl: '/HouseCleaningMaria.png', isAvailable: false },
  { id: 3, name: 'James Smith', service: 'Gardening', rating: 4.7, reviewCount: 88, distance: '5.1 miles', imageUrl: '/GardeningJames.png', isAvailable: false },
  { id: 4, name: 'Patricia Johnson', service: 'Handyman', rating: 5.0, reviewCount: 305, distance: '3.0 miles', imageUrl: '/HandymanPatricia.png', isAvailable: true },
];

type Provider = {
  id: number;
  name: string;
  service: string;
  rating: number;
  reviewCount: number;
  distance: string;
  imageUrl: string;
  isAvailable: boolean;
};

// --- Mock Translation Function (to resolve 't' is not defined) ---
const t = (key: string, lang: string) => {
    // In a real app, this would use an i18n library like i18next or react-intl
    const translations: { [key: string]: string } = {
        available: "Available",
        unavailable: "Unavailable",
        plumbing: "Plumbing",
        cleaning: "Cleaning",
        gardening: "Gardening",
        handyman: "Handyman",
        reviews: "Reviews",
        get_in_touch: "Get in Touch",
    };
    return translations[key] || key;
};


// --- Child Components (defined outside the main component) ---
interface ProviderCardProps {
  provider: Provider;
  lang: string;
}

const ProviderCard = ({ provider, lang }: ProviderCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300 ease-in-out max-w-sm w-full mx-auto">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={provider.imageUrl}
          alt={provider.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, 400px"
          priority
        />
        <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-semibold text-white rounded-full ${provider.isAvailable ? "bg-green-500" : "bg-gray-400"}`}>
          {provider.isAvailable ? t("available", lang) : t("unavailable", lang)}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{provider.name}</h3>
        <p className="text-md text-gray-600 font-medium">{t(provider.service.toLowerCase(), lang)}</p>
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
          <span className="font-bold text-gray-700 mr-1">{provider.rating}</span>
          ({provider.reviewCount} {t("reviews", lang)})
        </div>
        <div className="mt-4">
          <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 cursor-pointer">
            {t("get_in_touch", lang)}
          </button>
        </div>
      </div>
    </div>
  );
};

interface CardListComponentProps {
  providers: Provider[];
  lang: string;
}

const CardListComponent = ({ providers, lang }: CardListComponentProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {providers.map(provider => (
        <ProviderCard key={provider.id} provider={provider} lang={lang} />
      ))}
    </div>
  );
};


// --- Main Page Component ---
function BrowseTasksPage() {
  // ✅ Correct: Hooks are now inside the component
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState('list'); // Default to list view
  const [mapCenter, setMapCenter] = useState<[number, number] | undefined>([34.0333, -5.0000]); // Example: Center on Fes
  
  // This will be needed for child components, defining it here.
  const lang = "en"; 

  const filteredProviders = serviceProviders.filter((provider) =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-4 justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Browse Services</h1>
          <div className="flex items-center gap-4">
             <input
              type="text"
              placeholder="Search by name or service..."
              className="border rounded-md p-2 text-sm w-48"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* View Toggle Buttons */}
            <div className="flex rounded-md border">
                 <button onClick={() => setView('list')} className={`px-3 py-1 text-sm font-medium rounded-l-md ${view === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}>List</button>
                 <button onClick={() => setView('map')} className={`px-3 py-1 text-sm font-medium rounded-r-md ${view === 'map' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}>Map</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* ✅ Correct Rendering Logic: Show either the list or the map once. */}
        <div className="transition-opacity duration-500 ease-in-out">
          {view === 'list' ? (
            <CardListComponent providers={filteredProviders} lang={lang} />
          ) : (
            <div className="w-full h-[60vh] rounded-2xl overflow-hidden shadow-lg">
               {/* Ensure MapComponent receives the center prop */}
               <MapComponent center={mapCenter} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default BrowseTasksPage;