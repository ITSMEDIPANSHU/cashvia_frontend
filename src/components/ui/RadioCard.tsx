"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface RadioCardProps {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
  id: string;
}

export function RadioCard({
  label,
  description,
  icon,
  selected,
  onSelect,
  id,
}: RadioCardProps) {
  return (
    <motion.div
      id={id}
      className={`radio-card ${selected ? "selected" : ""}`}
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {icon && (
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: selected ? "var(--primary)" : "var(--bg)",
            color: selected ? "white" : "var(--text-secondary)",
            transition: "all 0.2s",
          }}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold text-sm truncate"
          style={{ color: selected ? "var(--primary)" : "var(--text-primary)" }}
        >
          {label}
        </p>
        {description && (
          <p className="text-caption mt-0.5 truncate">{description}</p>
        )}
      </div>
      <motion.div
        initial={false}
        animate={{
          scale: selected ? 1 : 0.7,
          opacity: selected ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="flex-shrink-0"
      >
        <CheckCircle2 size={22} color="var(--primary)" />
      </motion.div>
    </motion.div>
  );
}
