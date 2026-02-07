"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const slides = [
  "/bckgHero.png", // Replace with your service images
  "/GardeningJames.png",
  "/HandymanPatricia.png",
  "/HouseCleaningMaria.png",
  "/PlumbingCarlos.png",];

export default function HeroSection() {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [serviceIndex, setServiceIndex] = useState(0);

  const rollingServices = [t('hero.plumber'), t('hero.electrician'), t('hero.cleaning'), t('hero.tutoring')];

  // Background Slideshow Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Text Rotation Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % rollingServices.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [rollingServices.length]);

  return (
    // ADJUSTMENT: Changed h-[90vh] to min-h-screen for better mobile flow
    <div className="relative min-h-[80vh] md:h-[90vh] w-full flex items-center justify-center overflow-hidden">

      {/* Background Slideshow */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          style={{
            backgroundImage: `url(${slide})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(1.05)' // Subtle boost to stop it looking "dull"
          }}
        >
          {/* REFINED OVERLAY: 
        Instead of a solid black block, we use a gradient that is 
        clearer in the middle and darker at the bottom for text contrast.
      */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center pt-20 pb-12">

        {/* Trusted Badge */}
        {/* <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg border border-white/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-white text-xs md:text-sm mb-6 shadow-xl">
          <CheckCircle2 size={14} className="text-green-400" />
          <span className="font-medium">{t("trusted_by_thousands")}</span>
        </div> */}

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] drop-shadow-2xl">
          {t('hero.title')} <br />
          <span className="text-indigo-700 inline-block min-w-[200px]">
            {rollingServices[serviceIndex]}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          {t('hero.subtitle')}
        </p>


        {/* Buttons Container */}
        <div className="flex flex-row items-center justify-center gap-1.5 md:gap-4 px-1 md:px-6 w-full max-w-3xl mx-auto">

          {/* Primary Button */}
          <button
            onClick={() => router.push('/search')}
            className="flex-1 min-w-0 h-11 md:h-14 group bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-[10px] sm:text-xs md:text-lg flex items-center justify-center gap-1 transition-all active:scale-95 shadow-lg cursor-pointer"
          >
            <span className="truncate px-1">{t("hero.get_started")}</span>
            <ArrowRight size={14} className="hidden lg:block group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary Button */}
          {/* <button
            onClick={() => router.push('/how-it-works')}
            className="flex-1 min-w-0 h-11 md:h-14 group bg-gray-600 hover:bg-gray-700 text-white rounded-full font-bold text-[10px] sm:text-xs md:text-lg flex items-center justify-center gap-1 transition-all active:scale-95 shadow-lg cursor-pointer"
          >
            <span className="truncate px-1">{t("hero.how_it_works")}</span>
            <ArrowRight size={14} className="hidden lg:block group-hover:translate-x-1 transition-transform" />
          </button> */}

          {/* Become Tasker Button */}
          <button
            onClick={() => router.push('/become-tasker')}
            className="flex-1 min-w-0 h-11 md:h-14 group bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold text-[10px] sm:text-xs md:text-lg flex items-center justify-center gap-1 transition-all active:scale-95 shadow-lg cursor-pointer"
          >
            <span className="truncate px-1">{t("hero.become_tasker")}</span>
            <ArrowRight size={14} className="hidden lg:block group-hover:translate-x-1 transition-transform" />
          </button>
        </div>


      </div>
    </div>
  );
}