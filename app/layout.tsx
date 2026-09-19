import type { Metadata, Viewport } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const siteDescription =
  "Software developer building terminal tools, mobile apps, web experiments, and the infrastructure behind them.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ishaanjindal.tech"),
  title: {
    default: "Ishaan Jindal — Software Developer",
    template: "%s — Ishaan Jindal",
  },
  description: siteDescription,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ishaan Jindal — Software Developer",
    description: siteDescription,
    url: "https://ishaanjindal.tech",
    siteName: "Ishaan Jindal",
    images: [
      {
        url: "/og.jpg",
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
    title: "Ishaan Jindal — Software Developer",
    description: siteDescription,
    images: ["/og.jpg"],
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
        className={`${interTight.variable} ${geistMono.variable} antialiased relative min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <Header />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
