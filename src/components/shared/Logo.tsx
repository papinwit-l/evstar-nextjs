import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/site";

type LogoProps = {
  /** light = for dark backgrounds (white wordmark) */
  variant?: "default" | "light";
  className?: string;
};

/**
 * Client logo, rebuilt as a real SVG: the star was traced from the Canva
 */
export function Logo({ variant = "default", className = "" }: LogoProps) {
  const src =
    variant === "light"
      ? "/images/logo/evstar-logo-light.svg"
      : "/images/logo/evstar-logo.svg";

  return (
    <Link
      href="/"
      aria-label={`${company.nameEn} หน้าแรก`}
      className={`shrink-0 ${className}`}
    >
      <Image
        src={src}
        alt={company.nameEn}
        width={1364}
        height={662}
        priority
        className="h-10 w-auto"
      />
    </Link>
  );
}
