import React from 'react';
import { CAFE_INFO } from '../data/cyberCafeData';
import { Phone, MapPin, Mail, MessageCircle, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand & Address Column (2 cols wide) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                {CAFE_INFO.name}
              </span>
              <span className="text-[11px] font-mono text-blue-400 tracking-wider block mt-0.5">
                CYBER CAFE &bull; DIGITAL SERVICE ENTERPRISE
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Your one-stop destination in Mysuru for high-speed fiber internet workstations, high-volume laser Xerox, color printing, spiral binding, and online government portal filing.
            </p>

            <div className="space-y-1.5 text-xs font-mono text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{CAFE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${CAFE_INFO.phone}`} className="hover:text-white transition-colors">
                  +91 {CAFE_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'hero', label: 'Home Overview' },
                { id: 'services', label: 'Service List & Rates' },
                { id: 'booking', label: 'Book PC / Workstation' },
                { id: 'calculator', label: 'Print Price Calculator' },
                { id: 'pickup', label: 'Express Print & Pickup' },
                { id: 'contact', label: 'Contact & Location' },
              ].map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavClick(link.id)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quick List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Popular Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>High-Speed Browsing (₹20/hr)</li>
              <li>B&amp;W Laser Print &amp; Xerox (₹2)</li>
              <li>High-Res Color Laser (₹10)</li>
              <li>PAN Card &amp; Aadhaar PVC</li>
              <li>Exam Hall Tickets &amp; Forms</li>
              <li>Spiral &amp; Soft Thesis Binding</li>
              <li>IRCTC Tatkal Ticket Booking</li>
            </ul>
          </div>

          {/* Hours & Direct Chat */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Center Timings
            </h4>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div>
                <span className="text-slate-500 block">Mon &ndash; Sat:</span>
                <span className="text-slate-200 font-semibold">{CAFE_INFO.hours.weekdays}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Sunday:</span>
                <span className="text-slate-200 font-semibold">{CAFE_INFO.hours.sunday}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Hi%20KKKV%20Enterprise,%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 font-medium transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} {CAFE_INFO.name}. All Rights Reserved. Mysuru, Karnataka &ndash; 570002.
          </div>
          <div className="flex items-center gap-4">
            <span>High-Speed Fiber &bull; Canon Laser Print &bull; UPS Backup</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
