"use client";

import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

/* ─── SVG Icons ─────────────────────────────── */
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15.5V15.5H8.5V21H4C3.45 21 3 20.55 3 20V10.5Z"
      fill={active ? "rgba(91,61,245,0.12)" : "none"}
      stroke={active ? "#5B3DF5" : "#9CA3AF"}
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
  </svg>
);

const HistoryIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12" cy="12" r="9"
      stroke={active ? "#5B3DF5" : "#9CA3AF"}
      strokeWidth="1.75"
      fill={active ? "rgba(91,61,245,0.10)" : "none"}
    />
    <path
      d="M12 7v5l3 3"
      stroke={active ? "#5B3DF5" : "#9CA3AF"}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ContactIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"
      stroke={active ? "#5B3DF5" : "#9CA3AF"}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? "rgba(91,61,245,0.10)" : "none"}
    />
  </svg>
);

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12" cy="8" r="3.75"
      stroke={active ? "#5B3DF5" : "#9CA3AF"}
      strokeWidth="1.75"
      fill={active ? "rgba(91,61,245,0.10)" : "none"}
    />
    <path
      d="M4.5 20.5C4.5 17.46 8 15 12 15C16 15 19.5 17.46 19.5 20.5"
      stroke={active ? "#5B3DF5" : "#9CA3AF"}
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── Nav config ─────────────────────────────── */
const LEFT_ITEMS = [
  { id: "home",    label: "Home",    href: "/welcome",      Icon: HomeIcon    },
  { id: "history", label: "History", href: "/auth/mobile",  Icon: HistoryIcon },
];

const RIGHT_ITEMS = [
  { id: "contact", label: "Contact Us", href: "/contact",     Icon: ContactIcon },
  { id: "profile", label: "Profile",    href: "/auth/mobile", Icon: ProfileIcon },
];

/* ─── NavTab ─────────────────────────────────── */
function NavTab({
  label,
  href,
  Icon,
  active,
  onClick,
}: {
  label: string;
  href: string;
  Icon: React.ComponentType<{ active: boolean }>;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "0",
        height: "100%",
        WebkitTapHighlightColor: "transparent", // Remove tap highlight
      }}
    >
      <Icon active={active} />
      <span
        style={{
          fontSize: 10.5,
          fontWeight: active ? 700 : 500,
          color: active ? "#5B3DF5" : "#9CA3AF",
          lineHeight: 1,
          fontFamily: "Inter, sans-serif",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* ─── Main component ─────────────────────────── */
export function BottomNav() {
  const router   = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href === "/welcome" && pathname === "/");

  return (
    <>
      {/* Spacer */}
      <div style={{ height: "calc(72px + env(safe-area-inset-bottom, 0px))" }} />

      {/* Fixed bottom wrapper */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        {/* Main container */}
        <div
          style={{
            width: "100%",
            maxWidth: 430,
            position: "relative",
            pointerEvents: "auto",
          }}
        >
          {/* Glassmorphism Navigation Bar */}
          <div
            style={{
              height: 72,
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: "24px 24px 0 0",
              boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.04)",
              display: "flex",
              alignItems: "center",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
              borderTop: "1px solid rgba(0, 0, 0, 0.02)",
            }}
          >
            {/* Left Items */}
            <div style={{ flex: 1, display: "flex", height: "100%" }}>
              {LEFT_ITEMS.map((item) => (
                <NavTab
                  key={item.id}
                  {...item}
                  active={isActive(item.href)}
                  onClick={() => router.push(item.href)}
                />
              ))}
            </div>

            {/* Center Gap for FAB */}
            <div style={{ width: 80 }} />

            {/* Right Items */}
            <div style={{ flex: 1, display: "flex", height: "100%" }}>
              {RIGHT_ITEMS.map((item) => (
                <NavTab
                  key={item.id}
                  {...item}
                  active={isActive(item.href)}
                  onClick={() => router.push(item.href)}
                />
              ))}
            </div>
          </div>

          {/* Floating Action Button (FAB) */}
          <motion.button
            onClick={() => router.push("/auth/mobile")}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: -24, // Elevate 24px above the 72px bar
              left: "50%",
              marginLeft: -30, // Center exactly (width 60 / 2)
              width: 60,
              height: 60,
              borderRadius: 30,
              border: "none",
              background: "#5B3DF5",
              boxShadow: "0 8px 24px rgba(91, 61, 245, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              padding: 0,
            }}
          >
            {/* White Plus Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </>
  );
}
