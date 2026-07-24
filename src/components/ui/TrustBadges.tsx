"use client";

import { Shield, Lock, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: <Shield size={12} />, label: "RBI Registered" },
  { icon: <Lock size={12} />, label: "256-bit SSL" },
  { icon: <Star size={12} />, label: "4.8★ Rated" },
  { icon: <Zap size={12} />, label: "Instant Disbursal" },
];

interface TrustBadgesProps {
  className?: string;
}

export function TrustBadges({ className = "" }: TrustBadgesProps) {
  return (
    <div className={`flex flex-wrap gap-2 justify-center ${className}`}>
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          className="trust-badge"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
        >
          <span style={{ color: "var(--success)" }}>{badge.icon}</span>
          <span>{badge.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
