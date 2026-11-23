import Image from "next/image";
import type { Product } from "@/lib/types";

type HeroArtworkProps = {
  dominant: Product;
  supporting: Product;
};

export function HeroArtwork({ dominant, supporting }: HeroArtworkProps) {
  return (
    <div
      className="hero-enter mx-auto grid w-full max-w-[34rem] grid-cols-[1.32fr_1fr] items-end gap-5 sm:gap-8 lg:mx-0 lg:max-w-none"
      style={{ animationDelay: "120ms" }}
    >
      <div className="relative z-10 transition-transform duration-[var(--motion-hover)] ease-[var(--motion-ease)] hover:translate-y-[-2px]">
        <Image
          src={dominant.image.src}
          alt={dominant.image.alt}
          width={dominant.image.width}
          height={dominant.image.height}
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 54vw"
          priority
          className="h-auto w-full drop-shadow-[0_22px_30px_rgba(56,34,57,0.22)]"
        />
      </div>
      <div className="relative z-0 transition-transform duration-[var(--motion-hover)] ease-[var(--motion-ease)] hover:translate-y-[-2px]">
        <Image
          src={supporting.image.src}
          alt={supporting.image.alt}
          width={supporting.image.width}
          height={supporting.image.height}
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 230px, 40vw"
          priority
          className="h-auto w-full drop-shadow-[0_16px_22px_rgba(56,34,57,0.16)]"
        />
      </div>
    </div>
  );
}
