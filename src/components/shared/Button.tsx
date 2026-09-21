import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<typeof Link> & {
  /** solid = primary action, outline = secondary action */
  variant?: "solid" | "outline";
  /** use "dark" when the button sits on a primary/black background */
  tone?: "light" | "dark";
  size?: "md" | "sm";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium leading-tight whitespace-nowrap transition-colors duration-150";

const sizes = {
  md: "px-[22px] py-2.5 text-[0.94rem]",
  sm: "px-[18px] py-2 text-[0.88rem]",
};

const variants = {
  solid: {
    light: "bg-cta text-on-cta hover:bg-cta-hover",
    dark: "bg-cta text-on-cta hover:bg-cta-hover",
  },
  outline: {
    light: "border border-cta text-accent-text hover:bg-cta hover:text-on-cta",
    dark: "border border-accent-on-dark text-accent-on-dark hover:bg-accent-on-dark hover:text-primary",
  },
};

/** Pill link button. Every button on the site navigates, so it renders a Next <Link>. */
export function Button({
  variant = "solid",
  tone = "light",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <Link
      className={cn(base, sizes[size], variants[variant][tone], className)}
      {...props}
    />
  );
}
