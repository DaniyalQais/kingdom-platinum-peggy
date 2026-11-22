import type { Product } from "@/lib/types";

const SOURCE_BASE = "https://kingdomplatinumsolutionsllc.com";

// Titles, prices, compare-at prices, and descriptions are taken from the public
// Kingdom Platinum Solutions store as observed on 2026-11-21. Cover artwork was
// downloaded from the same store on 2026-11-22 and is served locally.
export const products: Product[] = [
  {
    slug: "grace-through-grief-bundle",
    title: "Grace Through Grief Bundle",
    collectionSlug: "grace-through-grief",
    kind: "Bundle",
    priceCents: 2700,
    compareAtPriceCents: 9700,
    image: {
      src: "/images/products/grace-through-grief-bundle.png",
      width: 2298,
      height: 1997,
      alt: "Cover of the Grace Through Grief Bundle showing the Breakthrough Processing Journal on a tablet beside the Grace Through Grief ebook",
    },
    sourceImageUrl:
      "https://assets.cdn.filesafe.space/MSCxwjOFFEqYRp9cNqBs/media/69dead16d8d5f6ae8383336f.png",
    description:
      "Transform the \"unimaginable silence\" into a journey of purpose with the \"Breakthrough Processing Journal\" and the \"Grace Through Grief\" ebook. This digital bundle offers a compassionate roadmap to help you navigate the heaviest seasons of personal loss. The journal provides daily anchors —from \"Permission Slips\" for rest to \"Glimmer Trackers\" for finding peace—designed to help you process your \"Ministry of Tears\" in real-time. Paired with Peggy Saunders’ raw and restorative ebook, you will learn how to rebuild from brokenness, honor your loved one’s legacy, and find the strength to rise again. Healing is possible, and your story isn't over.",
    excerpt:
      "Transform the \"unimaginable silence\" into a journey of purpose with the \"Breakthrough Processing Journal\" and the \"Grace Through Grief\" ebook.",
    sourceUrl: `${SOURCE_BASE}/product_details/product/6888632c360ca16aaa98a2cf`,
  },
  {
    slug: "30-days-from-grief-to-grace-devotional",
    title: "30 Days from Grief to Grace Devotional",
    collectionSlug: "grace-through-grief",
    kind: "Devotional",
    priceCents: 1700,
    compareAtPriceCents: 2700,
    image: {
      src: "/images/products/30-days-from-grief-to-grace-devotional.png",
      width: 752,
      height: 1161,
      alt: "Cover of the 30 Days from Grief to Grace Devotional",
    },
    sourceImageUrl:
      "https://assets.cdn.filesafe.space/MSCxwjOFFEqYRp9cNqBs/media/6a35ee020a683b64fe1d8911.png",
    sourceUrl: `${SOURCE_BASE}/product_details/product/6a35ee2053068284411aea9a`,
  },
  {
    slug: "from-grief-to-grace-guided-journal",
    title: "From Grief to Grace Guided Journal",
    collectionSlug: "grace-through-grief",
    kind: "Guided Journal",
    priceCents: 1700,
    compareAtPriceCents: 2700,
    image: {
      src: "/images/products/from-grief-to-grace-guided-journal.png",
      width: 789,
      height: 1174,
      alt: "Cover of the From Grief to Grace Guided Journal",
    },
    sourceImageUrl:
      "https://assets.cdn.filesafe.space/MSCxwjOFFEqYRp9cNqBs/media/6a34abbb6a6dd1b69a19770d.png",
    sourceUrl: `${SOURCE_BASE}/product_details/product/6a34abca616b2437079ba178`,
  },
  {
    slug: "prayers-through-the-pain-prayer-journal",
    title: "Prayers Through The Pain Prayer Journal",
    collectionSlug: "grace-through-grief",
    kind: "Prayer Journal",
    priceCents: 1700,
    compareAtPriceCents: 2700,
    image: {
      src: "/images/products/prayers-through-the-pain-prayer-journal.png",
      width: 782,
      height: 1204,
      alt: "Cover of the Prayers Through The Pain Prayer Journal",
    },
    sourceImageUrl:
      "https://assets.cdn.filesafe.space/MSCxwjOFFEqYRp9cNqBs/media/6a34aa04de4900e889a9b1aa.png",
    sourceUrl: `${SOURCE_BASE}/product_details/product/6a34aa5b616b245cfa9b937c`,
  },
  {
    slug: "still-remembering-you-memory-keepsake-workbook",
    title: "Still Remembering You A Memory Keepsake Workbook",
    collectionSlug: "grace-through-grief",
    kind: "Keepsake Workbook",
    priceCents: 1700,
    compareAtPriceCents: 2700,
    image: {
      src: "/images/products/still-remembering-you-memory-keepsake-workbook.png",
      width: 778,
      height: 1196,
      alt: "Cover of the Still Remembering You A Memory Keepsake Workbook",
    },
    sourceImageUrl:
      "https://assets.cdn.filesafe.space/MSCxwjOFFEqYRp9cNqBs/media/6a34ab08de4900e889a9c160.png",
    sourceUrl: `${SOURCE_BASE}/product_details/product/6a34ab25616b24a5c69b9b15`,
  },
  {
    slug: "the-gentle-healing-planner",
    title: "The Gentle Healing Planner",
    collectionSlug: "grace-through-grief",
    kind: "Planner",
    priceCents: 1700,
    compareAtPriceCents: 2700,
    image: {
      src: "/images/products/the-gentle-healing-planner.png",
      width: 765,
      height: 1174,
      alt: "Cover of The Gentle Healing Planner",
    },
    sourceImageUrl:
      "https://assets.cdn.filesafe.space/MSCxwjOFFEqYRp9cNqBs/media/6a35ee0261dae399a982f2c1.png",
    sourceUrl: `${SOURCE_BASE}/product_details/product/6a35ef84632012f9e08ae320`,
  },
  {
    slug: "together-through-grief-workbook",
    title: "Together Through Grief Workbook",
    collectionSlug: "grace-through-grief",
    kind: "Workbook",
    priceCents: 1700,
    compareAtPriceCents: 2700,
    image: {
      src: "/images/products/together-through-grief-workbook.png",
      width: 778,
      height: 1190,
      alt: "Cover of the Together Through Grief Workbook",
    },
    sourceImageUrl:
      "https://assets.cdn.filesafe.space/MSCxwjOFFEqYRp9cNqBs/media/6a34ab8c0a683b64fef6f2c1.png",
    sourceUrl: `${SOURCE_BASE}/product_details/product/6a34ab9b616b24d6349b9eff`,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter(
    (product) => product.collectionSlug === collectionSlug,
  );
}

export function getCollectionResources(collectionSlug: string): Product[] {
  return getProductsByCollection(collectionSlug).filter(
    (product) => product.kind !== "Bundle",
  );
}

export function getFeaturedBundle(): Product {
  const bundle = products.find((product) => product.kind === "Bundle");

  if (!bundle) {
    throw new Error("The featured bundle is missing from the catalog.");
  }

  return bundle;
}
