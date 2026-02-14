import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant'
});

export const metadata: Metadata = {
  title: "WeddingPlan AI - Automated Wedding Planning",
  description: "AI-powered wedding planning assistant that automates vendor discovery and outreach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>{children}</body>
    </html>
  );
}
