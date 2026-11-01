import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cyberCafeData';
import { Calculator, Printer, Check, Copy, MessageCircle, ArrowRight } from 'lucide-react';

interface PrintCalculatorProps {
  onSendToPickup?: (details: any) => void;
}

export const PrintCalculator: React.FC<PrintCalculatorProps> = ({ onSendToPickup }) => {
  const [pages, setPages] = useState<number>(20);
  const [copies, setCopies] = useState<number>(1);
  const [printType, setPrintType] = useState<'bw' | 'color'>('bw');
  const [isDoubleSided, setIsDoubleSided] = useState<boolean>(true);
  const [paperType, setPaperType] = useState<'75gsm' | '100gsm' | 'glossy'>('75gsm');
  const [binding, setBinding] = useState<'none' | 'staple' | 'spiral' | 'lamination' | 'hardbound'>('spiral');
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Pricing formula
  let basePricePerPage = 2; // B&W
  if (printType === 'color') basePricePerPage = 10;

  // Paper surcharge
  let paperSurcharge = 0;
  if (paperType === '100gsm') paperSurcharge = 1.5;
  if (paperType === 'glossy') paperSurcharge = 15; // photo print

  // Sides logic
  // If double-sided, number of physical sheets is ceil(pages / 2)
  const sheetsCount = isDoubleSided ? Math.ceil(pages / 2) : pages;
  const printCostPerCopy = (pages * basePricePerPage) + (sheetsCount * paperSurcharge);

  // Finishing cost per copy
  let finishingCost = 0;
  if (binding === 'staple') finishingCost = 2;
  if (binding === 'spiral') finishingCost = pages > 100 ? 50 : 35;
  if (binding === 'lamination') finishingCost = 20 * Math.min(sheetsCount, 5); // thermal lamination per sheet
  if (binding === 'hardbound') finishingCost = 150;

  const totalPerCopy = printCostPerCopy + finishingCost;
  const grandTotal = Math.round(totalPerCopy * copies);

  const quoteSummary = `KKKV ENTERPRISE Print Quote:
Pages: ${pages} (${isDoubleSided ? 'Double-sided' : 'Single-sided'})
Type: ${printType === 'bw' ? 'Black & White Laser' : 'Full Color Laser'}
Paper: ${paperType === '75gsm' ? 'Standard 75 GSM' : paperType === '100gsm' ? 'Premium 100 GSM Bond' : 'Glossy Photo 180 GSM'}
Finishing: ${binding.toUpperCase()}
Copies: ${copies}
Estimated Total: ₹${grandTotal}
Pickup at: #89 Sanchal House, Block 8, Mysuru`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(quoteSummary);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2500);
  };

  return (
    <section id="calculator" className="py-16 md:py-24 border-b border-slate-800 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider mb-2">
            Instant Estimate
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Print &amp; Xerox Rate Calculator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Calculate exact costs for thesis binding, college assignments, brochures, and legal documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
            
            {/* Page Count Slider & Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-slate-300 uppercase font-semibold">
                  Total Page Count
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={pages}
                    onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-2.5 py-1 text-xs font-mono bg-slate-950 border border-slate-700 rounded text-center text-white font-bold"
                  />
                  <span className="text-xs text-slate-400 font-mono">pages</span>
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={250}
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>1 page</span>
                <span>50 pages</span>
                <span>100 pages</span>
                <span>250+ pages</span>
              </div>
            </div>

            {/* Print Type: B&W vs Color */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase font-semibold block mb-2">
                Color Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPrintType('bw')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    printType === 'bw'
                      ? 'border-blue-500 bg-blue-950/30'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Black &amp; White Laser</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">₹2.00 / page</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPrintType('color')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    printType === 'color'
                      ? 'border-blue-500 bg-blue-950/30'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white">High-Res Color Laser</div>
                  <div className="text-[11px] text-blue-400 font-mono mt-0.5">₹10.00 / page</div>
                </button>
              </div>
            </div>

            {/* Sides: Single vs Double */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase font-semibold block mb-2">
                Printing Sides
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsDoubleSided(false)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    !isDoubleSided
                      ? 'border-blue-500 bg-blue-950/30'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Single-Sided (Simplex)</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{pages} physical sheets</div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDoubleSided(true)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    isDoubleSided
                      ? 'border-blue-500 bg-blue-950/30'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Back-to-Back (Duplex)</div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-0.5">{sheetsCount} physical sheets (Eco)</div>
                </button>
              </div>
            </div>

            {/* Paper Type & Media */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase font-semibold block mb-2">
                Paper Stock
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '75gsm', label: '75 GSM Standard', desc: 'Assignments, Xerox' },
                  { id: '100gsm', label: '100 GSM Bond', desc: 'Resumes, Official (+₹1.5)' },
                  { id: 'glossy', label: 'Glossy Photo 180G', desc: 'Covers & Photos (+₹15)' }
                ].map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaperType(p.id as any)}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      paperType === p.id
                        ? 'border-blue-500 bg-blue-950/30'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{p.label}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Finishing & Binding */}
            <div>
              <label className="text-xs font-mono text-slate-300 uppercase font-semibold block mb-2">
                Finishing &amp; Binding
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'none', label: 'No Binding', price: '₹0' },
                  { id: 'staple', label: 'Corner Staple', price: '₹2' },
                  { id: 'spiral', label: 'Spiral Comb Binding', price: '₹35' },
                  { id: 'lamination', label: 'Thermal Lamination', price: '₹20/ea' },
                  { id: 'hardbound', label: 'Golden Hard Bound', price: '₹150' },
                ].map(b => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBinding(b.id as any)}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      binding === b.id
                        ? 'border-blue-500 bg-blue-950/30'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{b.label}</div>
                    <div className="text-[10px] font-mono text-blue-400">{b.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Copies */}
            <div className="flex items-center justify-between pt-2">
              <label className="text-xs font-mono text-slate-300 uppercase font-semibold">
                Number of Sets / Copies
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCopies(Math.max(1, copies - 1))}
                  className="w-7 h-7 rounded border border-slate-700 bg-slate-800 text-white font-mono flex items-center justify-center hover:bg-slate-700 cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono font-bold text-white">{copies}</span>
                <button
                  type="button"
                  onClick={() => setCopies(copies + 1)}
                  className="w-7 h-7 rounded border border-slate-700 bg-slate-800 text-white font-mono flex items-center justify-center hover:bg-slate-700 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Output Card */}
          <div className="lg:col-span-5 sticky top-24 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Live Quotation
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500">Official Rate Card</span>
            </div>

            <div className="py-6 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Print: {pages} pages &times; ₹{basePricePerPage} ({printType.toUpperCase()})</span>
                <span className="text-white">₹{pages * basePricePerPage}</span>
              </div>

              {paperSurcharge > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>Paper Stock Upgrade ({sheetsCount} sheets)</span>
                  <span className="text-slate-200">+₹{Math.round(sheetsCount * paperSurcharge)}</span>
                </div>
              )}

              {finishingCost > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>Finishing: {binding.toUpperCase()}</span>
                  <span className="text-slate-200">+₹{finishingCost}</span>
                </div>
              )}

              {copies > 1 && (
                <div className="flex justify-between text-blue-400 pt-2 border-t border-slate-800">
                  <span>Per Copy: ₹{Math.round(totalPerCopy)} &times; {copies} Sets</span>
                  <span>₹{grandTotal}</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase block">Grand Total</span>
                  <span className="text-[10px] text-emerald-400 font-sans">Walk-in pickup ready in ~15 mins</span>
                </div>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(quoteSummary)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Send Document to WhatsApp for Print</span>
              </a>

              <button
                type="button"
                onClick={copyToClipboard}
                className="w-full py-2.5 px-4 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedQuote ? 'Copied Quote to Clipboard' : 'Copy Quote Details'}</span>
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Shop Address:</span> #{CAFE_INFO.address.split(',')[0]}, Sanchal House, 2nd Cross, Block 8, Mysuru. Call: {CAFE_INFO.phone}.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
