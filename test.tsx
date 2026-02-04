import React, { useState, useEffect } from 'react';
import { MapPin, HandPlatter, Map, List } from 'lucide-react';

// --- Mock i18n and Next.js functionalities for standalone environment ---

// Mock implementation of the useLanguage hook.
// In a real Next.js app, this would come from your context.
const useLanguage = () => ({ lang: 'en' });

// Mock implementation of the translation function 't'.
// It returns a simple capitalized version of the key for demonstration.
const t = (key, lang) => {
    const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return formattedKey;
};

// Mock useRouter hook
const useRouter = () => ({
  push: (path) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would navigate to the new page.
    // Here, we just log it to the console.
    alert(`Search initiated! Would navigate to: ${path}`);
  }
});

// --- Helper Data ---
// Static data for the service provider cards.
const serviceProviders = [
  {
    id: 1,
    name: 'Carlos Rodriguez',
    service: 'Plumbing',
    rating: 4.8,
    reviewCount: 124,
    distance: '2.5 miles',
    imageUrl: 'https://images.unsplash.com/photo-1559535332-969318471746?q=80&w=2070&auto=format&fit=crop',
    isAvailable: true,
  },
  {
    id: 2,
    name: 'Maria Garcia',
    service: 'House Cleaning',
    rating: 4.9,
    reviewCount: 210,
    distance: '1.8 miles',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop',
    isAvailable: true,
  },
  {
    id: 3,
    name: 'James Smith',
    service: 'Gardening',
    rating: 4.7,
    reviewCount: 88,
    distance: '5.1 miles',
    imageUrl: 'https://images.unsplash.com/photo-1605332222878-384347684534?q=80&w=2070&auto=format&fit=crop',
    isAvailable: false,
  },
  {
    id: 4,
    name: 'Patricia Johnson',
    service: 'Handyman',
    rating: 5.0,
    reviewCount: 305,
    distance: '3.0 miles',
    imageUrl: 'https://images.unsplash.com/photo-1577983054552-51a5a7828a2a?q=80&w=1925&auto=format&fit=crop',
    isAvailable: true,
  },
];


// --- Child Components ---

// A placeholder for your MapComponent since dynamic import is not available here.
const MapComponent = ({ markers }) => {
  return (
    <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 shadow-inner">
      <div className="text-center">
        <Map className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold">Map View</h2>
        <p className="mt-1">Your map component will be displayed here.</p>
        <p className="mt-2 text-sm text-gray-400">{markers.length} marker(s) would be shown.</p>
      </div>
    </div>
  );
};


// Component for a single service provider card
const ProviderCard = ({ provider, lang }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={provider.imageUrl}
          alt={`Photo of ${provider.name}`}
          onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/600x400/E2E8F0/4A5568?text=${provider.service}`; }}
        />
        <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-semibold text-white rounded-full ${provider.isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}>
          {provider.isAvailable ? t('available', lang) : t('unavailable', lang)}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{provider.name}</h3>
        <p className="text-md text-gray-600 font-medium">{t(provider.service.toLowerCase(), lang)}</p>
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <span className="font-bold text-gray-700 mr-1">{provider.rating}</span>
          ({provider.reviewCount} {t('reviews', lang)})
        </div>
        <div className="mt-4">
          <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            {t('book_now', lang)}
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for the list of cards
const CardListComponent = ({ providers, lang }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {providers.map(provider => (
        <ProviderCard key={provider.id} provider={provider} lang={lang} />
      ))}
    </div>
  );
};


// --- Main HeroSection Component ---

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  // Mocking fetched data for cities and services
  const [cities, setCities] = useState({casablanca: "Casablanca", rabat: "Rabat"});
  const [services, setServices] = useState({handyman: "Handyman", plumbing: "Plumbing", electrician: "Electrician"});
  const { lang } = useLanguage();
  const router = useRouter();

  // State to track the current view ('list' or 'map')
  const [view, setView] = useState('list');

  const markers = [
    { position: [33.5731, -7.5898], label: 'Casablanca' },
    { position: [34.0209, -6.8416], label: 'Rabat' },
  ];

  // Removed useEffect fetching data from API as it's not available in this environment
  // You can re-enable it in your Next.js project.

  const handleSearch = () => {
    if (location && service) {
      router.push(`/search?city=${location}&service=${service}`);
    } else {
      alert("Please select a location and a service.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop')` }}
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4 py-24">
          <p className="text-lg font-semibold mb-2">
            {t("your_solution_hub", lang)}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {t("find_the_right", lang)}{" "}
            <span className="text-yellow-400">{t("talent", lang)}</span>{" "}
            {t("for_any_task", lang)}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            {t("hero_description", lang)}
          </p>

          {/* <div className="bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between p-4 w-full max-w-3xl gap-4">
            <div className="w-full sm:w-auto flex-1 flex items-center border border-gray-200 rounded-lg p-2">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <select
                className="w-full bg-transparent text-gray-700 focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">{t("select_location", lang)}</option>
                {Object.keys(cities).map((city) => (
                  <option key={city} value={city}>
                    {t(city, lang)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="w-full sm:w-auto flex-1 flex items-center border border-gray-200 rounded-lg p-2">
              <HandPlatter className="w-5 h-5 text-gray-400 mr-2" />
              <select
                className="w-full bg-transparent text-gray-700 focus:outline-none"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">{t("select_service", lang)}</option>
                {Object.keys(services).map((service) => (
                  <option key={service} value={service}>
                    {t(service, lang)}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={handleSearch} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold w-full sm:w-auto">
              {t("search", lang)}
            </button>
          </div> */}

          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-white font-semibold">{t("popular", lang)}:</span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-white/30">{t("handyman", lang)}</span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-white/30">{t("plumbing", lang)}</span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-white/30">{t("electrician", lang)}</span>
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-white/30">{t("painting", lang)}</span>
          </div>
        </div>
      </div>

      {/* --- View Toggle and Content Display --- */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="relative flex p-1 bg-white border border-gray-200 rounded-full shadow-sm">
            <span
              className={`absolute top-1 bottom-1 transition-all duration-300 ease-in-out bg-indigo-600 rounded-full shadow-md`}
              style={{ width: 'calc(50% - 4px)', left: view === 'list' ? '4px' : 'calc(50% + 4px)'}}
            ></span>
            <button
              onClick={() => setView('list')}
              className={`relative z-10 flex items-center justify-center w-32 py-2.5 text-sm font-bold transition-colors duration-300 ${view === 'list' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <List className="w-5 h-5 mr-2" />
              {t('list_view', lang)}
            </button>
            <button
              onClick={() => setView('map')}
              className={`relative z-10 flex items-center justify-center w-32 py-2.5 text-sm font-bold transition-colors duration-300 ${view === 'map' ? 'text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Map className="w-5 h-5 mr-2" />
              {t('map_view', lang)}
            </button>
          </div>
        </div>

        <div className="transition-opacity duration-500 ease-in-out">
          {view === 'list' ? (
            <CardListComponent providers={serviceProviders} lang={lang} />
          ) : (
            <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg">
                <MapComponent markers={markers} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
