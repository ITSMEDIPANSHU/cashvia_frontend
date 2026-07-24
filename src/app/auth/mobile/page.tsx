"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, ShieldCheck, Lock, Zap } from "lucide-react";
import { useOnboardingStore } from "@/store/onboarding.store";
import { PageTransition } from "@/components/layout/PageTransition";

const schema = z.object({
  mobile: z
    .string()
    .length(10, "Enter a valid 10-digit mobile number")
    .regex(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
});

type FormData = z.infer<typeof schema>;

export default function MobilePage() {
  const router = useRouter();
  const updateData = useOnboardingStore((s) => s.updateData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // Simulate API call to send OTP
    await new Promise((r) => setTimeout(r, 1200));
    updateData({ mobile: data.mobile });
    router.push("/auth/otp");
  };

  return (
    <PageTransition>
      <div style={{ background: "#FFFFFF", minHeight: "100dvh", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif" }}>
        
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            paddingTop: "max(16px, env(safe-area-inset-top, 0px))",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => router.back()}
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={18} color="#374151" />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                background: "linear-gradient(135deg, #5B3DF5 0%, #7C3AED 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 7v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7L12 2z"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", color: "#111827" }}>
                cash<span style={{ color: "#5B3DF5" }}>via</span>
              </span>
            </div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>Sign In / Register</span>
        </header>

        {/* Main Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "32px 24px 24px 24px" }}>
          
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ display: "inline-block", padding: "6px 12px", background: "#F5F3FF", borderRadius: 100, marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#5B3DF5" }}>Welcome Back 👋</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>
              Enter your mobile number
            </h1>
            <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.5, margin: 0 }}>
              We&apos;ll send a secure OTP for verification.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            id="mobile-form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{ marginTop: 32 }}
          >
            {/* Input Container */}
            <div
              style={{
                position: "relative",
                height: 56,
                borderRadius: 16,
                border: isFocused ? "2px solid #5B3DF5" : errors.mobile ? "2px solid #EF4444" : "1px solid #E5E7EB",
                background: isFocused ? "#FFFFFF" : "#F9FAFB",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s ease",
                boxShadow: isFocused ? "0 4px 12px rgba(91,61,245,0.08)" : "none",
                padding: "0 16px",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>🇮🇳</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>+91</span>
                <div style={{ width: 1, height: 20, background: "#D1D5DB" }} />
              </div>
              <input
                {...register("mobile", {
                  onChange: (e) => {
                    // Only allow numbers
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }
                })}
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="99999 99999"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoFocus
                style={{
                  flex: 1,
                  height: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#111827",
                  letterSpacing: "0.05em",
                }}
              />
            </div>
            
            <AnimatePresence>
              {errors.mobile && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  style={{ fontSize: 12, fontWeight: 500, color: "#EF4444", margin: "8px 0 0 4px" }}
                >
                  {errors.mobile.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 32,
              padding: "16px 12px",
              background: "#F9FAFB",
              borderRadius: 16,
              border: "1px solid #F3F4F6",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <ShieldCheck size={16} color="#10B981" />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#4B5563" }}>RBI Registered</span>
            </div>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: "#D1D5DB" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Lock size={16} color="#3B82F6" />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#4B5563" }}>SSL Secured</span>
            </div>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: "#D1D5DB" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Zap size={16} color="#F59E0B" />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#4B5563" }}>Instant Approval</span>
            </div>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            style={{ marginTop: 24 }}
          >
            <motion.button
              id="send-otp-btn"
              form="mobile-form"
              type="submit"
              disabled={!isValid || isLoading}
              whileTap={isValid && !isLoading ? { scale: 0.96 } : {}}
              style={{
                width: "100%",
                height: 56,
                borderRadius: 18,
                background: !isValid ? "#E5E7EB" : "linear-gradient(135deg, #5B3DF5 0%, #7C3AED 100%)",
                color: !isValid ? "#9CA3AF" : "white",
                border: "none",
                fontSize: 16,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: !isValid ? "not-allowed" : "pointer",
                boxShadow: isValid ? "0 8px 24px rgba(91,61,245,0.3)" : "none",
                transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
              }}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{ width: 20, height: 20, border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }}
                />
              ) : (
                <>
                  Send OTP <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </motion.div>

          <div style={{ flex: 1 }} />

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              textAlign: "center",
              paddingTop: 24,
              paddingBottom: "env(safe-area-inset-bottom, 16px)",
            }}
          >
            <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0, fontWeight: 500 }}>
              By proceeding, you agree to our{" "}
              <span style={{ color: "#5B3DF5", fontWeight: 600, cursor: "pointer" }}>Terms of Service</span>
              {" "}&{" "}
              <span style={{ color: "#5B3DF5", fontWeight: 600, cursor: "pointer" }}>Privacy Policy</span>
            </p>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}
