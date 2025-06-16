import type { Metadata } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";
import { Toaster } from "react-hot-toast";
import { Lexend_Deca } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://sanai.live"),
  title: {
    default: "SanAI | Your Personal AI Doctor",
    template: `%s - SanAI`,
  },
  description:
    "SanAI is your personal AI doctor, providing personalized health insights and recommendations.",
  keywords: [
    "AI",
    "artificial intelligence",
    "personal doctor",
    "health",
    "recommendations",
    "AI assistant",
    "health insights",
    "research",
    "image analysis",
  ],
  authors: [{ name: " Team", url: "https://sanai.live" }],
  category: "Technology",
  applicationName: "SanAI",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "SanAI | Your Personal AI Doctor",

    description:
      "SanAI is your personal AI doctor, providing personalized health insights and recommendations.",
    creator: "@ai",
    site: "@ai",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "SanAI",
      },
    ],
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "any" }],
    shortcut: "/favicon.png",
  },
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
        className={`${font.className} bg-[#eafff3] antialiased overflow-x-hidden`}
      >
        <ReactLenis root>
          {children}
          <Toaster />
        </ReactLenis>
      </body>
    </html>
  );
}
