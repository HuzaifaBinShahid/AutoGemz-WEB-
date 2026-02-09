import React from "react";

// ============================================
// AUTH INTERFACES
// ============================================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
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

// ============================================
// PAYMENT INTERFACES
// ============================================

export interface CreatePaymentData {
  amount: number;
  description: string;
}

export interface Payment {
  id: string;
  amount: number;
  status: "pending" | "completed" | "failed" | "paid" | "in_process";
  date: string;
  description: string;
  carName?: string;
  carImage?: string;
  transactionId?: string;
  type?: "payable" | "return";
}

// ============================================
// UI INTERFACES
// ============================================

export interface UIState {
  theme: "light" | "dark";
  sidebarOpen: boolean;
}

// ============================================
// COMPONENT INTERFACES
// ============================================

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: string | React.ReactNode;
  rightIcon?: string | React.ReactNode;
  colSpan?: 1 | 2;
  darkMode?: boolean;
  lightMode?: boolean;
  labelPosition?: "left" | "top";
}

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  leftIcon?: string;
  rightIcon?: string;
  isLoading?: boolean;
}

// ============================================
// FORM INTERFACES
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ProfileFormData {
  name: string;
  email: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// ============================================
// BUSINESS INTERFACES
// ============================================

export interface Service {
  id: string;
  title: string;
  description: string;
  price?: number;
}

export interface BlogPost {
  id: string;
  title?: string;
  carName?:string;
  excerpt?: string;
  content?: string;
  author?: string;
  date?: string;
  image?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  date: string;
}

// ============================================
// AUCTION INTERFACES
// ============================================

export interface AuctionCar {
  id: string;
  carName: string;
  year: string;
  mileage: string;
  image: string;
  status: "active" | "won" | "lost" | "scheduled" | "ended" | "outbid";
  currentBid?: number;
  startPrice?: number;
  winningBid?: number;
  yourBid?: number;
  scheduleBid?: number;
  bidderCount?: number;
  timer?: string;
  badge?: "WINNER" | "LOST" | "OUTBID";
}

// ============================================
// FILTER INTERFACES
// ============================================

export interface FilterState {
  search: string;
  city: string;
  registeredIn: string;
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  mileageMin: number;
  mileageMax: number;
  modelCategory: string;
  transmissionType: string;
  numberOfSeats: string;
  color: string;
  specifications: string[];
}

// ============================================
// VEHICLE SALE INTERFACES
// ============================================

export interface VehicleSaleFormData {
  // Car Information
  make: string;
  model: string;
  year: string | number;
  transmission: string;
  vin: string;
  mileage: string | number;
  price?: string | number; // For 3step variant
  description: string;
  additionalDetails?: string;
  registrationCity?: string; // For instant variant (maps to city if city not provided)
  
  // Contact Information
  mobileNumber: string;
  secondaryNumber?: string;
  allowWhatsApp: boolean;
  
  // Location (for 3step variant)
  city?: string;
  state?: string;
  requestInspection?: boolean; // Maps to freeinspectionRequest
  
  // Media - can be File objects (for new uploads) or strings (URLs from API)
  images?: (File | string)[];
  type: string;
}

export interface VehicleSaleResponse {
  id: string;
  message: string;
  vehicle?: any;
}

export interface VehicleSaleState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  submittedVehicleId: string | null;
  // Selling vehicles list
  sellingVehicles: any[];
  sellingVehiclesLoading: boolean;
  sellingVehiclesError: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | null;
  // Editing vehicle
  editingVehicle: any | null;
  editingVehicleLoading: boolean;
  editingVehicleError: string | null;
}

export interface Vehicle {
  id: string;
  carName: string;
  year: string;
  mileage: string;
  image: string;
  status: "active" | "won" | "lost" | "scheduled" | "ended" | "outbid";
  currentBid?: number;
  startPrice?: number;
  winningBid?: number;
  yourBid?: number;
  scheduleBid?: number;
  bidderCount?: number;
  timer?: string;
  badge?: "WINNER" | "LOST" | "OUTBID";
  vehicleStatus?: string
}
// ============================================
// STORE INTERFACES
// ============================================
// Note: RootState and AppDispatch are defined in @/store/index.ts
// to avoid circular dependencies

