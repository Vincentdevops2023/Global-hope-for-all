import React, { useState } from "react";
import { MessageSquare, X, Send, Phone, CheckCheck, Clock, ShieldCheck, Sparkles, ExternalLink, QrCode } from "lucide-react";

interface WhatsAppWidgetProps {
  phoneNumber?: string;
}

export default function WhatsAppWidget({ phoneNumber = "15550192834" }: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [targetNumber, setTargetNumber] = useState<string>(phoneNumber);
  const [customMessage, setCustomMessage] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const [isEditingNumber, setIsEditingNumber] = useState<boolean>(false);

  const quickTemplates = [
    "Hi! I'd like to ask a question about your anxiety supplements.",
    "Hello, I need assistance booking a consultation with a counselor.",
    "Hi, I'm looking for immediate resources on managing panic attacks.",
    "Hello! I have an inquiry regarding my WooCommerce shop order."
  ];

  const handleSelectTemplate = (template: string) => {
    setCustomMessage(template);
  };

  const handleStartChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSubmit = customMessage.trim() || "Hello Global Hope Support, I have a question regarding your wellness services.";
    const cleanNumber = targetNumber.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(textToSubmit)}`;
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 text-left font-sans">
      
      {/* POPUP CHAT WINDOW */}
      {isOpen && (
        <div className="glass-panel-heavy rounded-[32px] shadow-2xl border border-white/80 w-80 sm:w-96 mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header - Official WhatsApp Green */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white p-5 relative">
            <button
              id="close-whatsapp-popup-btn"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-emerald-100 hover:text-white bg-emerald-800/40 hover:bg-emerald-800/80 rounded-full transition cursor-pointer"
              title="Close chat"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              {/* WhatsApp Icon Badge */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md p-1 border border-white/30 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-800 rounded-full animate-pulse"></span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Direct WhatsApp Support
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                </h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-light">
                  <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full"></span>
                  Online • Typically replies in &lt;5 mins
                </p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
            
            {/* Simulated WhatsApp Chat Bubble */}
            <div className="bg-emerald-50/80 border border-emerald-100 p-3.5 rounded-2xl rounded-tl-none space-y-1 text-xs text-slate-800 relative">
              <span className="font-semibold text-emerald-900 block text-[11px]">Global Hope Team</span>
              <p className="leading-relaxed">
                Hello! 👋 Welcome to Global Hope For All. How can we support your health or answer questions today?
              </p>
              <div className="flex justify-end items-center gap-1 text-[10px] text-slate-400 pt-1">
                <span>Just now</span>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </div>

            {/* Quick Question Chips */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                Quick Topics:
              </label>
              <div className="space-y-1.5">
                {quickTemplates.map((template, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectTemplate(template)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                      customMessage === template
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white/60 hover:bg-white text-slate-700 border-white/80"
                    }`}
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <form onSubmit={handleStartChat} className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Or Type Your Message:
                </label>
                <textarea
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full bg-white/50 focus:bg-white border border-white/80 focus:border-emerald-500 rounded-xl p-3 text-xs text-slate-800 focus:outline-none transition backdrop-blur-xs placeholder-slate-400"
                />
              </div>

              {/* Number Customizer Toggle */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-white/40">
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-700" />
                  <span>WhatsApp No: <strong>+{targetNumber}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingNumber(!isEditingNumber)}
                  className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                >
                  {isEditingNumber ? "Done" : "Change No."}
                </button>
              </div>

              {isEditingNumber && (
                <div className="bg-white/50 p-2.5 rounded-xl border border-white/80 space-y-1">
                  <label className="text-[10px] text-slate-600 block">Enter target WhatsApp phone number with country code:</label>
                  <input
                    type="text"
                    value={targetNumber}
                    onChange={(e) => setTargetNumber(e.target.value)}
                    placeholder="15550192834"
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800"
                  />
                </div>
              )}

              {/* Send Button */}
              <button
                id="whatsapp-send-chat-btn"
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Send className="w-4 h-4" />
                Start WhatsApp Chat
              </button>
            </form>

            {/* QR Code toggle */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setShowQR(!showQR)}
                className="text-[11px] text-slate-500 hover:text-slate-800 font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                {showQR ? "Hide QR Code" : "Scan QR Code on Mobile"}
              </button>

              {showQR && (
                <div className="mt-2 bg-white p-3 rounded-2xl border border-slate-200 inline-block text-center space-y-1">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(`https://wa.me/${targetNumber.replace(/[^0-9]/g, "")}`)}`}
                    alt="WhatsApp QR Code"
                    className="w-28 h-28 mx-auto rounded-lg"
                  />
                  <span className="text-[10px] text-slate-500 block">Scan with mobile camera</span>
                </div>
              )}
            </div>

          </div>

          {/* Footer Note */}
          <div className="bg-slate-50/80 p-3 text-[10px] text-slate-500 text-center border-t border-slate-100 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>End-to-end encrypted direct messaging</span>
          </div>

        </div>
      )}

      {/* FLOATING WHATSAPP TRIGGER BUTTON */}
      <button
        id="whatsapp-floating-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-emerald-500 hover:bg-emerald-400 text-white p-3.5 rounded-full shadow-2xl transition duration-200 flex items-center gap-2 cursor-pointer border border-emerald-300/40"
        aria-label="Direct WhatsApp Chat"
      >
        <div className="relative">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
          </span>
        </div>

        <span className="text-xs font-bold hidden sm:inline pr-1">
          WhatsApp Support
        </span>
      </button>

    </div>
  );
}

// Lock component helper if needed
function Lock({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}
