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
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1.1fr] lg:gap-14">
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

            <div className="mt-5 max-w-sm">
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
          <nav aria-label="Footer Navigation" className="flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/60">
              Explore Collection
            </p>
            <ul className="mt-4 flex flex-col space-y-1.5">
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

          {/* Connect Column */}
          <div className="flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/60">
              Connect With Us
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={`mailto:${site.contact.email}`}
                className="group flex min-h-11 items-center justify-between rounded-xl border border-ivory/10 bg-ivory/5 px-4 py-2.5 text-[14px] text-ivory/90 backdrop-blur-xs transition-all duration-[var(--motion-hover)] hover:border-ivory/25 hover:bg-ivory/10 hover:text-ivory focus-visible:outline-2 focus-visible:outline-ivory focus-visible:outline-offset-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <svg
                    className="size-4 shrink-0 text-ivory/70 transition-colors group-hover:text-ivory"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="truncate">{site.contact.email}</span>
                </div>
                <span aria-hidden="true" className="shrink-0 text-ivory/50 transition-transform group-hover:translate-x-0.5 group-hover:text-ivory">
                  &#8594;
                </span>
              </a>

              <div className="flex flex-wrap gap-2 pt-1">
                {site.contact.socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-ivory/10 bg-ivory/5 px-3.5 py-1.5 text-[13px] font-medium text-ivory/85 backdrop-blur-xs transition-all duration-[var(--motion-hover)] hover:border-ivory/25 hover:bg-ivory/12 hover:text-ivory focus-visible:outline-2 focus-visible:outline-ivory focus-visible:outline-offset-2"
                  >
                    <span>{social.label}</span>
                    <span aria-hidden="true" className="text-xs text-ivory/50">
                      &#8599;
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
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
