import Image from "next/image";
import type { Product } from "@/lib/types";

type HeroArtworkProps = {
  dominant: Product;
  supporting: Product;
};

export function HeroArtwork({ dominant, supporting }: HeroArtworkProps) {
  return (
    <div
      className="hero-enter relative mx-auto w-full max-w-[34rem] lg:mx-0 lg:max-w-none"
      style={{ animationDelay: "140ms" }}
    >
      {/* Soft Ambient Stage Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blush/50 via-lavender/40 to-ivory/60 blur-2xl"
      />

      {/* Luxury Composition Stage */}
      <div className="relative rounded-3xl border border-white/60 bg-gradient-to-b from-ivory/70 via-ivory/40 to-lavender/30 p-6 sm:p-9 shadow-[0_24px_50px_-20px_rgba(56,34,57,0.22)] backdrop-blur-md">
        <div className="grid grid-cols-[1.28fr_1fr] items-end gap-4 sm:gap-7">
          {/* Dominant Product (Devotional) */}
          <div className="group relative z-10 transition-transform duration-300 ease-[var(--motion-ease)] hover:-translate-y-1.5">
            <div className="overflow-hidden rounded-xl border border-plum/10 bg-white/40 p-2 shadow-[0_20px_35px_-10px_rgba(56,34,57,0.28)] backdrop-blur-xs transition-shadow duration-300 group-hover:shadow-[0_28px_45px_-12px_rgba(56,34,57,0.35)]">
              <Image
                src={dominant.image.src}
                alt={dominant.image.alt}
                width={dominant.image.width}
                height={dominant.image.height}
                sizes="(min-width: 1024px) 340px, (min-width: 640px) 300px, 52vw"
                priority
                className="h-auto w-full rounded-lg object-contain"
              />
            </div>
            {/* Subtle Pill on Dominant Book */}
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-plum/15 bg-plum px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ivory shadow-md">
              Devotional
            </span>
          </div>

          {/* Supporting Product (Guided Journal) */}
          <div className="group relative z-0 transition-transform duration-300 ease-[var(--motion-ease)] hover:-translate-y-1.5">
            <div className="overflow-hidden rounded-xl border border-plum/10 bg-white/40 p-2 shadow-[0_16px_28px_-8px_rgba(56,34,57,0.20)] backdrop-blur-xs transition-shadow duration-300 group-hover:shadow-[0_22px_36px_-10px_rgba(56,34,57,0.28)]">
              <Image
                src={supporting.image.src}
                alt={supporting.image.alt}
                width={supporting.image.width}
                height={supporting.image.height}
                sizes="(min-width: 1024px) 240px, (min-width: 640px) 220px, 38vw"
                priority
                className="h-auto w-full rounded-lg object-contain"
              />
            </div>
            {/* Subtle Pill on Supporting Book */}
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-plum/15 bg-ivory px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-plum shadow-md">
              Guided Journal
            </span>
          </div>
        </div>

        {/* Floating Luxury Quality Emblem */}
        <div className="absolute -bottom-4 right-4 sm:-bottom-5 sm:right-6 z-20 flex items-center gap-3 rounded-2xl border border-white/80 bg-ivory/95 px-4 py-2.5 shadow-[0_16px_32px_-8px_rgba(56,34,57,0.25)] backdrop-blur-md">
          <div className="flex size-7 sm:size-8 items-center justify-center rounded-xl bg-plum text-ivory text-xs font-semibold shadow-xs">
            🕊️
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-plum">
              Grace Through Grief
            </span>
            <span className="text-[11px] sm:text-[12px] font-medium text-plum-soft">
              Complete Digital Series
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
