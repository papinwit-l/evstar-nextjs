import Link from "next/link";

type LogoProps = {
  className?: string;
};

/** Text wordmark until the client supplies the SVG logo. */
export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="EV Star หน้าแรก"
      className={`flex items-baseline gap-[0.34em] text-[1.16rem] font-semibold tracking-[-0.03em] text-text ${className}`}
    >
      EV<span className="text-accent">STAR</span>
    </Link>
  );
}
