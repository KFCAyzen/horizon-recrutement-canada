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
  credits: "/credits",
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
      { label: "Photo credits", href: routes.credits },
    ],
  },
];

export const contact = {
  phone: "1 (514) 657-8007",
  phoneHref: "tel:+15146578007",
  email: "contact@talentech.ca",
  address: ["1395 Fleury Street East", "Suite 60.2 – P.O. Box 11", "Montreal, QC H2C 1R7", "Canada"],
  hours: { days: "Monday to Friday", time: "9:00 a.m. to 5:00 p.m." },
};
