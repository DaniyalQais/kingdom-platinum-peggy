import Link from "next/link";
import type { ReactNode } from "react";
import {
  buttonClasses,
  type ButtonVariant,
} from "@/components/ui/button-styles";
import { ArrowRight, ExternalLink } from "@/components/ui/icons";

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
      <span>{children}</span>
      {icon === "arrow" ? (
        <ArrowRight
          className="size-[18px] shrink-0 button-arrow"
          strokeWidth={2}
          aria-hidden="true"
        />
      ) : null}
      {icon === "external" ? (
        <ExternalLink
          className="size-[18px] shrink-0"
          strokeWidth={2}
          aria-hidden="true"
        />
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
