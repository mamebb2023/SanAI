import type { Metadata } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";
import { Toaster } from "react-hot-toast";
import { Lexend_Deca } from "next/font/google";

export const metadata: Metadata = {
  title: "SanAI | Your Personal AI Doctor",
  description:
    "SanAI is your personal AI doctor, providing personalized health insights and recommendations.",
};

const font = Lexend_Deca({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} bg-[#00032b] text-white antialiased overflow-x-hidden`}
      >
        <ReactLenis root>
          {children}
          <Toaster />
        </ReactLenis>
      </body>
    </html>
  );
}
