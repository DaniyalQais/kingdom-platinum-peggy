export type SectionLink = {
  id: "resources" | "about" | "community" | "contact";
  href: string;
  label: string;
};

export const sectionLinks: SectionLink[] = [
  { id: "resources", href: "/#resources", label: "Resources" },
  { id: "about", href: "/#about", label: "About" },
  { id: "community", href: "/#community", label: "Community" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

export const footerLinks = sectionLinks.map(({ href, label }) => ({
  href,
  label,
}));
