export type ButtonVariant = "primary" | "light" | "outline";

const variants = {
  primary: "bg-plum text-ivory hover:bg-plum-deep",
  light: "bg-ivory text-plum hover:bg-blush",
  outline:
    "border border-plum/25 text-plum hover:border-plum hover:bg-plum hover:text-ivory",
} as const;

export function buttonClasses(
  variant: ButtonVariant = "primary",
  className = "",
) {
  return `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-[15px] font-medium leading-none transition-colors ${variants[variant]} ${className}`;
}
