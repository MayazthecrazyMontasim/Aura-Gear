import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/providers/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aura & Gear — Where luxury meets lifestyle.",
  description:
    "Aura & Gear — the World Cup 2026 Collection. Technical athletic jerseys engineered for elite performance. Style that speaks, gear that performs.",
  openGraph: {
    title: "Aura & Gear — World Cup 2026 Collection",
    description: "Where luxury meets lifestyle. Style that speaks, gear that performs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-surface text-ink">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
