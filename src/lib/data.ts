import type {
  Education,
  Job,
  NavLink,
  Profile,
  Project,
  Service,
  SkillGroup,
  Stat,
} from "@/lib/types";

/**
 * সব কনটেন্ট এখানে। সাইটের যেকোনো লেখা বদলাতে হলে এই একটাই ফাইল এডিট করুন।
 * UI সরাসরি এই ফাইল import করে না — করে src/lib/content.ts এর async ফাংশনগুলো,
 * যেগুলো API route-এর পেছনেও বসানো আছে।
 */

export const profile: Profile = {
  name: "Monir Hossain",
  title: "Full Stack & Mobile Application Developer",
  roles: [
    "Full Stack Developer",
    "React & Next.js Engineer",
    "Node.js API Developer",
    "React Native & Flutter Developer",
  ],
  location: "Dhaka, Bangladesh",
  email: "mh0168916@gmail.com",
  phoneDisplay: "+880 1688-518962",
  whatsappUrl: "https://wa.me/8801688518962",
  linkedin: "https://linkedin.com/in/monir-hossain-90bf6a3344",
  github: "https://github.com/MONIRHOSSAIN410",
  githubUser: "MONIRHOSSAIN410",
  cvUrl: "/Monir-Hossain-CV.pdf",
  photo: "/monir-hossain.jpg",
  available: true,
  availabilityNote: "Available for freelance & full-time roles",
  shortBio:
    "Full Stack & Mobile Application Developer with 3+ years of experience building scalable, reliable web and mobile products — from pixel-perfect front-ends to REST/GraphQL APIs and optimized databases.",
  longBio:
    "Full Stack and Mobile Application Developer with 3+ years of professional experience building scalable, reliable web and mobile applications. Proficient in JavaScript (ES6+), TypeScript, React.js, Next.js, Node.js, Express.js, React Native and Flutter. Experienced across the full software development lifecycle — from front-end UX and state management to RESTful and GraphQL API development and database optimization. Focused on clean, maintainable, user-centric solutions, and keen to contribute to innovative products as part of a collaborative team.",
};

export const stats: Stat[] = [
  { label: "Years of Experience", value: 3, suffix: "+" },
  { label: "Live Projects Shipped", value: 12, suffix: "+" },
  { label: "Technologies Used", value: 40, suffix: "+" },
  { label: "Companies Worked With", value: 2, suffix: "" },
];

export const services: Service[] = [
  {
    title: "Frontend Engineering",
    description:
      "Pixel-perfect, accessible interfaces in React and Next.js — with state management, animation and Core Web Vitals in mind from day one.",
    icon: "layout",
  },
  {
    title: "Backend & APIs",
    description:
      "Node.js and Express services with REST or GraphQL, JWT/OAuth authentication, and MySQL, PostgreSQL or MongoDB behind them.",
    icon: "server",
  },
  {
    title: "Mobile Apps",
    description:
      "Cross-platform apps with React Native (CLI & Expo) and Flutter, plus installable PWAs that share a codebase with the web.",
    icon: "smartphone",
  },
  {
    title: "Performance & SEO",
    description:
      "SSR, SSG and ISR rendering strategies, image and bundle optimization, and structured data so pages rank as well as they load.",
    icon: "gauge",
  },
];

export const skillGroups: SkillGroup[] = [
  { title: "Languages", skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"] },
  { title: "Frontend", skills: ["React.js", "Next.js", "Vue.js", "Angular", "jQuery"] },
  {
    title: "UI & Styling",
    skills: ["Tailwind CSS", "Bootstrap", "Material UI", "shadcn/ui", "Chakra UI"],
  },
  { title: "Backend", skills: ["Node.js", "Express.js", "Fastify", "REST APIs", "GraphQL"] },
  { title: "Authentication", skills: ["JWT", "OAuth 2.0", "WebAuthn"] },
  { title: "Databases", skills: ["MySQL", "PostgreSQL", "MongoDB / Mongoose"] },
  { title: "Mobile", skills: ["React Native (CLI & Expo)", "Flutter", "PWA"] },
  { title: "DevOps & Tools", skills: ["Git", "GitHub", "Docker", "CI/CD", "Vercel", "Netlify"] },
  { title: "Testing", skills: ["Jest", "Cypress", "Unit & Integration Testing"] },
  {
    title: "State & Data",
    skills: ["Redux Toolkit", "Zustand", "Context API", "TanStack Query", "Axios"],
  },
  { title: "Rendering & SEO", skills: ["CSR", "SSR", "SSG", "ISR", "SEO", "Core Web Vitals"] },
  { title: "Ways of Working", skills: ["Agile/Scrum", "Jira", "Figma", "Framer Motion", "i18n"] },
];

/** Hero-র নিচে যে marquee চলবে */
export const marqueeStack: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "React Native",
  "Flutter",
  "Docker",
  "Redux Toolkit",
  "Framer Motion",
];

