import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { collections, getCollection } from "@/content/collections";
import { getProductsByCollection } from "@/content/products";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const collection = getCollection((await params).slug);

  if (!collection) {
    return {};
  }

  return {
    title: collection.name,
    description: collection.summary,
  };
}

export default async function CollectionPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollection(slug);

  if (!collection) {
    notFound();
  }

  const products = getProductsByCollection(collection.slug);

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <header className="max-w-2xl">
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-plum-soft">
            The Collection
          </p>
          <h1 className="mt-4 text-[2.5rem] leading-[1.06] text-plum sm:text-[3.25rem] lg:text-[3.5rem]">
            {collection.name}
          </h1>
          <p className="mt-4 max-w-md text-base leading-[1.65] text-plum-soft">
            {collection.summary}
          </p>
        </header>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
