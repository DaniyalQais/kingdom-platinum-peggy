import Link from "next/link";
import type { ReactNode } from "react";
import {
  buttonClasses,
  type ButtonVariant,
} from "@/components/ui/button-styles";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  icon?: "arrow" | "external";
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  icon,
  className = "",
  onClick,
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);

  const content = (
    <>
      {children}
      {icon === "arrow" ? (
        <span aria-hidden="true" className="button-arrow text-[0.95em]">
          &#8594;
        </span>
      ) : null}
      {icon === "external" ? (
        <span aria-hidden="true" className="text-[0.95em]">
          &#8599;
        </span>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}
