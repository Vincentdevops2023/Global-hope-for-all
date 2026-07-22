import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to prevent crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System instruction for the AI Wellness Educator
const wellnessSystemInstruction = `
You are the AI Wellness Educator for "Global Hope For All".
Your primary function is to support mental wellness, anxiety education, panic recovery, and relationship wellness by providing evidence-based, supportive, calm, and trusted educational information.

IMPORTANT RULES:
1. YOU ARE NOT A REPLACEMENT FOR PROFESSIONAL MEDICAL CARE, DIAGNOSIS, OR TREATMENT.
2. NEVER DIAGNOSE the user or prescribe treatments or medications.
3. FOR CRISIS or EMERGENCIES (e.g., suicide, self-harm, severe physical distress), kindly but firmly direct the user to immediate emergency services or a crisis hotline (e.g., call 911 or 988 in the US). Do not try to solve emergency crises yourself.
4. Keep your tone compassionate, reassuring, grounding, and factual.
5. Provide helpful wellness tips, coping strategies, breathing exercises, and emotional wellness education.
6. Mention that the content is for informational purposes and suggest consulting a qualified healthcare professional.
`;

// AI API route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGemini();
    
    // Format history for chat
    // Our client might send history as array of { role: 'user' | 'model', text: string }
    // We can start a chat and send the message
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: wellnessSystemInstruction,
        temperature: 0.7,
      },
      history: history ? history.map((h: any) => ({
        role: h.role,
        parts: [{ text: h.text }],
      })) : [],
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: error.message || "An unexpected error occurred during processing.",
      isDemoMode: !process.env.GEMINI_API_KEY,
    });
  }
});

// Mock/simulated appointments store in-memory (per server instance for API demo, client will also store in localStorage for persistence)
let appointments: any[] = [];
app.post("/api/appointments", (req, res) => {
  const { name, email, phone, date, time, reason, contactMethod } = req.body;
  if (!name || !email || !date || !time) {
    return res.status(400).json({ error: "Missing required booking fields" });
  }
  const newAppointment = {
    id: "APT-" + Date.now(),
    name,
    email,
    phone,
    date,
    time,
    reason,
    contactMethod,
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

// Setup Vite middleware or serve static files
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files server mounted.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Global Hope For All backend server is running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server:", err);
});
