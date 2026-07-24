"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  white?: boolean;
}

export function Logo({ size = "md", white = false }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: 18 },
    md: { icon: 36, text: 22 },
    lg: { icon: 56, text: 32 },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      {/* Icon mark */}
      <motion.div
        style={{
          width: s.icon,
          height: s.icon,
          background: white
            ? "rgba(255,255,255,0.2)"
            : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          borderRadius: s.icon * 0.3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: white ? "none" : "0 4px 12px rgba(79, 70, 229, 0.35)",
        }}
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.4 }}
      >
        <svg
          width={s.icon * 0.55}
          height={s.icon * 0.55}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2L4 7v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7L12 2z"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Wordmark */}
      <span
        style={{
          fontSize: s.text,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: white ? "white" : "var(--text-primary)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        cash
        <span style={{ color: white ? "rgba(255,255,255,0.75)" : "var(--primary)" }}>
          via
        </span>
      </span>
    </div>
  );
}
