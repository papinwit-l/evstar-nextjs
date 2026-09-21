import { Phrases } from "@/components/shared/Phrases";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Supports "\n" phrase breaks, like tile titles */
  title: string;
  lead?: string;
  /** Pass to the section's aria-labelledby */
  id?: string;
  className?: string;
};

/** Centered section title + optional lead paragraph. */
export function SectionHeading({
  title,
  lead,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("text-center", className)}>
      <h2
        id={id}
        className="mx-auto max-w-[18ch] text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-balance"
      >
        <Phrases text={title} />
      </h2>
      {lead && (
        <p className="mx-auto mt-3.5 max-w-[40ch] text-[clamp(1.05rem,1.6vw,1.3rem)] text-text-muted text-balance">
          {lead}
        </p>
      )}
    </div>
  );
}
