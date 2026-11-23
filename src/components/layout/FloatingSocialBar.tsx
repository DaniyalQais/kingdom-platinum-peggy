"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  Mail,
} from "@/components/ui/icons";

export function FloatingSocialBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sync = () => {
      const overlayOpen =
        document.documentElement.dataset.dialogOpen === "true" ||
        document.body.dataset.menuOpen === "true";

      setVisible(!overlayOpen);
    };

    const stateObserver = new MutationObserver(sync);

    stateObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-dialog-open"],
    });
    stateObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-menu-open"],
    });

    return () => {
      stateObserver.disconnect();
    };
  }, []);

  const items = [
    ...site.contact.socials.map((social) => ({
      label: social.label,
      href: social.href,
      external: true,
      type: social.label.toLowerCase() as "facebook" | "instagram" | "tiktok",
    })),
    {
      label: "Email",
      href: `mailto:${site.contact.email}`,
      external: false,
      type: "email" as const,
    },
  ].filter((item) => Boolean(item.href));

  return (
    <nav
      aria-label="Social and contact links"
      inert={!visible}
      className={`floating-social-bar fixed z-40 flex items-center justify-center rounded-full border border-line/80 bg-ivory/95 p-1 shadow-[0_12px_28px_-8px_rgba(42,23,47,0.28)] backdrop-blur-md transition-all duration-[var(--motion-overlay)] ease-[var(--motion-ease)] ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none translate-y-3"
      }`}
      style={{
        left: "50%",
        bottom: "calc(0.875rem + env(safe-area-inset-bottom))",
        transform: `translateX(-50%) ${visible ? "translateY(0)" : "translateY(0.75rem)"}`,
      }}
    >
      <ul className="flex items-center gap-0.5 sm:gap-1">
        {items.map((item) => (
          <li key={item.label} className="relative">
            <a
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              aria-label={
                item.external
                  ? `${item.label} (opens in a new tab)`
                  : `Email ${site.contact.email}`
              }
              className="group relative flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-plum transition-colors duration-[var(--motion-hover)] hover:bg-plum/10 hover:text-plum-deep focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
            >
              {item.type === "facebook" ? (
                <FacebookIcon className="size-5 shrink-0" />
              ) : null}

              {item.type === "instagram" ? (
                <InstagramIcon className="size-5 shrink-0" />
              ) : null}

              {item.type === "tiktok" ? (
                <TikTokIcon className="size-5 shrink-0" />
              ) : null}

              {item.type === "email" ? (
                <Mail className="size-5 shrink-0" strokeWidth={2} aria-hidden="true" />
              ) : null}

              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-plum px-2.5 py-1 text-[11px] font-medium text-ivory opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

