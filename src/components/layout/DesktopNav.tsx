"use client";

import Link from "next/link";
import { useActiveSection } from "@/components/layout/useActiveSection";
import { sectionLinks } from "@/content/navigation";

export function DesktopNav() {
  const active = useActiveSection();

  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center justify-center gap-6 lg:gap-10">
        {sectionLinks.map((link) => {
          const isActive = active === link.id;

          return (
            <li key={link.id}>
              <Link
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                data-active={isActive ? "true" : "false"}
                className={`nav-link inline-flex min-h-11 items-center whitespace-nowrap text-[15px] font-medium underline decoration-1 underline-offset-[7px] ${
                  isActive ? "text-plum" : "text-plum-soft hover:text-plum"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
