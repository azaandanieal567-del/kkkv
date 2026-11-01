import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cyberCafeData';
import { Menu, X, Phone, Ticket, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
  openMyBookings: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  savedBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openBookingModal,
  openMyBookings,
  isDark,
  toggleTheme,
  savedBookingsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'services', label: 'Services' },
    { id: 'booking', label: 'Book Station' },
    { id: 'calculator', label: 'Print Calculator' },
    { id: 'pickup', label: 'Express Pickup' },
    { id: 'contact', label: 'Contact & Location' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-900/90 dark:bg-slate-950/90 border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark (Top Bar Contract) */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-left group flex flex-col justify-center shrink-0 cursor-pointer"
        >
          <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors whitespace-nowrap">
            {CAFE_INFO.name}
          </span>
          <span className="text-[11px] text-slate-400 font-mono tracking-wider whitespace-nowrap">
            CYBER CAFE &bull; MYSURU
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                activeTab === item.id
                  ? 'text-blue-400 border-blue-400'
                  : 'text-slate-300 hover:text-white border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Track My Bookings button */}
          <button
            onClick={openMyBookings}
            className="relative hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            title="View your confirmed reservations"
          >
            <Ticket className="w-3.5 h-3.5 text-blue-400" />
            <span>My Bookings</span>
            {savedBookingsCount > 0 && (
              <span className="w-4 h-4 bg-blue-600 text-[10px] text-white font-bold rounded-full flex items-center justify-center">
                {savedBookingsCount}
              </span>
            )}
          </button>

          {/* Quick Call */}
          <a
            href={`tel:${CAFE_INFO.phone}`}
            className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 py-1.5 px-2.5 rounded-md bg-slate-800/50 hover:bg-slate-800 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{CAFE_INFO.phone}</span>
          </a>

          {/* Dark/Light mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-slate-400 hover:text-white rounded-md bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Zone 3 Primary CTA */}
          <button
            onClick={openBookingModal}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            Book Station
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-md bg-slate-800 cursor-pointer"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/98 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openMyBookings();
              }}
              className="flex items-center gap-1.5 py-1 text-blue-400 hover:underline"
            >
              <Ticket className="w-4 h-4" />
              <span>Track My Bookings ({savedBookingsCount})</span>
            </button>
            <a
              href={`tel:${CAFE_INFO.phone}`}
              className="flex items-center gap-1 py-1 text-emerald-400 hover:underline font-mono"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CAFE_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
