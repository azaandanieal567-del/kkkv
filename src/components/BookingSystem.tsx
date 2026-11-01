import React, { useState } from 'react';
import { Station, BookingRecord, CAFE_INFO, CyberService } from '../data/cyberCafeData';
import { 
  Calendar, 
  Clock, 
  Computer, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Printer, 
  Coffee, 
  FileCheck, 
  ArrowRight, 
  ArrowLeft,
  Share2,
  Ticket,
  MapPin,
  Phone,
  AlertCircle
} from 'lucide-react';

interface BookingSystemProps {
  stations: Station[];
  preselectedStation?: Station | null;
  preselectedService?: CyberService | null;
  onBookingComplete: (booking: BookingRecord) => void;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  stations,
  preselectedStation,
  preselectedService,
  onBookingComplete
}) => {
  // Booking state
  const [selectedStationId, setSelectedStationId] = useState<string>(
    preselectedStation ? preselectedStation.id : stations[0]?.id || 'pc-01'
  );
  
  // Date state
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Time slots
  const TIME_SLOTS = [
    "08:30 AM", "09:15 AM", "10:00 AM", "10:45 AM", "11:30 AM",
    "12:15 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "08:45 PM"
  ];
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("10:00 AM");

  // Duration
  const DURATION_OPTIONS = [
    { label: "30 Mins", hours: 0.5, multiplier: 0.75 },
    { label: "1 Hour", hours: 1, multiplier: 1 },
    { label: "2 Hours", hours: 2, multiplier: 2 },
    { label: "3 Hours", hours: 3, multiplier: 3 },
    { label: "Half-Day Pass (5 Hrs)", hours: 5, multiplier: 4.5 },
    { label: "Full-Day Pass (8 Hrs)", hours: 8, multiplier: 7.0 },
  ];
  const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[1]);

  // Add-ons
  const ADDONS = [
    { id: "add-bw", name: "10 Pages B&W Laser Print", price: 20, icon: Printer },
    { id: "add-scan", name: "High-Res Scan to Email / PDF", price: 15, icon: FileCheck },
    { id: "add-lam", name: "ID Card / Certificate Lamination", price: 30, icon: ShieldCheck },
    { id: "add-drink", name: "Mysuru Filter Coffee / Bottled Water", price: 15, icon: Coffee }
  ];
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Customer info
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>(
    preselectedService ? `Requesting assistance for: ${preselectedService.name}` : ''
  );
  
  // Validation & Confirmed state
  const [formError, setFormError] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  const selectedStation = stations.find(s => s.id === selectedStationId) || stations[0];

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Calculate total
  const baseRate = selectedStation ? selectedStation.ratePerHour : 20;
  const stationCost = Math.round(baseRate * selectedDuration.multiplier);
  const addonsCost = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const totalAmount = stationCost + addonsCost;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const bookingId = `KKKV-${Date.now().toString().slice(-4)}-${Math.floor(100 + Math.random() * 900)}`;

    const newBooking: BookingRecord = {
      bookingId,
      customerName: customerName.trim(),
      phone: cleanPhone,
      email: customerEmail.trim() || undefined,
      stationId: selectedStation.id,
      stationName: selectedStation.name,
      stationType: selectedStation.typeLabel,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      durationHours: selectedDuration.hours,
      totalAmount,
      addons: selectedAddons.map(id => ADDONS.find(a => a.id === id)?.name || id),
      notes: customerNotes.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    // Save to local storage
    try {
      const existingStr = localStorage.getItem('kkkv_bookings');
      const existing: BookingRecord[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('kkkv_bookings', JSON.stringify([newBooking, ...existing]));
    } catch {
      // storage unavailable fallback
    }

    setConfirmedBooking(newBooking);
    onBookingComplete(newBooking);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setCustomerNotes('');
    setSelectedAddons([]);
  };

  return (
    <section id="booking" className="py-16 md:py-24 border-b border-slate-800 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-2">
            Real-Time Reservation Engine
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Book a PC Station, Cabin or Gaming Rig
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Reserve your computer slot in advance to guarantee zero wait time at #{CAFE_INFO.address.split(',')[0]}, Sanchal House, Mysuru.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Pass Card */
          <div className="max-w-2xl mx-auto rounded-2xl border border-blue-500/40 bg-slate-900 p-6 sm:p-8 shadow-2xl relative">
            <div className="text-center pb-6 border-b border-slate-800">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Booking Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Your computer slot is reserved at KKKV ENTERPRISE.
              </p>
            </div>

            {/* Ticket details */}
            <div className="py-6 space-y-4 font-mono">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase block">Booking Reference ID</span>
                  <span className="text-xl font-bold text-blue-400 tracking-wider">
                    {confirmedBooking.bookingId}
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[11px] text-slate-500 uppercase block">Total Amount (Pay at Counter)</span>
                  <span className="text-xl font-bold text-emerald-400">
                    ₹{confirmedBooking.totalAmount}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Reserved Terminal</span>
                  <span className="font-semibold text-white">{confirmedBooking.stationName}</span>
                  <div className="text-[11px] text-slate-400 mt-0.5">{confirmedBooking.stationType}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Date &amp; Slot</span>
                  <span className="font-semibold text-white">{confirmedBooking.date}</span>
                  <div className="text-[11px] text-blue-400 mt-0.5">{confirmedBooking.timeSlot} ({confirmedBooking.durationHours} hrs)</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Customer Name</span>
                  <span className="font-semibold text-white truncate block">{confirmedBooking.customerName}</span>
                  <div className="text-[11px] text-slate-400 mt-0.5">+91 {confirmedBooking.phone}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Add-ons Selected</span>
                  <span className="font-semibold text-white">
                    {confirmedBooking.addons.length > 0 ? confirmedBooking.addons.join(', ') : 'None'}
                  </span>
                </div>
              </div>

              {/* Check-in Instructions */}
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-blue-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Check-In Location &amp; Instructions</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Please show this ID or your phone number upon arrival at #{CAFE_INFO.address.split(',')[0]}, Sanchal House, 2nd Cross, Mysuru. We will hold your terminal for 15 minutes past your start slot.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Hi%20KKKV%20Enterprise,%20I%20have%20booked%20${confirmedBooking.stationName}%20for%20${confirmedBooking.date}%20at%20${confirmedBooking.timeSlot}%20(Booking%20ID:%20${confirmedBooking.bookingId}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 py-2.5 px-4 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>Notify Shop on WhatsApp</span>
              </a>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto py-2.5 px-4 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-300" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto py-2.5 px-4 text-xs font-semibold text-blue-400 hover:text-white hover:bg-blue-600/20 border border-blue-500/40 rounded-lg transition-colors cursor-pointer"
              >
                Book Another Slot
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form */
          <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Selection Controls */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Select Station / Workstation Type */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                    <span>Choose Terminal &amp; Setup</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">12 Total Desks</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stations.map(st => {
                    const isSelected = selectedStationId === st.id;
                    const isAvail = st.status === 'available';
                    return (
                      <div
                        key={st.id}
                        onClick={() => setSelectedStationId(st.id)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-950/30 ring-1 ring-blue-500'
                            : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-mono">{st.name}</span>
                          <span className="text-xs font-bold font-mono text-blue-400">₹{st.ratePerHour}/hr</span>
                        </div>
                        <div className="text-xs text-slate-300 font-medium mt-1">{st.typeLabel}</div>
                        <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{st.specs}</div>
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800/60 text-[10px] font-mono">
                          <span className={isAvail ? 'text-emerald-400' : 'text-amber-400'}>
                            {isAvail ? 'Available Now' : st.currentOccupantUntil || 'In Use'}
                          </span>
                          <span className="text-slate-600">&bull;</span>
                          <span className="text-slate-400 truncate">{st.monitors}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date, Time & Duration */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
                    <span>Date, Time &amp; Duration</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Select Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={todayStr}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Duration Selector */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Estimated Duration
                    </label>
                    <select
                      value={selectedDuration.label}
                      onChange={(e) => {
                        const found = DURATION_OPTIONS.find(d => d.label === e.target.value);
                        if (found) setSelectedDuration(found);
                      }}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {DURATION_OPTIONS.map(d => (
                        <option key={d.label} value={d.label}>
                          {d.label} (₹{Math.round(selectedStation.ratePerHour * d.multiplier)})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time slot pills */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">
                    Available Arrival Time Slot
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {TIME_SLOTS.map(slot => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'bg-blue-600 border-blue-500 text-white font-semibold'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Add-on Services */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-4">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
                  <span>Add-on Services (Optional)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ADDONS.map(addon => {
                    const isChecked = selectedAddons.includes(addon.id);
                    const Icon = addon.icon;
                    return (
                      <label
                        key={addon.id}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                          isChecked
                            ? 'border-blue-500/80 bg-blue-950/20'
                            : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleAddon(addon.id)}
                            className="rounded border-slate-700 text-blue-600 focus:ring-0 w-4 h-4 bg-slate-900"
                          />
                          <div>
                            <span className="text-xs font-medium text-slate-200 block">{addon.name}</span>
                            <span className="text-[11px] font-mono text-blue-400">+₹{addon.price}</span>
                          </div>
                        </div>
                        <Icon className="w-4 h-4 text-slate-500" />
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Summary & Customer Details */}
            <div className="lg:col-span-5 sticky top-24 space-y-6">
              
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono pb-3 border-b border-slate-800">
                  Booking Breakdown
                </h3>

                {/* Price summary */}
                <div className="py-4 space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>{selectedStation.name} ({selectedDuration.label})</span>
                    <span className="text-white font-bold">₹{stationCost}</span>
                  </div>

                  {selectedAddons.map(id => {
                    const addon = ADDONS.find(a => a.id === id);
                    if (!addon) return null;
                    return (
                      <div key={id} className="flex justify-between text-slate-400">
                        <span>{addon.name}</span>
                        <span className="text-slate-200">+₹{addon.price}</span>
                      </div>
                    );
                  })}

                  <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-bold">
                    <span className="text-white">Estimated Payable</span>
                    <span className="text-emerald-400 font-mono text-base">₹{totalAmount}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 pt-1">
                    No upfront card needed. Pay cash / UPI at counter upon arrival.
                  </p>
                </div>

                {/* Contact Inputs */}
                <div className="space-y-3.5 pt-4 border-t border-slate-800">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Anand Sharma"
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      10-Digit Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-slate-800 bg-slate-800 text-xs font-mono text-slate-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="8050327750"
                        className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-r-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="receipt@example.com"
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Special Requirements / Service Notes
                    </label>
                    <textarea
                      rows={2}
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="e.g. Need assistance with Aadhaar correction or UPS power backup"
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  {formError && (
                    <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-800/80 text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Confirm Slot Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-[11px] text-slate-500 text-center font-mono pt-1">
                    Instant confirmation pass &bull; No cancellation penalty
                  </div>
                </div>

              </div>

            </div>

          </form>
        )}

      </div>
    </section>
  );
};
