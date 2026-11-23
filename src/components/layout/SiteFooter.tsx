import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerLinks } from "@/content/navigation";
import { site } from "@/content/site";

const navLinkClass =
  "inline-flex min-h-11 items-center text-[15px] text-plum transition-colors hover:text-plum-soft sm:min-h-8 focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2";

const columnLabelClass =
  "text-[11px] font-medium uppercase tracking-[0.14em] text-plum-soft";

export function SiteFooter() {
  return (
    <footer data-site-footer className="border-t border-line bg-ivory">
      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-[1.5fr_1fr_1fr] sm:gap-10">
          <div className="flex flex-col items-start gap-3 sm:max-w-sm">
            <Link
              href="/#home"
              className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
              aria-label="Kingdom Platinum Solutions, LLC — Home"
            >
              <Image
                src="/images/brand/kingdom-platinum-logo.png"
                alt=""
                width={466}
                height={453}
                sizes="(min-width: 640px) 56px, 48px"
                className="h-12 w-auto sm:h-14"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-[15px] font-semibold tracking-tight text-plum sm:text-[16px]">
                  Kingdom Platinum
                </span>
                <span className="text-[11px] font-medium tracking-normal text-plum/70 sm:text-[12px]">
                  Solutions, LLC
                </span>
              </div>
            </Link>
            <div className="mt-1">
              <p className={columnLabelClass}>Grace Through Grief</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-plum-soft sm:text-[15px]">
                Devotionals, journals, planners, and workbooks from{" "}
                {site.founder}.
              </p>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className={columnLabelClass}>Explore</p>
            <ul className="mt-2 flex flex-wrap gap-x-6 text-[15px] text-plum sm:mt-4 sm:flex-col sm:gap-x-0">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={navLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={columnLabelClass}>Connect</p>
            <ul className="mt-2 flex flex-wrap gap-x-6 text-[15px] text-plum sm:mt-4 sm:flex-col sm:gap-x-0">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className={navLinkClass}
                >
                  Email
                </a>
              </li>
              {site.contact.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={navLinkClass}
                  >
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-line/70 pt-5 sm:mt-12">
          <div className="flex flex-col justify-between gap-2 text-[13px] text-plum-soft sm:flex-row sm:items-center">
            <p>&copy; 2026 {site.name}. All rights reserved.</p>
            <p className="text-[12px] text-plum-soft/80">
              Grace Through Grief &mdash; Prospective Client Design Preview
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
