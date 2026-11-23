import type { SVGProps } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUp,
  ExternalLink,
  Mail,
} from "lucide-react";

export { Menu, X, ArrowRight, ArrowUp, ExternalLink, Mail };

/**
 * Authentic brand SVGs for social platforms.
 * Preserves exact brand-logo geometry and renders monochrome.
 */

export function FacebookIcon({
  className = "size-5 shrink-0",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function InstagramIcon({
  className = "size-5 shrink-0",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function TikTokIcon({
  className = "size-5 shrink-0",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.82 4.46v-7.14a8.16 8.16 0 0 0 5.63 2.24V11.8a4.84 4.84 0 0 1-3.77-1.57z" />
    </svg>
  );
}
