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
  "card-details inline-flex min-h-11 items-center text-[13px] font-medium text-plum-soft transition-colors hover:text-plum sm:min-h-8";

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
      className="product-artwork relative aspect-[4/5] overflow-hidden rounded-lg bg-lavender/60"
      data-reveal={revealGroup ? "idle" : undefined}
      data-reveal-group={revealGroup}
    >
      <Image
        src={product.image.src}
        alt={product.image.alt}
        width={product.image.width}
        height={product.image.height}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 42vw"
        className="product-cover h-full w-full object-contain p-3 drop-shadow-[0_10px_14px_rgba(56,34,57,0.12)] sm:p-4"
      />
    </div>
  );

  const detailsContent = (
    <>
      View details
      <span aria-hidden="true" className="card-arrow ml-1.5">
        &#8594;
      </span>
      <span className="sr-only"> for {product.title}</span>
    </>
  );

  return (
    <article className="product-card flex h-full flex-col">
      {dialog ? (
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label={`View details for ${product.title}`}
          onClick={() => dialog.open(product)}
          className="product-media block w-full rounded-lg text-left"
        >
          {artwork}
        </button>
      ) : (
        <Link
          href={productHref}
          className="product-media block rounded-lg"
        >
          {artwork}
        </Link>
      )}

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-plum-soft">
          {product.kind}
        </p>
        <Heading className="mt-1.5 text-[17px] font-medium leading-snug text-plum sm:text-lg">
          {dialog ? (
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => dialog.open(product)}
              className="text-left transition-colors hover:text-plum-soft"
            >
              {product.title}
            </button>
          ) : (
            <Link
              href={productHref}
              className="transition-colors hover:text-plum-soft"
            >
              {product.title}
            </Link>
          )}
        </Heading>
        <div className="mt-auto pt-3">
          <p className="text-[15px] font-semibold text-plum">
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
