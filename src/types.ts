export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
  contactMethod: 'phone' | 'email';
  status: 'Confirmed' | 'Pending' | 'Completed';
  createdAt: string;
}

export interface PatientProfile {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  username: string;
}

export interface FurtherReadingLink {
  title: string;
  source: string; // e.g. "NIMH Clinical Guidelines", "Global Hope For All Guide", "PubMed Study"
  url: string;
  isExternal?: boolean;
  targetSection?: string; // App section like "panic-disorder", "shop", "anxiety-education"
  description?: string;
}

export interface KeywordHighlight {
  keyword: string;
  definition: string;
  targetSection?: string;
  externalUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Anxiety Education' | 'Panic Disorder' | 'Stress Management' | 'Mindfulness' | 'Healthy Relationships' | 'Emotional Wellness' | 'Self-Care' | 'Sleep & Wellness';
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  keywords?: KeywordHighlight[];
  furtherReading?: FurtherReadingLink[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'anxiety' | 'panic' | 'relationship';
}

export interface InfoSheet {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: 'Supplements' | 'Herbal Teas & Infusions' | 'Sensory & Grounding' | 'Journals & Workbooks';
  badge?: string;
  image: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  ingredients?: string;
  usageInstructions?: string;
  safetyNote?: string;
  inStock: boolean;
  isBestSeller?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  roleOrLocation: string;
  rating: number; // 5
  category: 'Anxiety Care' | 'Panic Recovery' | 'Couples Intimacy' | 'Supplements & Shop' | 'General Consultation';
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  avatarUrl?: string;
  productName?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderRecord {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  shippingDetails: {
    name: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  paymentMethod: string;
  date: string;
  status: string;
}

