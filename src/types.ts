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
