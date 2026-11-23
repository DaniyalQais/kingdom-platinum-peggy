import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerLinks } from "@/content/navigation";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer data-site-footer className="relative border-t border-plum/20 bg-plum-deep text-ivory">
      {/* Subtle top ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blush/30 to-transparent"
      />

      <Container className="pt-14 pb-32 sm:pt-16 sm:pb-28">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-16 items-start">
          {/* Brand & Mission Column */}
          <div className="flex flex-col items-start">
            <Link
              href="/#home"
              className="group flex items-center gap-3.5 rounded-xl transition-transform duration-[var(--motion-hover)] hover:translate-y-[-1px] focus-visible:outline-2 focus-visible:outline-ivory focus-visible:outline-offset-4"
              aria-label="Kingdom Platinum Solutions, LLC — Home"
            >
              <div className="flex size-12 sm:size-14 items-center justify-center rounded-xl bg-ivory/10 p-1.5 shadow-inner backdrop-blur-sm border border-ivory/15 transition-colors group-hover:bg-ivory/15">
                <Image
                  src="/images/brand/kingdom-platinum-logo.png"
                  alt=""
                  width={466}
                  height={453}
                  sizes="(min-width: 640px) 56px, 48px"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-[1.125rem] sm:text-[1.25rem] font-medium tracking-tight text-ivory">
                  Kingdom Platinum
                </span>
                <span className="text-[12px] font-medium tracking-wide text-ivory/65">
                  Solutions, LLC
                </span>
              </div>
            </Link>

            <div className="mt-5 max-w-md">
              <div className="inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/80 backdrop-blur-xs">
                Grace Through Grief
              </div>
              <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-ivory/75">
                Devotionals, journals, planners, and workbooks created by{" "}
                <span className="text-ivory font-medium">{site.founder}</span> to equip women of faith to turn trials into testimony.
              </p>
            </div>
          </div>

          {/* Navigation Column */}
          <nav aria-label="Footer Navigation" className="flex flex-col md:justify-self-end">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/60">
              Explore Collection
            </p>
            <ul className="mt-4 flex flex-col space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex min-h-10 items-center gap-2 rounded-md py-1 text-[15px] text-ivory/85 transition-all duration-[var(--motion-hover)] hover:translate-x-1 hover:text-ivory focus-visible:outline-2 focus-visible:outline-ivory focus-visible:outline-offset-2"
                  >
                    <span className="h-1 w-1 rounded-full bg-ivory/30 transition-colors group-hover:bg-blush" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom divider & Legal bar */}
        <div className="mt-12 border-t border-ivory/10 pt-6 sm:mt-16 sm:pt-8">
          <div className="flex flex-col justify-between gap-3 text-[12px] sm:text-[13px] text-ivory/60 sm:flex-row sm:items-center">
            <p>&copy; 2026 {site.name}. All rights reserved.</p>
            <p className="text-[12px] text-ivory/50">
              Grace Through Grief &mdash; Prospective Client Design Preview
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
