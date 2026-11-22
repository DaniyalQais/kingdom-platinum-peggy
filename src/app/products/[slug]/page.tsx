import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { collections } from "@/content/collections";
import { getCollectionResources, getProduct, products } from "@/content/products";
import { formatPrice } from "@/lib/format";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getProduct((await params).slug);

  if (!product) {
    return {};
  }

  const collection = collections[0];

  return {
    title: product.title,
    description: product.excerpt ?? collection.summary,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const related = getCollectionResources(product.collectionSlug)
    .filter((resource) => resource.slug !== product.slug)
    .slice(0, 3);
  const landscapeArtwork = product.image.width > product.image.height;

  return (
    <div className="flex flex-1 flex-col">
      <Container className="py-4 sm:py-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-plum-soft">
            <li>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center transition-colors hover:text-plum sm:min-h-6"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/#resources"
                className="inline-flex min-h-11 items-center transition-colors hover:text-plum sm:min-h-6"
              >
                Collection
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span aria-current="page" className="text-plum">
                {product.title}
              </span>
            </li>
          </ol>
        </nav>
      </Container>

      <section className="pb-16 lg:pb-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div
            className={`relative mx-auto flex w-full max-w-sm items-center overflow-hidden rounded-lg bg-lavender p-6 sm:p-10 lg:mx-0 lg:max-w-none ${
              landscapeArtwork ? "aspect-[5/4]" : "aspect-[4/5]"
            }`}
          >
            <Image
              src={product.image.src}
              alt={product.image.alt}
              width={product.image.width}
              height={product.image.height}
              sizes="(min-width: 1024px) 540px, 90vw"
              priority
              className="h-full w-full object-contain drop-shadow-[0_18px_22px_rgba(56,34,57,0.18)]"
            />
          </div>

          <div className="max-w-xl">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-plum-soft">
              {product.kind}
            </p>
            <h1 className="mt-3 text-[2.5rem] leading-[1.06] text-plum sm:text-[2.75rem] lg:text-[3.25rem]">
              {product.title}
            </h1>
            <p className="mt-4 text-[1.375rem] font-medium text-plum">
              <span className="sr-only">Price: </span>
              {formatPrice(product.priceCents)}
            </p>

            {product.description ? (
              <p className="mt-5 max-w-lg text-[17px] leading-[1.7] text-plum-soft">
                {product.description}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
              <ButtonLink
                href={product.sourceUrl}
                external
                icon="external"
                className="w-full sm:w-auto"
              >
                View on Current Store
              </ButtonLink>
              <Link
                href="/#resources"
                className="inline-flex min-h-11 items-center text-[15px] font-medium text-plum-soft underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-plum"
              >
                Back to the collection
              </Link>
            </div>
            <p className="mt-2 text-xs leading-5 text-plum-soft">
              Opens kingdomplatinumsolutionsllc.com in a new tab.
            </p>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-line bg-ivory-deep">
          <Container className="py-16 lg:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-plum-soft">
                  Grace Through Grief
                </p>
                <h2 className="mt-3 text-[1.75rem] leading-[1.1] text-plum sm:text-[2.25rem]">
                  Related Resources
                </h2>
              </div>
              <Link
                href="/#resources"
                className="inline-flex min-h-11 items-center text-[15px] font-medium text-plum-soft underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-plum"
              >
                View the collection
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
              {related.map((resource) => (
                <ProductCard
                  key={resource.slug}
                  product={resource}
                  headingLevel={3}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </div>
  );
}
