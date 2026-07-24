"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TopNav } from "@/components/layout/TopNav";
import { BottomCTA } from "@/components/layout/BottomCTA";
import { useOnboardingStore } from "@/store/onboarding.store";
import { PageTransition } from "@/components/layout/PageTransition";

const T_AND_C = [
  "I confirm all information provided is accurate and true.",
  "I authorize Cashvia to fetch my credit bureau report from CIBIL/Experian/CRIF.",
  "I consent to receive loan-related communication via SMS, email, and calls.",
  "I have read and agree to the Loan Agreement, Key Fact Statement (KFS), and MITC.",
  "I authorize the NACH mandate for automatic EMI deduction from my bank account.",
  "I understand the repayment schedule and agree to pay EMIs on time.",
];

export default function AgreementPage() {
  const router = useRouter();
  const { data } = useOnboardingStore();
  const [accepted, setAccepted] = useState<boolean[]>(new Array(T_AND_C.length).fill(false));
  const [isSigning, setIsSigning] = useState(false);

  const allAccepted = accepted.every(Boolean);

  const toggle = (index: number) => {
    setAccepted((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const acceptAll = () => setAccepted(new Array(T_AND_C.length).fill(true));

  const handleSign = async () => {
    setIsSigning(true);
    await new Promise((r) => setTimeout(r, 2000));
    router.push("/onboarding/success");
  };

  return (
    <PageTransition>
      <TopNav title="Loan Agreement" currentStep={11} totalSteps={12} />

      <div className="flex-1 px-5 pt-4 pb-4 flex flex-col overflow-y-auto scrollbar-hide">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              boxShadow: "0 6px 20px rgba(79, 70, 229, 0.3)",
            }}
          >
            <FileText size={24} color="white" />
          </div>
          <h1 className="text-title">Review & eSign</h1>
          <p className="text-body mt-1">
            Please read and agree to the following before we disburse your loan.
          </p>
        </motion.div>

        {/* Loan summary card */}
        <motion.div
          className="card mb-5"
          style={{ background: "var(--primary-surface)", borderColor: "rgba(79, 70, 229, 0.15)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--primary)" }}>
            Loan Summary
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Amount", value: `₹${(data.selectedAmount || 200000).toLocaleString("en-IN")}` },
              { label: "Tenure", value: `${data.tenure || 12} months` },
              { label: "Monthly EMI", value: `₹${(data.emi || 18400).toLocaleString("en-IN")}` },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-bold text-base" style={{ color: "var(--primary)" }}>
                  {item.value}
                </p>
                <p className="text-caption mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Terms list */}
        <motion.div
          className="flex flex-col gap-3 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Terms & Conditions
            </p>
            <button
              onClick={acceptAll}
              className="text-xs font-bold"
              style={{ color: "var(--primary)", background: "none", border: "none", cursor: "pointer" }}
            >
              Accept All
            </button>
          </div>

          {T_AND_C.map((term, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 p-3 rounded-2xl cursor-pointer transition-all"
              style={{
                background: accepted[i] ? "var(--success-surface)" : "var(--card)",
                border: `1.5px solid ${accepted[i] ? "rgba(16,185,129,0.2)" : "var(--border)"}`,
              }}
              onClick={() => toggle(i)}
              whileTap={{ scale: 0.99 }}
              id={`term-${i}`}
            >
              {/* Custom checkbox */}
              <motion.div
                className="checkbox-custom flex-shrink-0 mt-0.5"
                animate={{
                  background: accepted[i] ? "var(--success)" : "var(--card)",
                  borderColor: accepted[i] ? "var(--success)" : "var(--border-strong)",
                }}
                transition={{ duration: 0.15 }}
              >
                <AnimatePresence>
                  {accepted[i] && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <CheckCircle2 size={14} color="white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <p
                className="text-xs leading-relaxed"
                style={{
                  color: accepted[i] ? "var(--text-primary)" : "var(--text-secondary)",
                  fontWeight: accepted[i] ? 500 : 400,
                }}
              >
                {term}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* eSign note */}
        <motion.div
          className="info-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span style={{ fontSize: 16 }}>✍️</span>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Your eSign (Aadhaar OTP based) serves as your digital signature and is legally binding
            under the IT Act, 2000.
          </p>
        </motion.div>

        <div className="h-4" />
      </div>

      <BottomCTA>
        <Button
          id="esign-btn"
          onClick={handleSign}
          disabled={!allAccepted}
          loading={isSigning}
          icon={<ArrowRight size={18} />}
        >
          {isSigning ? "Processing eSign…" : "eSign & Get Loan"}
        </Button>
        <p className="text-center mt-2 text-caption">
          🔒 Aadhaar OTP eSign — Legally valid under IT Act
        </p>
      </BottomCTA>
    </PageTransition>
  );
}
