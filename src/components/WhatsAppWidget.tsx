import React, { useState } from "react";
import { MessageSquare, X, Send, Phone, CheckCheck, Clock, ShieldCheck, Sparkles, ExternalLink, QrCode } from "lucide-react";

interface WhatsAppWidgetProps {
  phoneNumber?: string;
}

export default function WhatsAppWidget({ phoneNumber = "16624709606" }: WhatsAppWidgetProps) {
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
      
      {/* POPUP CHAT WINDOW - PINK AND BLACK THEME */}
      {isOpen && (
        <div className="bg-zinc-950 text-slate-100 rounded-[32px] shadow-2xl shadow-pink-950/50 border border-pink-500/30 w-80 sm:w-96 mb-4 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header - Obsidian Black with Pink Accents */}
          <div className="bg-gradient-to-r from-black via-zinc-900 to-pink-950 text-white p-5 relative border-b border-pink-500/20">
            <button
              id="close-whatsapp-popup-btn"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-pink-300 hover:text-white bg-pink-950/60 hover:bg-pink-900/80 rounded-full transition cursor-pointer border border-pink-500/30"
              title="Close chat"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              {/* WhatsApp Icon Badge in Pink & Black */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-black p-1 border border-pink-500/50 shadow-md shadow-pink-500/20 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-pink-600 flex items-center justify-center text-white">
                    <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-pink-500 border-2 border-black rounded-full animate-pulse"></span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5 font-sans">
                  Direct WhatsApp Support
                  <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                </h4>
                <p className="text-[11px] text-pink-300 flex items-center gap-1 font-light">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping"></span>
                  Online • Typically replies in &lt;5 mins
                </p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto bg-zinc-950">
            
            {/* Simulated WhatsApp Chat Bubble in Pink/Black */}
            <div className="bg-zinc-900 border border-pink-500/30 p-3.5 rounded-2xl rounded-tl-none space-y-1 text-xs text-pink-100 relative shadow-inner">
              <span className="font-bold text-pink-400 block text-[11px]">Global Hope Team</span>
              <p className="leading-relaxed text-zinc-200">
                Hello! 👋 Welcome to Global Hope For All. How can we support your health or answer questions today?
              </p>
              <div className="flex justify-end items-center gap-1 text-[10px] text-zinc-500 pt-1">
                <span>Just now</span>
                <CheckCheck className="w-3.5 h-3.5 text-pink-500" />
              </div>
            </div>

            {/* Quick Question Chips */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-pink-400 uppercase tracking-wider">
                Quick Topics:
              </label>
              <div className="space-y-1.5">
                {quickTemplates.map((template, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectTemplate(template)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                      customMessage === template
                        ? "bg-pink-600 text-white border-pink-500 shadow-md shadow-pink-600/30"
                        : "bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:border-pink-500/50 hover:text-pink-200"
                    }`}
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleStartChat} className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-pink-400 uppercase tracking-wider mb-1">
                  Or Type Your Message:
                </label>
                <textarea
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-pink-500 rounded-xl p-3 text-xs text-pink-100 focus:outline-none focus:ring-1 focus:ring-pink-500 transition placeholder-zinc-600"
                />
              </div>

              {/* Number Customizer Toggle */}
              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-800">
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-pink-400" />
                  <span>WhatsApp No: <strong className="text-pink-300">+1 (662) 470-9606</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingNumber(!isEditingNumber)}
                  className="text-pink-400 hover:text-pink-300 underline font-semibold cursor-pointer"
                >
                  {isEditingNumber ? "Done" : "Change"}
                </button>
              </div>

              {isEditingNumber && (
                <div className="bg-zinc-900 p-2.5 rounded-xl border border-pink-500/30 space-y-1">
                  <label className="text-[10px] text-zinc-400 block">Target WhatsApp number with country code:</label>
                  <input
                    type="text"
                    value={targetNumber}
                    onChange={(e) => setTargetNumber(e.target.value)}
                    placeholder="16624709606"
                    className="w-full bg-black border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-pink-200 focus:border-pink-500 focus:outline-none"
                  />
                </div>
              )}

              {/* Send Button */}
              <button
                id="whatsapp-send-chat-btn"
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 via-pink-500 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-pink-600/30 border border-pink-400/30 flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-98"
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
                className="text-[11px] text-zinc-400 hover:text-pink-300 font-medium inline-flex items-center gap-1 cursor-pointer transition"
              >
                <QrCode className="w-3.5 h-3.5 text-pink-400" />
                {showQR ? "Hide QR Code" : "Scan QR Code on Mobile"}
              </button>

              {showQR && (
                <div className="mt-2 bg-white p-3 rounded-2xl border border-pink-500/40 inline-block text-center space-y-1 shadow-md">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(`https://wa.me/${targetNumber.replace(/[^0-9]/g, "")}`)}`}
                    alt="WhatsApp QR Code"
                    className="w-28 h-28 mx-auto rounded-lg"
                  />
                  <span className="text-[10px] text-zinc-700 font-bold block">Scan to chat on WhatsApp</span>
                </div>
              )}
            </div>

          </div>

          {/* Footer Note */}
          <div className="bg-black p-3 text-[10px] text-pink-400/80 text-center border-t border-zinc-900 flex items-center justify-center gap-1 font-mono">
            <Lock className="w-3 h-3 text-pink-500" />
            <span>End-to-end encrypted direct messaging</span>
          </div>

        </div>
      )}

      {/* FLOATING WHATSAPP TRIGGER BUTTON - PINK AND BLACK */}
      <button
        id="whatsapp-floating-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-black text-pink-400 hover:text-white p-3.5 rounded-full shadow-2xl shadow-pink-600/30 transition duration-200 flex items-center gap-2 cursor-pointer border-2 border-pink-500 hover:border-pink-400 hover:bg-zinc-900 hover:scale-105"
        aria-label="Direct WhatsApp Chat"
      >
        <div className="relative">
          <svg className="w-6 h-6 fill-current text-pink-500 group-hover:text-pink-400 transition" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full flex items-center justify-center">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-ping"></span>
          </span>
        </div>

        <span className="text-xs font-black hidden sm:inline pr-1 text-pink-400 group-hover:text-white transition">
          WhatsApp Support
        </span>
      </button>

    </div>
  );
}

// Lock component helper
function Lock({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}
