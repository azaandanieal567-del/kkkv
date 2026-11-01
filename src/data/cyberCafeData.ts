export interface CyberService {
  id: string;
  name: string;
  category: 'browsing' | 'printing' | 'government' | 'student' | 'ticketing' | 'digital';
  shortDesc: string;
  fullDesc: string;
  price: string;
  turnaround: string;
  features: string[];
  popular?: boolean;
}

export interface Station {
  id: string;
  name: string;
  type: 'browsing' | 'gaming' | 'cabin' | 'gov_desk' | 'express';
  typeLabel: string;
  specs: string;
  ratePerHour: number;
  status: 'available' | 'in_use' | 'reserved';
  currentOccupantUntil?: string;
  monitors: string;
  software: string[];
}

export interface BookingRecord {
  bookingId: string;
  customerName: string;
  phone: string;
  email?: string;
  stationId: string;
  stationName: string;
  stationType: string;
  date: string;
  timeSlot: string;
  durationHours: number;
  totalAmount: number;
  addons: string[];
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
}

export const CAFE_INFO = {
  name: "KKKV ENTERPRISE",
  tagline: "Premier Cyber Hub & Digital Citizen Service Center",
  phone: "8050327750",
  formattedPhone: "+91 80503 27750",
  whatsappNumber: "918050327750",
  email: "kkkventerprise.mys@gmail.com",
  address: "#89, Sanchal House, 2nd Cross, Mysore, Block 8, Mysuru, Karnataka – 570002",
  landmark: "Block 8, 2nd Cross, near key educational coaching & residential hubs",
  city: "Mysuru",
  state: "Karnataka",
  pincode: "570002",
  hours: {
    weekdays: "8:00 AM – 9:30 PM",
    sunday: "9:00 AM – 8:00 PM",
    note: "Emergency print & Tatkal booking services available on early call"
  },
  amenities: [
    "500 Mbps High-Speed Dedicated Fiber",
    "Dual-Monitor & RTX Gaming Stations",
    "High-Speed Canon & Xerox Laser Printers",
    "Online Government Portal Experts",
    "Air Conditioned Private Cubicles",
    "Uninterrupted Power Backup (UPS + Generator)",
    "Document Lamination & Spiral Binding",
    "Secure USB & Cloud Data Transfer"
  ]
};

