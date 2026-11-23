import Image from "next/image";
import Link from "next/link";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { HeaderScrollState } from "@/components/layout/HeaderScrollState";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-line bg-ivory">
      <HeaderScrollState />
      <Container className="flex h-[72px] items-center justify-between gap-3 md:h-[88px] md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
        <Link
          href="/#home"
          className="flex shrink-0 items-center gap-2.5 sm:gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
          aria-label="Kingdom Platinum Solutions, LLC — Home"
        >
          <Image
            src="/images/brand/kingdom-platinum-logo.png"
            alt=""
            width={466}
            height={453}
            sizes="(max-width: 640px) 46px, 56px"
            priority
            className="h-[46px] w-auto sm:h-12 md:h-14"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-plum tracking-tight text-[15px] sm:text-[16px] md:text-[17px]">
              Kingdom Platinum
            </span>
            <span className="text-[11px] sm:text-[12px] font-medium text-plum/70 tracking-normal">
              Solutions, LLC
            </span>
          </div>
        </Link>

        <DesktopNav />

        <div className="flex items-center justify-end gap-3">
          <div className="hidden md:block">
            <ButtonLink
              href="/#resources"
              className="whitespace-nowrap px-4! lg:px-5! xl:px-6!"
            >
              Explore Resources
            </ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
