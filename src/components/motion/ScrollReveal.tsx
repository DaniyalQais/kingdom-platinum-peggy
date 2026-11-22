"use client";

import { useLayoutEffect } from "react";

function readStagger(): number {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--motion-stagger")
    .trim();
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 70;
}

export function ScrollReveal() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (elements.length === 0) {
      return;
    }

    const stagger = readStagger();
    const groups = new Map<string, HTMLElement[]>();

    const revealDelay = (element: HTMLElement) => {
      const group = element.dataset.revealGroup;

      if (!group) {
        return 0;
      }

      let peers = groups.get(group);

      if (!peers) {
        peers = Array.from(
          document.querySelectorAll<HTMLElement>(
            `[data-reveal-group="${group}"]`,
          ),
        );
        groups.set(group, peers);
      }

      const row = peers.filter(
        (peer) => Math.abs(peer.offsetTop - element.offsetTop) < 2,
      );

      return Math.min(Math.max(row.indexOf(element), 0), 3) * stagger;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          element.style.setProperty(
            "--reveal-delay",
            `${revealDelay(element)}ms`,
          );
          element.dataset.reveal = "shown";
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
    );

    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.95) {
        element.dataset.reveal = "instant";
      } else {
        element.dataset.reveal = "pending";
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
