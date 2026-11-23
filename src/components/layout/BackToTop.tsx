"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SHOW_AFTER_RATIO = 0.75;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const footerVisible = useRef(false);

  const sync = useCallback(() => {
    const overlayOpen =
      document.documentElement.dataset.dialogOpen === "true" ||
      document.body.dataset.menuOpen === "true";
    const scrolledEnough =
      window.scrollY > window.innerHeight * SHOW_AFTER_RATIO;

    setVisible(scrolledEnough && !overlayOpen && !footerVisible.current);
  }, []);

  useEffect(() => {
    let frame = 0;

    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          sync();
        });
      }
    };

    const footer = document.querySelector<HTMLElement>("[data-site-footer]");
    const footerObserver =
      footer && "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              footerVisible.current = entries[0]?.isIntersecting ?? false;
              sync();
            },
            { threshold: 0 },
          )
        : null;

    if (footer && footerObserver) {
      footerObserver.observe(footer);
    }

    const stateObserver = new MutationObserver(schedule);

    stateObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-dialog-open"],
    });
    stateObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-menu-open"],
    });

    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      stateObserver.disconnect();
      footerObserver?.disconnect();
    };
  }, [sync]);

  const handleClick = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const focusTarget =
      document.getElementById("home-title") ??
      document.querySelector<HTMLElement>("main h1");

    if (focusTarget) {
      if (!focusTarget.hasAttribute("tabindex")) {
        focusTarget.setAttribute("tabindex", "-1");
      }
      focusTarget.focus({ preventScroll: true });
    }

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      inert={!visible}
      data-visible={visible ? "true" : "false"}
      aria-label="Back to top"
      className="back-to-top fixed z-40 flex size-11 items-center justify-center rounded-full border border-plum-deep/30 bg-plum text-ivory shadow-[0_12px_28px_-14px_rgba(42,23,47,0.75)] hover:bg-plum-deep focus-visible:outline-2 focus-visible:outline-plum-deep focus-visible:outline-offset-2"
    >
      <span aria-hidden="true" className="text-lg leading-none">
        &#8593;
      </span>
    </button>
  );
}
