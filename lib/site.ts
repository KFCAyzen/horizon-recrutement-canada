// Site-wide navigation and contact details shared by Nav, Footer, Contact and Site map.

export const routes = {
  home: "/",
  services: "/services",
  recruitment: "/services/international-recruitment",
  immigration: "/services/immigration",
  about: "/about",
  resources: "/resources",
  contact: "/contact",
  jobs: "/jobs",
  siteMap: "/site-map",
  policies: "/policies",
} as const;

export const serviceLinks = [
  { label: "International Recruitment", href: routes.recruitment },
  { label: "Canadian Immigration Consulting Services", href: routes.immigration },
];

export const navLinks = [
  { label: "Home", href: routes.home },
  { label: "Services", href: routes.services, children: serviceLinks },
  { label: "About Us", href: routes.about },
  { label: "Resources", href: routes.resources },
  { label: "Contact", href: routes.contact },
];

export const footerColumns = [
  {
    heading: "Navigation",
    links: [
      { label: "Home", href: routes.home },
      { label: "About us", href: routes.about },
      { label: "Resources", href: routes.resources },
      { label: "Site map", href: routes.siteMap },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "International Recruitment", href: routes.recruitment },
      { label: "Immigration", href: routes.immigration },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Policies", href: routes.policies },
      { label: "Privacy & Preferences Centre", href: routes.policies },
    ],
  },
];

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
  phone: null,
  phoneHref: null,
  email: null,
  address: null,
  hours: null,
  permits: [],
};
