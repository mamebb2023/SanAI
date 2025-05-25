import type { Metadata } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "SanAI | Your Personal AI Doctor",
  description:
    "SanAI is your personal AI doctor, providing personalized health insights and recommendations.",
};

const font = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-[#000111] text-white antialiased`}>
        <ReactLenis root>
          {children}
          <Toaster />
        </ReactLenis>
      </body>
    </html>
  );
}
