"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, MapPin, ArrowLeft, Clock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { BottomNav } from "@/components/layout/BottomNav";

const contactMethods = [
  {
    icon: <Phone size={22} color="#5B3DF5" />,
    title: "24x7 Toll Free Support",
    desc: "1800-123-4567 / 1800-987-6543",
    action: "Call Now",
    href: "tel:18001234567",
    bg: "#F5F3FF",
  },
  {
    icon: <MessageSquare size={22} color="#10B981" />,
    title: "WhatsApp Chat Support",
    desc: "Instant automated & agent help",
    action: "Chat on WhatsApp",
    href: "https://wa.me/919876543210",
    bg: "#ECFDF5",
  },
  {
    icon: <Mail size={22} color="#3B82F6" />,
    title: "Email Support",
    desc: "support@cashvia.in",
    action: "Send Email",
    href: "mailto:support@cashvia.in",
    bg: "#EFF6FF",
  },
  {
    icon: <MapPin size={22} color="#F59E0B" />,
    title: "Registered Office",
    desc: "Cashvia Financial Services Pvt Ltd, Tech Park, Outer Ring Rd, Bengaluru 560103",
    action: "View Map",
    href: "#",
    bg: "#FFFBEB",
  },
];

export default function ContactPage() {
  const router = useRouter();

  return (
    <PageTransition>
      <div style={{ background: "#FAFAFA", minHeight: "100dvh", fontFamily: "Inter, sans-serif" }}>
        {/* Header */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #F0EFF8",
            height: 64,
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: 16,
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              border: "none",
              background: "#F5F3FF",
              width: 38,
              height: 38,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={20} color="#5B3DF5" />
          </button>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: "#0F0F1A", margin: 0 }}>Contact Us</h1>
            <p style={{ fontSize: 11, color: "#6B7280", margin: 0 }}>We are here to help you 24x7</p>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: "24px 20px" }}>
          {/* Support Banner */}
          <div
            style={{
              borderRadius: 24,
              padding: 20,
              background: "linear-gradient(135deg, #5B3DF5 0%, #7C3AED 100%)",
              color: "white",
              boxShadow: "0 12px 32px rgba(91,61,245,0.28)",
              marginBottom: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Clock size={20} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Fast Resolution Guaranteed</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
              How can we assist you today?
            </h2>
            <p style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.5, margin: 0 }}>
              Reach out via any of our official support channels below for loan queries, disbursal status, or account help.
            </p>
          </div>

          {/* Contact Methods List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {contactMethods.map((method, idx) => (
              <motion.a
                key={method.title}
                href={method.href}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                style={{
                  background: "white",
                  borderRadius: 20,
                  padding: 18,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  textDecoration: "none",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  border: "1px solid #F0EFF8",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: method.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {method.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F0F1A", margin: "0 0 4px 0" }}>
                    {method.title}
                  </h3>
                  <p style={{ fontSize: 12, color: "#6B7280", margin: "0 0 8px 0", lineHeight: 1.4 }}>
                    {method.desc}
                  </p>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#5B3DF5",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {method.action} &rarr;
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Security Note */}
          <div
            style={{
              marginTop: 24,
              padding: 16,
              borderRadius: 16,
              background: "#ECFDF5",
              border: "1px solid rgba(16,185,129,0.2)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <ShieldCheck size={24} color="#059669" />
            <p style={{ fontSize: 11.5, color: "#065F46", margin: 0, lineHeight: 1.4 }}>
              <strong>Official Security Warning:</strong> Cashvia representatives never ask for personal PINs, OTPs, or upfront processing fee transfers via UPI.
            </p>
          </div>
        </div>

        <BottomNav />
      </div>
    </PageTransition>
  );
}