export const SERVICES_CATALOG: CyberService[] = [
  {
    id: "srv-browsing",
    name: "High-Speed Internet Browsing",
    category: "browsing",
    shortDesc: "Gigabit-speed internet access on fast desktop computers with full office suites.",
    fullDesc: "Browse the web, conduct research, check emails, or download study material with ultra-low latency on our 500 Mbps redundant fiber connection. Equipped with Chrome, Firefox, MS Office, Acrobat Reader, and clean privacy wipe after each session.",
    price: "₹20 / hour",
    turnaround: "Instant walk-in",
    features: ["500 Mbps Fiber connection", "Zero browsing history retention", "Webcam & headset available", "Full MS Office 365 suite"],
    popular: true
  },
  {
    id: "srv-gaming",
    name: "RTX Gaming & High-Performance Rig",
    category: "browsing",
    shortDesc: "High-refresh 165Hz curved monitors with RTX dedicated GPUs and gaming peripherals.",
    fullDesc: "Specially calibrated PC stations for esports, Steam gaming, video editing, 3D architectural rendering, and heavy computational tasks. Includes mechanical keyboards, ultra-light gaming mouse, and Discord readiness.",
    price: "₹60 / hour",
    turnaround: "Slot reservation recommended",
    features: ["NVIDIA RTX 40-Series Graphics", "165Hz Curved Gaming Display", "Mechanical RGB Keyboard", "Steam, Epic & Discord installed"],
    popular: true
  },
  {
    id: "srv-cabin",
    name: "Private Study & Video Call Cabin",
    category: "browsing",
    shortDesc: "Sound-damped private cubicle with 1080p ring-light webcam for meetings and exams.",
    fullDesc: "Perfect for remote job interviews, proctored online examinations, Skype/Zoom conferences, and concentrated study sessions away from background distractions.",
    price: "₹35 / hour",
    turnaround: "Available daily",
    features: ["Acoustic dampening cabin", "1080p FHD webcam with ring light", "Noise-cancelling USB headset", "Private door privacy lock"]
  },
  {
    id: "srv-bw-print",
    name: "Laser B&W Printing & Xerox",
    category: "printing",
    shortDesc: "Crisp black & white laser photocopy and prints on premium 75/80 GSM paper.",
    fullDesc: "High-speed laser printing up to 60 pages per minute. Ideal for student project reports, court documents, study notes, book chapters, and official contracts. Single or double-sided available.",
    price: "₹2 / page",
    turnaround: "Under 2 minutes",
    features: ["High-speed Canon laser engine", "Crisp 1200 DPI resolution", "Double-sided auto duplexing", "Bulk discount on 100+ pages"],
    popular: true
  },
  {
    id: "srv-color-print",
    name: "High-Res Color Laser Printing",
    category: "printing",
    shortDesc: "Vibrant full-color laser prints on glossy photo or heavy bond paper.",
    fullDesc: "Studio-quality color reproduction for presentations, certificates, project covers, charts, promotional flyers, and brochures. Available up to A4 and legal paper sizes.",
    price: "₹10 / page",
    turnaround: "Instant",
    features: ["Commercial CMYK Laser engine", "Heavy bond & glossy photo media", "True-to-life Pantone matching", "Water-resistant toner technology"]
  },
  {
    id: "srv-lamination-binding",
    name: "Lamination & Spiral / Soft Binding",
    category: "printing",
    shortDesc: "Heat sealed pouch lamination for certificates and spiral book binding.",
    fullDesc: "Preserve your valuable certificates, marks cards, and Aadhaar cards with heavy micron waterproof lamination. Professional plastic spiral comb binding with transparent cover sheets for college theses and business dossiers.",
    price: "From ₹20",
    turnaround: "5 to 10 minutes",
    features: ["Heavy 250-micron heat lamination", "Spiral comb & soft strip binding", "Clear PVC protective covers", "A4, A3, and ID card sizes"]
  },
  {
    id: "srv-pan-card",
    name: "PAN Card Application & Correction",
    category: "government",
    shortDesc: "New NSDL/UTI PAN card registration, updates, and lost card reprints.",
    fullDesc: "Assisted online application filing for new PAN cards, corrections in name, date of birth, or father's name, and instant e-PAN generation. We handle document scanning, biometric verification, and tracking.",
    price: "₹150 + Govt Fee",
    turnaround: "Same day submission",
    features: ["NSDL / UTI authorized guidance", "Instant e-PAN delivery to email", "Physical card mailed to doorstep", "Correction & linkage support"],
    popular: true
  },
  {
    id: "srv-aadhaar-pvc",
    name: "Aadhaar Card Download & PVC Print",
    category: "government",
    shortDesc: "Official UIDAI e-Aadhaar download and pocket-sized durable PVC smart card print.",
    fullDesc: "Download verified e-Aadhaar via OTP authentication, address update assistance, and thermal high-definition PVC card printing with hologram and QR code.",
    price: "₹50 / PVC Card",
    turnaround: "5 minutes",
    features: ["Official UIDAI OTP verification", "Rigid ATM-style PVC plastic card", "Scannable QR code & hologram", "Pocket waterproof format"]
  },
  {
    id: "srv-govt-portals",
    name: "Passport Seva, Voter ID & Citizen Services",
    category: "government",
    shortDesc: "Online filing for Indian Passport appointments, Voter ID, and Seva Sindhu services.",
    fullDesc: "Expert hands-on assistance with Karnataka Seva Sindhu portals (Income, Caste, Residence, Ration Card), Voter ID registration & EPIC download, and Passport Seva slot scheduling.",
    price: "From ₹50",
    turnaround: "15 to 30 minutes",
    features: ["Seva Sindhu Karnataka certified flow", "Passport appointment slot booking", "Voter card address changes", "Official fee payment handling"]
  },
  {
    id: "srv-exam-forms",
    name: "Online Exam Forms & Hall Tickets",
    category: "student",
    shortDesc: "Flawless form submission for UPSC, KPSC, SSC, NEET, JEE, CET & Banking exams.",
    fullDesc: "Avoid form rejection due to improper photo dimensions or signature resolutions. We precisely crop, resize, and compress images to match strict government notification guidelines.",
    price: "₹60 / form",
    turnaround: "15 minutes",
    features: ["Strict KB photo/signature resizing", "Payment gateway assistance", "2 Color printouts of confirmation", "SMS alert verification"]
  },
  {
    id: "srv-resume-cv",
    name: "Resume / CV Drafting & Formatting",
    category: "student",
    shortDesc: "Professional ATS-friendly resume formatting and Kannada/English typing.",
    fullDesc: "Get your resume modernized with clean modern layouts, typography, and ATS compliance. We also offer certified document typing in English and Kannada (Nudi/Baraha).",
    price: "From ₹100",
    turnaround: "30 to 45 minutes",
    features: ["Modern ATS-friendly templates", "Kannada & English typing", "Export to PDF & editable DOCX", "3 Premium prints included"]
  },
  {
    id: "srv-irctc-tickets",
    name: "IRCTC Train & Flight Ticketing",
    category: "ticketing",
    shortDesc: "Authorized train ticket bookings, Tatkal slot alerts, and flight/bus reservations.",
    fullDesc: "Book confirmed railway berths across India, Tatkal quota assistance, KSRTC bus tickets, and domestic/international flight reservations with printed itinerary receipts.",
    price: "From ₹40",
    turnaround: "5 to 10 minutes",
    features: ["IRCTC verified e-ticketing", "Tatkal timing preparedness", "KSRTC / Private sleeper bus booking", "Laminated travel itinerary print"]
  },
  {
    id: "srv-scan-digitize",
    name: "High-Resolution Scanning & Emailing",
    category: "digital",
    shortDesc: "Multi-page OCR scanning to PDF, cloud drive transfer, and email dispatch.",
    fullDesc: "Flatbed and high-speed feeder scanning up to 600 DPI. Clean conversion of physical paper files into searchable PDFs, image extraction, and direct transmission to your email or WhatsApp.",
    price: "₹5 / page",
    turnaround: "Instant",
    features: ["Optical Character Recognition (OCR)", "Multi-page single PDF merging", "Direct WhatsApp/Email forwarding", "Secure USB drive transfer"]
  }
];

