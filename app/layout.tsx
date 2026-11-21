import type { Metadata } from "next";
import { Suspense } from "react";
import { ActiveNav, Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";
import "@/styles/blocks.css";
import "@/styles/listing.css";
import "@/styles/prose.css";

export const metadata: Metadata = {
  title: {
    default: "Horizon Recrutement Canada | Immigration and International Recruitment",
    template: "%s | Horizon Recrutement Canada",
  },
  description:
    "Horizon Recrutement Canada helps Canadian employers hire skilled international talent and guides candidates through every step of immigrating to Canada.",
};

// The original site uses the system-ui font stack (see --font in globals.css),
// so no next/font import is needed.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {/* usePathname can suspend for params unknown at build time (e.g. 404 slugs). */}
        <Suspense fallback={<Nav pathname={null} />}>
          <ActiveNav />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
