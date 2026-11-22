import Image from "next/image";
import type { Product } from "@/lib/types";

type HeroArtworkProps = {
  dominant: Product;
  supporting: Product;
};

export function HeroArtwork({ dominant, supporting }: HeroArtworkProps) {
  return (
    <div
      className="hero-enter mx-auto grid w-full max-w-[34rem] grid-cols-[1.35fr_1fr] items-end gap-4 sm:gap-8 lg:mx-0 lg:max-w-none"
      style={{ animationDelay: "120ms" }}
    >
      <Image
        src={dominant.image.src}
        alt={dominant.image.alt}
        width={dominant.image.width}
        height={dominant.image.height}
        sizes="(min-width: 1024px) 260px, (min-width: 640px) 300px, 55vw"
        priority
        className="h-auto w-full drop-shadow-[0_16px_20px_rgba(56,34,57,0.16)]"
      />
      <Image
        src={supporting.image.src}
        alt={supporting.image.alt}
        width={supporting.image.width}
        height={supporting.image.height}
        sizes="(min-width: 1024px) 190px, (min-width: 640px) 220px, 41vw"
        className="h-auto w-full drop-shadow-[0_12px_16px_rgba(56,34,57,0.12)]"
      />
    </div>
  );
}