export const INITIAL_STATIONS: Station[] = [
  {
    id: "pc-01",
    name: "Terminal 01",
    type: "browsing",
    typeLabel: "High-Speed Workstation",
    specs: "Core i5 12th Gen · 16GB RAM · 500Mbps Fiber",
    ratePerHour: 20,
    status: "available",
    monitors: "24\" Full HD Dell UltraSharp",
    software: ["MS Office 365", "Google Chrome", "Adobe Acrobat", "Photoshop Basic"]
  },
  {
    id: "pc-02",
    name: "Terminal 02",
    type: "browsing",
    typeLabel: "High-Speed Workstation",
    specs: "Core i5 12th Gen · 16GB RAM · 500Mbps Fiber",
    ratePerHour: 20,
    status: "available",
    monitors: "24\" Full HD Dell UltraSharp",
    software: ["MS Office 365", "Google Chrome", "Adobe Acrobat", "Zoom"]
  },
  {
    id: "pc-03",
    name: "Terminal 03",
    type: "browsing",
    typeLabel: "High-Speed Workstation",
    specs: "Core i5 12th Gen · 16GB RAM · 500Mbps Fiber",
    ratePerHour: 20,
    status: "in_use",
    currentOccupantUntil: "15 mins remaining",
    monitors: "24\" Full HD Dell UltraSharp",
    software: ["MS Office 365", "Google Chrome", "Adobe Acrobat"]
  },
  {
    id: "pc-04",
    name: "Terminal 04",
    type: "browsing",
    typeLabel: "High-Speed Workstation",
    specs: "Core i5 12th Gen · 16GB RAM · 500Mbps Fiber",
    ratePerHour: 20,
    status: "available",
    monitors: "24\" Full HD Dell UltraSharp",
    software: ["MS Office 365", "Google Chrome", "Adobe Acrobat"]
  },
  {
    id: "pc-05",
    name: "Cabin A (Private)",
    type: "cabin",
    typeLabel: "Private Video / Study Cabin",
    specs: "Sound-damped cubicle · HD Ring Light · Noise-cancelling Headset",
    ratePerHour: 35,
    status: "available",
    monitors: "27\" IPS Display + 1080p WebCam",
    software: ["Zoom", "Google Meet", "MS Teams", "Chrome", "Office"]
  },
  {
    id: "pc-06",
    name: "Cabin B (Private)",
    type: "cabin",
    typeLabel: "Private Video / Study Cabin",
    specs: "Sound-damped cubicle · HD Ring Light · Noise-cancelling Headset",
    ratePerHour: 35,
    status: "reserved",
    currentOccupantUntil: "Reserved for 3:00 PM",
    monitors: "27\" IPS Display + 1080p WebCam",
    software: ["Zoom", "Google Meet", "MS Teams", "Chrome"]
  },
  {
    id: "pc-07",
    name: "Rig Alpha (Gaming)",
    type: "gaming",
    typeLabel: "RTX Gaming Station",
    specs: "NVIDIA RTX 4060 · AMD Ryzen 5 · 32GB RAM",
    ratePerHour: 60,
    status: "available",
    monitors: "27\" 165Hz Curved Gaming Monitor",
    software: ["Steam", "Epic Games", "Discord", "Valorant", "CS2", "GTA V"]
  },
  {
    id: "pc-08",
    name: "Rig Beta (Gaming)",
    type: "gaming",
    typeLabel: "RTX Gaming Station",
    specs: "NVIDIA RTX 4060 · AMD Ryzen 5 · 32GB RAM",
    ratePerHour: 60,
    status: "available",
    monitors: "27\" 165Hz Curved Gaming Monitor",
    software: ["Steam", "Epic Games", "Discord", "Valorant", "Premier Pro"]
  },
  {
    id: "pc-09",
    name: "Govt Desk 01",
    type: "gov_desk",
    typeLabel: "Govt Portals & Biometrics",
    specs: "Attached Flatbed Scanner · Morpho Fingerprint Scanner · Kannada Typing",
    ratePerHour: 25,
    status: "available",
    monitors: "22\" Anti-Glare Monitor",
    software: ["Nudi Kannada Software", "Morpho RD Service", "Seva Sindhu", "NSDL Portal"]
  },
  {
    id: "pc-10",
    name: "Govt Desk 02",
    type: "gov_desk",
    typeLabel: "Govt Portals & Biometrics",
    specs: "Attached Flatbed Scanner · Fast Photo Crop Tools",
    ratePerHour: 25,
    status: "available",
    monitors: "22\" Anti-Glare Monitor",
    software: ["Nudi Kannada Software", "DigiLocker", "IRCTC Agent Login", "Exam Portals"]
  },
  {
    id: "pc-11",
    name: "Express Kiosk 1",
    type: "express",
    typeLabel: "Express Print & Burst",
    specs: "Direct network link to Canon 60ppm Laser Printer",
    ratePerHour: 15,
    status: "available",
    monitors: "20\" Compact Display",
    software: ["Quick Print Dispatch", "WhatsApp Web Kiosk", "Pen Drive Auto-Scan"]
  },
  {
    id: "pc-12",
    name: "Express Kiosk 2",
    type: "express",
    typeLabel: "Express Print & Burst",
    specs: "Direct network link to Canon Color Laser",
    ratePerHour: 15,
    status: "in_use",
    currentOccupantUntil: "5 mins remaining",
    monitors: "20\" Compact Display",
    software: ["Quick Print Dispatch", "WhatsApp Web Kiosk", "Google Drive Downloader"]
  }
];

