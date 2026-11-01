import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cyberCafeData';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  MessageCircle, 
  Navigation, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSubmitted(true);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(CAFE_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(CAFE_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-2">
            Visit &bull; Connect &bull; Direct Assistance
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact KKKV ENTERPRISE
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Conveniently situated in Block 8, Sanchal House, Mysuru. Reach out for bulk printing contracts, exam application slots, or workstation bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Details & Interactive Map Card */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Details Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6">
              
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-slate-400 uppercase font-medium">Direct Telephone &amp; Hotline</div>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={`tel:${CAFE_INFO.phone}`}
                      className="text-xl sm:text-2xl font-bold font-mono text-white hover:text-blue-400 transition-colors"
                    >
                      {CAFE_INFO.formattedPhone}
                    </a>
                    <button
                      onClick={copyPhone}
                      className="p-1.5 text-slate-500 hover:text-slate-200 rounded-md transition-colors cursor-pointer"
                      title="Copy phone number"
                    >
                      {copiedPhone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <a
                      href={`tel:${CAFE_INFO.phone}`}
                      className="text-xs font-medium text-blue-400 hover:underline flex items-center gap-1"
                    >
                      Click to Call Now
                    </a>
                    <span className="text-slate-600">&bull;</span>
                    <a
                      href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Hello%20KKKV%20Enterprise,%20I%20have%20an%20inquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-slate-400 uppercase font-medium">Center Address</div>
                  <div className="text-sm sm:text-base font-semibold text-white mt-1 leading-snug">
                    {CAFE_INFO.address}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">
                    Landmark: {CAFE_INFO.landmark}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={copyAddress}
                      className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedAddress ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAddress ? 'Address Copied' : 'Copy Full Address'}</span>
                    </button>
                    <span className="text-slate-600">&bull;</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('KKKV Enterprise Sanchal House 2nd Cross Block 8 Mysore Karnataka 570002')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-slate-400 uppercase font-medium">Operating Hours</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 block">Mon &ndash; Sat</span>
                      <span className="font-semibold text-white">{CAFE_INFO.hours.weekdays}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 block">Sunday</span>
                      <span className="font-semibold text-white">{CAFE_INFO.hours.sunday}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    {CAFE_INFO.hours.note}
                  </p>
                </div>
              </div>

            </div>

            {/* Stylized Interactive Map Representation of Mysuru */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-slate-400 uppercase font-semibold flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-blue-400" />
                  <span>Mysuru City Location Radar</span>
                </span>
                <span className="text-slate-500">12.305° N, 76.645° E</span>
              </div>

              {/* Embedded Google Maps / OSM map representation */}
              <div className="relative w-full h-56 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <iframe
                  title="KKKV Enterprise Mysore Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.615%2C12.285%2C76.675%2C12.325&amp;layer=mapnik&amp;marker=12.305%2C76.645"
                  className="w-full h-full filter invert hue-rotate-180 contrast-125 opacity-85"
                  loading="lazy"
                />
                
                {/* Floating Map Pin Badge */}
                <div className="absolute top-4 left-4 bg-slate-900/95 border border-slate-700/80 p-2.5 rounded-lg shadow-xl backdrop-blur-sm max-w-[240px]">
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>KKKV ENTERPRISE</span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-0.5 line-clamp-2">
                    #89, Sanchal House, 2nd Cross, Block 8, Mysuru – 570002
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('KKKV Enterprise Sanchal House 2nd Cross Block 8 Mysore Karnataka 570002')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 px-3 py-1.5 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md shadow flex items-center gap-1 transition-colors"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry & Support Form */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-1">
              Send an Inquiry or Request Quotation
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Our team responds promptly during shop hours (8:00 AM – 9:30 PM).
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Inquiry Received!</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-white">{name}</span>. We will call you on <span className="font-mono text-blue-400">+91 {phone}</span> shortly or assist you when you visit #89 Sanchal House.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-5 py-2 text-xs font-semibold text-blue-400 hover:text-white border border-blue-500/40 rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohith Kumar"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-800 bg-slate-800 text-xs font-mono text-slate-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="8050327750"
                        className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-r-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Subject / Service Requirement
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="General Inquiry">General Cyber Cafe Inquiry</option>
                    <option value="Bulk Printing Order">Bulk Printing &amp; Book Binding</option>
                    <option value="Govt Exam Form Filing">Govt Exam / Job Application Assistance</option>
                    <option value="PAN / Aadhaar PVC">PAN Card / Aadhaar PVC Application</option>
                    <option value="Dedicated Workstation Rental">Long-term / Day Pass PC Workstation</option>
                    <option value="Tatkal Ticketing">Train Tatkal / Flight Ticketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Message / Specifications *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need (e.g. 'Need 80 copies of my project with spiral binding ready by tomorrow morning')..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to KKKV ENTERPRISE</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                  <span>Urgent emergency requirement? Call directly at</span>
                  <a href={`tel:${CAFE_INFO.phone}`} className="font-mono text-slate-300 hover:underline">
                    {CAFE_INFO.phone}
                  </a>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