export const experience: Job[] = [
  {
    role: "Full Stack Developer",
    company: "Brandlink Technologies",
    location: "Uttara, Diyabari, Dhaka",
    period: "Present",
    current: true,
    points: [
      "Engineered high-performance web applications using modern JavaScript frameworks and scalable architecture principles.",
      "Designed responsive, interactive user interfaces with React, Next.js and tailored CSS libraries.",
      "Developed and deployed live web platforms for multiple clients end-to-end.",
    ],
    stack: ["Next.js", "React", "Node.js", "Tailwind CSS"],
  },
  {
    role: "Full Stack Developer / Web Developer",
    company: "GenAILabs (formerly Wan IT Ltd)",
    location: "Amman, Jordan (Remote)",
    period: "Previous",
    current: false,
    points: [
      "Built IHCM — a borderless recruitment platform for an agency operating since 1980.",
      "Built Maslow Bangladesh — a learning management & CMS portal for corporate workforce training.",
      "Owned features across the stack: UI, APIs, authentication and deployment.",
    ],
    stack: ["React", "Node.js", "REST API", "MySQL"],
  },
];

export const education: Education = {
  degree: "Bachelor of Business Administration (BBA) — Major in Finance",
  school: "Uttara Institute of Business and Technology (UIBT)",
  extra: "CGPA 3.04 / 4.00",
  period: "Graduated",
};

export const projects: Project[] = [
  {
    slug: "mobile-com-bd",
    title: "Mobile.com.bd — Smartphone Superstore",
    description:
      "An e-commerce storefront for authentic smartphones, tablets and gadgets in Bangladesh — category browsing, cart and wishlist, order tracking, EMI options and bKash/Nagad checkout.",
    tags: ["Next.js", "React", "E-commerce", "REST API"],
    category: "E-commerce",
    url: "https://next-mn-z33v.vercel.app/",
    featured: true,
    year: "2025",
  },
  {
    slug: "zenji",
    title: "ZENJI — Anime Streetwear Store",
    description:
      "Storefront for an Australian streetwear label built around limited drops — collection browsing, a drop calendar, lookbook, and live sold-out states across the catalogue.",
    tags: ["Next.js", "React", "E-commerce", "Tailwind CSS"],
    category: "E-commerce",
    url: "https://aus2-wzpi.vercel.app/",
    featured: true,
    year: "2025",
  },
  {
    slug: "preclinic",
    title: "Preclinic — Clinic Admin Dashboard",
    description:
      "A responsive clinic and hospital admin dashboard for running day-to-day operations, built with Next.js, Tailwind CSS and shadcn/ui.",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    category: "Dashboard",
    url: "https://preclinic100.vercel.app/dashboard",
    featured: true,
    year: "2025",
  },
  {
    slug: "business-panel",
    title: "Business Panel",
    description:
      "An admin panel for managing day-to-day business operations, with a responsive interface built on a teal design system.",
    tags: ["Next.js", "React", "Dashboard"],
    category: "Dashboard",
    url: "https://businesspenal23.vercel.app/",
    featured: false,
    year: "2025",
  },
  {
    slug: "crm-application",
    title: "CRM Application",
    description:
      "A full-featured Customer Relationship Management dashboard — contacts, deals and pipeline management with a clean, modern UI.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    category: "Dashboard",
    url: "https://crm-both-one.vercel.app/",
    featured: true,
    year: "2025",
  },
  {
    slug: "ihcm",
    title: "IHCM — International Health & Care Management",
    description:
      "A one-stop, borderless recruitment platform for an agency operating since 1980 with long-standing client trust.",
    tags: ["Next.js", "React", "REST API"],
    category: "Platform",
    url: "https://ihcmbd.com/ihcmCmsFrontend",
    featured: true,
    year: "2024",
  },
  {
    slug: "maslow-bangladesh",
    title: "Maslow Bangladesh",
    description:
      "Learning management & CMS portal for professional skills training and corporate workforce development.",
    tags: ["React", "Node.js", "CMS"],
    category: "Platform",
    url: "https://maslowbd.com/maslowCmsFrontend/login",
    featured: true,
    year: "2024",
  },
  {
    slug: "cookme",
    title: "CookMe",
    description:
      "A culinary platform for discovering and sharing recipes with a clean, modern interface.",
    tags: ["Next.js", "Tailwind CSS"],
    category: "Product",
    url: "https://cookme-rust.vercel.app",
    featured: false,
    year: "2025",
  },
  {
    slug: "nextjs-web-app",
    title: "Next.js Web App",
    description:
      "A featured web application showcasing modern rendering patterns and UI polish with Next.js.",
    tags: ["Next.js", "React"],
    category: "Web App",
    url: "https://nextjs-seven-rho-51.vercel.app",
    featured: false,
    year: "2025",
  },
  {
    slug: "client-platform-i",
    title: "Client Platform I",
    description: "A live web platform developed and deployed end-to-end for a client.",
    tags: ["React", "Netlify"],
    category: "Client Work",
    url: "https://marvelous-sable-dd32f8.netlify.app",
    featured: false,
    year: "2024",
  },
  {
    slug: "client-platform-ii",
    title: "Client Platform II",
    description: "A live web platform developed and deployed end-to-end for a client.",
    tags: ["React", "Netlify"],
    category: "Client Work",
    url: "https://hilarious-eclair-21fc55.netlify.app",
    featured: false,
    year: "2024",
  },
  {
    slug: "mvc-frontend",
    title: "MVC Frontend",
    description: "A frontend application built around an MVC architecture, deployed on Vercel.",
    tags: ["JavaScript", "Vercel"],
    category: "Web App",
    url: "https://mvc-frontend-lovat.vercel.app",
    featured: false,
    year: "2023",
  },
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "GitHub", href: "#github", id: "github" },
  { label: "Contact", href: "#contact", id: "contact" },
];
