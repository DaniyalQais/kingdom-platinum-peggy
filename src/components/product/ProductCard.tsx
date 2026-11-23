"use client";

import Image from "next/image";
import Link from "next/link";
import { useProductDialog } from "@/components/product/ProductDialogProvider";
import { ArrowRight } from "@/components/ui/icons";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  headingLevel?: 2 | 3;
  revealGroup?: string;
};

export function ProductCard({
  product,
  headingLevel = 2,
  revealGroup,
}: ProductCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const dialog = useProductDialog();
  const productHref = `/products/${product.slug}`;

  const artwork = (
    <div className="product-artwork relative aspect-[4/5] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-plum/8 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.95)_0%,rgba(234,225,240,0.55)_60%,rgba(223,211,229,0.35)_100%)] p-3 sm:p-5 shadow-inner transition-all duration-300 ease-[var(--motion-ease)] flex items-center justify-center">
      {/* Top Left: Category Pill Tag */}
      <span className="absolute left-2 top-2 sm:left-2.5 sm:top-2.5 z-10 rounded-full border border-plum/10 bg-ivory/95 px-2 py-0.5 sm:px-2.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-plum shadow-xs backdrop-blur-xs whitespace-nowrap">
        {product.kind}
      </span>

      {/* Top Right: Format Pill */}
      <span className="absolute right-2.5 top-2.5 z-10 hidden sm:flex items-center gap-1 rounded-full border border-plum/10 bg-ivory/90 px-2 py-0.5 text-[10px] font-medium text-plum/70 shadow-xs backdrop-blur-xs">
        <span className="text-[9px] text-plum font-bold">✦</span> Digital
      </span>

      <Image
        src={product.image.src}
        alt={product.image.alt}
        width={product.image.width}
        height={product.image.height}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 42vw"
        className="product-cover h-full w-full object-contain drop-shadow-[0_14px_18px_rgba(56,34,57,0.18)] transition-all duration-300 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1 group-hover:drop-shadow-[0_20px_26px_rgba(56,34,57,0.26)]"
      />

      {/* Floating Quick View hint on desktop hover */}
      <div className="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 hidden sm:flex items-center gap-1.5 rounded-full bg-plum-deep/90 px-3 py-1 text-[11px] font-medium text-ivory shadow-md backdrop-blur-xs">
        <span>Quick View</span>
        <span className="text-[10px] text-ivory/70">✦</span>
      </div>
    </div>
  );

  return (
    <article
      className="product-card group relative flex h-full flex-col rounded-2xl sm:rounded-3xl border border-plum/[0.08] bg-white/75 p-2.5 sm:p-4 shadow-[0_4px_20px_-4px_rgba(56,34,57,0.05)] backdrop-blur-xs transition-all duration-300 ease-[var(--motion-ease)] hover:-translate-y-1.5 hover:border-plum/22 hover:bg-white hover:shadow-[0_22px_45px_-12px_rgba(56,34,57,0.14)]"
      data-reveal={revealGroup ? "idle" : undefined}
      data-reveal-group={revealGroup}
    >
      {dialog ? (
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label={`View details for ${product.title}`}
          onClick={() => dialog.open(product)}
          className="product-media block w-full rounded-xl sm:rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
        >
          {artwork}
        </button>
      ) : (
        <Link
          href={productHref}
          className="product-media block rounded-xl sm:rounded-2xl focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
        >
          {artwork}
        </Link>
      )}

      <div className="flex flex-1 flex-col pt-3 sm:pt-3.5">
        <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-plum-soft/80">
          Peggy Saunders
        </p>

        <Heading className="mt-1 text-[14px] sm:text-[16px] font-semibold leading-snug text-plum transition-colors group-hover:text-plum-deep line-clamp-2 min-h-[2.6em]">
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

        <div className="mt-auto border-t border-plum/[0.08] pt-2.5 sm:pt-3">
          <div className="flex items-center justify-between gap-1.5">
            <div>
              <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-wider text-plum-soft/60">
                Instant Access
              </span>
              <p className="text-[15px] sm:text-[17px] font-bold tracking-tight text-plum">
                {formatPrice(product.priceCents)}
              </p>
            </div>

            {dialog ? (
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => dialog.open(product)}
                className="inline-flex min-h-11 sm:min-h-9 items-center gap-1.5 rounded-full border border-plum/15 bg-plum/5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-[12px] font-medium text-plum transition-all duration-200 group-hover:border-plum group-hover:bg-plum group-hover:text-ivory shadow-xs focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
              >
                <span>View details</span>
                <ArrowRight
                  className="card-arrow size-3.5 sm:size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="sr-only"> for {product.title}</span>
              </button>
            ) : (
              <Link
                href={productHref}
                className="inline-flex min-h-11 sm:min-h-9 items-center gap-1.5 rounded-full border border-plum/15 bg-plum/5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-[12px] font-medium text-plum transition-all duration-200 group-hover:border-plum group-hover:bg-plum group-hover:text-ivory shadow-xs focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
              >
                <span>View details</span>
                <ArrowRight
                  className="card-arrow size-3.5 sm:size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="sr-only"> for {product.title}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
