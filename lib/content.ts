// Page copy, kept out of components so they stay presentational.
import type { StaticImageData } from "next/image";
import { routes } from "./site";

// Static imports: next/image gets intrinsic sizes, AVIF/WebP variants and a blur placeholder.
// Sources: Magnific stock (see /credits); resized by scripts/optimize-images.mjs.
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

/* ---------------------------------- Home ---------------------------------- */
export const home = {
  stats: [
    { value: "500+", label: "International candidates recruited" },
    { value: "100+", label: "Partner companies" },
    { value: "37", label: "Open positions" },
  ],
  steps: [
    { title: "Analysis of your project", body: "First, we get to know you and provide you with the key information you need to make your project a success." },
    { title: "Connecting with employers", body: "Then we put you in touch with our partners according to your expertise and preferences, and share your application." },
    { title: "Obtaining your work permit", body: "We'll help you step by step to obtain the work permit that best suits your situation." },
    { title: "Expatriation procedures", body: "Whether you want to leave on your own or accompanied, our International Mobility team can advise you on all aspects of expatriation." },
    { title: "Start your new life!", body: "The final step in your immigration process: you're now ready to start your new life in Canada." },
  ] satisfies Step[],
  services: [
    { title: "International Recruitment", body: "Looking for key talent to accelerate your growth? Our network of international candidates is ready to meet you.", href: routes.recruitment },
    { title: "Immigration", body: "Have you found the perfect candidate and want to help them with the immigration process? Our team can help you.", href: routes.immigration },
  ],
};

/* -------------------------------- Services -------------------------------- */
export const servicesPage = {
  header: {
    eyebrow: "Business services",
    title: "Simplify your international talent acquisition",
    lead: "Don't let labor shortages hold your business back. Discover the Talentech experience: key talent acquisition solutions designed to simplify the hiring of foreign talent.",
    cta: { label: "Hire now", href: routes.contact },
  },
  sections: [
    {
      kicker: "International Recruitment",
      title: "Fill your key positions with top talent",
      body: "Recruiting key talent is one of the most important success factors. Don't limit yourself to your own geographic region! Our permanent recruitment service gives you access to an unrivalled pool of international talent.",
      cta: { label: "Let's discuss your needs", href: routes.recruitment },
      image: images.servicesRecruitment,
      alt: "Recruiter shaking hands with a job candidate in a bright office",
    },
    {
      kicker: "Immigration",
      title: "Accompany your international candidates in their immigration procedures",
      body: "Have you found the perfect candidate and would like to support him or her through the immigration process? Let us explain how our team can support you.",
      cta: { label: "Contact an expert", href: routes.immigration },
      image: images.servicesImmigration,
      alt: "Passport being handed over a desk of travel and visa documents",
    },
  ],
  cta: "Your immigration or international recruitment project starts here!",
};

/* ------------------------ International Recruitment ----------------------- */
export const recruitmentPage = {
  header: {
    eyebrow: "Find your global talent",
    title: "International Recruitment",
    lead: "Our international recruitment agency specializes in sourcing and selecting exceptional talent from around the world to meet your company's unique needs. With our strategic approach and global relationships, we facilitate the acquisition of highly qualified professionals who will contribute to your company's continued growth and innovation.",
    cta: { label: "Get a quote", href: routes.contact },
    image: images.headerRecruitment,
    alt: "Smiling technician in a hard hat holding a tablet on a factory floor",
  },
  process: {
    eyebrow: "Our international recruitment process",
    title: "A simplified international recruitment process",
    lead: "Take advantage of our dual expertise in recruitment and Canadian immigration to attract the best talent, wherever they come from.",
    steps: [
      { title: "Needs analysis", body: "In-depth analysis of your recruitment needs and definition of the profile sought." },
      { title: "Strategy development", body: "Definition of a personalized approach based on hiring criteria." },
      { title: "Search and selection", body: "Identification, pre-selection and evaluation of talents corresponding to the required profile." },
      { title: "Managing the immigration process", body: "Complete support for immigration procedures to facilitate the arrival of selected candidates." },
    ] satisfies Step[],
    ctaCard: { title: "Ready to recruit internationally?", link: { label: "Book a consultation", href: routes.contact } },
  },
  advantages: {
    eyebrow: "Our advantages",
    title: "Why choose Talentech?",
    lead: "Canada offers many job opportunities and advancement opportunities. Contact our team to learn more about the working conditions, compensation and benefits you could get based on your experience and expertise.",
    cta: { label: "Contact us today", href: routes.contact },
    items: [
      { title: "International expertise", body: "With our extensive experience in international recruitment, we understand the cultural subtleties and challenges of hiring foreign talent." },
      { title: "Top talent", body: "Our global network enables us to find exceptional candidates who can add immediate value to your team." },
      { title: "Customization", body: "Each talent search is tailored to your unique needs, ensuring a perfect match with your culture and objectives." },
      { title: "Save time and effort", body: "We manage the entire process, allowing you to concentrate on your core business with complete confidence." },
      { title: "Commitment to excellence", body: "Our commitment to quality and customer satisfaction is at the heart of everything we do." },
    ] satisfies Value[],
  },
  cta: "Recruit qualified talent for your positions now!",
};

