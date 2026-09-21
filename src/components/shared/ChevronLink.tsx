import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Apple-style text link: orange label + small chevron that nudges on hover. */
export function ChevronLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-0.5 font-medium text-accent-text hover:underline hover:underline-offset-[3px]",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight
        size={16}
        strokeWidth={2}
        className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
    </Link>
  );
}
