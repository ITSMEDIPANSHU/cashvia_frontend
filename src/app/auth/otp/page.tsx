"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageSquare, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OTPInput } from "@/components/ui/OTPInput";
import { TopNav } from "@/components/layout/TopNav";
import { BottomCTA } from "@/components/layout/BottomCTA";
import { useOnboardingStore } from "@/store/onboarding.store";
import { PageTransition } from "@/components/layout/PageTransition";

const RESEND_TIMEOUT = 30;

export default function OTPPage() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    setIsLoading(true);
    setError(false);

    // Simulate OTP verification (accept "123456" as demo)
    await new Promise((r) => setTimeout(r, 1500));

    if (otp === "123456") {
      updateData({ otp });
      router.push("/onboarding/pan");
    } else {
      setError(true);
      setOtp("");
      setShakeKey((k) => k + 1);
    }
    setIsLoading(false);
  };

  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false);
    setTimer(RESEND_TIMEOUT);
    setOtp("");
    setError(false);
    // simulate resend
  };

  useEffect(() => {
    if (otp.length === 6) {
      handleVerify();
    }
  }, [otp]);

  const maskedMobile = data.mobile
    ? `+91 ${data.mobile.slice(0, 2)}XXXXX${data.mobile.slice(-3)}`
    : "+91 XXXXXXXXXX";

  return (
    <PageTransition>
      <TopNav title="Verify OTP" />

      <div className="flex-1 px-5 pt-4 pb-4 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-10"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%)",
              boxShadow: "0 6px 20px rgba(79, 70, 229, 0.3)",
            }}
          >
            <MessageSquare size={24} color="white" />
          </div>
          <h1 className="text-title">Enter verification code</h1>
          <p className="text-body mt-2">
            We sent a 6-digit code to{" "}
            <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
              {maskedMobile}
            </span>
          </p>
          <button
            onClick={() => router.back()}
            className="mt-1 text-sm font-semibold"
            style={{ color: "var(--primary)", background: "none", border: "none", cursor: "pointer" }}
          >
            Change number
          </button>
        </motion.div>

        {/* OTP Input */}
        <motion.div
          key={shakeKey}
          animate={error ? { x: [0, -8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <OTPInput
            value={otp}
            onChange={setOtp}
            error={error}
            disabled={isLoading}
          />
        </motion.div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mt-4"
            >
              <div
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: "var(--error-surface)", color: "var(--error)" }}
              >
                ❌ Incorrect OTP. Please try again.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resend section */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {canResend ? (
            <button
              onClick={handleResend}
              className="flex items-center gap-1.5 font-semibold text-sm"
              style={{ color: "var(--primary)", background: "none", border: "none", cursor: "pointer" }}
            >
              <RotateCcw size={14} />
              Resend OTP
            </button>
          ) : (
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Resend OTP in{" "}
              <span className="font-bold" style={{ color: "var(--text-primary)" }}>
                {timer}s
              </span>
            </p>
          )}
        </motion.div>

        {/* Demo note */}
        <motion.div
          className="mt-6 p-4 rounded-2xl"
          style={{
            background: "var(--warning-surface)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs font-semibold" style={{ color: "var(--warning)" }}>
            🧪 Demo Mode
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
            Use <strong>123456</strong> as the OTP to proceed
          </p>
        </motion.div>

        <div className="flex-1" />
      </div>

      <BottomCTA>
        <Button
          id="verify-otp-btn"
          onClick={handleVerify}
          disabled={otp.length !== 6}
          loading={isLoading}
          icon={<ArrowRight size={18} />}
        >
          Verify & Continue
        </Button>
      </BottomCTA>
    </PageTransition>
  );
}
