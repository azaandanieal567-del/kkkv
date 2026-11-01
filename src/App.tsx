import React, { useState, useEffect } from 'react';
import { 
  CAFE_INFO, 
  INITIAL_STATIONS, 
  Station, 
  CyberService, 
  BookingRecord 
} from './data/cyberCafeData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceList } from './components/ServiceList';
import { BookingSystem } from './components/BookingSystem';
import { PrintCalculator } from './components/PrintCalculator';
import { ExpressPickup } from './components/ExpressPickup';
import { ContactSection } from './components/ContactSection';
import { ProofAndFaq } from './components/ProofAndFaq';
import { Footer } from './components/Footer';
import { MyBookingsModal } from './components/MyBookingsModal';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export default function App() {
  const [stations, setStations] = useState<Station[]>(INITIAL_STATIONS);
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState<boolean>(false);
  const [savedBookingsCount, setSavedBookingsCount] = useState<number>(0);
  const [preselectedStation, setPreselectedStation] = useState<Station | null>(null);
  const [preselectedService, setPreselectedService] = useState<CyberService | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize theme and load saved bookings count
  useEffect(() => {
    // Theme setup
    const savedTheme = localStorage.getItem('kkkv_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : true;
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Bookings count
    try {
      const stored = localStorage.getItem('kkkv_bookings');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedBookingsCount(Array.isArray(parsed) ? parsed.length : 0);
      }
    } catch {
      setSavedBookingsCount(0);
    }

    // Scroll listener
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('kkkv_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('kkkv_theme', 'light');
      }
      return next;
    });
  };

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBooking = (station?: Station, service?: CyberService) => {
    if (station) setPreselectedStation(station);
    if (service) setPreselectedService(service);
    setActiveTab('booking');
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingComplete = (booking: BookingRecord) => {
    // Update local station availability
    setStations(prev => prev.map(s => {
      if (s.id === booking.stationId) {
        return {
          ...s,
          status: 'reserved',
          currentOccupantUntil: `Reserved for ${booking.timeSlot}`
        };
      }
      return s;
    }));
    setSavedBookingsCount(prev => prev + 1);
  };

  const handleCancelBooking = (bookingId: string) => {
    try {
      const stored = localStorage.getItem('kkkv_bookings');
      if (stored) {
        const parsed: BookingRecord[] = JSON.parse(stored);
        const updated = parsed.filter(b => b.bookingId !== bookingId);
        localStorage.setItem('kkkv_bookings', JSON.stringify(updated));
        setSavedBookingsCount(updated.length);
      }
    } catch {
      // ignore
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavClick}
        openBookingModal={() => scrollToBooking()}
        openMyBookings={() => setIsMyBookingsOpen(true)}
        isDark={isDark}
        toggleTheme={toggleTheme}
        savedBookingsCount={savedBookingsCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Overview */}
        <Hero
          onBookClick={() => scrollToBooking()}
          onExploreServices={() => handleNavClick('services')}
          stations={stations}
        />

        {/* 2. Comprehensive Service List */}
        <ServiceList
          onBookService={(service) => scrollToBooking(undefined, service)}
          onOpenCalculator={() => handleNavClick('calculator')}
        />

        {/* 3. Interactive PC & Cabin Booking Engine */}
        <BookingSystem
          stations={stations}
          preselectedStation={preselectedStation}
          preselectedService={preselectedService}
          onBookingComplete={handleBookingComplete}
        />

        {/* 4. Print & Xerox Cost Calculator */}
        <PrintCalculator
          onSendToPickup={() => handleNavClick('pickup')}
        />

        {/* 5. Express Print & Pickup */}
        <ExpressPickup />

        {/* 6. Proof & FAQs */}
        <ProofAndFaq />

        {/* 7. Contact, Location & Hours Hub */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* My Bookings Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        onCancelBooking={handleCancelBooking}
      />

      {/* Floating Quick Action Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2.5 rounded-full bg-slate-800/90 text-slate-300 hover:text-white border border-slate-700 shadow-lg backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Hi%20KKKV%20Enterprise,%20I%20need%20cyber%20cafe%20assistance.`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-emerald-600/30 transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
          title="Chat directly on WhatsApp (+91 8050327750)"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
}
