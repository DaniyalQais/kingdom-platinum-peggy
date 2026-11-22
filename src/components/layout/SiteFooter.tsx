import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerLinks } from "@/content/navigation";
import { site } from "@/content/site";

const navLinkClass =
  "inline-flex min-h-11 items-center text-[15px] text-plum transition-colors hover:text-plum-soft sm:min-h-8";

const columnLabelClass =
  "text-[11px] font-medium uppercase tracking-[0.14em] text-plum-soft";

export function SiteFooter() {
  return (
    <footer data-site-footer className="border-t border-line bg-ivory">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-7 sm:grid-cols-[1.5fr_1fr_1fr] sm:gap-10">
          <div className="flex items-center gap-4 sm:block sm:max-w-sm">
            <Image
              src="/images/brand/kingdom-platinum-logo.png"
              alt="Kingdom Platinum Solutions, LLC"
              width={466}
              height={453}
              sizes="(min-width: 640px) 56px, 48px"
              className="h-12 w-auto sm:h-14"
            />
            <div>
              <p className={columnLabelClass}>Grace Through Grief</p>
              <p className="mt-1 text-[14px] leading-5 text-plum-soft sm:mt-2 sm:text-[15px] sm:leading-6">
                Devotionals, journals, planners, and workbooks from{" "}
                {site.founder}.
              </p>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className={columnLabelClass}>Explore</p>
            <ul className="mt-1 flex flex-wrap gap-x-5 text-[15px] text-plum sm:mt-4 sm:flex-col sm:gap-x-0">
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
            <ul className="mt-1 flex flex-wrap gap-x-5 text-[15px] text-plum sm:mt-4 sm:flex-col sm:gap-x-0">
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

        <div className="mt-8 border-t border-line pt-4 sm:mt-10 sm:pt-5">
          <p className="text-[13px] text-plum-soft">
            &copy; 2026 {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
