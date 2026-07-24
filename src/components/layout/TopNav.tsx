"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface TopNavProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showClose?: boolean;
  onClose?: () => void;
  currentStep?: number;
  totalSteps?: number;
  transparent?: boolean;
}

export function TopNav({
  title,
  subtitle,
  onBack,
  showClose = false,
  onClose,
  currentStep,
  totalSteps,
  transparent = false,
}: TopNavProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="sticky top-0 z-30"
      style={{
        background: transparent ? "transparent" : "var(--bg)",
        paddingTop: "env(safe-area-inset-top, 12px)",
      }}
    >
      <div className="flex items-center gap-3 px-5 py-3">
        {/* Back Button */}
        <motion.button
          onClick={handleBack}
          className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "var(--card)",
            border: "1.5px solid var(--border)",
          }}
          whileTap={{ scale: 0.92 }}
          aria-label="Go back"
          id="back-btn"
        >
          <ArrowLeft size={18} color="var(--text-primary)" strokeWidth={2.5} />
        </motion.button>

        {/* Title Area */}
        <div className="flex-1 min-w-0">
          {title && (
            <h2
              className="font-semibold text-sm truncate"
              style={{ color: "var(--text-primary)", lineHeight: 1.4 }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-caption truncate">{subtitle}</p>
          )}
        </div>

        {/* Close / Step counter */}
        {showClose ? (
          <motion.button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--card)",
              border: "1.5px solid var(--border)",
            }}
            whileTap={{ scale: 0.92 }}
            aria-label="Close"
          >
            <X size={18} color="var(--text-secondary)" />
          </motion.button>
        ) : currentStep && totalSteps ? (
          <div
            className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: "var(--primary-surface)",
              color: "var(--primary)",
            }}
          >
            {currentStep}/{totalSteps}
          </div>
        ) : null}
      </div>

      {/* Progress bar */}
      {currentStep && totalSteps && (
        <div className="px-5 pb-2">
          <ProgressBar current={currentStep} total={totalSteps} />
        </div>
      )}
    </motion.div>
  );
}
