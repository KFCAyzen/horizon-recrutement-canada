import type { Metadata } from "next";
import { Suspense } from "react";
import { ActiveNav, Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { I18nProvider } from "@/lib/i18n/client";
import { locales } from "@/lib/i18n/config";
import { getLang, getMessages } from "@/lib/i18n/server";
import "../globals.css";
import "@/styles/blocks.css";
import "@/styles/listing.css";
import "@/styles/prose.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getMessages();
  return {
    title: { default: meta.siteTitle, template: `%s | ${meta.titleSuffix}` },
    description: meta.siteDescription,
  };
}

// The original site uses the system-ui font stack (see --font in globals.css),
// so no next/font import is needed.
export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLang();
  const m = await getMessages();
  // Only what interactive components need crosses to the client.
  const clientMessages = {
    nav: m.nav,
    form: m.form,
    clientForm: m.clientForm,
    partnerForm: m.partnerForm,
    filters: m.filters,
    jobsUi: m.jobsUi,
    resourcesUi: m.resourcesUi,
    home: m.home,
    common: m.common,
  };

  return (
    <html lang={lang}>
      <body>
        <I18nProvider lang={lang} m={clientMessages}>
          {/* usePathname can suspend for params unknown at build time (e.g. 404 slugs). */}
          <Suspense fallback={<Nav pathname={null} />}>
            <ActiveNav />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
