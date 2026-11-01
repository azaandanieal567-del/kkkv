import React, { useState, useEffect } from 'react';
import { BookingRecord, CAFE_INFO } from '../data/cyberCafeData';
import { Ticket, Search, X, Trash2, Printer, MapPin, CheckCircle, Clock } from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancelBooking: (id: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  onCancelBooking
}) => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    if (isOpen) {
      try {
        const str = localStorage.getItem('kkkv_bookings');
        if (str) {
          setBookings(JSON.parse(str));
        }
      } catch {
        setBookings([]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredBookings = bookings.filter(b => 
    b.bookingId.toLowerCase().includes(searchKey.toLowerCase()) ||
    b.phone.includes(searchKey) ||
    b.customerName.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <Ticket className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-base font-bold text-white">My Workstation Bookings</h3>
              <p className="text-xs text-slate-400">Track and manage your reservations at KKKV ENTERPRISE</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40 shrink-0">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search by Booking ID (e.g. KKKV-...) or Phone number..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Bookings List */}
        <div className="p-6 overflow-y-auto space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Ticket className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-300">No bookings found</p>
              <p className="text-xs text-slate-500 mt-1">
                You haven&apos;t reserved any slot or search keyword didn&apos;t match.
              </p>
            </div>
          ) : (
            filteredBookings.map((b) => (
              <div
                key={b.bookingId}
                className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 font-mono text-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Booking ID</span>
                    <span className="text-base font-bold text-blue-400">{b.bookingId}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block">Payable at Counter</span>
                    <span className="text-base font-bold text-emerald-400">₹{b.totalAmount}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Station:</span>
                    <span className="text-slate-200 font-sans font-semibold">{b.stationName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Slot Time:</span>
                    <span className="text-slate-200">{b.date} &bull; {b.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Duration:</span>
                    <span className="text-slate-200">{b.durationHours} hrs</span>
                  </div>
                </div>

                {b.addons && b.addons.length > 0 && (
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-500">Add-ons: </span>
                    <span>{b.addons.join(', ')}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Confirmed Reserved</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Print ticket"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Cancel reservation ${b.bookingId}?`)) {
                          onCancelBooking(b.bookingId);
                          setBookings(prev => prev.filter(item => item.bookingId !== b.bookingId));
                        }
                      }}
                      className="p-1.5 text-rose-400 hover:text-rose-300 rounded hover:bg-rose-950/30 transition-colors cursor-pointer"
                      title="Cancel booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-center shrink-0">
          <p className="text-[11px] text-slate-400">
            Show this booking pass at the counter: <span className="font-semibold text-slate-300">#{CAFE_INFO.address.split(',')[0]} Sanchal House, Mysuru</span>
          </p>
        </div>

      </div>
    </div>
  );
};
