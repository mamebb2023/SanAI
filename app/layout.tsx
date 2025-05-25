import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SanAI | Your Personal AI Doctor",
  description:
    "SanAI is your personal AI doctor, providing personalized health insights and recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-funnel-sans antialiased`}>
        <ReactLenis root>
          {children}
          <Toaster />
        </ReactLenis>
      </body>
    </html>
  );
}
