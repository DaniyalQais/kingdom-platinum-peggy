"use client";

import Image from "next/image";
import Link from "next/link";
import { useProductDialog } from "@/components/product/ProductDialogProvider";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  headingLevel?: 2 | 3;
  revealGroup?: string;
};

const detailsLinkClass =
  "card-details inline-flex min-h-11 items-center gap-1.5 text-[13px] sm:text-[14px] font-medium text-plum/80 transition-colors group-hover:text-plum sm:min-h-8 focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2";

export function ProductCard({
  product,
  headingLevel = 2,
  revealGroup,
}: ProductCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const dialog = useProductDialog();
  const productHref = `/products/${product.slug}`;

  const artwork = (
    <div
      className="product-artwork relative aspect-[4/5] overflow-hidden rounded-2xl border border-plum/10 bg-gradient-to-b from-lavender/70 to-lavender/35 p-3.5 sm:p-5 shadow-xs transition-all duration-300 ease-[var(--motion-ease)] group-hover:-translate-y-1 group-hover:border-plum/25 group-hover:shadow-[0_20px_35px_-15px_rgba(56,34,57,0.22)]"
      data-reveal={revealGroup ? "idle" : undefined}
      data-reveal-group={revealGroup}
    >
      {/* Category Pill Tag */}
      <span className="absolute left-3 top-3 z-10 rounded-full border border-plum/12 bg-ivory/95 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-plum shadow-xs backdrop-blur-xs">
        {product.kind}
      </span>

      <Image
        src={product.image.src}
        alt={product.image.alt}
        width={product.image.width}
        height={product.image.height}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 42vw"
        className="product-cover h-full w-full object-contain drop-shadow-[0_14px_18px_rgba(56,34,57,0.16)] transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
  );

  const detailsContent = (
    <>
      <span>View details</span>
      <span aria-hidden="true" className="card-arrow transition-transform duration-200 group-hover:translate-x-1">
        &#8594;
      </span>
      <span className="sr-only"> for {product.title}</span>
    </>
  );

  return (
    <article className="product-card group flex h-full flex-col">
      {dialog ? (
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label={`View details for ${product.title}`}
          onClick={() => dialog.open(product)}
          className="product-media block w-full rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
        >
          {artwork}
        </button>
      ) : (
        <Link
          href={productHref}
          className="product-media block rounded-2xl focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
        >
          {artwork}
        </Link>
      )}

      <div className="flex flex-1 flex-col pt-3.5 sm:pt-4">
        <Heading className="text-[16px] sm:text-[17px] font-medium leading-snug text-plum transition-colors group-hover:text-plum-deep">
          {dialog ? (
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => dialog.open(product)}
              className="text-left focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
            >
              {product.title}
            </button>
          ) : (
            <Link
              href={productHref}
              className="focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
            >
              {product.title}
            </Link>
          )}
        </Heading>
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="text-[15px] sm:text-[16px] font-semibold text-plum tracking-tight">
            {formatPrice(product.priceCents)}
          </p>
          {dialog ? (
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => dialog.open(product)}
              className={detailsLinkClass}
            >
              {detailsContent}
            </button>
          ) : (
            <Link href={productHref} className={detailsLinkClass}>
              {detailsContent}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
