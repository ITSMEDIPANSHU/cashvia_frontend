"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Download, Share2, Home, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useOnboardingStore } from "@/store/onboarding.store";
import { PageTransition } from "@/components/layout/PageTransition";

function Particle({ delay, x }: { delay: number; x: number }) {
  const colors = ["#4f46e5", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 8 + 4;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: `${x}%`,
        top: "30%",
      }}
      initial={{ y: 0, opacity: 1, scale: 1 }}
      animate={{
        y: [-20, -80, -120, -180, -240],
        opacity: [1, 1, 0.8, 0.4, 0],
        x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 120],
        scale: [1, 1.2, 0.8, 0.5, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2.5,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

export default function SuccessPage() {
  const router = useRouter();
  const { data, reset } = useOnboardingStore();
  const hasShownParticles = useRef(false);

  const amount = data.selectedAmount || 200000;
  const tenure = data.tenure || 12;
  const emi = data.emi || 18400;
  const firstName = data.firstName || "There";

  const particles = Array.from({ length: 30 }, (_, i) => ({
    delay: Math.random() * 0.8,
    x: Math.random() * 100,
  }));

  const handleGoHome = () => {
    reset();
    router.push("/welcome");
  };

  return (
    <PageTransition>
      <div
        className="min-h-dvh flex flex-col relative overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        {/* Confetti particles */}
        <div className="pointer-events-none">
          {particles.map((p, i) => (
            <Particle key={i} delay={p.delay} x={p.x} />
          ))}
        </div>

        {/* Hero success section */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #4338ca 0%, #4f46e5 50%, #10b981 100%)",
            paddingTop: "env(safe-area-inset-top, 20px)",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative flex flex-col items-center text-center px-6 pt-10 pb-12">
            {/* Success ring animation */}
            <div className="relative mb-6">
              <motion.div
                className="absolute inset-[-16px] rounded-full border-2 border-white opacity-0"
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ duration: 1.2, delay: 0.3, repeat: 3 }}
              />
              <motion.div
                className="absolute inset-[-8px] rounded-full border border-white opacity-0"
                animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                transition={{ duration: 1.2, delay: 0.5, repeat: 3 }}
              />

              <motion.div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "3px solid white",
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  duration: 0.8,
                }}
              >
                <motion.span
                  style={{ fontSize: 48 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                >
                  🎉
                </motion.span>
              </motion.div>
            </div>

            <motion.h1
              className="font-black text-white"
              style={{ fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1.2 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Congratulations,{"\n"}{firstName}! 🎊
            </motion.h1>

            <motion.p
              className="mt-2 text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.8)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              Your loan has been approved and will be disbursed shortly
            </motion.p>

            {/* Amount hero */}
            <motion.div
              className="mt-6 px-8 py-4 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                Loan Amount Approved
              </p>
              <p className="font-black text-white" style={{ fontSize: 40, letterSpacing: "-0.03em" }}>
                ₹{amount.toLocaleString("en-IN")}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Details section */}
        <div className="flex-1 px-5 py-6 flex flex-col gap-4">
          {/* Timeline */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              What happens next?
            </p>
            {[
              {
                icon: "✅",
                title: "Loan Approved",
                subtitle: "Just now",
                done: true,
              },
              {
                icon: "🏦",
                title: "Amount Processing",
                subtitle: "Within 30 minutes",
                done: false,
                active: true,
              },
              {
                icon: "💸",
                title: "Money in your bank",
                subtitle: "Today by 6 PM",
                done: false,
              },
              {
                icon: "📱",
                title: "Loan kit on WhatsApp",
                subtitle: "Confirmation SMS + Email",
                done: false,
              },
            ].map((step, i) => (
              <div key={step.title} className="flex items-start gap-3 pb-4">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                    style={{
                      background: step.done ? "var(--success-surface)" : step.active ? "var(--primary-surface)" : "var(--bg)",
                    }}
                  >
                    {step.icon}
                  </div>
                  {i < 3 && (
                    <div
                      className="w-px flex-1 mt-1"
                      style={{
                        background: step.done ? "var(--success)" : "var(--border)",
                        minHeight: "20px",
                      }}
                    />
                  )}
                </div>
                <div className="pt-1">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: step.active ? "var(--primary)" : step.done ? "var(--success)" : "var(--text-primary)" }}
                  >
                    {step.title}
                  </p>
                  <p className="text-caption">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Loan details */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              Loan Details
            </p>
            {[
              { label: "Loan ID", value: `CV${Date.now().toString().slice(-8)}` },
              { label: "Monthly EMI", value: `₹${emi.toLocaleString("en-IN")}` },
              { label: "Tenure", value: `${tenure} months` },
              { label: "First EMI Date", value: "25 Aug 2026" },
              { label: "Account", value: `XXXX ${data.accountNumber?.slice(-4) || "1234"}` },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex justify-between py-2.5"
                style={{ borderBottom: i < 4 ? "1px solid var(--border)" : "none" }}
              >
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {item.label}
                </span>
                <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <button
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
              style={{ padding: "14px" }}
              id="download-btn"
            >
              <Download size={16} />
              <span className="text-sm">Agreement</span>
            </button>
            <button
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
              style={{ padding: "14px" }}
              id="share-btn"
            >
              <Share2 size={16} />
              <span className="text-sm">Share</span>
            </button>
          </motion.div>

          {/* Customer support */}
          <motion.div
            className="info-banner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <MessageSquare size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Questions? Chat with our support team available{" "}
              <strong style={{ color: "var(--primary)", cursor: "pointer" }}>24×7 on WhatsApp</strong>
            </p>
          </motion.div>
        </div>

        {/* Home CTA */}
        <motion.div
          className="px-5 pb-8"
          style={{ paddingBottom: "calc(32px + env(safe-area-inset-bottom, 0px))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Button
            id="go-home-btn"
            onClick={handleGoHome}
            variant="secondary"
            icon={<Home size={18} />}
            iconPosition="left"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
