import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pageflock — Analytics for everything you build",
    template: "%s · Pageflock",
  },
  description:
    "One calm analytics home for your products, sites and launches. See what changed, what deserves attention and what happened after you shipped.",
  metadataBase: new URL("https://pageflock.com"),
  openGraph: {
    title: "Pageflock — You shipped it. See what happened.",
    description:
      "Multi-project analytics with attention signals, release receipts and launch tracking.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
