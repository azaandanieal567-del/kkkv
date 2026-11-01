import React, { useState, useMemo } from 'react';
import { SERVICES_CATALOG, CyberService, CAFE_INFO } from '../data/cyberCafeData';
import { 
  Search, 
  ArrowUpRight, 
  Clock, 
  Check, 
  Filter, 
  MessageCircle,
  Calculator,
  ChevronRight,
  Info
} from 'lucide-react';

interface ServiceListProps {
  onBookService: (service: CyberService) => void;
  onOpenCalculator: () => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({
  onBookService,
  onOpenCalculator
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<CyberService | null>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'browsing', label: 'Internet & Workstations' },
    { id: 'printing', label: 'Printing & Xerox' },
    { id: 'government', label: 'Govt & Citizen Portals' },
    { id: 'student', label: 'Student & Exams' },
    { id: 'ticketing', label: 'Travel Ticketing' },
    { id: 'digital', label: 'Scanning & Typing' },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_CATALOG.filter(service => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesQuery = 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="services" className="py-16 md:py-24 border-b border-slate-800 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-2">
              Comprehensive Service Catalog
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Professional Cyber &amp; Digital Solutions
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              All services performed at #{CAFE_INFO.address.split(',')[0]}, Sanchal House, Mysore with transparent pricing and verified accuracy.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCalculator}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-blue-400" />
              <span>Print Cost Calculator</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          
          {/* Segmented Category Filter (Buttons, not static pills) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[260px] max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. Aadhaar, Spiral, Xerox)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl border border-slate-800 bg-slate-900/30">
            <Filter className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-300">No services match &ldquo;{searchQuery}&rdquo;</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Try searching with another keyword or reset the category filter to view our full catalog.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 text-xs text-blue-400 hover:text-blue-300 font-medium underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => {
              const formattedIndex = String(index + 1).padStart(2, '0');
              return (
                <div
                  key={service.id}
                  className="group relative rounded-2xl border border-slate-800 bg-slate-900/70 hover:bg-slate-900 hover:border-slate-700 p-6 flex flex-col justify-between transition-all duration-200"
                >
                  <div>
                    {/* Editorial Index & Turnaround - Unboxed text, no pills */}
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                      <span className="font-semibold text-slate-500">
                        {formattedIndex}.
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>{service.turnaround}</span>
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {service.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Features list */}
                    <ul className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-3">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer: Pricing & Action */}
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-mono block">Starting At</span>
                      <span className="text-base font-bold font-mono text-white tabular-nums">
                        {service.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalService(service)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="View detailed info"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onBookService(service)}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Reserve</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick WhatsApp Assistance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-white">Need a specific document service or urgent print job?</h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Send your files directly to WhatsApp at <span className="font-mono text-slate-200">8050327750</span> or bring your USB drive to #{CAFE_INFO.address.split(',')[0]} Sanchal House.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Hi%20KKKV%20Enterprise,%20I%20need%20urgent%20service%20details.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 rounded-lg flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us Now</span>
            </a>
            <a
              href={`tel:${CAFE_INFO.phone}`}
              className="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              Call 8050327750
            </a>
          </div>
        </div>

      </div>

      {/* Service Details Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider block">
                  Service Details
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {activeModalService.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 text-sm font-mono cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="py-5 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeModalService.fullDesc}
              </p>

              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 font-mono text-xs">
                <div>
                  <span className="text-slate-500 block">Pricing</span>
                  <span className="font-bold text-white text-sm">{activeModalService.price}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Turnaround Time</span>
                  <span className="font-bold text-blue-400 text-sm">{activeModalService.turnaround}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-200 uppercase font-mono mb-2">
                  What is included:
                </h4>
                <ul className="space-y-1.5">
                  {activeModalService.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = activeModalService;
                  setActiveModalService(null);
                  onBookService(s);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg cursor-pointer"
              >
                Proceed to Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
