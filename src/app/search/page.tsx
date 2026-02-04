"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { List, MapPin, Star, LayoutGrid, HandPlatter, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" />
});

interface CompactSelectProps {
  label: string;
  icon: React.ReactNode;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

const CompactSelect = ({ label, icon, options, value, onChange, placeholder, disabled }: CompactSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative flex-1 min-w-0 ${disabled ? 'opacity-40' : ''}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-1 md:gap-2 px-1.5 py-2 md:px-3 rounded-xl hover:bg-gray-50 transition-colors text-left overflow-hidden"
      >
        <div className="flex items-center gap-1.5 md:gap-2 overflow-hidden min-w-0">
          <div className="text-indigo-600 shrink-0">{icon}</div>
          <div className="flex flex-col overflow-hidden min-w-0">
            <span className="text-[7px] md:text-[9px] uppercase font-bold text-gray-400 leading-none truncate">
              {label}
            </span>
            <span className="text-gray-800 font-semibold truncate text-[11px] md:text-sm whitespace-nowrap">
              {value || placeholder}
            </span>
          </div>
        </div>
        <ChevronDown size={12} className={`text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-[100] mt-2 w-56 left-0 bg-white border border-gray-100 rounded-2xl shadow-2xl max-h-60 overflow-y-auto py-2 animate-in fade-in slide-in-from-top-1">
          {options.map((option: string) => (
            <button
              key={option}
              onClick={() => { onChange(option); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 ${
                value === option ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-gray-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
   const { t } = useTranslation();
  const [view, setView] = useState<'list' | 'map'>('list');

  // --- Search State ---
  const [location, setLocation] = useState();
  const [zone, setZone] = useState();
  const [service, setService] = useState();

  // --- Data States ---
  const [cities, setCities] = useState<{ [key: string]: [number, number] }>({});
  const [services, setServices] = useState<{ [key: string]: unknown }>({});
  const [allZones, setAllZones] = useState<{ [key: string]: { name: string, coords: [number, number] }[] }>({});
  const [filteredZones, setFilteredZones] = useState<{ name: string, coords: [number, number] }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [c, s, z] = await Promise.all([
          fetch('/api/cities').then(res => res.json()),
          fetch('/api/services').then(res => res.json()),
          fetch('/api/zones').then(res => res.json())
        ]);
        setCities(c); setServices(s); setAllZones(z);
        const initialCity = searchParams.get("city");
        if (initialCity) setFilteredZones(z[initialCity] || []);
      } catch (e) { console.error("Error loading data:", e); }
    };
    fetchData();
  }, [searchParams]);

  // --- Dynamic Location Logic ---
  const mapCenter = useMemo((): [number, number] => {
    if (zone) {
      const zoneData = filteredZones.find(z => z.name === zone);
      if (zoneData) return zoneData.coords;
    }
    if (location && cities[location]) return cities[location];
    return [33.5731, -7.5898]; // Default Casablanca
  }, [location, zone, cities, filteredZones]);

  const handleLocationChange = (cityKey: string) => {
    setLocation(cityKey);
    setZone(""); 
    setFilteredZones(allZones[cityKey] || []);
  };

  const handleSearchUpdate = () => {
    if (!location || !service) {
      alert(t("please_select_city_and_service"));
      return;
    }
    const params = new URLSearchParams({ city: location, service, ...(zone && { zone }) });
    router.push(`/search?${params.toString()}`);
  };

  const serviceProviders = [
    { id: 1, name: 'Carlos Rodriguez', service: service || 'Professional', rating: 4.8, reviewCount: 124, distance: '2.5 miles', imageUrl: '/PlumbingCarlos.png', isAvailable: true },
  
    { id: 2, name: 'Linda Nguyen', service: service || 'Expert', rating: 4.6, reviewCount: 98, distance: '3.1 miles', imageUrl: '/HandymanPatricia.png', isAvailable: false },
  
    { id: 3, name: 'Ahmed Hassan', service: service || 'Specialist', rating: 4.9, reviewCount: 150, distance: '1.8 miles', imageUrl: '/PlumbingCarlos.png', isAvailable: true },];

    

  const labelToShow = zone || t('location') || "Results";

  return (
    <div className="relative min-h-screen w-full bg-gray-50/50">
      

{/* --- SINGLE-LINE RESPONSIVE SEARCH BAR --- */}
 <div className="sticky top-13 left-0 right-0 z-[50] px-2 py-4 md:px-6 md:py-4">
  <div className="container mx-auto max-w-6xl">
    <div className="bg-white/90 backdrop-blur-xl border border-white/60 shadow-xl rounded-full p-1 flex flex-row items-center">
       
      {/* 1. Location & Zone Group */}
       <div className="flex flex-row items-center flex-[1.5] ">
        <CompactSelect 
          label={t("search.city")}
          icon={<MapPin size={14} className="md:w-4 md:h-4" />}
          options={Object.keys(cities).map(c => t(c))}
          value={location ? t(location) : ""}
          onChange={(val: string) => {
            const key = Object.keys(cities).find(k => t(k) === val) || "";
            handleLocationChange(key);
          }}
          placeholder={t("search.city")}
        />
        <div className="w-px h-6 bg-gray-100 shrink-0" />
        <CompactSelect 
          label={t("search.zone")}
          icon={<LayoutGrid size={14} className="md:w-4 md:h-4" />}
          options={filteredZones.map(z => z.name)}
          value={zone}
          disabled={!location}
          onChange={(val: string) => setZone(val)}
          placeholder={t("search.zone")}
        />
      </div> 

      {/* Center Divider */}
      <div className="w-px h-8 bg-gray-200 mx-1 md:mx-2 shrink-0" />

      {/* 2. Service & Search Button Group */}
      <div className="flex flex-row items-center flex-1 min-w-0 gap-1 md:gap-2">
        <CompactSelect 
          label={t("search.service")}
          icon={<HandPlatter size={14} className="md:w-4 md:h-4" />}
          options={Object.keys(services).map(s => t(s))}
          value={service ? t(service) : ""}
          onChange={(val: string) => {
            const key = Object.keys(services).find(k => t(k) === val) || "";
            setService(key);
          }}
          placeholder={t("search.service")}
        />
        
        <button 
          onClick={handleSearchUpdate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 md:px-6 md:py-3 rounded-full transition-all flex items-center justify-center gap-2 shrink-0 active:scale-90"
        >
          <Search size={16} className="md:w-[18px] md:h-[18px]" />
          <span className="hidden lg:inline font-bold text-sm uppercase tracking-wide">
            {t("search.button")}
          </span>
        </button>
      </div>

    </div>
  </div>
</div> 

{/* 3. MAIN CONTENT */}
      <main className="relative flex-1 w-full">
        {view === 'list' ? (
          /* LIST VIEW: Clean grid with enough top padding for the floating search bar */
          <div className="container mx-auto px-4 pt-32 md:pt-40 pb-32 max-w-6xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {serviceProviders.map((provider) => (
                <div key={provider.id} className="group bg-white rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                  <div className="relative h-48 w-full shrink-0">
                    <Image 
                      src={provider.imageUrl} 
                      alt={provider.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{provider.name}</h3>
                    <p className="text-indigo-600 text-sm font-semibold mb-4">{t(provider.service.toLowerCase())}</p>
                    <div className="mt-auto flex justify-between items-center text-xs text-gray-400 border-t pt-4">
                      <span className="flex items-center gap-1.5"><MapPin size={14}/> {provider.distance}</span>
                      <span className="flex items-center gap-1.5"><Star size={14} className="fill-indigo-600 text-indigo-600"/> {provider.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* MAP VIEW: Fixes the 'zoomed' or distorted look */
          <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden">
            <div className="w-full h-full relative">
               <MapComponent 
                 center={mapCenter} 
                 displayLabel={labelToShow} 
               />
            </div>
          </div>
        )}
      </main>


{/* 2. VIEW TOGGLE - Floating at bottom center */}
<div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[70]">
  <div className="flex p-1.5 bg-gray-900/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full items-center gap-1">
    <button 
      onClick={() => setView('list')} 
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        view === 'list' 
          ? 'bg-indigo-600 text-white shadow-lg' 
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <List size={18} />
      <span className="text-xs font-bold uppercase tracking-wider">{t("search.list")}</span>
    </button>
    
    <div className="w-px h-4 bg-gray-700 mx-1" />

    <button 
      onClick={() => setView('map')} 
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        view === 'map' 
          ? 'bg-indigo-600 text-white shadow-lg' 
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <MapPin size={18} />
      <span className="text-xs font-bold uppercase tracking-wider">{t("search.map")}</span>
    </button>
  </div>
</div>
    </div>
  );
}