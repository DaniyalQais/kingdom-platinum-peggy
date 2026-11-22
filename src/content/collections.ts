import type { Collection } from "@/lib/types";

export const collections: Collection[] = [
  {
    slug: "grace-through-grief",
    name: "Grace Through Grief",
    summary: "Devotionals, journals, planners, and workbooks.",
    sourceUrl: "https://kingdomplatinumsolutionsllc.com/products_list",
  },
];

// "Purpose & Profit" is intentionally omitted until its products and details
// are confirmed. No empty collection is published.

export function getCollection(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}
