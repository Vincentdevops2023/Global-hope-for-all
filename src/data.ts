import { BlogPost, FAQItem, InfoSheet } from "./types";

export const ANXIETY_ARTICLES = [
  {
    id: "what-is-anxiety",
    title: "What is Anxiety?",
    subtitle: "Understanding the body's natural response to stress",
    summary: "Anxiety is a normal human emotion that everyone experiences at times. It is characterized by feelings of tension, worried thoughts, and physical changes like increased blood pressure. While healthy anxiety keeps us safe in dangerous situations, persistent, overwhelming anxiety may require supportive coping techniques.",
    sections: [
      {
        title: "Normal vs. Clinical Anxiety",
        content: "Normal anxiety is situational and temporary (such as feeling nervous before an interview). Clinical or persistent anxiety is ongoing, appears out of proportion to the actual threat, and significantly interferes with daily functioning, relationships, or work."
      },
      {
        title: "The Fight-or-Flight Response",
        content: "When confronted with a perceived stressor, the brain's amygdala triggers a cascade of adrenaline and cortisol. This increases heart rate, dilates airways, and shifts blood flow to core muscles—preparing the body to run or fight. In anxiety disorders, this system activates even when no real danger is present."
      }
    ]
  },
  {
    id: "anxiety-symptoms",
    title: "Common Symptoms of Anxiety",
    subtitle: "Recognizing physical, cognitive, and behavioral signs",
    summary: "Anxiety manifests in many different ways, often combining physical sensations with distressing cognitive patterns. Identifying these symptoms is the first step toward managing them.",
    sections: [
      {
        title: "Physical Symptoms",
        content: "These include a rapid heart rate, shallow breathing, muscle tension (especially in the jaw and shoulders), sweating, trembling, dizziness, fatigue, and gastrointestinal issues like nausea or stomach upset."
      },
      {
        title: "Cognitive & Emotional Symptoms",
        content: "Psychological indicators include persistent worry, catastrophic thinking ('expecting the worst'), irritability, difficulty concentrating, feelings of dread, and a racing mind."
      },
      {
        title: "Behavioral Symptoms",
        content: "Avoidance is the most common behavioral symptom. This means actively staying away from situations, places, or people that trigger anxious feelings, which unfortunately tends to reinforce the anxiety over time."
      }
    ]
  },
  {
    id: "causes-and-triggers",
    title: "Causes & Common Triggers",
    subtitle: "Understanding the complex roots of anxious experiences",
    summary: "Anxiety doesn't have a single cause. It is usually a complex intersection of biological, psychological, and environmental factors.",
    sections: [
      {
        title: "Biological & Genetic Factors",
        content: "Brain chemistry, genetics, and family history play a significant role. Some individuals inherit highly sensitive nervous systems that react more strongly to sensory stimuli and stress."
      },
      {
        title: "Environmental & Situational Stressors",
        content: "Major life modifications, stressful work environments, financial pressure, relationship friction, past traumatic experiences, or chronic illnesses can trigger or exacerbate anxiety."
      },
      {
        title: "Daily Triggers to Monitor",
        content: "Caffeine, lack of sleep, skipping meals (blood sugar drops), social media overstimulation, and excessive exposure to distressing news are very common daily triggers that can be modified."
      }
    ]
  },
  {
    id: "anxiety-coping",
    title: "Coping & Management Strategies",
    subtitle: "Practical, evidence-based tools for daily grounding",
    summary: "There are numerous self-guided strategies that can successfully lower baseline stress and help you navigate high-anxiety moments.",
    sections: [
      {
        title: "The 5-4-3-2-1 Grounding Technique",
        content: "A powerful tool to bring you back to the present moment. Acknowledge: 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This shifts the brain's focus away from internal worry and back to external physical reality."
      },
      {
        title: "Cognitive Reframing",
        content: "Ask yourself: 'Is this thought a fact or a feeling?' and 'What is the most likely outcome, not just the worst-case outcome?' Practice replacing automatic negative thoughts with balanced, realistic alternatives."
      },
      {
        title: "Progressive Muscle Relaxation (PMR)",
        content: "Tense and then slowly release different muscle groups, starting from your toes and working up to your forehead. This helps release the physical tension stored in the body."
      }
    ]
  },
  {
    id: "lifestyle-recommendations",
    title: "Lifestyle & Daily Habits",
    subtitle: "Building a resilient foundation for long-term mental wellness",
    summary: "Small, consistent changes in your daily routine can dramatically lower your nervous system's reactivity.",
    sections: [
      {
        title: "Restorative Sleep Hygiene",
        content: "Aim for 7-9 hours of sleep. Establish a soothing pre-sleep routine: turn off screens at least 1 hour before bed, dim lights, and keep your bedroom cool and dark."
      },
      {
        title: "Balanced Nutrition & Hydration",
        content: "Fluctuations in blood sugar can mimic anxiety symptoms. Focus on complex carbohydrates, lean proteins, healthy fats, and limit high-sugar snacks. Stay well hydrated throughout the day."
      },
      {
        title: "Gentle, Regular Movement",
        content: "Cardiovascular exercise, yoga, or even a brisk 20-minute daily walk helps burn off excess adrenaline and releases endorphins, the body's natural mood lifters."
      }
    ]
  },
  {
    id: "when-to-seek-help",
    title: "When to Seek Professional Support",
    subtitle: "Knowing when to partner with a therapist or healthcare provider",
    summary: "Self-care is powerful, but there are times when partnering with a professional is the most compassionate and effective step you can take.",
    sections: [
      {
        title: "Signs It Is Time to Seek Support",
        content: "Consider professional guidance if your anxiety is continuous for more than a few weeks, severely disrupts your work, sleep, or relationships, or if you find yourself excessively avoiding daily tasks."
      },
      {
        title: "Effective Professional Therapies",
        content: "Cognitive Behavioral Therapy (CBT) is highly regarded as one of the most effective evidence-based treatments for anxiety. Acceptance and Commitment Therapy (ACT) and mindfulness-based counseling are also exceptionally beneficial."
      }
    ]
  }
];

