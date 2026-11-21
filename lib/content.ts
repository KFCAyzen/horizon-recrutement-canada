// Page structure (hrefs, images) combined with the localized text from lib/i18n/messages.
import type { StaticImageData } from "next/image";
import type { Messages } from "./i18n/messages/en";
import { routes } from "./site";

// Static imports: next/image gets intrinsic sizes, AVIF/WebP variants and a blur placeholder.
// Sources: Magnific stock photos; resized by scripts/optimize-images.mjs.
import heroMontreal from "@/assets/images/hero-montreal.jpg";
import headerRecruitment from "@/assets/images/header-recruitment.jpg";
import headerImmigration from "@/assets/images/header-immigration.jpg";
import servicesRecruitment from "@/assets/images/services-recruitment.jpg";
import servicesImmigration from "@/assets/images/services-immigration.jpg";
import aboutApproach from "@/assets/images/about-approach.jpg";

export type ImageSrc = StaticImageData | string;

export const images = {
  hero: heroMontreal,
  headerRecruitment,
  headerImmigration,
  servicesRecruitment,
  servicesImmigration,
  aboutApproach,
};

export type Step = { title: string; body: string | string[] };
export type Value = { title: string; body: string };

export function buildContent(m: Messages) {
  const s = m.servicesPage;
  const r = m.recruitmentPage;
  const i = m.immigrationPage;
  const a = m.aboutPage;

  const home = {
    stats: [
      { key: "candidates", value: "500+", label: m.home.stats.candidates },
      { key: "partners", value: "100+", label: m.home.stats.partners },
      { key: "positions", value: "37", label: m.home.stats.positions },
    ],
    steps: m.home.process.steps satisfies Step[],
    services: [
      { ...m.home.services.cards[0], href: routes.recruitment },
      { ...m.home.services.cards[1], href: routes.immigration },
    ],
  };

  const servicesPage = {
    header: { ...s.header, cta: { label: s.header.cta, href: routes.contact } },
    sections: [
      { ...s.sections[0], cta: { label: s.sections[0].cta, href: routes.recruitment }, image: images.servicesRecruitment },
      { ...s.sections[1], cta: { label: s.sections[1].cta, href: routes.immigration }, image: images.servicesImmigration },
    ],
    cta: s.banner,
  };

  const recruitmentPage = {
    header: { ...r.header, cta: { label: r.header.cta, href: routes.contact }, image: images.headerRecruitment },
    process: {
      eyebrow: r.process.eyebrow,
      title: r.process.title,
      lead: r.process.lead,
      steps: r.process.steps satisfies Step[],
      ctaCard: { title: r.process.ctaTitle, link: { label: r.process.ctaLink, href: routes.contact } },
    },
    advantages: { ...r.advantages, cta: { label: r.advantages.cta, href: routes.contact } satisfies { label: string; href: string }, items: r.advantages.items satisfies Value[] },
    cta: r.banner,
  };

  const immigrationPage = {
    header: { ...i.header, cta: { label: i.header.cta, href: routes.contact }, image: images.headerImmigration },
    services: {
      eyebrow: i.services.eyebrow,
      title: i.services.title,
      lead: i.services.lead,
      steps: i.services.steps satisfies Step[],
      ctaCard: { title: i.services.ctaTitle, body: i.services.ctaBody, link: { label: i.services.ctaLink, href: routes.contact } },
    },
    cta: i.banner,
  };

  const aboutPage = {
    header: a.header,
    advantage: { ...a.advantage, steps: a.advantage.steps satisfies Step[] },
    approach: { ...a.approach, image: images.aboutApproach },
    commitment: { ...a.commitment, items: a.commitment.items satisfies Value[] },
    ctaLabel: a.ctaLabel,
  };

  return {
    home,
    servicesPage,
    recruitmentPage,
    immigrationPage,
    aboutPage,
    jobsPage: m.jobsPage,
    resourcesPage: m.resourcesPage,
    contactPage: m.contactPage,
  };
}
