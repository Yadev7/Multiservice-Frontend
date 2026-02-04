import React from 'react';
import Image from 'next/image'; // Change 1: Using Next.js Image component
import { ArrowRight } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      title: "Plumbing Services",
      description: "Expert leak repairs, pipe installations, and bathroom maintenance by certified professionals.",
      image: "/PlumbingCarlos.png", // Change 2: Using your local assets
      tag: "Popular"
    },
    {
      title: "House Cleaning",
      description: "Professional deep cleaning for homes and offices. Flexible scheduling to fit your life.",
      image: "/HouseCleaningMaria.png",
      tag: "Top Rated"
    },
    {
      title: "Handyman & Repair",
      description: "Versatile experts for furniture assembly, mounting, and general home improvements.",
      image: "/HandymanPatricia.png",
      tag: "Expert"
    },
    {
      title: "Garden Maintenance",
      description: "Complete lawn care, landscaping, and outdoor maintenance to keep your garden beautiful.",
      image: "/GardeningJames.png",
      tag: "Outdoor"
    }
  ];

  return (
    <section className="relative z-10 py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Premium <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium">
              Exceptional quality and verified professionals for your every need across Morocco.
            </p>
          </div>
          
          <button className="hidden md:flex items-center gap-3 text-slate-900 font-bold hover:text-blue-600 transition-colors group">
            Browse All <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                    {service.tag}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight transition-colors group-hover:text-blue-600">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                
                {/* Book Now trigger - appears on hover */}
                <div className="mt-6 flex items-center text-blue-600 font-bold text-sm gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  Book This Expert <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-only View All Button */}
        <div className="mt-12 md:hidden flex justify-center">
           <button className="flex items-center gap-2 text-blue-600 font-bold">
            View All Services <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;