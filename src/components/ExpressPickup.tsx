import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cyberCafeData';
import { UploadCloud, CheckCircle2, Clock, FileText, Phone, ArrowRight, MessageSquare, Shield } from 'lucide-react';

export const ExpressPickup: React.FC = () => {
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(5);
  const [colorMode, setColorMode] = useState<'bw' | 'color'>('bw');
  const [copies, setCopies] = useState<number>(1);
  const [custName, setCustName] = useState<string>('');
  const [custPhone, setCustPhone] = useState<string>('');
  const [pickupToken, setPickupToken] = useState<string | null>(null);

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone) return;
    const token = `KKKV-PR-${Math.floor(1000 + Math.random() * 9000)}`;
    setPickupToken(token);
  };

  return (
    <section id="pickup" className="py-16 md:py-24 border-b border-slate-800 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-2">
            Zero-Wait Service
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Express Print &amp; Pickup
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Submit your file before leaving home or office. Pick up crisp, collated prints at #{CAFE_INFO.address.split(',')[0]}, Sanchal House in 15 minutes.
          </p>
        </div>

        {pickupToken ? (
          <div className="max-w-xl mx-auto rounded-2xl border border-blue-500/50 bg-slate-900 p-6 sm:p-8 text-center space-y-6">
            <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-mono text-slate-400 uppercase block">Pickup Token Generated</span>
              <span className="text-3xl font-extrabold font-mono text-white tracking-wider block mt-1">
                {pickupToken}
              </span>
              <p className="text-xs text-slate-400 mt-2">
                Estimated Ready Time: <span className="text-emerald-400 font-semibold font-mono">Ready in 10-15 Minutes</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left font-mono text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Document:</span>
                <span className="text-white font-medium truncate max-w-[200px]">{fileName || 'Manual Dispatch'}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Print Spec:</span>
                <span className="text-white">{pageCount} Pages ({colorMode.toUpperCase()}) &times; {copies} Copy</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Name &amp; Phone:</span>
                <span className="text-white">{custName} (+91 {custPhone})</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-800">
                <span>Pickup Counter:</span>
                <span className="text-blue-400">#89 Sanchal House, 2nd Cross, Mysuru</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Hi%20KKKV%20Enterprise,%20my%20Print%20Pickup%20Token%20is%20${pickupToken}.%20Please%20find%20my%20attached%20document.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Forward File on WhatsApp</span>
              </a>

              <button
                onClick={() => setPickupToken(null)}
                className="w-full sm:w-auto py-2.5 px-4 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                New Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
            
            {/* File selection box */}
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-2">
                Select Document to Print (PDF, Word, or JPG)
              </label>
              <div className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-6 text-center bg-slate-950/40 transition-colors">
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <div className="text-xs text-slate-300">
                  <label className="text-blue-400 font-semibold cursor-pointer hover:underline">
                    <span>Click to browse file</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileDrop}
                    />
                  </label>{' '}
                  or drag and drop here
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Supports PDF, DOCX, Images up to 25MB
                </p>
                {fileName && (
                  <div className="mt-3 p-2 rounded-lg bg-blue-950/40 border border-blue-800/60 text-xs text-blue-300 flex items-center justify-between">
                    <span className="font-mono truncate">{fileName}</span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">{fileSize}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Print Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Est. Page Count
                </label>
                <input
                  type="number"
                  min={1}
                  value={pageCount}
                  onChange={(e) => setPageCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Color Mode
                </label>
                <select
                  value={colorMode}
                  onChange={(e) => setColorMode(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white"
                >
                  <option value="bw">Black &amp; White (₹2/page)</option>
                  <option value="color">Full Color Laser (₹10/page)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Sets / Copies
                </label>
                <input
                  type="number"
                  min={1}
                  value={copies}
                  onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>
            </div>

            {/* Customer info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  placeholder="e.g. Darshan Gowda"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Contact Mobile Number *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-slate-800 bg-slate-800 text-xs font-mono text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    placeholder="8050327750"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-r-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Generate Pickup Token &amp; Dispatch Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>All documents securely deleted immediately after printing.</span>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
