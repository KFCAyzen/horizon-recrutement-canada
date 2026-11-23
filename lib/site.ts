// Route table and business contact details shared across the site.
// Link labels live in lib/i18n/messages; hrefs here are locale-neutral (the Link component adds /en or /fr).

export const routes = {
  home: "/",
  services: "/services",
  recruitment: "/services/international-recruitment",
  immigration: "/services/immigration",
  about: "/about",
  resources: "/resources",
  contact: "/contact",
  becomeClient: "/become-a-client",
  becomePartner: "/become-a-partner",
  jobs: "/jobs",
  siteMap: "/site-map",
  policies: "/policies",
} as const;

export const brand = {
  name: "Horizon Recrutement Canada",
  short: "Horizon",
};

export type Contact = {
  phone: string | null;
  /** tel: link, e.g. "tel:+15145550000" */
  phoneHref: string | null;
  email: string | null;
  address: string[] | null;
  hours: { days: string; time: string } | null;
  /** Licence/permit numbers the business actually holds, one per line. */
  permits: string[];
};

// TODO(contact): fill in Horizon Recrutement Canada's real details.
// Anything left null/empty is not rendered, so nothing made-up ever shows on the site.
export const contact: Contact = {
  phone: "514 664-2724",
  phoneHref: "tel:+15146642724",
  email: "contact@horizonrecrutement.ca",
  address: ["59 Jessie St", "L6Y 1L5"],
  hours: null,
  permits: [],
};
