import { BlogPost, FAQItem, InfoSheet, Product } from "./types";


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

export const ANXIETY_PRODUCTS: Product[] = [
  {
    id: "magnesium-calm-complex",
    name: "Magnesium L-Threonate & Glycinate Calm Complex",
    slug: "magnesium-calm-complex",
    price: 34.99,
    originalPrice: 42.00,
    rating: 4.9,
    reviewCount: 184,
    category: "Supplements",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600",
    shortDescription: "High-absorption dual-form magnesium engineered to cross the blood-brain barrier, supporting neural tranquility and muscle tension relief.",
    description: "Our Calm Complex combines clinical-grade Magnesium L-Threonate and Magnesium Glycinate with Vitamin B6 (P5P). Formulated to promote cognitive calm, alleviate somatic restfulness, and encourage restorative sleep without morning grogginess.",
    benefits: [
      "Supports neural synaptic plasticity & brain clarity",
      "Encourages muscle relaxation & eases physical tension",
      "High bioavailability with zero digestive discomfort",
      "Non-GMO, Gluten-Free, and Vegan certified"
    ],
    ingredients: "Magnesium L-Threonate (1,000mg), Magnesium Glycinate (400mg), Pyridoxal-5-Phosphate (Vitamin B6 - 10mg), BioPerine® Black Pepper Extract.",
    usageInstructions: "Take 2 capsules nightly with warm water 30-45 minutes before sleep, or as directed by your healthcare professional.",
    safetyNote: "Consult a healthcare provider before use if pregnant, nursing, or taking blood pressure medication. Keep out of reach of children.",
    inStock: true,
    isBestSeller: true
  },
  {
    id: "l-theanine-gaba-synergy",
    name: "L-Theanine & GABA Synergy Acute Calm Formula",
    slug: "l-theanine-gaba-synergy",
    price: 29.99,
    originalPrice: 36.00,
    rating: 4.8,
    reviewCount: 142,
    category: "Supplements",
    badge: "Fast Acting",
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=600",
    shortDescription: "Fast-acting chewable amino acid blend providing alpha-wave brainwave encouragement and acute stress buffering without drowsiness.",
    description: "Formulated with patented Suntheanine® L-Theanine, PharmaGABA®, and Lemon Balm extract. Promotes calm focus within 20-30 minutes, ideal for high-stress workday moments, public speaking anticipation, or acute nervous tension.",
    benefits: [
      "Promotes calming alpha brainwave activity",
      "Buffers cortisol response during acute stress",
      "Drowsiness-free daytime mental clarity",
      "Third-party lab tested for purity & potency"
    ],
    ingredients: "Suntheanine® L-Theanine (200mg), PharmaGABA® (100mg), Lemon Balm Extract (150mg), Holy Basil (100mg).",
    usageInstructions: "Chew or dissolve 1-2 tablets as needed during times of elevated stress or anticipatory anxiety. Maximum 4 per day.",
    safetyNote: "Do not exceed recommended dose. May cause mild relaxation; use caution when operating heavy machinery.",
    inStock: true,
    isBestSeller: true
  },
  {
    id: "ashwagandha-rhodiola-adaptogen",
    name: "Ashwagandha KSM-66 & Rhodiola Organic Adaptogen Blend",
    slug: "ashwagandha-rhodiola-adaptogen",
    price: 32.50,
    originalPrice: 39.00,
    rating: 4.9,
    reviewCount: 210,
    category: "Supplements",
    badge: "Clinically Studied",
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=600",
    shortDescription: "Full-spectrum KSM-66® organic ashwagandha combined with standardized Rhodiola Rosea to rebalance adrenal exhaustion and systemic stress.",
    description: "Daily adaptogenic support for chronic burnout, nervous fatigue, and hormonal cortisol spikes. Helps modulate the HPA-axis (hypothalamic-pituitary-adrenal) for steady emotional resilience and mental stamina over time.",
    benefits: [
      "Clinically shown to lower serum cortisol levels",
      "Sustains emotional stamina without jitters",
      "Supports healthy thyroid and adrenal function",
      "100% USDA Organic certified"
    ],
    ingredients: "Organic KSM-66® Ashwagandha Root Extract (600mg, 5% Withanolides), Rhodiola Rosea Extract (200mg, 3% Rosavins), Black Pepper Extract.",
    usageInstructions: "Take 1 capsule twice daily with meals (morning and lunch) for at least 30 consecutive days for optimal benefits.",
    safetyNote: "Not recommended for individuals with autoimmune thyroid conditions unless advised by a physician.",
    inStock: true
  },
  {
    id: "chamomile-passionflower-tea",
    name: "Organic Chamomile, Passionflower & Lemon Balm Tea Blend",
    slug: "chamomile-passionflower-tea",
    price: 18.99,
    rating: 4.9,
    reviewCount: 96,
    category: "Herbal Teas & Infusions",
    badge: "100% Organic",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    shortDescription: "Hand-blended loose leaf botanical infusion designed to ease nervous stomach tightness and soothe evening racing thoughts.",
    description: "Crafted with whole-flower Egyptian Chamomile, Organic Passionflower, Lemon Balm leaf, and Lavender buds. Naturally caffeine-free and rich in botanical essential oils that encourage parasympathetic nervous system tone.",
    benefits: [
      "Soothes nervous digestive tightness & nausea",
      "Encourages deep parasympathetic relaxation",
      "100% Caffeine-free relaxing evening ritual",
      "Includes reusable stainless steel tea infuser"
    ],
    ingredients: "Organic Chamomile Flowers, Organic Passionflower Herb, Organic Lemon Balm, Organic Lavender Buds, Organic Oat Straw.",
    usageInstructions: "Steep 1 tablespoon in 8 oz of boiling water for 7-10 minutes. Sip slowly while practicing 4-7-8 breathing.",
    safetyNote: "Contains chamomile; avoid if allergic to ragweed or plants in the Asteraceae family.",
    inStock: true
  },
  {
    id: "weighted-grounding-lap-pad",
    name: "Deep Pressure Weighted Calming Grounding Lap Pad (7 lbs)",
    slug: "weighted-grounding-lap-pad",
    price: 44.99,
    originalPrice: 54.99,
    rating: 4.8,
    reviewCount: 128,
    category: "Sensory & Grounding",
    badge: "Somatic Tool",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=600",
    shortDescription: "7lb weighted lap pad with ultra-soft bamboo velvet cover providing proprioceptive sensory input to instantly calm panic spikes.",
    description: "Designed for desk work, reading, or acute panic recovery. Deep Touch Pressure (DTP) technology triggers the brain's release of serotonin and endorphins while easing restless legs and racing heart rate.",
    benefits: [
      "Provides targeted proprioceptive sensory grounding",
      "Hypoallergenic non-toxic micro-glass beads",
      "Removable, washable organic bamboo velvet cover",
      "Portable 20x24 inch size fits in tote bags"
    ],
    usageInstructions: "Place over lap, shoulders, or chest while sitting or resting during moments of anxiety or intense focus work.",
    safetyNote: "For adult and teenager use. Do not cover face or restrict airway.",
    inStock: true
  },
  {
    id: "lavender-bergamot-rollon",
    name: "Lavender & Bergamot Botanical Aromatherapy Roll-On",
    slug: "lavender-bergamot-rollon",
    price: 16.50,
    rating: 4.7,
    reviewCount: 88,
    category: "Sensory & Grounding",
    badge: "Essential Oil",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    shortDescription: "Organic therapeutic-grade aromatherapy oil roller for instant olfactory stimulation and sensory grounding during panic episodes.",
    description: "Formulated with pure Bulgarian Lavender, Italian Bergamot (FCF), Ylang Ylang, and Organic Golden Jojoba Carrier Oil. Compact stainless steel roller ball for discrete application at pulse points.",
    benefits: [
      "Instant olfactory neural pathway stimulation",
      "Convenient pocket-sized leakproof design",
      "Pre-diluted in organic jojoba for direct skin safety",
      "Free of synthetic fragrances, parabens, and phthalates"
    ],
    usageInstructions: "Roll generously onto wrist pulse points, temples, or palm centers. Cup hands over nose and inhale deeply 5 times.",
    safetyNote: "Perform a small skin patch test before full use. For external aromatic use only.",
    inStock: true
  },
  {
    id: "cbt-anxiety-guided-journal",
    name: "Daily Anxiety & Panic Symptom Tracker CBT Guided Journal",
    slug: "cbt-anxiety-guided-journal",
    price: 22.00,
    originalPrice: 28.00,
    rating: 5.0,
    reviewCount: 156,
    category: "Journals & Workbooks",
    badge: "Clinical Workbook",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    shortDescription: "90-day structured cognitive behavioral therapy (CBT) journal with daily mood charts, trigger logs, and grounding exercises.",
    description: "Spiral-bound hardback journal created by licensed counselors. Includes daily 5-minute morning prompts, panic log templates, cognitive thought-reframing worksheets, and weekly progress charts.",
    benefits: [
      "Structured CBT thought-challenging framework",
      "Track physical triggers, caffeine, & sleep correlation",
      "High-quality lay-flat binding with ribbon bookmark",
      "Includes 12 panic safety wallet cards"
    ],
    usageInstructions: "Complete 5 minutes every morning to set intentions, and log high-stress moments as they occur to discover personal triggers.",
    inStock: true,
    isBestSeller: true
  },
  {
    id: "tactile-brass-fidget-coin",
    name: "Tactile Brass Grounding Fidget Coin & Worry Ring Set",
    slug: "tactile-brass-fidget-coin",
    price: 24.99,
    rating: 4.8,
    reviewCount: 74,
    category: "Sensory & Grounding",
    badge: "Tactile Anchor",
    image: "https://images.unsplash.com/photo-1611591475281-b1c970f759a7?auto=format&fit=crop&q=80&w=600",
    shortDescription: "Heavy solid brass coin with textured concentric ridges and quiet spinning ring designed for subtle sensory redirection in public.",
    description: "Physical sensory focus tools engineered to occupy restless fingers and redirect hyper-vigilant attention during meetings, public transit, or crowded environments.",
    benefits: [
      "Solid brass weighted tactile grounding sensation",
      "Silent dual-spin bearing mechanism",
      "Discrete anti-anxiety fidget tool",
      "Includes protective velvet travel pouch"
    ],
    usageInstructions: "Hold the coin between thumb and forefinger, tracing the concentric ridges when feeling restless or anxious.",
    inStock: true
  }
];

