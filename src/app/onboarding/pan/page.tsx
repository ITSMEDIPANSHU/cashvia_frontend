"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CreditCard, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TopNav } from "@/components/layout/TopNav";
import { BottomCTA } from "@/components/layout/BottomCTA";
import { useOnboardingStore } from "@/store/onboarding.store";
import { PageTransition } from "@/components/layout/PageTransition";

const schema = z.object({
  pan: z
    .string()
    .length(10, "PAN must be 10 characters")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Enter a valid PAN (e.g., ABCDE1234F)"),
});

type FormData = z.infer<typeof schema>;

export default function PANPage() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { pan: data.pan },
  });

  const panValue = watch("pan") || "";

  const onSubmit = async (formData: FormData) => {
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 1800));
    setVerified(true);
    updateData({ pan: formData.pan, panVerified: true });
    await new Promise((r) => setTimeout(r, 600));
    router.push("/onboarding/aadhaar");
  };

  return (
    <PageTransition>
      <TopNav
        title="PAN Verification"
        currentStep={1}
        totalSteps={12}
      />

      <div className="flex-1 px-5 pt-4 pb-4 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              boxShadow: "0 6px 20px rgba(245, 158, 11, 0.3)",
            }}
          >
            <CreditCard size={24} color="white" />
          </div>
          <h1 className="text-title">Verify your PAN card</h1>
          <p className="text-body mt-2">
            Your PAN is used to check your credit eligibility and is required by RBI regulations.
          </p>
        </motion.div>

        {/* PAN Input */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} id="pan-form">
            <div className="input-wrapper">
              <input
                {...register("pan", {
                  onChange: (e) => setValue("pan", e.target.value.toUpperCase()),
                })}
                type="text"
                id="pan-input"
                className={`input-field font-mono tracking-widest ${errors.pan ? "error" : ""} ${verified ? "!border-[var(--success)]" : ""}`}
                placeholder=" "
                maxLength={10}
                autoCapitalize="characters"
                style={{ fontSize: 18, letterSpacing: "0.15em" }}
                autoFocus
              />
              <label className="input-label" htmlFor="pan-input">
                PAN Number
              </label>
              {verified && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <CheckCircle2 size={20} color="var(--success)" />
                </div>
              )}
            </div>

            <AnimatePresence>
              {errors.pan && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-medium mt-1.5 px-1"
                  style={{ color: "var(--error)" }}
                >
                  {errors.pan.message}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* PAN format helper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          <div className="flex gap-1.5 flex-wrap">
            {["A", "B", "C", "D", "E", "1", "2", "3", "4", "F"].map((char, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border"
                style={{
                  background: i < panValue.length ? "var(--primary-surface)" : "var(--card)",
                  borderColor: i < panValue.length ? "var(--primary)" : "var(--border)",
                  color: i < panValue.length ? "var(--primary)" : "var(--text-tertiary)",
                  fontSize: 11,
                }}
              >
                {i < panValue.length ? panValue[i] : char}
              </div>
            ))}
          </div>
          <p className="text-caption mt-2 px-0.5">Format: AAAAA9999A (5 letters, 4 digits, 1 letter)</p>
        </motion.div>

        {/* Info banner */}
        <motion.div
          className="mt-6 info-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Info size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Your PAN details are fetched from NSDL's secure database using 256-bit encrypted connection.
            We do not store raw PAN data.
          </p>
        </motion.div>

        {/* Verified state */}
        <AnimatePresence>
          {verified && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-4 rounded-2xl success-banner"
              style={{ display: "flex", gap: 12, alignItems: "center" }}
            >
              <CheckCircle2 size={24} color="var(--success)" />
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--success)" }}>
                  PAN Verified Successfully!
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  Redirecting to Aadhaar verification…
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1" />
      </div>

      <BottomCTA>
        <Button
          id="verify-pan-btn"
          form="pan-form"
          type="submit"
          disabled={!isValid || verified}
          loading={isVerifying}
          icon={<ArrowRight size={18} />}
        >
          {verified ? "Verified ✓" : "Verify PAN"}
        </Button>
      </BottomCTA>
    </PageTransition>
  );
}
