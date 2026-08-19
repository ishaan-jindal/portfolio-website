import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#0b0d10",
};

const siteDescription =
  "Portfolio of Ishaan Jindal, a Flutter-focused developer interested in clean interfaces, unusual ideas, and system-level problem solving.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ishaanjindal.tech"),
  title: {
    default: "Ishaan Jindal — Developer",
    template: "%s — Ishaan Jindal",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ishaan Jindal — Developer",
    description: siteDescription,
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
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishaan Jindal — Developer",
    description: siteDescription,
    images: ["/og.png"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ishaan Jindal",
  url: "https://ishaanjindal.tech",
  jobTitle: "Software Developer",
  description: siteDescription,
  email: "mailto:ishaanjindal2006@gmail.com",
  sameAs: [
    "https://github.com/ishaan-jindal",
    "https://linkedin.com/in/jindal-ishaan",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
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
