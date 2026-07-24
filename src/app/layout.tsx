import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cashvia — Instant Personal Loans up to ₹5 Lakhs",
  description:
    "Get instant personal loans from ₹10,000 to ₹5,00,000. 100% online, minimal documents, fast approval. RBI registered NBFC.",
  keywords: "instant loan, personal loan, online loan, quick loan, India, NBFC",
  openGraph: {
    title: "Cashvia — Instant Personal Loans",
    description: "Get instant personal loans up to ₹5 Lakhs. Fast, simple, paperless.",
    type: "website",
    locale: "en_IN",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
  themeColor: "#4f46e5",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        <div className="mobile-container">
          {children}
        </div>
      </body>
    </html>
  );
}
