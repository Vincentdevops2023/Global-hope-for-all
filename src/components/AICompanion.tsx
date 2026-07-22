import { useState, useRef, useEffect, FormEvent } from "react";
import { MessageSquare, Send, Sparkles, X, Heart, ShieldAlert, ChevronDown, Smile } from "lucide-react";
import { ChatMessage } from "../types";
import { motion, AnimatePresence } from "motion/react";

const QUICK_SUGGESTIONS = [
  { label: "🚨 Calm a Panic Attack", prompt: "I am having a panic attack right now. Please guide me through an immediate calming exercise." },
  { label: "🧘 Quick Breathing Practice", prompt: "Explain a breathing exercise I can do right now to help lower my rapid breathing." },
  { label: "💬 Relationship Comfort", prompt: "My partner has anxiety and I want to support them. What are 3 communication tips we can use?" },
  { label: "💡 Coping with Anxiety", prompt: "Give me some daily mindfulness habits to manage situational work stress." }
];

export default function AICompanion({ isFloating = true, onClose }: { isFloating?: boolean; onClose?: () => void }) {
  const [isOpen, setIsOpen] = useState(!isFloating);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hello! I am your AI Wellness Companion. I am here to provide evidence-based educational insights, coping resources, breathing guidance, and a supportive presence. \n\n*Note: I am not a therapist or doctor, and I do not provide clinical diagnosis or emergency crisis response. If you are in immediate danger, please contact 911 or 988.*",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<{ isDemo: boolean; message: string } | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    const userMsg: ChatMessage = {
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setErrorStatus(null);

    try {
      // Map state messages to API expected format
      const historyToSend = messages.slice(1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyToSend
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      const botMsg: ChatMessage = {
        role: "model",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.warn("API Error, falling back to educational response helper", err);
      
      // Educational demo fallback responses if the user has not configured the API key yet
      let fallbackText = "I understand you are seeking wellness guidance. Please remember to consult a professional healthcare provider for medical concerns. Let's practice a grounding technique: Focus on your posture, feel the floor beneath you, and take a deep breath in through your nose for 4 seconds, then out through your lips for 6 seconds.";
      
      const lowerText = textToSend.toLowerCase();
      if (lowerText.includes("panic") || lowerText.includes("panic attack")) {
        fallbackText = `**Emergency Warning:** If this is a life-threatening health crisis, please dial 911 or contact immediate emergency care. 
        
If you are experiencing severe situational panic, let's practice the **5-4-3-2-1 Grounding Method**:
1. 💡 **Acknowledge 5 things you can see** around you.
2. 🤝 **Acknowledge 4 things you can touch** right now.
3. 👂 **Acknowledge 3 things you can hear** in this moment.
4. 🌸 **Acknowledge 2 things you can smell**.
5. 👅 **Acknowledge 1 thing you can taste**.

This exercise draws your cognitive focus away from anxious thoughts and anchors your awareness safely in the physical present. You are safe, this panic is temporary, and it will pass.`;
      } else if (lowerText.includes("breath") || lowerText.includes("breathing")) {
        fallbackText = `Breathing exercises are highly effective for resetting your autonomic nervous system. Let's do **Box Breathing** together:
        
1. 💨 **Exhale** all the air from your lungs.
2. 👃 **Inhale slowly** through your nose for **4 seconds**.
3. 🛑 **Hold your breath** gently for **4 seconds**.
4. 🌬️ **Exhale slowly** through pursed lips for **4 seconds**.
5. 🛑 **Hold your lungs empty** for **4 seconds**.

*Repeat this pattern 3 to 4 times. Focus completely on the counting.*`;
      } else if (lowerText.includes("relationship") || lowerText.includes("intimacy") || lowerText.includes("partner")) {
        fallbackText = `Managing relationship connection alongside anxiety requires mutual compassion. Here are 3 trusted communication techniques:
        
1. **Use 'I' Statements:** Share from your perspective rather than pointing fingers (e.g., *"I feel overwhelmed when we discuss plans late at night"* instead of *"You always bring up topics at the worst times"*).
2. **The 10-Minute Daily Connection:** Commit to 10 minutes of distraction-free sharing where you do not discuss chores, schedules, or work—just your emotions and thoughts.
3. **Practice Co-Regulation:** When a partner is anxious, sitting in contact and synchronizing your breathing is a powerful non-verbal way to build safety together.`;
      }

      setErrorStatus({
        isDemo: true,
        message: "Demo Mode Active (API key can be loaded in Secrets panel to connect live Gemini AI)."
      });

      const botMsg: ChatMessage = {
        role: "model",
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const chatContainer = (
    <div id="ai-chat-card" className="flex flex-col glass-panel-heavy border-white/60 rounded-3xl shadow-2xl overflow-hidden h-[500px] w-full md:w-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-blue-950/85 via-blue-900/85 to-teal-800/85 text-white border-b border-white/20">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/10 rounded-lg">
            <Sparkles className="w-4.5 h-4.5 text-teal-300" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Companion</h3>
            <p className="text-[10px] text-teal-200">Supporting hope & wellness education</p>
          </div>
        </div>
        {isFloating && (
          <button 
            id="close-chat"
            onClick={() => setIsOpen(false)} 
            className="p-1 hover:bg-white/10 rounded-lg transition"
            aria-label="Minimize Chat"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Warning banner */}
      <div className="bg-amber-50/70 backdrop-blur-xs border-b border-amber-200/50 px-3 py-1.5 flex items-start gap-1.5 text-[11px] text-amber-800">
        <Heart className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5 fill-amber-600" />
        <span>For educational support. If in immediate danger, call 911 or 988.</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-transparent">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-950/80 backdrop-blur-xs text-white border border-white/20 rounded-tr-none' 
                  : 'bg-white/40 backdrop-blur-md text-slate-800 border border-white/60 rounded-tl-none whitespace-pre-line'
              }`}
            >
              {msg.text}
              <div className={`text-[9px] mt-1.5 ${msg.role === 'user' ? 'text-blue-200' : 'text-slate-400'} text-right`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length < 3 && (
        <div className="px-3 py-2 bg-white/25 backdrop-blur-md border-t border-white/30 overflow-x-auto flex gap-1.5 scrollbar-thin">
          {QUICK_SUGGESTIONS.map((s, i) => (
            <button
              id={`quick-suggest-${i}`}
              key={i}
              onClick={() => handleSendMessage(s.prompt)}
              className="whitespace-nowrap bg-white/30 hover:bg-white/50 backdrop-blur-xs border border-white/50 hover:border-white text-slate-700 hover:text-slate-900 text-xs py-1.5 px-3 rounded-full transition duration-150 shadow-sm shrink-0 font-medium cursor-pointer"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Input container */}
      <form onSubmit={handleFormSubmit} className="p-3 bg-white/25 backdrop-blur-md border-t border-white/30 flex gap-2">
        <input
          id="chat-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about symptoms, breathing exercises..."
          className="flex-1 bg-white/40 focus:bg-white/70 border border-white/60 focus:border-teal-500 rounded-xl px-3.5 py-2 text-sm focus:outline-none transition duration-150 text-slate-800 placeholder-slate-400 backdrop-blur-xs"
          disabled={isLoading}
        />
        <button
          id="send-message-btn"
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white p-2.5 rounded-xl transition duration-150 shadow-md shrink-0 cursor-pointer"
          disabled={isLoading || !inputValue.trim()}
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Demo status note */}
      {errorStatus?.isDemo && (
        <div className="bg-teal-50/70 backdrop-blur-xs text-[10px] text-teal-800 px-3 py-1.5 text-center border-t border-teal-200/50">
          ✨ Grounded Educational responses (Simulated Guidance)
        </div>
      )}
    </div>
  );

  if (!isFloating) {
    return chatContainer;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            {chatContainer}
          </motion.div>
        ) : (
          <motion.button
            id="open-chat-bubble"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-tr from-blue-900 via-teal-800 to-teal-600 hover:from-blue-950 hover:to-teal-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative group"
            aria-label="Open AI Companion"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none font-medium">
              Talk with AI Companion ✨
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