export const PANIC_RESOURCES = {
  explanation: {
    title: "Panic Attacks Explained",
    content: "A panic attack is a sudden episode of intense fear or extreme discomfort that peaks within minutes. It is accompanied by physical symptoms like heart palpitations, chest pain, shortness of breath, and trembling. While a panic attack feels terrifying and can mimic serious physical conditions, it is fundamentally harmless and will pass."
  },
  triggers: [
    { name: "Phobic Triggers", description: "Exposure to specific feared objects or situations (e.g., crowds, tight spaces)." },
    { name: "Hyperventilation", description: "Shallow, fast breathing which alters carbon dioxide levels and mimics physiological emergency states." },
    { name: "Sensory Overload", description: "Bright lights, loud noises, crowded malls, or continuous high-stress environments." },
    { name: "Intense Physical Sensations", description: "Misinterpreting a normal physical change (like a skipped heartbeat or sudden heat) as a sign of catastrophe." }
  ],
  techniques: [
    {
      name: "Box Breathing (4-4-4-4)",
      description: "Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. Repeat for 3-5 cycles to regulate oxygen/CO2 balance and calm the vagus nerve.",
      image: "box_breathing"
    },
    {
      name: "The Breath Anchor",
      description: "Inhale slowly through the nose, expanding the belly (not the chest). Exhale through the mouth with pursed lips, making the exhale twice as long as the inhale.",
      image: "breath_anchor"
    },
    {
      name: "Physical Cold Reset",
      description: "Splash ice-cold water on your face or hold an ice cube in your hand. The intense sensory stimulus triggers the mammalian dive reflex, rapidly lowering heart rate and breaking panic cognitive loops.",
      image: "cold_reset"
    }
  ],
  faqs: [
    {
      question: "Am I having a heart attack or a panic attack?",
      answer: "A heart attack typically features radiating crushing chest pressure, often spreading to the left arm or jaw, worsening with exertion. A panic attack features sharp localized chest discomfort, rapid shallow breathing, peaks in 10 minutes, and is often accompanied by a sense of escape-seeking. If you have any doubt, always seek a professional medical evaluation to rule out cardiac issues."
    },
    {
      question: "How long does a panic attack typically last?",
      answer: "Most panic attacks reach peak intensity within 10 minutes and completely subside within 20 to 30 minutes. The residual fatigue can last several hours as adrenaline leaves your body."
    },
    {
      question: "Can you pass out during a panic attack?",
      answer: "Fainting is usually caused by a drop in blood pressure. During a panic attack, your heart rate and blood pressure actually rise, meaning fainting is extremely rare. While you might feel dizzy or lightheaded due to shallow breathing, you are highly unlikely to pass out."
    }
  ]
};

