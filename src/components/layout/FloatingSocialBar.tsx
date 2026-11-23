"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

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
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              ) : null}

              {item.type === "instagram" ? (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              ) : null}

              {item.type === "tiktok" ? (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.88-4.49V8.71a8.21 8.21 0 0 0 4.89 1.6V6.86a4.89 4.89 0 0 1-1-.17z" />
                </svg>
              ) : null}

              {item.type === "email" ? (
                <svg
                  className="h-5 w-5"
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

