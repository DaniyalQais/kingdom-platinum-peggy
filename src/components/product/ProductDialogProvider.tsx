"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

type ProductDialogApi = {
  open: (product: Product) => void;
};

const ProductDialogContext = createContext<ProductDialogApi | null>(null);

export function useProductDialog(): ProductDialogApi | null {
  return useContext(ProductDialogContext);
}

export function ProductDialogProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<number | null>(null);

  const open = useCallback((next: Product) => setProduct(next), []);
  const close = useCallback(() => setProduct(null), []);
  const api = useMemo(() => ({ open }), [open]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const requestClose = useCallback(() => {
    const dialog = dialogRef.current;

    if (!dialog?.open || closeTimer.current !== null) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      return;
    }

    dialog.dataset.closing = "true";
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      delete dialog.dataset.closing;
      if (dialog.open) {
        dialog.close();
      }
    }, 200);
  }, []);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.getClientRects().length > 0);

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    const inside = active instanceof HTMLElement && dialog.contains(active);

    if (event.shiftKey) {
      if (!inside || active === first) {
        event.preventDefault();
        last.focus();
      }
    } else if (!inside || active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (product && !dialog.open) {
      delete dialog.dataset.closing;
      dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-dialog-close]")?.focus();
    } else if (!product && dialog.open) {
      dialog.close();
    }
  }, [product]);

  useEffect(() => {
    if (!product) {
      return;
    }

    document.documentElement.dataset.dialogOpen = "true";

    return () => {
      delete document.documentElement.dataset.dialogOpen;
    };
  }, [product]);

  useEffect(() => {
    if (!product) {
      return;
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;
    const scrollbar = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    if (scrollbar > 0) {
      root.style.paddingRight = `${scrollbar}px`;
    }

    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
    };
  }, [product]);

  return (
    <ProductDialogContext.Provider value={api}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby={product ? "product-dialog-title" : undefined}
        onKeyDown={handleKeyDown}
        onCancel={(event) => {
          event.preventDefault();
          requestClose();
        }}
        onClose={() => {
          clearCloseTimer();
          if (dialogRef.current) {
            delete dialogRef.current.dataset.closing;
          }
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            requestClose();
          }
        }}
        className="product-dialog m-auto w-[min(60rem,calc(100vw-2rem))] max-h-[min(90vh,54rem)] overflow-hidden rounded-lg bg-ivory p-0 text-plum"
      >
        {product ? (
          <>
            <button
              type="button"
              data-dialog-close
              onClick={requestClose}
              aria-label="Close product details"
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-ivory/95 text-plum transition-colors hover:bg-blush"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                &#10005;
              </span>
            </button>

            <div className="grid max-h-[min(90vh,54rem)] overflow-y-auto md:grid-cols-[0.92fr_1.08fr]">
              <div className="flex items-center justify-center bg-lavender p-6 sm:p-10">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  width={product.image.width}
                  height={product.image.height}
                  sizes="(min-width: 768px) 420px, 80vw"
                  className="h-auto max-h-[38vh] w-full max-w-[20rem] object-contain drop-shadow-[0_16px_20px_rgba(56,34,57,0.16)] md:max-h-[58vh] md:max-w-[22rem]"
                />
              </div>

              <div className="px-6 py-8 sm:px-10 sm:py-12">
                <p className="pr-12 text-[12px] font-medium uppercase tracking-[0.12em] text-plum-soft">
                  {product.kind}
                </p>
                <h2
                  id="product-dialog-title"
                  className="mt-2 pr-12 text-[1.75rem] leading-[1.08] text-plum sm:text-[2rem]"
                >
                  {product.title}
                </h2>
                <p className="mt-4 text-[1.25rem] font-medium text-plum">
                  <span className="sr-only">Price: </span>
                  {formatPrice(product.priceCents)}
                </p>

                {product.description ? (
                  <p className="mt-4 max-w-lg text-[15px] leading-[1.7] text-plum-soft sm:text-base">
                    {product.description}
                  </p>
                ) : null}

                <div className="mt-8">
                  <ButtonLink
                    href={product.sourceUrl}
                    external
                    icon="external"
                    className="w-full sm:w-auto"
                  >
                    View on Current Store
                  </ButtonLink>
                </div>
                <p className="mt-2 text-xs leading-5 text-plum-soft">
                  Opens kingdomplatinumsolutionsllc.com in a new tab.
                </p>
              </div>
            </div>
          </>
        ) : null}
      </dialog>
    </ProductDialogContext.Provider>
  );
}
