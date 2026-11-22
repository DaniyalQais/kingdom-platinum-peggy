"use client";

import { useEffect, useRef } from "react";

export function HeaderScrollState() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = markerRef.current?.closest("header");

    if (!header) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const scrolled = window.scrollY > 24;
      const next = scrolled ? "true" : "false";

      if (header.dataset.scrolled !== next) {
        header.dataset.scrolled = next;
      }
    };

    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      delete header.dataset.scrolled;
    };
  }, []);

  return <span ref={markerRef} hidden />;
}
