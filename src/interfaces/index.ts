// ============================================
// AUTH INTERFACES
// ============================================

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  name?: string; // Keep for backward compatibility
  avatar?: string;
  role: string;
  phone?: string;
  gender?: string | null;
  dateOfBirth?: string | null;
  country?: string | null;
  city?: string | null;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isActive?: boolean;
  lastLogin?: string;
  metadata?: Record<string, any>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean;
}


