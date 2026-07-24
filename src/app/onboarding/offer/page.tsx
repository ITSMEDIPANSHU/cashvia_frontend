"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Info, Sliders } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TopNav } from "@/components/layout/TopNav";
import { BottomCTA } from "@/components/layout/BottomCTA";
import { useOnboardingStore } from "@/store/onboarding.store";
import { PageTransition } from "@/components/layout/PageTransition";

const TENURE_OPTIONS = [3, 6, 9, 12, 18, 24, 36];

function calculateEMI(principal: number, ratePerYear: number, months: number) {
  const r = ratePerYear / 100 / 12;
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return Math.round(emi);
}

export default function OfferPage() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();

  const MAX_AMOUNT = 300000;
  const MIN_AMOUNT = 10000;
  const INTEREST_RATE = 18;

  const [amount, setAmount] = useState(data.selectedAmount || 200000);
  const [tenure, setTenure] = useState(data.tenure || 12);

  const emi = calculateEMI(amount, INTEREST_RATE, tenure);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - amount;
  const processingFee = Math.round(amount * 0.02);

  const handleAccept = () => {
    updateData({ selectedAmount: amount, tenure, emi, interestRate: INTEREST_RATE, processingFee });
    router.push("/onboarding/agreement");
  };

  return (
    <PageTransition>
      <TopNav title="Your Loan Offer" currentStep={9} totalSteps={12} />

      <div className="flex-1 px-5 pt-2 pb-4 flex flex-col overflow-y-auto scrollbar-hide">
        {/* Approved badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: "var(--success-surface)" }}
            >
              <BadgeCheck size={14} color="var(--success)" />
              <span className="text-xs font-bold" style={{ color: "var(--success)" }}>
                Pre-Approved Offer
              </span>
            </div>
          </div>

          {/* Hero offer card */}
          <div
            className="relative overflow-hidden rounded-3xl p-6"
            style={{
              background: "linear-gradient(135deg, #4338ca 0%, #4f46e5 50%, #7c3aed 100%)",
            }}
          >
            <div
              className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full opacity-15"
              style={{ background: "radial-gradient(circle, white, transparent)" }}
            />

            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>
              Loan Amount
            </p>
            <motion.p
              key={amount}
              className="font-black text-white"
              style={{ fontSize: 42, lineHeight: 1, letterSpacing: "-0.03em" }}
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              ₹{amount.toLocaleString("en-IN")}
            </motion.p>

            <div className="flex gap-6 mt-5">
              <div>
                <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>Monthly EMI</p>
                <p className="font-bold text-xl text-white">₹{emi.toLocaleString("en-IN")}</p>
              </div>
              <div
                className="w-px"
                style={{ background: "rgba(255,255,255,0.2)" }}
              />
              <div>
                <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>Tenure</p>
                <p className="font-bold text-xl text-white">{tenure} months</p>
              </div>
              <div
                className="w-px"
                style={{ background: "rgba(255,255,255,0.2)" }}
              />
              <div>
                <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>Rate (p.a.)</p>
                <p className="font-bold text-xl text-white">{INTEREST_RATE}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Amount slider */}
        <motion.div
          className="card mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sliders size={16} color="var(--primary)" />
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Customize your loan
            </p>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-caption">Loan Amount</span>
              <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>
                ₹{amount.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={5000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full"
              id="amount-slider"
              style={{
                accentColor: "var(--primary)",
                height: "6px",
                cursor: "pointer",
              }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-caption">₹10K</span>
              <span className="text-caption">₹3L</span>
            </div>
          </div>

          {/* Tenure selector */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-caption">Tenure</span>
              <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>
                {tenure} months
              </span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {TENURE_OPTIONS.map((t) => (
                <motion.button
                  key={t}
                  type="button"
                  onClick={() => setTenure(t)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all"
                  style={{
                    borderColor: tenure === t ? "var(--primary)" : "var(--border)",
                    background: tenure === t ? "var(--primary)" : "var(--card)",
                    color: tenure === t ? "white" : "var(--text-secondary)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  id={`tenure-${t}`}
                >
                  {t}M
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loan summary */}
        <motion.div
          className="card mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Repayment Summary
          </p>
          {[
            { label: "Principal Amount", value: `₹${amount.toLocaleString("en-IN")}` },
            { label: "Total Interest", value: `₹${totalInterest.toLocaleString("en-IN")}` },
            { label: "Processing Fee (2%)", value: `₹${processingFee.toLocaleString("en-IN")}` },
            { label: "Total Payable", value: `₹${totalPayable.toLocaleString("en-IN")}`, highlight: true },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center py-2.5"
              style={{
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span
                className="text-sm"
                style={{ color: item.highlight ? "var(--text-primary)" : "var(--text-secondary)" }}
              >
                {item.label}
              </span>
              <span
                className="font-bold text-sm"
                style={{ color: item.highlight ? "var(--primary)" : "var(--text-primary)" }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* No hidden charges banner */}
        <motion.div
          className="info-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Info size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            No hidden charges. Prepayment allowed after 3 months at zero cost.
          </p>
        </motion.div>

        <div className="h-4" />
      </div>

      <BottomCTA noBorder>
        <Button
          id="accept-offer-btn"
          onClick={handleAccept}
          icon={<ArrowRight size={18} />}
        >
          Accept Offer — ₹{emi.toLocaleString("en-IN")}/month
        </Button>
        <p className="text-center mt-2 text-caption">
          First EMI due 30 days from disbursal date
        </p>
      </BottomCTA>
    </PageTransition>
  );
}
