"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";

const STEPS = [
  { label: "Verifying your documents", icon: "📄", duration: 1400 },
  { label: "Checking credit bureau", icon: "📊", duration: 1600 },
  { label: "Analysing your income", icon: "💰", duration: 1200 },
  { label: "Calculating loan eligibility", icon: "🧮", duration: 1400 },
  { label: "Preparing your offer", icon: "🎁", duration: 1000 },
];

export default function EligibilityPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let totalDelay = 0;
    STEPS.forEach((step, i) => {
      setTimeout(() => {
        setCurrentStep(i);
      }, totalDelay);
      totalDelay += step.duration;
    });

    setTimeout(() => {
      setDone(true);
      setTimeout(() => {
        router.push("/onboarding/offer");
      }, 800);
    }, totalDelay);
  }, [router]);

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <PageTransition>
      <div
        className="flex flex-col items-center justify-center min-h-dvh px-6"
        style={{
          background: "linear-gradient(145deg, #4338ca 0%, #4f46e5 50%, #6d28d9 100%)",
        }}
      >
        {/* Decorative circles */}
        <motion.div
          className="absolute top-16 right-8 w-32 h-32 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #a5b4fc, transparent)" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-8 w-24 h-24 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #c4b5fd, transparent)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />

        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-xs">
          {/* Main animation circle */}
          <div className="relative mb-10">
            {/* Pulsing ring */}
            {!done && (
              <>
                <motion.div
                  className="absolute inset-[-20px] rounded-full border-2 border-white opacity-20"
                  animate={{ scale: [1, 1.4], opacity: [0.2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-[-10px] rounded-full border border-white opacity-30"
                  animate={{ scale: [1, 1.25], opacity: [0.3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                />
              </>
            )}

            <motion.div
              className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                border: "2px solid rgba(255,255,255,0.3)",
              }}
              animate={{ rotate: done ? 0 : 360 }}
              transition={{
                duration: 3,
                repeat: done ? 0 : Infinity,
                ease: "linear",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={done ? "done" : currentStep}
                  style={{ fontSize: done ? 52 : 40 }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, rotate: done ? 0 : -360 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    rotate: { duration: done ? 0.3 : 3, repeat: done ? 0 : Infinity, ease: "linear" },
                  }}
                >
                  {done ? "✅" : STEPS[currentStep]?.icon}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Title */}
          <motion.h1
            className="font-bold text-white mb-2"
            style={{ fontSize: 22, letterSpacing: "-0.02em" }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {done ? "Offer Ready! 🎉" : "Checking eligibility…"}
          </motion.h1>

          {/* Current step label */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              className="text-sm font-medium mb-8"
              style={{ color: "rgba(255,255,255,0.7)" }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              {done ? "Your personalised offer is ready" : STEPS[currentStep]?.label}
            </motion.p>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="w-full">
            <div
              className="w-full h-2 rounded-full mb-3"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "white" }}
                animate={{ width: `${done ? 100 : progress}%` }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
            <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
              {done ? "100%" : `${Math.round(progress)}%`} complete
            </p>
          </div>

          {/* Steps list */}
          <div className="mt-8 flex flex-col gap-2 w-full text-left">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                className="flex items-center gap-3 py-2 px-3 rounded-xl"
                style={{
                  background: i <= currentStep ? "rgba(255,255,255,0.1)" : "transparent",
                }}
                animate={{
                  opacity: i <= currentStep ? 1 : 0.4,
                }}
              >
                <span style={{ fontSize: 16 }}>{step.icon}</span>
                <span
                  className="text-xs font-medium"
                  style={{
                    color: i < currentStep ? "rgba(255,255,255,0.9)" : i === currentStep ? "white" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {step.label}
                </span>
                {i < currentStep && (
                  <motion.span
                    className="ml-auto text-xs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
