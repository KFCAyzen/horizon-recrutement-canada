import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talentech | Design practice reproduction",
  description:
    "Practice reproduction of an immigration and international recruitment homepage.",
};

// The original site uses the system-ui font stack (see --font in globals.css),
// so no next/font import is needed.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
