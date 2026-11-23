"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useActiveSection } from "@/components/layout/useActiveSection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Menu, X } from "@/components/ui/icons";
import { mobileNavLinks } from "@/content/navigation";

const mobileSectionIds = mobileNavLinks.map((link) => link.id);

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(mobileSectionIds);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const closeAndRefocus = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus({ preventScroll: true });
  }, []);

  const handleLinkClick = useCallback(
    (href: string, event?: React.MouseEvent<HTMLAnchorElement>) => {
      setOpen(false);

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) {
        return;
      }

      const targetId = href.slice(hashIndex + 1);
      const isCurrentPage =
        typeof window !== "undefined" &&
        (window.location.pathname === "/" || window.location.pathname === "");

      if (isCurrentPage) {
        event?.preventDefault();

        const targetSection = document.getElementById(targetId);
        if (!targetSection) {
          return;
        }

        if (window.history.pushState) {
          window.history.pushState(null, "", `#${targetId}`);
        } else {
          window.location.hash = `#${targetId}`;
        }

        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        if (targetId === "home") {
          window.scrollTo({
            top: 0,
            behavior: prefersReduced ? "auto" : "smooth",
          });
        } else {
          targetSection.scrollIntoView({
            behavior: prefersReduced ? "auto" : "smooth",
            block: "start",
          });
        }

        const focusTarget =
          targetId === "home"
            ? (document.getElementById("home-title") ?? targetSection)
            : (targetSection.querySelector<HTMLElement>("h1, h2") ??
              targetSection);

        if (focusTarget) {
          if (!focusTarget.hasAttribute("tabindex")) {
            focusTarget.setAttribute("tabindex", "-1");
          }
          setTimeout(() => {
            focusTarget.focus({ preventScroll: true });
          }, 120);
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    document.body.dataset.menuOpen = "true";

    // Focus the first interactive element inside the open panel
    const focusTimer = setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }, 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAndRefocus();
        return;
      }

      if (event.key === "Tab") {
        if (!panelRef.current || !buttonRef.current) {
          return;
        }

        const focusableElements = [
          buttonRef.current,
          ...Array.from(
            panelRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          ),
        ];

        if (focusableElements.length === 0) {
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(focusTimer);
      delete document.body.dataset.menuOpen;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open, closeAndRefocus]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-line text-plum transition-colors hover:bg-ivory-deep focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2"
      >
        {open ? (
          <X className="h-[22px] w-[22px] shrink-0" strokeWidth={2} aria-hidden="true" />
        ) : (
          <Menu className="h-[22px] w-[22px] shrink-0" strokeWidth={2} aria-hidden="true" />
        )}
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-[72px] bg-plum-deep/20 backdrop-blur-[1px] md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <nav
            ref={panelRef}
            id="mobile-menu"
            aria-label="Mobile Navigation"
            className="mobile-dropdown-panel absolute inset-x-0 top-full z-50 w-full border-b border-line bg-ivory shadow-[0_24px_48px_-12px_rgba(56,34,57,0.35)] max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain md:hidden"
          >
            <ul className="flex flex-col divide-y divide-line/40 py-2">
              {mobileNavLinks.map((link) => {
                const isActive = active === link.id;

                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.href, e)}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative flex h-[48px] min-h-[48px] items-center px-5 sm:px-8 text-[17px] sm:text-[18px] font-medium transition-colors duration-[var(--motion-hover)] ease-[var(--motion-ease)] hover:bg-ivory-deep focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-[-2px] ${
                        isActive
                          ? "bg-plum/[0.04] text-plum font-semibold"
                          : "text-plum/90 hover:text-plum"
                      }`}
                    >
                      {isActive ? (
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-plum"
                        />
                      ) : null}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line px-5 py-4 sm:px-8">
              <ButtonLink
                href="/#resources"
                onClick={() => handleLinkClick("/#resources")}
                className="w-full justify-center"
              >
                Explore Resources
              </ButtonLink>
            </div>
          </nav>
        </>
      ) : null}
    </div>
  );
}

