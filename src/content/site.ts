import type { SiteDetails } from "@/lib/types";

const SOURCE_BASE = "https://kingdomplatinumsolutionsllc.com";

export const site: SiteDetails = {
  name: "Kingdom Platinum Solutions, LLC",
  founder: "Peggy Saunders",
  title: "Kingdom Platinum Solutions, LLC",
  description:
    "Grace Through Grief — devotionals, journals, planners, and workbooks.",
  sourceUrl: `${SOURCE_BASE}/home-page`,
  // Portrait published on the client's About Us page. Used unmodified.
  portrait: {
    src: "/images/brand/peggy-saunders-portrait.jpg",
    width: 1004,
    height: 996,
    alt: "Portrait of Peggy Saunders",
    sourceUrl:
      "https://assets.cdn.filesafe.space/MSCxwjOFFEqYRp9cNqBs/media/69dea93cd8d5f6ae83824151.jpg",
  },
  // Bio reproduced verbatim from the client's About Us page.
  about: {
    heading: "Meet Peggy Saunders",
    paragraphs: [
      "She is a faith-driven entrepreneur, digital product designer, and the founder of Biblical Merch Planner, a brand created to equip Christian business owners with the tools to grow, create, and serve with purpose. After going through a personal season of profound grief, Peggy leaned on her faith, creativity, and community to find healing.",
      "Writing became a lifeline, and this book was born from that journey. With a heart for encouraging others, Peggy shares her experiences with honesty and grace, reminding readers that God is present, even in their pain.",
      "Through her planners, coaching, and now her writing, Peggy helps women of faith turn trials into testimony. Her life’s mission is rooted in Proverbs 3:5-6 and the belief that when we trust God fully, He directs every step.",
    ],
    verse: {
      text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
      reference: "Proverbs 3:5-6",
    },
    sourceUrl: `${SOURCE_BASE}/about_us`,
  },
  // Community copy reproduced from the client's community page. The page hosts
  // the signup form, so the preview links to it rather than reimplementing it.
  community: {
    heading: "You are not alone.",
    description:
      "When grief feels heavy, grace can carry you through. Join the Grace Through Grief community for healing tools, gentle encouragement, exclusive offers, and upcoming resources designed to uplift you in your journey.",
    href: `${SOURCE_BASE}/join_our_community`,
    sourceUrl: `${SOURCE_BASE}/join_our_community`,
  },
  // Email and socials are the methods the client publishes on the live site.
  contact: {
    intro:
      "Questions about a resource or the collection? Reach out by email, or follow Kingdom Platinum Solutions on social media.",
    email: "peggy.saunders1@aol.com",
    socials: [
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61584447508583",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/kingdomplatinumsolutionsllc/",
      },
      {
        label: "TikTok",
        href: "https://www.tiktok.com/@kingdomplatinumsolutions",
      },
    ],
    sourceUrl: `${SOURCE_BASE}/home-page`,
  },
};
