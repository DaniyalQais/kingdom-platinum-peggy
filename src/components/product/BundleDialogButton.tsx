"use client";

import { useProductDialog } from "@/components/product/ProductDialogProvider";
import { buttonClasses } from "@/components/ui/button-styles";
import type { Product } from "@/lib/types";

export function BundleDialogButton({ product }: { product: Product }) {
  const dialog = useProductDialog();

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => dialog?.open(product)}
      className={buttonClasses("light", "w-full sm:w-auto")}
    >
      Explore the Bundle
      <span aria-hidden="true" className="button-arrow text-[0.95em]">
        &#8594;
      </span>
    </button>
  );
}
