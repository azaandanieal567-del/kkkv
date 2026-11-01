import React from 'react';
import { CAFE_INFO, Station } from '../data/cyberCafeData';
import { 
  Wifi, 
  Printer, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  ArrowRight,
  Computer,
  Sparkles,
  MessageCircle
} from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
  stations: Station[];
}

export const Hero: React.FC<HeroProps> = ({
  onBookClick,
  onExploreServices,
  stations
}) => {
  const availableStationsCount = stations.filter(s => s.status === 'available').length;
  const totalStations = stations.length;

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 md:py-20 border-b border-slate-800">
      {/* Subtle modern mesh backdrop */}
      <div className="absolute inset-0 bg-radial from-blue-900/15 via-slate-900/40 to-slate-950 pointer-events-none" />
      
      {/* Decorative grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" 
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial location & status line - NO PILLS, clean unboxed metadata with separators */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <span className="flex items-center gap-1.5 text-blue-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>Block 8, Mysuru</span>
          </span>
          <span aria-hidden="true" className="text-slate-600">&bull;</span>
          <span>Sanchal House, 2nd Cross</span>
          <span aria-hidden="true" className="text-slate-600">&bull;</span>
          <span className="text-emerald-400 font-medium">
            Open Today: {CAFE_INFO.hours.weekdays}
          </span>
          <span aria-hidden="true" className="text-slate-600">&bull;</span>
          <span className="text-slate-300">
            {availableStationsCount} of {totalStations} Terminals Open
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
              Mysuru&apos;s High-Speed Cyber Hub &amp; Digital Service Center.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Equipped for students, professionals, and citizens. Experience ultra-fast 500 Mbps fiber internet, ergonomic private workstations, color laser printing, Xerox, spiral binding, and expert-assisted government exam and portal applications.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBookClick}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>Reserve Workstation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-5 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                View Full Service Menu
              </button>

              <a
                href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Hello%20KKKV%20Enterprise,%20I%20have%20an%20inquiry%20regarding%20your%20cyber%20cafe%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-emerald-300 hover:text-emerald-200 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 rounded-lg transition-colors"
                title="Message on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-mono text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
                title="Call phone number"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{CAFE_INFO.phone}</span>
              </a>
            </div>

            {/* Address summary banner */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Direct Location:</span>{' '}
                <span>{CAFE_INFO.address}</span>
                <div className="text-xs text-slate-400 mt-0.5 font-mono">
                  Landmark: {CAFE_INFO.landmark}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Terminal Blueprint & Station Showcase */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl relative backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Live Terminal Radar
                  </h3>
                  <p className="text-xs text-slate-400">
                    Real-time walk-in and reservation status
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-medium text-emerald-400 flex items-center justify-end gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{availableStationsCount} Seats Ready</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Walk-ins welcome</span>
                </div>
              </div>

              {/* Station mini grid */}
              <div className="grid grid-cols-3 gap-2.5 my-5">
                {stations.slice(0, 9).map((station) => {
                  const isAvail = station.status === 'available';
                  const isReserved = station.status === 'reserved';
                  return (
                    <div
                      key={station.id}
                      onClick={onBookClick}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all hover:scale-[1.02] ${
                        isAvail
                          ? 'border-emerald-900/60 bg-emerald-950/20 hover:border-emerald-600'
                          : isReserved
                          ? 'border-blue-900/60 bg-blue-950/20 hover:border-blue-500'
                          : 'border-slate-800 bg-slate-950/40 opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-slate-200 truncate">
                          {station.name.replace('Terminal ', 'T-')}
                        </span>
                        <Computer className={`w-3 h-3 ${isAvail ? 'text-emerald-400' : isReserved ? 'text-blue-400' : 'text-slate-500'}`} />
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 truncate">
                        {station.typeLabel.split(' ')[0]}
                      </div>
                      <div className="text-[10px] font-mono font-semibold text-slate-300 mt-0.5">
                        ₹{station.ratePerHour}/hr
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Station Legend */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800/80 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-emerald-500" /> Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-blue-500" /> Reserved
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-slate-700" /> In Session
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                <button
                  onClick={onBookClick}
                  className="w-full py-2.5 text-xs font-semibold text-blue-400 hover:text-white hover:bg-blue-600/20 border border-blue-500/30 rounded-lg transition-colors cursor-pointer"
                >
                  Select Station &amp; Time Slot &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Quantitative Proof Strip - 4 Column Layout below hero split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-8 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Wifi className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase">Internet Speed</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">500 Mbps</div>
            <p className="text-xs text-slate-400 mt-1">Dual dedicated fiber line with zero buffer</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Printer className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase">Laser Print &amp; Xerox</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">60 PPM</div>
            <p className="text-xs text-slate-400 mt-1">Canon laser engine with auto double-sided</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase">Government Portals</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">100% Verified</div>
            <p className="text-xs text-slate-400 mt-1">PAN, Aadhaar PVC, Passport, Exam forms</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase">Starting Rate</span>
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">₹15 / 30m</div>
            <p className="text-xs text-slate-400 mt-1">Affordable student &amp; local citizen pricing</p>
          </div>
        </div>

      </div>
    </section>
  );
};
