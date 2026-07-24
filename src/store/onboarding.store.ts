"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type EmploymentType =
  | "salaried"
  | "self_employed"
  | "business"
  | "freelancer"
  | "other"
  | "";

export interface OnboardingData {
  // Auth
  mobile: string;
  otp: string;

  // KYC
  pan: string;
  panVerified: boolean;
  aadhaar: string;
  aadhaarVerified: boolean;

  // Personal
  firstName: string;
  lastName: string;
  dob: string;
  gender: "male" | "female" | "other" | "";
  email: string;

  // Address
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;

  // Employment
  employmentType: EmploymentType;
  companyName: string;
  designation: string;

  // Income
  monthlyIncome: string;
  incomeMode: "salary" | "cash" | "";

  // Bank
  bankName: string;
  accountNumber: string;
  ifscCode: string;

  // Offer
  selectedAmount: number;
  tenure: number;
  emi: number;
  interestRate: number;
  processingFee: number;
}

interface OnboardingStore {
  currentStep: number;
  totalSteps: number;
  data: OnboardingData;
  isLoading: boolean;
  error: string | null;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (updates: Partial<OnboardingData>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialData: OnboardingData = {
  mobile: "",
  otp: "",
  pan: "",
  panVerified: false,
  aadhaar: "",
  aadhaarVerified: false,
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  employmentType: "",
  companyName: "",
  designation: "",
  monthlyIncome: "",
  incomeMode: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  selectedAmount: 200000,
  tenure: 12,
  emi: 0,
  interestRate: 18,
  processingFee: 999,
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      totalSteps: 12,
      data: initialData,
      isLoading: false,
      error: null,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, state.totalSteps),
        })),
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),
      updateData: (updates) =>
        set((state) => ({
          data: { ...state.data, ...updates },
        })),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () => set({ currentStep: 1, data: initialData, error: null }),
    }),
    {
      name: "cashvia-onboarding",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
