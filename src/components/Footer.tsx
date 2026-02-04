'use client'; // Ensure client-side hooks work in app directory

import { useState, useEffect } from 'react';
// import Link from 'next/link';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [startCounting, setStartCounting] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures the animation runs only once
    threshold: 0.1, // Triggers the animation when 10% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      setStartCounting(true);
    }
  }, [inView]);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Subscribe:', email);
    // TODO: Replace with actual subscription logic (API call)
  };

  return (
    <footer className="bg-gray-900 text-white mb-0">
      {/* Service Tags Section */}
      {/* <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">IKEA Assembly</span>
            <span className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">Lawn Care</span>
            <span className="bg-purple-200 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">Handyman</span>
            <span className="bg-cyan-200 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium">Help Moving</span>
            <span className="bg-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium">Yard Work</span>
            <span className="bg-indigo-200 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">Cleaning</span>
            <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">General Mounting</span>
            <span className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">Babysitting</span>
            <span className="bg-cyan-200 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium">Bed Assembly</span>
            <span className="bg-cyan-200 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium">Hang Art</span>
            <span className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">Shelf & Furniture Repair</span>
            <span className="bg-cyan-200 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium">Shelf Mounting</span>
            <span className="bg-purple-200 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">Renovation</span>
            <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">In-Home Furniture Movers</span>
            <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">TV Mounting</span>
          </div>
        </div>
      </div> */}

      {/* Main Footer */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Links */}
          {/* <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/" className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">Home</Link>
              <Link href="/about" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">About Us</Link>
              <Link href="/faq" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">FAQ</Link>

              <div className="flex items-center mx-8">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold">Servibe</span>
              </div>

              <Link href="/find-work" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">Find Work</Link>
              <Link href="/blog" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">Blog</Link>
              <Link href="/contact" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">Contact Us</Link>
            </div>
          </div> */}

          {/* Stats + Newsletter */}
<div ref={ref}>
      {/* Stats + Newsletter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="text-5xl lg:text-6xl font-bold mb-4">
            {startCounting && <CountUp end={24} duration={2.75} suffix="k" />}
          </div>
          <p className="text-gray-400 text-lg">Customers are satisfied with our work</p>
        </div>
        <div className="text-center">
          <div className="text-5xl lg:text-6xl font-bold mb-4">
            {startCounting && <CountUp end={7} duration={2.75} suffix="k+" />}
          </div>
          <p className="text-gray-400 text-lg">Websites are already existing work</p>
        </div>
        <div className="text-center lg:text-left">
          <h3 className="text-xl font-semibold mb-6">Subscribe to our newsletter</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>

          {/* <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="mb-4 lg:mb-0">
                <span className="text-gray-400">Designed By </span>
                <a href="#" className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-semibold hover:bg-yellow-400 transition-colors">Pixelab</a>
              </div>

              <div className="flex space-x-4 mb-4 lg:mb-0">
                <a href="#" className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors">
                  <span className="text-white font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors">
                  <span className="text-white font-bold">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors">
                  <span className="text-white font-bold">i</span>
                </a>
              </div>

              <div className="text-gray-400">
                Copyright © 2025 Servibe
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </footer>
  )
};

export default Footer;
