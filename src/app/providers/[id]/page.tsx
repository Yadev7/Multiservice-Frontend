"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
 Phone, MapPin, Music, ArrowLeft,
  Star, ShieldCheck, Loader2, CheckCircle2,
  Computer, MessageSquare, Mic, Send, X
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

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
        {t('details_ads.back_to_search')}
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
                {/* Phone Button */}
                <button
                  onClick={() => window.location.href = `tel:${provider.tel}`}
                  className="flex items-center justify-center gap-3 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                >
                  <Phone size={20} />
                  {t('details_ads.phone')}
                </button>

                {/* Message Button */}
                <button
                  onClick={() => setIsModalOpen(true)} // Opens the modal
                  className="flex items-center justify-center gap-3 bg-white border-2 border-gray-100 text-gray-900 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95"
                >
                  <Computer size={20} />
                  {t('details_ads.message')}
                </button>

                              {/* WhatsApp Integration */}
                <button 
                  onClick={() => window.open(`https://wa.me/${provider.tel.replace(/[^0-9]/g, '')}`, '_blank')}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all active:scale-[0.98]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                 {t('details_ads.whatsapp')}
                </button>




              </div>
            </div>


            {/* MODAL OVERLAY */}
{isModalOpen && (
  <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    {/* MODAL CONTENT */}
    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 slide-in-from-bottom-10">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
            <MessageSquare size={20} />
          </div>
          <h3 className="font-bold text-lg text-gray-900">Contact {provider.name.split(' ')[0]}</h3>
        </div>
        <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors">
          <X size={20} className="text-gray-400" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Audio Recording Section */}
        <div className="text-center p-8 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/30">
          <button className="mx-auto w-16 h-16 flex items-center justify-center bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-all active:scale-90 mb-3">
            <Mic size={28} />
          </button>
          <p className="text-sm font-semibold text-gray-600">Tap to record audio</p>
          <p className="text-xs text-gray-400 mt-1">Send a voice note to explain your needs</p>
        </div>

        {/* Text Input Section */}
        <div className="relative">
          <textarea 
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-indigo-500 focus:ring-0 outline-none transition-all resize-none text-gray-700"
          />
          <button className="absolute bottom-3 right-3 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  </div>
)}

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