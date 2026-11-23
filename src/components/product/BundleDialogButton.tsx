"use client";

import { useProductDialog } from "@/components/product/ProductDialogProvider";
import { buttonClasses } from "@/components/ui/button-styles";
import { ArrowRight } from "@/components/ui/icons";
import type { Product } from "@/lib/types";

export function BundleDialogButton({ product }: { product: Product }) {
  const dialog = useProductDialog();

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => dialog?.open(product)}
      className={buttonClasses("light", "w-full sm:w-auto whitespace-nowrap shadow-[0_12px_28px_-6px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 transition-all")}
    >
      <span>Explore the Bundle</span>
      <ArrowRight className="size-[18px] shrink-0 button-arrow" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
