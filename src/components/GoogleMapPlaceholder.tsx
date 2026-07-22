import { useState } from "react";
import { MapPin, Navigation, Plus, Minus, Building, CalendarClock } from "lucide-react";

export default function GoogleMapPlaceholder() {
  const [zoomLevel, setZoomLevel] = useState(14);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 1, 10));

  return (
    <div id="office-map-container" className="relative w-full h-[350px] bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-inner">
      {/* Visual map backdrop (Stylized SVG representation of city grid) */}
      <svg className="absolute inset-0 w-full h-full text-slate-100" preserveAspectRatio="none" viewBox="0 0 100 100">
        {/* River/Water body */}
        <path d="M 0 80 Q 30 75 50 85 T 100 70 L 100 100 L 0 100 Z" fill="#e2f1f5" />
        
        {/* Major Grid Lines (Streets) */}
        <line x1="10" y1="0" x2="10" y2="100" stroke="#f1f5f9" strokeWidth="2" />
        <line x1="30" y1="0" x2="30" y2="100" stroke="#f1f5f9" strokeWidth="2" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="#f1f5f9" strokeWidth="3" />
        <line x1="70" y1="0" x2="70" y2="100" stroke="#f1f5f9" strokeWidth="2" />
        <line x1="90" y1="0" x2="90" y2="100" stroke="#f1f5f9" strokeWidth="2" />
        
        <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="2" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="#f1f5f9" strokeWidth="3" />
        <line x1="0" y1="60" x2="100" y2="60" stroke="#f1f5f9" strokeWidth="2" />
        <line x1="0" y1="80" x2="100" y2="80" stroke="#f1f5f9" strokeWidth="2" />

        {/* Parks / Green areas */}
        <rect x="5" y="5" width="20" height="12" rx="3" fill="#ecfdf5" />
        <rect x="55" y="25" width="12" height="12" rx="3" fill="#ecfdf5" />
        <circle cx="85" cy="15" r="8" fill="#ecfdf5" />

        {/* Other Buildings (Stylized boxes) */}
        <rect x="12" y="25" width="8" height="6" rx="1" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5" />
        <rect x="35" y="10" width="12" height="8" rx="1" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5" />
        <rect x="35" y="45" width="10" height="10" rx="1" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5" />
        <rect x="75" y="45" width="12" height="6" rx="1" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5" />
      </svg>

      {/* Interactive Compass & Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1 z-10">
        <button
          id="map-zoom-in"
          onClick={handleZoomIn}
          className="p-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg shadow-sm transition"
          aria-label="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          id="map-zoom-out"
          onClick={handleZoomOut}
          className="p-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg shadow-sm transition"
          aria-label="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Target pinpoint */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        {/* Animated wave rings */}
        <div className="absolute w-12 h-12 bg-teal-500/20 rounded-full animate-ping pointer-events-none duration-1000"></div>
        <div className="absolute w-6 h-6 bg-teal-500/30 rounded-full pointer-events-none"></div>
        
        {/* Locator pin icon */}
        <MapPin className="w-9 h-9 text-teal-700 filter drop-shadow-md relative z-10 animate-bounce" />
        
        {/* Label banner */}
        <div className="bg-slate-950 text-white text-[10px] px-2.5 py-1 rounded-md font-semibold whitespace-nowrap shadow-lg mt-1 border border-slate-800 relative z-10">
          Global Hope For All HQ
        </div>
      </div>

      {/* Static Map Label Info Overlay */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 max-w-[280px] shadow-lg text-xs space-y-2 relative z-10">
        <div className="font-bold text-slate-900 flex items-center gap-1.5">
          <Building className="w-4 h-4 text-teal-700" />
          <span>Seattle Wellness HQ</span>
        </div>
        <p className="text-slate-600 leading-normal">
          1200 Hope Boulevard, Suite 400, Seattle, WA 98101
        </p>
        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1 border-t border-slate-100 pt-1.5">
          <Navigation className="w-3.5 h-3.5 text-teal-700" />
          <span>Zoom: {zoomLevel} (Google Maps API placeholder)</span>
        </div>
      </div>
    </div>
  );
}