/* ------------------------------- Immigration ------------------------------- */
export const immigrationPage = {
  header: {
    eyebrow: "Regulated Canadian Immigration Consultant",
    title: "Canadian Immigration Consulting Services",
    lead: "Personalized support for workers and businesses, from analyzing your situation to preparing and following up on your immigration procedures.",
    cta: { label: "Book a consultation", href: routes.contact },
    image: images.headerImmigration,
    alt: "Consultant reviewing paperwork with a client",
  },
  services: {
    eyebrow: "Our services",
    title: "Our solutions cover all aspects of Canadian immigration",
    lead: "Whatever your question, our certified Canadian immigration experts are here to guide you.",
    steps: [
      {
        title: "Work permits",
        body: [
          "Get detailed information on the different types of work permits available, including closed and open permits.",
          "Personalized assistance in choosing the right permit for your situation.",
          "Help in preparing the required documentation and assistance throughout the process.",
        ],
      },
      {
        title: "Permanent residence",
        body: [
          "Assistance in obtaining the Certificat de Sélection du Québec (CSQ).",
          "Find out about permanent residency programs such as the Programme Régulier des Travailleurs Qualifiés (PRTQ) or the Programme de l'Expérience Québécoise (PEQ).",
          "Complete evaluation of your eligibility and help in building a solid file.",
        ],
      },
      {
        title: "Validated job offer",
        body: "Preparation of documentation required for the validation process of a permanent job offer with the Ministère de l'Immigration, de la Francisation et de l'Intégration (MIFI).",
      },
      { title: "Employer portal", body: "Assistance in creating a job offer on the Canadian government website's employer portal." },
      {
        title: "Study permits",
        body: [
          "Information on study programs and educational institutions in Canada.",
          "Help with applying for a study permit, including financial requirements and necessary documents.",
        ],
      },
      {
        title: "Visitor visa applications",
        body: [
          "Assistance in applying for a visitor's visa to Canada.",
          "Preparation of the documentation needed to demonstrate your intentions for a temporary visit.",
        ],
      },
      {
        title: "Additional services",
        body: [
          "Individual consultations to assess your specific situation.",
          "Assistance with decision appeals, reviews and appeals of refusals.",
        ],
      },
    ] satisfies Step[],
    ctaCard: {
      title: "Do you have an immigration project?",
      body: "Each service is designed to provide a stress-free and efficient experience, guiding you through the complexities of the Canadian immigration system.",
      link: { label: "Get a quote", href: routes.contact },
    },
  },
  cta: "Recruit qualified talent for your urgent positions now!",
};

/* ---------------------------------- About ---------------------------------- */
export const aboutPage = {
  header: {
    eyebrow: "About Talentech",
    title: "Talentech, your partner in immigration and international recruitment",
    lead: "Talentech supports Canadian companies with their international recruitment efforts and assists foreign workers with their immigration applications to Canada. From hiring to obtaining the necessary authorizations, we offer personalized support at every stage of the process.",
  },
  advantage: {
    eyebrow: "What sets us apart",
    title: "Why work with TalenTech?",
    lead: "Our combined expertise in international recruitment and immigration enables us to support companies and workers at every stage of their project. We prioritize a personalized, thorough approach tailored to each situation.",
    steps: [
      { title: "Dual Expertise", body: "Our expertise in immigration and recruitment allows us to support companies and workers at every stage of their project." },
      { title: "Personalized Approach", body: "Every assignment is unique. We tailor our support to the company's needs and the specific circumstances of each immigration or recruitment project." },
      { title: "Rigorous process", body: "We provide structured support and rigorous follow-up at every stage, from recruitment through the immigration process." },
      { title: "Proven success", body: "Our track record speaks for itself. We've helped many companies find the talent they need to thrive." },
    ] satisfies Step[],
  },
  approach: {
    kicker: "Our approach",
    title: "We understand that each company is unique, and that each position requires specific skills and qualities.",
    body: "That's why we take a personalized approach to every recruitment assignment. We work closely with our customers to understand their needs, corporate culture and long-term aspirations, in order to find the ideal candidate.",
    image: images.aboutApproach,
    alt: "Diverse leadership team meeting in a modern office",
  },
  commitment: {
    eyebrow: "Our commitment",
    title: "Our customers' interests at the heart of every decision we make",
    lead: "From our earliest days, we have adopted a customer-centric philosophy, ensuring that every choice, every initiative and every approach reflects not only our expertise, but also the needs, aspirations and goals of those we serve.",
    items: [
      { title: "Excellence", body: "We always strive for excellence in everything we do, from finding the best candidates to seamlessly managing the entire process." },
      { title: "Partnership", body: "We see our customers as full partners, working hand in hand to achieve their recruitment objectives." },
      { title: "Integrity", body: "Integrity is at the heart of our business. We treat every candidate and every customer with respect and ethics." },
    ] satisfies Value[],
  },
  ctaLabel: "Let's work together!",
};

/* ------------------------------ Jobs / Resources ------------------------------ */
export const jobsPage = {
  eyebrow: "Finding a job in Canada",
  title: "Find a job in Canada with Talentech!",
  lead: "Would you like to breathe new life into your career and find a job in Canada? You've come to the right place! Discover our international recruitment support program for positions with a physical presence in Canada, and remote hiring with a Canadian employer through Talentech.",
};

export const resourcesPage = {
  eyebrow: "Resources",
  title: "Talentech blog: discover the latest news on immigration and international recruitment",
  lead: "Our team writes articles on various aspects of the international recruitment, immigration and relocation process.",
};

export const contactPage = {
  eyebrow: "Contact us",
  title: "How can we support you?",
  lead: "Whether your project involves international recruitment or immigration to Canada, our team is here to support you.",
};
