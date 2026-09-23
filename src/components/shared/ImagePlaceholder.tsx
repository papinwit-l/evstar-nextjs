import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  /** Describes the photo that is still missing, e.g. "ภาพโรงงาน (21:9)" */
  label: string;
  /** framed = rounded dashed box; flush = square, dashed top edge only (bottom of a card) */
  variant?: "framed" | "flush";
  /** dark = for black tiles */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Dashed frame marking a photo we don't have yet.
 * Development only — in production it renders nothing, so a missing
 * image never shows up as an empty box on the live site.
 */
export function ImagePlaceholder({
  label,
  variant = "framed",
  tone = "light",
  className,
}: ImagePlaceholderProps) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      role="img"
      aria-label={`รูปภาพที่ยังไม่มี: ${label}`}
      className={cn(
        "grid place-items-center border-dashed p-4 text-center text-[0.82rem] text-text-subtle",
        tone === "dark"
          ? "border-primary-light bg-white/[0.04]"
          : "border-border-strong bg-black/[0.03]",
        variant === "framed" ? "rounded-[18px] border" : "border-t",
        className,
      )}
    >
      {label}
    </div>
  );
}
