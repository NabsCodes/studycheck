import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyCheck | Study session",
  applicationName: "StudyCheck",
  description:
    "Compare simulated AI study advice with lecture notes, then keep or revise your own answer.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#151a17" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="antialiased">{children}</body>
    </html>
  );
}
