"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { BottomNav } from "@/components/layout/BottomNav";

const InstantApprovalIllustration = () => (
  <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
    {/* Background Glow */}
    <motion.div animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.1, 0.8] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: "absolute", width: 60, height: 60, background: "#10B981", borderRadius: "50%", filter: "blur(16px)" }} />
    
    {/* Floating Sparks */}
    <motion.div animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} style={{ position: "absolute", top: 0, right: 10, width: 6, height: 6, background: "#FDE047", borderRadius: "50%", boxShadow: "0 0 8px #FDE047" }} />
    <motion.div animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1 }} style={{ position: "absolute", top: 10, left: 0, width: 4, height: 4, background: "#FDE047", borderRadius: "50%", boxShadow: "0 0 8px #FDE047" }} />

    {/* Phone Chassis */}
    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative", zIndex: 10, width: 44, height: 72, borderRadius: 12, background: "linear-gradient(180deg, #4B5563 0%, #1F2937 100%)", padding: 2, boxShadow: "0 12px 24px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)", border: "1px solid #6B7280" }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 10, background: "#030712", position: "relative", overflow: "hidden", border: "1px solid #111827" }}>
        {/* Screen Background */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,185,129,0.15) 0%, transparent 100%)" }} />
        {/* Animated Checkmark Bubble */}
        <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }} style={{ position: "absolute", top: 16, left: "50%", marginLeft: -14, width: 28, height: 28, background: "linear-gradient(135deg, #10B981, #059669)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(16,185,129,0.4), inset 0 2px 4px rgba(255,255,255,0.3)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.div>
        {/* UI Lines */}
        <motion.div animate={{ opacity: [0, 1, 1], y: [10, 0, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }} style={{ position: "absolute", bottom: 20, left: "15%", width: "70%", height: 4, background: "#4ADE80", borderRadius: 2 }} />
        <motion.div animate={{ opacity: [0, 1, 1], y: [10, 0, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2, delay: 0.1 }} style={{ position: "absolute", bottom: 12, left: "15%", width: "50%", height: 4, background: "#374151", borderRadius: 2 }} />
      </div>
    </motion.div>
  </div>
);

const DigitalIllustration = () => (
  <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: "absolute", width: 60, height: 60, background: "#3B82F6", borderRadius: "50%", filter: "blur(20px)" }} />
    
    {/* Cloud Background */}
    <motion.svg animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity }} style={{ position: "absolute", top: 10, left: 10, opacity: 0.8 }} width="40" height="40" viewBox="0 0 24 24" fill="none">
      <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1332 20.1765 10.1983 17.8687 10.0153C17.4069 6.64337 14.5204 4 11 4C7.13401 4 4 7.13401 4 11C4 11.2389 4.01198 11.4749 4.03527 11.7067C2.28588 12.3551 1 14.0253 1 16C1 18.2091 2.79086 20 5 20H17.5" fill="url(#cloud-grad)" />
      <defs>
        <linearGradient id="cloud-grad" x1="0" y1="0" x2="24" y2="24">
          <stop stopColor="#93C5FD" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </motion.svg>

    {/* Floating Documents */}
    <motion.div animate={{ y: [0, -10, 0], x: [0, 5, 0], rotate: [0, 5, 0] }} transition={{ duration: 3.5, repeat: Infinity }} style={{ position: "absolute", top: 15, right: 15, zIndex: 5, width: 28, height: 36, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)", borderRadius: 4, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: 4 }}>
      <div style={{ width: "80%", height: 2, background: "#93C5FD", marginBottom: 3, borderRadius: 1 }} />
      <div style={{ width: "60%", height: 2, background: "#DBEAFE", marginBottom: 3, borderRadius: 1 }} />
      <div style={{ width: "90%", height: 2, background: "#DBEAFE", marginBottom: 3, borderRadius: 1 }} />
      {/* Signature Glow */}
      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: "absolute", bottom: 4, right: 4, width: 12, height: 12, background: "radial-gradient(circle, #5B3DF5, transparent)", filter: "blur(2px)" }} />
    </motion.div>

    <motion.div animate={{ y: [0, 8, 0], x: [0, -5, 0], rotate: [-10, -5, -10] }} transition={{ duration: 4.5, repeat: Infinity }} style={{ position: "absolute", bottom: 10, left: 15, zIndex: 15, width: 24, height: 32, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(4px)", borderRadius: 4, border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: 4 }}>
      <div style={{ width: "100%", height: "100%", border: "1px dashed #93C5FD", borderRadius: 2 }} />
    </motion.div>
  </div>
);

const EMIIllustration = () => (
  <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: "absolute", width: 60, height: 60, background: "#8B5CF6", borderRadius: "50%", filter: "blur(20px)" }} />
    
    {/* Calendar / Schedule Base */}
    <div style={{ position: "absolute", bottom: 10, right: 10, width: 36, height: 40, background: "linear-gradient(135deg, #FFFFFF, #F3F4F6)", borderRadius: 6, boxShadow: "0 8px 16px rgba(0,0,0,0.1)", border: "1px solid #E5E7EB", zIndex: 5, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ height: 10, background: "#EF4444", width: "100%" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, padding: 4 }}>
        {[...Array(6)].map((_, i) => <div key={i} style={{ height: 6, background: "#D1D5DB", borderRadius: 1 }} />)}
      </div>
    </div>

    {/* Dynamic Slider */}
    <div style={{ position: "absolute", top: 20, left: 10, width: 60, height: 8, background: "#E5E7EB", borderRadius: 4, zIndex: 10, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)" }}>
      <motion.div animate={{ width: ["20%", "80%", "20%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ height: "100%", background: "linear-gradient(90deg, #5B3DF5, #8B5CF6)", borderRadius: 4 }} />
      <motion.div animate={{ left: ["20%", "80%", "20%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", top: "50%", marginTop: -8, marginLeft: -8, width: 16, height: 16, background: "#FFFFFF", border: "2px solid #5B3DF5", borderRadius: "50%", boxShadow: "0 2px 4px rgba(91,61,245,0.4)" }} />
    </div>

    {/* Coin Stacks reacting to slider */}
    <motion.div animate={{ height: [12, 28, 12] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ position: "absolute", bottom: 10, left: 15, width: 24, zIndex: 15, display: "flex", flexDirection: "column-reverse" }}>
      <div style={{ width: 24, height: 6, background: "#FDE68A", borderRadius: "50%", border: "1px solid #D97706", position: "absolute", bottom: 0 }} />
      <div style={{ width: 24, height: 6, background: "#FCD34D", borderRadius: "50%", border: "1px solid #D97706", position: "absolute", bottom: 4 }} />
      <div style={{ width: 24, height: 6, background: "#F59E0B", borderRadius: "50%", border: "1px solid #B45309", position: "absolute", bottom: 8 }} />
      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ width: 24, height: 6, background: "#F59E0B", borderRadius: "50%", border: "1px solid #B45309", position: "absolute", bottom: 12 }} />
      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} style={{ width: 24, height: 6, background: "#FCD34D", borderRadius: "50%", border: "1px solid #D97706", position: "absolute", bottom: 16 }} />
    </motion.div>
  </div>
);

const SecurityIllustrationPremium = () => (
  <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <motion.div animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.2, 0.9] }} transition={{ duration: 4, repeat: Infinity }} style={{ position: "absolute", width: 60, height: 60, background: "#60A5FA", borderRadius: "50%", filter: "blur(16px)" }} />
    
    {/* Multi-layered Shield */}
    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative", zIndex: 10, width: 48, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", inset: 0, filter: "drop-shadow(0 8px 16px rgba(37,99,235,0.4))" }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#shield-outer)" stroke="#1E3A8A" strokeWidth="0.5"/>
        <path d="M12 20.5s6.5-3.5 6.5-8.5V6.5l-6.5-2.5-6.5 2.5v5.5c0 5 6.5 8.5 6.5 8.5z" fill="url(#shield-inner)"/>
        <defs>
          <linearGradient id="shield-outer" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="shield-inner" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#60A5FA" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Animated Lock */}
      <motion.div animate={{ scale: [0.9, 1, 0.9] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: "relative", zIndex: 15, width: 20, height: 24 }}>
        <div style={{ position: "absolute", top: 0, left: 4, width: 12, height: 10, border: "2px solid #FDE047", borderBottom: "none", borderRadius: "6px 6px 0 0" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 20, height: 14, background: "linear-gradient(135deg, #FDE047, #CA8A04)", borderRadius: 3, boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.5)" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 4, height: 4, background: "#713F12", borderRadius: "50%" }} />
        </div>
      </motion.div>
    </motion.div>
  </div>
);

