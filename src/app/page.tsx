'use client';
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import BecomeABoss from '../components/BecomeABoss'
import TopExperts from '../components/TopExperts'
import Testimonials from '../components/Testimonials'
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';


export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />  
      <ServicesSection />
      <HowItWorks />
      <TopExperts />
      <BecomeABoss />
      <Testimonials />
      <Footer />
    </main>
  )
}