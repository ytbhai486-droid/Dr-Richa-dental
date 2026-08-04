import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { AppointmentSection } from './components/AppointmentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SmileBotChat } from './components/SmileBotChat';

export default function App() {
  const [selectedTreatment, setSelectedTreatment] = useState<string>('Teeth Cleaning');

  const handleBookClick = (treatmentTitle?: string) => {
    if (treatmentTitle) {
      setSelectedTreatment(treatmentTitle);
    }
    const bookElement = document.getElementById('book');
    if (bookElement) {
      bookElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar onBookClick={() => handleBookClick()} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section with Dr. Richa Photo & 3D Interactive Tooth */}
        <HeroSection onBookClick={() => handleBookClick()} />

        {/* 2. Meet Dr. Richa About Section */}
        <AboutSection />

        {/* 3. Dental Services Section with 3D animated cards */}
        <ServicesSection onBookTreatment={(title) => handleBookClick(title)} />

        {/* 4. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 5. Patient Testimonials & 5-Star Reviews */}
        <TestimonialsSection />

        {/* 6. Clinic Gallery with Before/After Split Comparison */}
        <GallerySection />

        {/* 7. Book Appointment Section with Form */}
        <AppointmentSection preselectedTreatment={selectedTreatment} />

        {/* 8. Contact & Google Map Location */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Dental Assistant Floating Chatbot */}
      <SmileBotChat onBookClick={() => handleBookClick()} />
    </div>
  );
}