export const INTIMACY_RESOURCES = [
  {
    title: "Emotional Intimacy & Connection",
    subtitle: "The foundation of healthy relationships",
    content: "Emotional intimacy is the experience of feeling vulnerable, understood, and deeply connected to your partner. It involves sharing your innermost fears, hopes, and secrets, knowing they are safe and respected.",
    tips: [
      "Practice active listening: Give full attention without planning your response.",
      "Check-in daily: Spend 10 distraction-free minutes discussing non-operational topics (feelings, dreams, stressors).",
      "Express genuine gratitude: Detail exactly what you appreciate about your partner."
    ]
  },
  {
    title: "Compassionate Communication Skills",
    subtitle: "Navigating disagreements with empathy and respect",
    content: "Healthy relationships don't avoid conflict; they navigate it with constructive tools. Communication is not about 'winning' an argument, but understanding each other's perspectives.",
    tips: [
      "Use 'I' statements: Say 'I feel overwhelmed when...' instead of 'You never help and always...'.",
      "Take a conscious pause: If emotions are too high, pause for 20 minutes to calm down before continuing.",
      "Validate their feelings: Validate that their perspective makes sense, even if you disagree with the conclusion."
    ]
  },
  {
    title: "Managing Anxiety in Relationships",
    subtitle: "Navigating worry together without friction",
    content: "Anxiety can sometimes manifest in relationships as a need for constant reassurance, overthinking interactions, or avoiding joint activities. Understanding this helps partners respond with patience rather than frustration.",
    tips: [
      "Co-regulate: When one partner is anxious, practicing deep breathing together can calm both nervous systems.",
      "Set boundary guidelines: Establish clear agreements about personal space, response times, and shared responsibilities.",
      "Distinguish person from anxiety: Remember, 'My partner is struggling with anxious thoughts,' not 'My partner is trying to be difficult.'"
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "7 Small Self-Care Habits That Help Reduce Daily Stress",
    slug: "self-care-habits-reduce-stress",
    category: "Self-Care",
    excerpt: "Integrating tiny moments of self-care into your busy workday can keep your nervous system balanced and prevent emotional fatigue.",
    content: `In our hyper-connected world, we often think of self-care as a luxury or a full weekend event. However, the most effective self-care consists of small, repeatable habits integrated seamlessly into your daily routine.

### 1. The 90-Second Tech Detox
Every 2 hours, step away from all screens. Close your eyes, inhale slowly, and let your hands rest flat. This resets your eyes and breaks the continuous cognitive processing cycle.

### 2. Radical Hydration
Keep a thermal bottle with you. Dehydration triggers cortisol production, which mimics physical stress. Drink structured sips of water throughout the morning.

### 3. Mindful Transitions
Before starting your car or joining a virtual meeting, sit in silence for 30 seconds. Acknowledge that you are moving from one task to another, letting go of the previous context.

Implementing just two of these micro-habits can successfully lower your baseline heart rate and keep you centered.`,
    author: "Elena Vasquez, Wellness Specialist",
    date: "July 15, 2026",
    readTime: "4 min read",
    tags: ["self-care", "stress management", "mindfulness", "habits"],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "blog-2",
    title: "How to Build Emotional Intimacy in Times of Anxiety",
    slug: "emotional-intimacy-anxiety",
    category: "Healthy Relationships",
    excerpt: "When anxiety enters a relationship, emotional intimacy is often the first to suffer. Here is how to rebuild trust and stay close.",
    content: `Anxiety can build invisible walls in relationships. One partner might withdraw to hide their worry, while the other might feel shut out or overly responsible. Overcoming this requires an active commitment to vulnerability.

### Sharing Your Worry Map
Sit down when both of you are calm. Share your 'Worry Map'—what specifically makes you anxious, what your physical cues are (such as a quiet voice or tense shoulders), and what supportive response feels best.

### The Power of Co-Regulation
Your nervous systems are wired to affect one another. If one partner is in a high-anxiety state, sitting close, making gentle eye contact, or sharing slow, synchronized breathing can assist in calming both parties.

### Separate the Person from the Condition
Ensure you use language that separates your partner from their anxious patterns. Say, "I see the anxiety is very loud today" instead of "You are being overly anxious." This prevents defensiveness and builds a team dynamic.`,
    author: "Dr. Marcus Thorne, LMFT",
    date: "June 28, 2026",
    readTime: "6 min read",
    tags: ["relationship wellness", "intimacy", "communication", "anxiety support"],
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "blog-3",
    title: "The Neurobiology of Panic: Why Your Brain Thinks It's in Danger",
    slug: "neurobiology-of-panic-attacks",
    category: "Panic Disorder",
    excerpt: "Understanding the physical 'wiring' of a panic attack is one of the most powerful tools for taking its fear away.",
    content: `When you have a panic attack, your mind is convinced you are in imminent physical danger. However, understanding the physiology of what is occurring can help you ride out the wave with less distress.

### The Amygdala Highjack
Your amygdala is the security alarm of your brain. During panic, it sends a sudden, false signal of danger to the autonomic nervous system. This causes an immediate release of adrenaline.

### The Physical Sensations Explained
- **Shortness of breath:** Your lungs are trying to bring in more oxygen to feed your muscles to fight or run.
- **Chest tightness:** Your chest wall muscles tense up to support this fast, heavy respiration.
- **Dizziness:** High levels of oxygen from rapid breathing constrict small blood vessels in the head temporarily.

### The Golden Rule of Panic
A panic attack is simply an emergency drill that your nervous system is running by mistake. It cannot hurt you. Repeating this factual truth during a panic attack helps deactivate the amygdala threat signal.`,
    author: "Sarah Lindqvist, Neuroscientist",
    date: "May 10, 2026",
    readTime: "5 min read",
    tags: ["panic disorder", "education", "biology", "panic attacks"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "blog-4",
    title: "Practical Mindfulness: Overcoming the Worry Loop",
    slug: "practical-mindfulness-overcoming-worry",
    category: "Mindfulness",
    excerpt: "Stuck in a repetitive circle of worrisome thoughts? These three mindfulness exercises are designed to break the loop.",
    content: `We've all been there: a single worrisome thought starts a chain reaction that keeps you awake at night or distracted during the day. This is a cognitive 'worry loop'.

### 1. Labeling Your Thoughts
Instead of getting caught in the story of the worry, simply label it. Say to yourself, "I am having the thought that I might fail." This creates a small but critical distance between you and the thought.

### 2. The Anchor Touch
Find a physical object you carry (a ring, a key, or a smooth pebble). When your mind wanders, touch this object and focus completely on its texture, weight, and temperature for 10 seconds.

### 3. Thought Streaming
Imagine your thoughts are leaves floating down a gentle stream. Place each worrisome thought on a leaf and watch it float out of view. You don't have to stop the thoughts—you just have to let them pass.`,
    author: "Elena Vasquez, Wellness Specialist",
    date: "April 18, 2026",
    readTime: "5 min read",
    tags: ["mindfulness", "worry loop", "cognitive tools"],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400"
  }
];

export const GENERAL_FAQS: FAQItem[] = [
  {
    question: "Is Global Hope For All an emergency clinic?",
    answer: "No. Global Hope For All is strictly an educational, wellness support, and preventative health portal. We do not provide crisis intervention or emergency medical treatment. If you are experiencing a life-threatening emergency, please call 911 (or your local emergency services) or visit the nearest emergency room immediately.",
    category: "general"
  },
  {
    question: "How do I download the medical and educational resource sheets?",
    answer: "Downloadable guides and information sheets are available in your Patient Information Portal once you register a free account. You can log in and visit the 'Downloadable Guides' section to obtain PDF resource sheets.",
    category: "general"
  },
  {
    question: "Is my registration data secure and confidential?",
    answer: "Yes, your privacy is our absolute priority. All registration, profiles, and appointment bookings on this portal are handled with industry-standard encryption. We strictly comply with general privacy and accessibility standards (WCAG) to ensure security and trust.",
    category: "general"
  },
  {
    question: "How do I connect with the AI Wellness Companion?",
    answer: "The AI Wellness Companion is accessible via the Chat bubble at the bottom of the page or through the Patient Portal. It is an educational tool designed to answer questions, suggest breathing exercises, and explain coping strategies. It is not a therapist and does not replace medical advice.",
    category: "anxiety"
  }
];

export const INFO_SHEETS: InfoSheet[] = [
  {
    id: "sheet-anxiety-basics",
    title: "Anxiety Management Quick Start Guide",
    description: "A compact 2-page cheat sheet summarizing physical grounding, box breathing, and lifestyle checklist items.",
    fileSize: "1.2 MB PDF",
    category: "Anxiety Education"
  },
  {
    id: "sheet-panic-rescue",
    title: "Panic Attack Rescue Protocol",
    description: "An emergency pocket-sized checklist of actionable physical reset steps, breathing guidelines, and self-talk reassurance.",
    fileSize: "850 KB PDF",
    category: "Panic Disorder"
  },
  {
    id: "sheet-intimacy-workbook",
    title: "Compassionate Partner Communication workbook",
    description: "A workbook containing communication templates, structured 'I-statement' sheets, and shared connection exercises.",
    fileSize: "2.4 MB PDF",
    category: "Healthy Intimacy"
  }
];
