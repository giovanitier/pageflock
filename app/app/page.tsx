import type { Metadata } from "next";
import PageflockDashboard from "@/components/pageflock-dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function AppPage() {
  return <PageflockDashboard />;
}
