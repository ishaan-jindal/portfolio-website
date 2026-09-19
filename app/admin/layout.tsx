import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Ishaan Jindal",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
};

// CSP nonces require dynamic rendering so Next can inject them per-request
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
