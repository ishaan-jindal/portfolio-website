import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ishaanjindal.tech"),
  title: "Ishaan Jindal — Developer",
  description:
    "Portfolio of Ishaan Jindal, a Flutter-focused developer interested in clean interfaces, unusual ideas, and system-level problem solving.",
  openGraph: {
    title: "Ishaan Jindal — Developer",
    url: "https://ishaanjindal.tech",
    siteName: "Ishaan Jindal",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ishaan Jindal Portfolio",
      },
    ],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen flex flex-col`}
      >
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-page-texture" />
        </div>

        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
