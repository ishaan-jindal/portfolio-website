import { redirect } from "next/navigation";
import { verifySession } from "@/app/lib/auth";

// Defense-in-depth: proxy.ts gates this subtree at the edge, but the page
// itself must not depend on that — verify the session server-side too.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await verifySession())) {
    redirect("/admin");
  }
  return <>{children}</>;
}