export const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Praveen Kumar",
    role: "KPSC Exam Aspirant",
    location: "Kuvempunagar, Mysuru",
    rating: 5,
    quote: "Had trouble uploading my photo and signature for the KPSC Gazetted Probationers exam due to size errors. The staff at KKKV ENTERPRISE sized it precisely in 5 minutes and completed the payment without glitch. Outstanding service!"
  },
  {
    id: "t-2",
    name: "Ananya Hegde",
    role: "M.Sc Student, University of Mysore",
    location: "Mysuru",
    rating: 5,
    quote: "Got my 180-page master's dissertation spiral-bound and color-printed here. The print clarity is razor sharp and paper quality is genuinely 80 GSM. The transparent pricing and speed saved my submission day."
  },
  {
    id: "t-3",
    name: "Ramesh Gowda",
    role: "Local Business Owner",
    location: "Block 8, Mysuru",
    rating: 5,
    quote: "Needed immediate Tatkal train tickets to Mumbai and PAN card name correction. Both handled smoothly. Best cyber cafe in Sanchal House area with fast fiber internet and courteous staff."
  }
];

export const FAQS = [
  {
    q: "Can I bring my documents on a pen drive or send via WhatsApp?",
    a: "Yes! You can bring any USB pen drive, external hard drive, or simply send files to our dedicated WhatsApp number (+91 8050327750) or email. All USB drives are safely scanned for viruses before opening."
  },
  {
    q: "Can I book a specific computer or private cabin in advance?",
    a: "Absolutely. Use our online booking system above to choose your terminal, date, and preferred time slot. You receive an instant digital booking pass with a reference ID."
  },
  {
    q: "Do you assist with government job and competitive exam applications?",
    a: "Yes, our experienced team specializes in exam filings for UPSC, KPSC, Banking, SSC, NEET, and CET. We ensure photo and signature specifications match the notification criteria exactly to prevent rejections."
  },
  {
    q: "Do you offer Tatkal railway and bus ticket booking?",
    a: "Yes, we facilitate authorized IRCTC train reservations (including Tatkal window bookings at 10:00 AM for AC and 11:00 AM for Non-AC) and KSRTC bus bookings."
  },
  {
    q: "What are your exact shop hours and peak times?",
    a: "We are open Monday to Saturday from 8:00 AM to 9:30 PM, and Sundays from 9:00 AM to 8:00 PM. For emergency print requirements or early exam hall tickets, you can contact us directly at 8050327750."
  }
];
