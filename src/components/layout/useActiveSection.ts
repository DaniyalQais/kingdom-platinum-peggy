"use client";

import { useEffect, useState } from "react";
import { sectionLinks } from "@/content/navigation";

const ids = sectionLinks.map((link) => link.id);

export function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const header = document.querySelector("header");
      const offset = (header?.getBoundingClientRect().height ?? 72) + 12;

      let current: string | null = null;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        current = ids[ids.length - 1];
      } else {
        for (const id of ids) {
          const section = document.getElementById(id);

          if (section && section.getBoundingClientRect().top <= offset + 2) {
            current = id;
          }
        }
      }

      setActive((previous) => (previous === current ? previous : current));
    };

    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return active;
}
