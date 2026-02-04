'use client';
import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { ArrowLeft, CheckCircle, Star, Send, Clock } from 'lucide-react';

const ServiceDetails: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <section className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/services" className="text-blue-600 hover:text-blue-800 transition-colors">Services</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Service Details</span>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Turn this search into a job post
              </h1>
              <p className="text-lg mb-8 text-blue-100">
                Post a job for free and we will match you with experts perfect for your needs.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                Post a job for free
              </button>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-200">Your job</span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">MATCHED</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white" />
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white" />
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-white" />
                  </div>
                  <ArrowLeft className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-start space-x-6">
                  {/* <div className="relative w-64 h-48">
                    <Image
                      src="https://via.placeholder.com/400x300/A7F3D0/10B981?text=Cleaning+Service"
                      alt="Cleaning Service"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div> */}
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Elevating Cleanliness Stand with Professional Cleaning Services
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Elevate Plumber liness standards with our professional Plumber services.
                    </p>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xl">AF</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xl font-bold text-gray-900">Albert Flores</h3>
                          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">PRO</span>
                        </div>
                        <p className="text-gray-600">Brooklyn, NY, USA</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-gray-600">No recommendations yet</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* More sections: About this service, Work with me... */}
              {/* (You can copy the structure and replace <img> with <Image> similarly) */}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <div className="text-center mb-6">
                  <span className="text-gray-600 text-sm">STARTING AT</span>
                  <div className="text-3xl font-bold text-orange-500 mb-4">$75 - $100/hr</div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center mb-6">
                    <Send className="w-5 h-5 mr-2" />
                    Hire me
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Duration</h4>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-600">1-15 weeks</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Skills and Services</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Handyman</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Cleaning</span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Renovation</span>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Gardening</span>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Plumber</span>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">+3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Services */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">More Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
              {/* <div className="relative w-full h-40 mb-4">
                <Image
                  src="https://via.placeholder.com/300x200/A7F3D0/10B981?text=Cleaning"
                  alt="Sparkle Ease Cleaning Solutions"
                  fill
                  className="object-cover rounded-xl"
                />
              </div> */}
              <h4 className="text-xl font-bold text-gray-900 mb-2">Sparkle Ease Cleaning Solutions</h4>
              <div className="flex items-center justify-between mb-4">
                <span className="text-orange-500 font-semibold">$75 - $100/hr</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
