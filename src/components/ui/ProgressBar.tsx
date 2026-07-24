"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number; // 1-indexed
  total: number;
  showLabel?: boolean;
}

export function ProgressBar({ current, total, showLabel = false }: ProgressBarProps) {
  const percentage = Math.round(((current - 1) / total) * 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-caption">Step {current} of {total}</span>
          <span className="text-caption font-semibold" style={{ color: "var(--primary)" }}>
            {percentage}%
          </span>
        </div>
      )}
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}
