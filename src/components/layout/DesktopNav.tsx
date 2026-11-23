"use client";

import Link from "next/link";
import { useActiveSection } from "@/components/layout/useActiveSection";
import { sectionLinks } from "@/content/navigation";

export function DesktopNav() {
  const active = useActiveSection();

  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center justify-center gap-6 lg:gap-9">
        {sectionLinks.map((link) => {
          const isActive = active === link.id;

          return (
            <li key={link.id}>
              <Link
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                data-active={isActive ? "true" : "false"}
                className={`nav-link relative inline-flex min-h-11 items-center rounded-sm px-1 text-[15px] font-medium transition-colors duration-[var(--motion-hover)] ease-[var(--motion-ease)] focus-visible:outline-2 focus-visible:outline-plum focus-visible:outline-offset-2 ${
                  isActive ? "font-semibold text-plum" : "text-plum-soft hover:text-plum"
                }`}
              >
                <span>{link.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute bottom-2 left-1 right-1 h-[2px] rounded-full bg-plum transition-all duration-[var(--motion-hover)] ease-[var(--motion-ease)] ${
                    isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
