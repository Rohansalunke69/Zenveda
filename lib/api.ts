/**
 * ZenVeda API Service Layer
 * All API calls use relative URLs to avoid CORS and connection issues
 */

import axios from 'axios';

// Configure axios instance for relative URLs only
// In Next.js, API routes are served from the same origin, so we don't need baseURL
const apiClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error(`[API Error] ${message}`);
    return Promise.reject(new ApiError(message, error.response?.status || 500));
  }
);

// ============================================
// Error Handling Types & Utilities
// ============================================

export class ApiError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) return error.message;
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
}

export function getErrorStatusCode(error: unknown): number {
  if (isApiError(error)) return error.statusCode;
  return 500;
}

// ============================================
// Type Definitions
// ============================================

export interface ScanResult {
  category: string;
  value: number;
  status: 'good' | 'moderate' | 'concern';
  description: string;
  icon?: string;
}

export interface DoshaResult {
  name: string;
  percentage: number;
  description: string;
  characteristics: string[];
  color: string;
  bgColor: string;
}

export interface PlanData {
  type: '7day' | '30day';
  routine: {
    morning: Array<{ time: string; activity: string; duration: string }>;
    evening: Array<{ time: string; activity: string; duration: string }>;
  };
  food: {
    eat: string[];
    avoid: string[];
  };
  yoga: Array<{ name: string; benefits: string; duration: string }>;
}

export interface GeneratePlanResponse {
  success: boolean;
  plan: PlanData;
  message: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  qualifications: string;
  experience: number;
  clinicAddress: string;
  fee: number;
  languages: string[];
  availability: string;
  rating: number;
  reviews: number;
  verified: boolean;
  symptoms: string[];
  about: string;
  image?: string;
}

export interface AppointmentData {
  doctorId: number;
  userId: string;
  slot: {
    date: string;
    time: string;
  };
  reason?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
  redFlags: boolean;
  context?: {
    doshaType?: string;
    recentScan?: boolean;
    sleepHours?: number;
    stressLevel?: 'low' | 'medium' | 'high';
    dietType?: 'vegetarian' | 'vegan' | 'non-vegetarian' | 'mixed';
    symptomsDuration?: 'recent' | 'weeks' | 'months' | 'chronic';
    lastAssistantReplies?: string[];
  };
}

// ============================================
// API Functions
// ============================================

/**
 * Upload selfie image to backend
 */
export async function uploadSelfie(file: File): Promise<{ imageUrl: string }> {
  const formData = new FormData();
  formData.append('selfie', file);

  return apiClient.post('/api/upload-selfie', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * Analyze face from image URL
 */
export async function analyzeFace(imageUrl: string): Promise<{ results: ScanResult[] }> {
  return apiClient.post('/api/analyze-face', { imageUrl });
}

/**
 * Submit dosha quiz answers
 */
export async function submitDoshaQuiz(
  answers: Record<number, { dosha: string; score: number }>
): Promise<{ results: DoshaResult[]; primaryDosha: string }> {
  return apiClient.post('/api/dosha/submit', { answers });
}

/**
 * Generate personalized wellness plan
 */
export async function generatePlan(
  userProfile: {
    doshaResults: DoshaResult[];
    scanResults?: ScanResult[];
    preferences?: {
      planType: '7day' | '30day';
      focusAreas?: string[];
    };
  }
): Promise<GeneratePlanResponse> {
  return apiClient.post('/api/plan/generate', userProfile);
}

/**
 * Generate PDF report from scan results
 */
export async function generateReport(
  scanResults: ScanResult[],
  doshaResult?: DoshaResult
): Promise<{ pdfUrl: string }> {
  return apiClient.post('/api/report/generate', { scanResults, doshaResult });
}

/**
 * Get list of doctors with optional filters
 */
export async function getDoctors(
  filters?: {
    specialization?: string;
    rating?: number;
    distance?: number;
    symptom?: string;
  }
): Promise<{ doctors: Doctor[]; total: number }> {
  const params = new URLSearchParams();
  if (filters?.specialization) params.append('specialization', filters.specialization);
  if (filters?.rating) params.append('rating', filters.rating.toString());
  if (filters?.distance) params.append('distance', filters.distance.toString());
  if (filters?.symptom) params.append('symptom', filters.symptom);

  return apiClient.get(`/api/doctors?${params.toString()}`);
}

/**
 * Find doctors near user location based on symptoms
 */
export async function findDoctorsNearMe(
  symptoms: string[],
  location?: { lat: number; lng: number; radius?: number }
): Promise<{ doctors: Doctor[]; recommended: Doctor[] }> {
  return apiClient.post('/api/doctors/near-me', { symptoms, location });
}

/**
 * Create an appointment booking
 */
export async function createAppointment(
  appointmentData: AppointmentData
): Promise<{ appointmentId: string; status: string; message: string }> {
  return apiClient.post('/api/appointments/create', appointmentData);
}

/**
 * Chat with ZenVeda AI (Gemini-powered)
 */
export async function chatWithZenveda(
  message: string,
  context?: {
    doshaType?: string;
    recentScan?: boolean;
    previousMessages?: ChatMessage[];
    sleepHours?: number;
    stressLevel?: 'low' | 'medium' | 'high';
    dietType?: 'vegetarian' | 'vegan' | 'non-vegetarian' | 'mixed';
    symptomsDuration?: 'recent' | 'weeks' | 'months' | 'chronic';
    lastAssistantReplies?: string[];
  }
): Promise<ChatResponse> {
  return apiClient.post('/api/ai/chat', { message, context });
}

// ============================================
// Utility Functions for States
// ============================================

/**
 * Create a loading state helper
 */
export function createLoadingState<T>(setLoading: (loading: boolean) => void) {
  return {
    start: () => setLoading(true),
    stop: () => setLoading(false),
    with: async <R>(fn: () => Promise<R>): Promise<R> => {
      setLoading(true);
      try {
        return await fn();
      } finally {
        setLoading(false);
      }
    },
  };
}

// Default export with all functions
export default {
  uploadSelfie,
  analyzeFace,
  submitDoshaQuiz,
  generatePlan,
  generateReport,
  getDoctors,
  findDoctorsNearMe,
  createAppointment,
  chatWithZenveda,
};

