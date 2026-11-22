"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "@/components/layout/useActiveSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { sectionLinks } from "@/content/navigation";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const closeAndRefocus = () => {
    setOpen(false);
    buttonRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    document.body.dataset.menuOpen = "true";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus({ preventScroll: true });
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      delete document.body.dataset.menuOpen;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-plum transition-colors hover:bg-ivory-deep"
      >
        <span className="sr-only">
          {open ? "Close menu" : "Open menu"}
        </span>
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span
            className={`absolute left-0 top-0 h-px w-5 bg-plum transition-transform duration-[var(--motion-hover)] ease-[var(--motion-ease)] ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[7px] h-px w-5 bg-plum transition-opacity duration-[var(--motion-hover)] ease-[var(--motion-ease)] ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[14px] h-px w-5 bg-plum transition-transform duration-[var(--motion-hover)] ease-[var(--motion-ease)] ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open ? (
        <nav
          ref={panelRef}
          id="mobile-menu"
          aria-label="Mobile"
          className="menu-panel absolute right-0 top-[calc(100%+0.75rem)] w-[min(20rem,calc(100vw-2.5rem))] rounded-lg border border-line bg-ivory p-4 shadow-[0_24px_60px_-30px_rgba(56,34,57,0.45)]"
        >
          <ul className="flex flex-col">
            {sectionLinks.map((link) => {
              const isActive = active === link.id;

              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={closeAndRefocus}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex min-h-12 items-center rounded-md px-3 text-base font-medium transition-colors duration-[var(--motion-hover)] ease-[var(--motion-ease)] hover:bg-ivory-deep ${
                      isActive ? "bg-ivory-deep text-plum" : "text-plum"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 border-t border-line pt-4">
            <ButtonLink
              href="/#resources"
              onClick={closeAndRefocus}
              className="w-full"
            >
              Explore Resources
            </ButtonLink>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
