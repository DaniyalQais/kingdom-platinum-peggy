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
      <Container className="grid h-[72px] grid-cols-[1fr_auto] items-center gap-4 md:h-[88px] md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/#home"
          className="flex shrink-0 items-center justify-self-start"
        >
          <Image
            src="/images/brand/kingdom-platinum-logo.png"
            alt="Kingdom Platinum Solutions, LLC"
            width={466}
            height={453}
            sizes="56px"
            priority
            className="h-14 w-auto"
          />
        </Link>

        <DesktopNav />

        <div className="flex items-center justify-self-end gap-3">
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