/* ─── Data ──────────────────────────────────── */
const stats = [
  { value: "50L+", label: "Happy Customers" },
  { value: "₹5L",  label: "Max Loan"        },
  { value: "5 Min", label: "Disbursal"       },
  { value: "100%", label: "Safe & Secure"   },
];

const features = [
  { illustration: <InstantApprovalIllustration />, title: "Instant Approval",   desc: "AI-powered in-principle approval in seconds", bg: "linear-gradient(145deg, #F8FAFC 0%, #EFF6FF 100%)", border: "#DBEAFE" },
  { illustration: <DigitalIllustration />, title: "100% Digital",       desc: "No physical documents or branch visits needed", bg: "linear-gradient(145deg, #FAFAFA 0%, #F3F4F6 100%)", border: "#E5E7EB" },
  { illustration: <EMIIllustration />, title: "Flexible EMI",       desc: "Choose a repayment tenure from 3 to 36 months", bg: "linear-gradient(145deg, #FCFDFD 0%, #F5F3FF 100%)", border: "#EDE9FE" },
  { illustration: <SecurityIllustrationPremium />, title: "No Hidden Charges",  desc: "Full transparency. Zero surprise fees ever", bg: "linear-gradient(145deg, #FFFFFF 0%, #F0FDF4 100%)", border: "#DCFCE7" },
];

