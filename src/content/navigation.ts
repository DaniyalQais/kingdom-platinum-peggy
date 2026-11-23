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

export type MobileNavItem = {
  id:
    | "home"
    | "resources"
    | "featured-bundle"
    | "about"
    | "community"
    | "contact";
  href: string;
  label: string;
};

export const mobileNavLinks: MobileNavItem[] = [
  { id: "home", href: "/#home", label: "Home" },
  { id: "resources", href: "/#resources", label: "Resources" },
  { id: "featured-bundle", href: "/#featured-bundle", label: "Featured Bundle" },
  { id: "about", href: "/#about", label: "About Peggy" },
  { id: "community", href: "/#community", label: "Join Community" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

