// All page copy lives here so components stay purely presentational.

export const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Services", href: "#services", dropdown: true },
  { label: "About Us", href: "#about" },
  { label: "Resources", href: "#blog" },
  { label: "Contact", href: "#contact" },
  { label: "En", href: "#" },
];

// Text placeholders stand in for real partner logos.
export const partners: { name: string; color: string; bare?: boolean }[] = [
  { name: "BRUNEAU", color: "#1b4fa0" },
  { name: "fives", color: "#b0127a" },
  { name: "LAPLANTE", color: "#c8102e", bare: true },
  { name: "AEC", color: "#14287a", bare: true },
  { name: "Systemex", color: "#0d3b7a", bare: true },
  { name: "Solumation", color: "#333333", bare: true },
  { name: "FRACO", color: "#1f4fb4" },
  { name: "DEFLEX", color: "#1e5a2a", bare: true },
  { name: "Lassonde", color: "#d8222a" },
  { name: "KOPERS", color: "#0d1b2a" },
  { name: "MATISS", color: "#2b2b2b" },
  { name: "ACCS", color: "#004a8f" },
  { name: "Soteck", color: "#003d79" },
  { name: "PCI", color: "#e2001a" },
  { name: "Frontmatec", color: "#00539b" },
];

export const stats = [
  { value: "500+", label: "International candidates recruited" },
  { value: "100+", label: "Partner companies" },
  { value: "37", label: "Open positions" },
];

export const steps = [
  {
    title: "Analysis of your project",
    body: "First, we get to know you and provide you with the key information you need to make your project a success.",
  },
  {
    title: "Connecting with employers",
    body: "Then we put you in touch with our partners according to your expertise and preferences, and share your application.",
  },
  {
    title: "Obtaining your work permit",
    body: "We'll help you step by step to obtain the work permit that best suits your situation.",
  },
  {
    title: "Expatriation procedures",
    body: "Whether you want to leave on your own or accompanied, our International Mobility team can advise you on all aspects of expatriation.",
  },
  {
    title: "Start your new life!",
    body: "The final step in your immigration process: you're now ready to start your new life in Canada.",
  },
];

export const services = [
  {
    title: "International Recruitment",
    body: "Looking for key talent to accelerate your growth? Our network of international candidates is ready to meet you.",
  },
  {
    title: "Immigration",
    body: "Have you found the perfect candidate and want to help them with the immigration process? Our team can help you.",
  },
];

export const posts = [
  "A complete guide to construction immigration in Quebec",
  "Recruiting workers in Tunisia",
  "Recruiting workers in Morocco",
];

export const footerColumns = [
  {
    heading: "Navigation",
    links: [
      { label: "Home", href: "#" },
      { label: "About us", href: "#about" },
      { label: "Resources", href: "#blog" },
      { label: "Site map", href: "#" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "International Recruitment", href: "#services" },
      { label: "Immigration", href: "#services" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Policies", href: "#" },
      { label: "Privacy & Preferences Centre", href: "#" },
    ],
  },
];
