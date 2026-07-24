"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Fingerprint, ShieldCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TopNav } from "@/components/layout/TopNav";
import { BottomCTA } from "@/components/layout/BottomCTA";
import { useOnboardingStore } from "@/store/onboarding.store";
import { PageTransition } from "@/components/layout/PageTransition";

const schema = z.object({
  aadhaar: z
    .string()
    .length(12, "Aadhaar must be 12 digits")
    .regex(/^\d{12}$/, "Enter a valid 12-digit Aadhaar number"),
});

type FormData = z.infer<typeof schema>;

function maskAadhaar(value: string) {
  if (value.length <= 8) return value;
  return "XXXX XXXX " + value.slice(8);
}

export default function AadhaarPage() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();
  const [isVerifying, setIsVerifying] = useState(false);
  const [step, setStep] = useState<"enter" | "otp" | "verified">("enter");
  const [otpValue, setOtpValue] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { aadhaar: data.aadhaar },
  });

  const aadhaar = watch("aadhaar") || "";

  const onSubmit = async (formData: FormData) => {
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsVerifying(false);
    setStep("otp");
  };

  const handleOTPVerify = async () => {
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 1500));
    updateData({ aadhaar: aadhaar, aadhaarVerified: true });
    setStep("verified");
    await new Promise((r) => setTimeout(r, 700));
    router.push("/onboarding/personal");
  };

  return (
    <PageTransition>
      <TopNav title="Aadhaar Verification" currentStep={2} totalSteps={12} />

      <div className="flex-1 px-5 pt-4 pb-4 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              boxShadow: "0 6px 20px rgba(16, 185, 129, 0.3)",
            }}
          >
            <Fingerprint size={24} color="white" />
          </div>
          <h1 className="text-title">Aadhaar verification</h1>
          <p className="text-body mt-2">
            Required for KYC compliance as per RBI guidelines.
            Your data is encrypted and never stored.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === "enter" && (
            <motion.div
              key="enter"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} id="aadhaar-form">
                <div className="input-wrapper">
                  <input
                    {...register("aadhaar")}
                    type="tel"
                    inputMode="numeric"
                    id="aadhaar-input"
                    className={`input-field ${errors.aadhaar ? "error" : ""}`}
                    placeholder=" "
                    maxLength={12}
                    autoFocus
                  />
                  <label className="input-label" htmlFor="aadhaar-input">
                    Aadhaar Number (12 digits)
                  </label>
                </div>

                {aadhaar.length >= 8 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 px-1 text-sm font-medium"
                    style={{ color: "var(--text-secondary)", letterSpacing: "0.08em" }}
                  >
                    {maskAadhaar(aadhaar)}
                  </motion.p>
                )}

                {errors.aadhaar && (
                  <p className="text-xs font-medium mt-1.5 px-1" style={{ color: "var(--error)" }}>
                    {errors.aadhaar.message}
                  </p>
                )}
              </form>

              {/* Security note */}
              <div className="mt-6 flex flex-col gap-3">
                {[
                  { icon: "🔒", text: "Your data is secured with AES-256 encryption" },
                  { icon: "🏛️", text: "Verification done via UIDAI's official API" },
                  { icon: "🚫", text: "We never store your Aadhaar number" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center text-center"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: "var(--success-surface)" }}
              >
                <ShieldCheck size={28} color="var(--success)" />
              </div>
              <h2 className="text-heading mb-2">OTP sent to your Aadhaar-linked mobile</h2>
              <p className="text-body mb-6">Enter the OTP received on your registered mobile</p>

              <div className="flex gap-2">
                {[0,1,2,3,4,5].map((i) => (
                  <input
                    key={i}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    className="otp-input"
                    style={{ width: 46, height: 56 }}
                    value={otpValue[i] || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      const arr = otpValue.split("");
                      arr[i] = val.slice(-1);
                      setOtpValue(arr.join("").slice(0, 6));
                    }}
                  />
                ))}
              </div>

              <p className="mt-4 text-caption">Use <strong>123456</strong> for demo</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1" />
      </div>

      <BottomCTA>
        {step === "enter" && (
          <Button
            id="send-aadhaar-otp-btn"
            form="aadhaar-form"
            type="submit"
            disabled={!isValid}
            loading={isVerifying}
            icon={<ArrowRight size={18} />}
          >
            Send OTP to Aadhaar Mobile
          </Button>
        )}
        {step === "otp" && (
          <Button
            id="verify-aadhaar-btn"
            onClick={handleOTPVerify}
            disabled={otpValue.length !== 6}
            loading={isVerifying}
            icon={<ArrowRight size={18} />}
          >
            Verify Aadhaar
          </Button>
        )}
      </BottomCTA>
    </PageTransition>
  );
}
