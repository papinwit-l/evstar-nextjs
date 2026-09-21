import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  /** Describes the photo that is still missing, e.g. "ภาพโรงงาน (21:9)" */
  label: string;
  className?: string;
};

/**
 * Dashed frame marking a photo we don't have yet.
 * Development only — in production it renders nothing, so a missing
 * image never shows up as an empty box on the live site.
 */
export function ImagePlaceholder({ label, className }: ImagePlaceholderProps) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      role="img"
      aria-label={`รูปภาพที่ยังไม่มี: ${label}`}
      className={cn(
        "grid place-items-center rounded-[18px] border border-dashed border-border-strong bg-surface-dim p-4 text-center text-[0.82rem] text-text-subtle",
        className,
      )}
    >
      {label}
    </div>
  );
}
