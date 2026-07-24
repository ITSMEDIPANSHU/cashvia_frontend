"use client";

import { motion } from "framer-motion";

interface BottomCTAProps {
  children: React.ReactNode;
  noBorder?: boolean;
}

export function BottomCTA({ children, noBorder = false }: BottomCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="sticky bottom-0 z-20"
      style={{
        background: "linear-gradient(to top, var(--bg) 85%, transparent 100%)",
        padding: "16px 20px",
        paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
        borderTop: noBorder ? "none" : "1px solid var(--border)",
      }}
    >
      {children}
    </motion.div>
  );
}
