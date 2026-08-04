export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  category: 'preventive' | 'cosmetic' | 'restorative' | 'orthodontics' | 'surgical';
  duration: string;
  estimatedCost: string;
  benefits: string[];
  procedureSteps: string[];
  faqs: { question: string; answer: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  treatment: string;
  review: string;
  date: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'equipment' | 'transformations' | 'care';
  imageUrl: string;
  beforeUrl?: string; // For smile transformations
  afterUrl?: string;
  description: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  treatment: string;
  message: string;
}

export interface ClinicStat {
  label: string;
  value: number;
  suffix: string;
  description: string;
  iconName: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
