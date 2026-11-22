export type ProductKind =
  | "Bundle"
  | "Devotional"
  | "Guided Journal"
  | "Prayer Journal"
  | "Keepsake Workbook"
  | "Planner"
  | "Workbook";

export type Collection = {
  slug: string;
  name: string;
  summary: string;
  sourceUrl: string;
};

export type ProductImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Product = {
  slug: string;
  title: string;
  collectionSlug: string;
  kind: ProductKind;
  priceCents: number;
  compareAtPriceCents?: number;
  image: ProductImage;
  /** Original public CDN file the local cover was downloaded from. */
  sourceImageUrl: string;
  /** Only populated when the legacy store exposes a public description. */
  description?: string;
  /** Verbatim excerpt of the public description, when one exists. */
  excerpt?: string;
  sourceUrl: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteDetails = {
  name: string;
  founder: string;
  title: string;
  description: string;
  sourceUrl: string;
  portrait: {
    src: string;
    width: number;
    height: number;
    alt: string;
    sourceUrl: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
    verse: {
      text: string;
      reference: string;
    };
    sourceUrl: string;
  };
  community: {
    heading: string;
    description: string;
    href: string;
    sourceUrl: string;
  };
  contact: {
    intro: string;
    email: string;
    socials: SocialLink[];
    sourceUrl: string;
  };
};