/* ─── Animation variants ─────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 24 },
  animate:   { opacity: 1, y: 0  },
  transition: { duration: 0.5, delay, ease: [0.25, 1, 0.5, 1] },
});

const scaleIn = (delay = 0) => ({
  initial:   { opacity: 0, scale: 0.94 },
  animate:   { opacity: 1, scale: 1    },
  transition: { duration: 0.55, delay, ease: [0.25, 1.5, 0.5, 1] },
});

/* ─── Main component ─────────────────────────── */
export default function WelcomePage() {
  const router = useRouter();

  return (
    <PageTransition>
      <div style={{ background: "#F8F9FA", minHeight: "100dvh", fontFamily: "Inter, sans-serif" }}>

        {/* ══════════════════════════════════════════
            1. STICKY HEADER
            ══════════════════════════════════════════ */}
        <motion.header
          {...fadeUp(0)}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(0,0,0,0.03)",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: "linear-gradient(135deg, #5B3DF5 0%, #7C3AED 100%)",
              boxShadow: "0 6px 16px rgba(91,61,245,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 7v5c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V7L12 2z"
                  stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "#111827" }}>
              cash<span style={{ color: "#5B3DF5" }}>via</span>
            </span>
          </div>

          {/* RBI Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 12px", borderRadius: 999,
              background: "linear-gradient(90deg, #F0FDF4, #ECFDF5)",
              border: "1px solid #A7F3D0",
              boxShadow: "0 2px 8px rgba(16,185,129,0.08)"
            }}
          >
            <ShieldCheck size={14} color="#059669" />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#065F46", letterSpacing: "0.01em" }}>
              RBI Registered
            </span>
          </motion.div>
        </motion.header>

        {/* ══════════════════════════════════════════
            SCROLLABLE BODY
            ══════════════════════════════════════════ */}
        <div style={{ padding: "0 24px" }}>

          {/* ══════════════════════════════════════════
              2. HERO COMPOSITION (Advanced 3D Layering)
              ══════════════════════════════════════════ */}
          <motion.div
            {...scaleIn(0.1)}
            style={{ marginTop: 60, marginBottom: 40, position: "relative", height: 280, display: "flex", justifyContent: "center" }}
          >
            {/* Massive Background Glowing Orbs */}
            <motion.div
              className="animate-float-slow"
              style={{
                position: "absolute", top: -40, left: "10%", zIndex: 0,
                width: 140, height: 140, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(91,61,245,0.3) 0%, transparent 70%)",
                filter: "blur(24px)"
              }}
            />
            <motion.div
              className="animate-float-reverse"
              style={{
                position: "absolute", bottom: -20, right: "5%", zIndex: 0,
                width: 180, height: 180, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)",
                filter: "blur(32px)"
              }}
            />

            {/* Background Layer: Shield & Lightning */}
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [-5, 0, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: 10, right: 30, zIndex: 5, opacity: 0.6 }}
            >
              <svg width="60" height="72" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))" }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(255,255,255,0.7)" stroke="#E5E7EB" strokeWidth="0.5"/>
              </svg>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: 40, right: 45, zIndex: 6 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#FDE047" stroke="#CA8A04" strokeWidth="1"/></svg>
            </motion.div>

            {/* Mid Layer: The Smartphone Mockup */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", left: 10, top: 40, zIndex: 10,
                width: 110, height: 210, borderRadius: 24,
                background: "linear-gradient(135deg, #1F2937, #111827)",
                padding: 4, boxShadow: "0 24px 48px rgba(0,0,0,0.3)", border: "1px solid #374151",
                transform: "rotate(-8deg)"
              }}
            >
              <div style={{ width: "100%", height: "100%", borderRadius: 20, background: "#030712", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,185,129,0.2) 0%, transparent 100%)" }} />
                <div style={{ padding: 12, textAlign: "center", paddingTop: 40 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#10B981", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(16,185,129,0.5)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div style={{ width: "80%", height: 6, background: "#34D399", borderRadius: 3, margin: "0 auto 8px" }} />
                  <div style={{ width: "50%", height: 4, background: "#374151", borderRadius: 2, margin: "0 auto" }} />
                </div>
              </div>
            </motion.div>

            {/* Foreground Layer: Hyper-Premium Loan Card */}
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [2, -2, 2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", right: 10, top: 20, zIndex: 20,
                width: 260, height: 160, borderRadius: 24,
                background: "linear-gradient(135deg, rgba(55,48,163,0.95) 0%, rgba(91,61,245,0.95) 50%, rgba(139,92,246,0.95) 100%)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 32px 64px -12px rgba(91,61,245,0.4), inset 0 2px 4px rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between",
                overflow: "hidden"
              }}
            >
              {/* Card Hologram Effect */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "50%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", transform: "skewX(-20deg)", zIndex: 5 }}
              />
              
              <div style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: 800, letterSpacing: "-0.02em" }}>cashvia</span>
                <div style={{ width: 36, height: 26, borderRadius: 6, background: "linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)", border: "1px solid #D97706", boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.6)" }} />
              </div>
              <div style={{ position: "relative", zIndex: 10 }}>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 2 }}>Limit</p>
                <p style={{ color: "white", fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em" }}>₹5,00,000</p>
              </div>
            </motion.div>

            {/* Floating Sparkles & Coins */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: 0, left: "40%", zIndex: 25 }}
            >
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #FCD34D, #F59E0B)", boxShadow: "0 8px 16px rgba(245, 158, 11, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#B45309", fontWeight: 800, fontSize: 16 }}>₹</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{ position: "absolute", bottom: 20, right: -10, zIndex: 25, fontSize: 24, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}
            >
              ✨
            </motion.div>

            {/* Floating Disbursal Chip */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{
                position: "absolute", bottom: -10, left: 20, zIndex: 30,
                background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid white",
                padding: "8px 16px", borderRadius: 100, boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                display: "flex", alignItems: "center", gap: 6
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 12px #10B981" }} />
              <span style={{ fontSize: 13, fontWeight: 800, color: "#111827" }}>5 Min Disbursal</span>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════════════
              3. HERO CONTENT
              ══════════════════════════════════════════ */}
          <motion.div
            {...fadeUp(0.2)}
            style={{ marginTop: 64, textAlign: "center" }}
          >
            <h1 style={{
              fontSize: 44,
              fontWeight: 900,
              color: "#030712",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              margin: 0,
            }}>
              Money when you
              <br />
              <span style={{
                background: "linear-gradient(135deg, #5B3DF5 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>need it most.</span>
            </h1>
          </motion.div>

          <motion.p
            {...fadeUp(0.25)}
            style={{
              marginTop: 20,
              textAlign: "center",
              fontSize: 17,
              color: "#4B5563",
              lineHeight: 1.6,
              padding: "0 12px",
              fontWeight: 500,
              letterSpacing: "-0.01em"
            }}
          >
            Get an instant personal loan from{" "}
            <strong style={{ color: "#111827", fontWeight: 700 }}>₹10,000</strong> to{" "}
            <strong style={{ color: "#111827", fontWeight: 700 }}>₹5,00,000</strong>.
            <br />No paperwork. No branch visit.
          </motion.p>

          {/* ══════════════════════════════════════════
              4. PRIMARY CTA
              ══════════════════════════════════════════ */}
          <motion.div
            {...scaleIn(0.35)}
            style={{ marginTop: 32 }}
          >
            <motion.button
              id="check-eligibility-btn"
              onClick={() => router.push("/auth/mobile")}
              whileTap={{ scale: 0.96 }}
              style={{
                width: "100%",
                height: 60,
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(135deg, #5B3DF5 0%, #7C3AED 100%)",
                boxShadow: "0 12px 32px rgba(91,61,245,0.35), inset 0 2px 4px rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                color: "white",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                fontFamily: "Inter, sans-serif",
                position: "relative",
              }}
            >
              Check Eligibility — It&apos;s Free
              <ArrowRight size={20} strokeWidth={2.5} />
            </motion.button>
          </motion.div>

          {/* ══════════════════════════════════════════
              5. STATISTICS
              ══════════════════════════════════════════ */}
          <motion.div
            {...fadeUp(0.4)}
            style={{
              marginTop: 32,
              background: "white",
              borderRadius: 24,
              padding: "8px 0",
              boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
              border: "1px solid #F3F4F6",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
              {stats.map((s, i) => (
                <div
                  key={s.value}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "16px 8px",
                    position: "relative",
                  }}
                >
                  {i > 0 && (
                    <div style={{
                      position: "absolute", left: 0, top: "25%", bottom: "25%",
                      width: 1, background: "#F3F4F6",
                    }} />
                  )}
                  <span style={{ fontSize: 19, fontWeight: 800, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {s.value}
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#6B7280", marginTop: 6, textAlign: "center", lineHeight: 1.2 }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════
              6. FEATURES SECTION
              ══════════════════════════════════════════ */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.45 } } }}
            style={{ marginTop: 48 }}
          >
            {/* Section label */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, #E5E7EB)" }} />
              <p style={{
                fontSize: 12,
                fontWeight: 800,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                margin: 0,
              }}>
                Why choose Cashvia
              </p>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, #E5E7EB, transparent)" }} />
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                  whileHover={{ scale: 1.02, y: -4, boxShadow: "var(--shadow-floating)" }}
                  className="glass-card"
                  style={{
                    background: f.bg,
                    borderRadius: 28,
                    padding: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    boxShadow: "var(--shadow-md)",
                    border: `1px solid ${f.border}`,
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s var(--ease-smooth)"
                  }}
                >
                  {/* Subtle background glow */}
                  <div style={{
                    position: "absolute", top: -30, right: -30, width: 120, height: 120,
                    background: "rgba(255,255,255,0.8)", borderRadius: "50%", filter: "blur(24px)", opacity: 0.8
                  }} />

                  {/* 3D Glass Accent Line */}
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(180deg, #5B3DF5, #4ADE80)", opacity: 0.7, borderRadius: "28px 0 0 28px" }} />

                  {/* Custom Illustration */}
                  <div style={{ flexShrink: 0, filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))" }}>
                    {f.illustration}
                  </div>

                  <div style={{ position: "relative", zIndex: 10 }}>
                    <p style={{ fontSize: 18, fontWeight: 800, color: "#111827", lineHeight: 1.2, marginBottom: 6, letterSpacing: "-0.015em" }}>
                      {f.title}
                    </p>
                    <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.5, fontWeight: 500 }}>
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════
              7. FOOTER
              ══════════════════════════════════════════ */}
          <motion.div
            {...fadeUp(0.6)}
            style={{
              marginTop: 48,
              paddingBottom: 24,
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.7, fontWeight: 500 }}>
              By continuing, you agree to our{" "}
              <span style={{ color: "#5B3DF5", fontWeight: 700, cursor: "pointer" }}>Terms of Service</span>
              {" "}&amp;{" "}
              <span style={{ color: "#5B3DF5", fontWeight: 700, cursor: "pointer" }}>Privacy Policy</span>
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 }}>
              <ShieldCheck size={14} color="#9CA3AF" />
              <p style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 600, margin: 0 }}>
                256-bit SSL · Data never shared
              </p>
            </div>
          </motion.div>

        </div>{/* /padding wrapper */}

        {/* ══ Fixed bottom navigation ══ */}
        <BottomNav />

      </div>
    </PageTransition>
  );
}
