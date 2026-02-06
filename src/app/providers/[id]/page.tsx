"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Mail, Phone, MapPin, Music, ArrowLeft, 
  Star, ShieldCheck, Clock, Loader2, CheckCircle2 
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { useTranslation } from "react-i18next";

const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse rounded-3xl" />
});

// Define the Interface for TypeScript safety
interface Provider {
  id: string;
  name: string;
  email: string;
  tel: string;
  category: string;
  rating: number;
  reviews: number;
  coords: [number, number];
  images: string[];
  skills: string[];
  audioUrl: string;
  experience: string;
  locationName: string;
}

export default function ProviderDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        const mockDb: Provider[] = [
          { 
            id: "1", 
            name: 'Carlos Rodriguez', 
            email: 'carlos@example.com', 
            tel: '+212 600-111111', 
            category: 'Professional Plumber', 
            rating: 4.8, 
            reviews: 124, 
            coords: [33.5731, -7.5898], 
            images: ['/PlumbingCarlos.png'], 
            skills: ["Leak Detection", "Pipe Repair", "Solar Heaters"], 
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
            experience: "8 Years",
            locationName: "Maarif, Casablanca"
          },
          { 
            id: "2", 
            name: 'Linda Nguyen', 
            email: 'linda@example.com', 
            tel: '+212 600-222222', 
            category: 'Expert Handyman', 
            rating: 4.6, 
            reviews: 98, 
            coords: [33.5889, -7.6111], 
            images: ['/HandymanPatricia.png'], 
            skills: ["Furniture Assembly", "Painting", "Electrical"], 
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", 
            experience: "5 Years",
            locationName: "Gauthier, Casablanca"
          },
          { 
            id: "3", 
            name: 'Ahmed Hassan', 
            email: 'ahmed@example.com', 
            tel: '+212 600-333333', 
            category: 'Specialist Electrician', 
            rating: 4.9, 
            reviews: 150, 
            coords: [33.5958, -7.6100], 
            images: ['/PlumbingCarlos.png'], 
            skills: ["Wiring", "Circuit Breakers", "Lighting"], 
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", 
            experience: "12 Years",
            locationName: "Bourgogne, Casablanca"
          }
        ];

        const data = mockDb.find(p => p.id === String(id));
        setProvider(data || null);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProviderData();
  }, [id]);

  if (loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
      <p className="text-gray-500 font-medium tracking-tight">{t("details_ads.loading")}</p>
    </div>
  );

  if (!provider) return (
    <div className="pt-40 text-center space-y-4">
       <h2 className="text-2xl font-bold text-gray-800">{t("details_ads.profile_not_found")}</h2>
       <button onClick={() => router.push('/')} className="text-indigo-600 font-semibold hover:underline">
          Return to search
       </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-2 text-gray-600 transition-all">
            <ArrowLeft size={20} />
            <span className="font-medium">{t("details_ads.back_to_search")}</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {provider.images.map((img, index) => (
                <div key={index} className="relative h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-white">
                  <Image src={img} alt={provider.name} fill className="object-cover" priority />
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><Music size={24} /></div>
                <div>
                  <h4 className="font-bold text-gray-900">{t('details_ads.voice_intro')}</h4>
                  <p className="text-xs text-gray-500">Listen to {provider.name.split(' ')[0]}</p>
                </div>
              </div>
              <audio controls className="w-full h-10">
                <source src={provider.audioUrl} type="audio/mpeg" />
              </audio>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">{provider.category}</span>
                  <h1 className="text-4xl font-black text-gray-900 mt-1">{provider.name}</h1>
                </div>
                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                  <ShieldCheck size={14} /> Verified
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-2xl text-center">
                  <Star className="mx-auto text-yellow-500 mb-1" size={20} fill="currentColor" />
                  <p className="font-bold text-gray-900">{provider.rating}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">{t('details_ads.rating')}</p>
                </div>
                {/* <div className="bg-gray-50 p-4 rounded-2xl text-center">
                  <Clock className="mx-auto text-indigo-600 mb-1" size={20} />
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Exp.</p>
                </div> */}
                <div className="bg-gray-50 p-4 rounded-2xl text-center">
                  <MapPin className="mx-auto text-red-500 mb-1" size={20} />
                  <p className="font-bold text-gray-900 truncate text-xs">{provider.locationName.split(',')[0]}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Zone</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2 px-4 py-2 bg-indigo-50/50 text-indigo-700 rounded-xl text-sm font-semibold border border-indigo-100">
                      <CheckCircle2 size={14} /> {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href={`tel:${provider.tel}`} className="flex items-center justify-center gap-3 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                  <Phone size={20} /> {t('details_ads.phone')}
                </a>
                <a href={`mailto:${provider.email}`} className="flex items-center justify-center gap-3 bg-white border-2 border-gray-100 text-gray-900 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95">
                  <Mail size={20} /> {t('details_ads.email')}
                </a>
              </div>
            </div>

            {/* --- LOCKED MAP SECTION --- */}
            <div className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100 h-72 relative overflow-hidden group">
               {/* 1. Pointer-events-none kills all map interaction */}
               <div className="w-full h-full pointer-events-none select-none">
                  <MapComponent center={provider.coords} displayLabel={provider.name} />
               </div>
               
               {/* 2. Absolute overlay ensures the cursor remains default and map is untouchable */}
               <div className="absolute inset-0 z-10 cursor-default" title="Location Preview Only" />
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}