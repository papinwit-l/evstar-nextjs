import type { ChargeLineData } from "@/types/home";

/**
 * Thin orange bar that fills once on load, like a charging indicator.
 * Decorative only — the same facts are in the hero copy.
 */
export function ChargeLine({ label, value, detail }: ChargeLineData) {
  return (
    <div aria-hidden="true" className="mt-[30px] w-[min(280px,72vw)] text-left">
      <div className="h-0.5 overflow-hidden rounded-full bg-border">
        <div className="h-full w-0 bg-accent animate-charge motion-reduce:w-full motion-reduce:animate-none" />
      </div>
      <div className="mt-2 flex justify-between text-[0.76rem] text-text-muted">
        <span>{label}</span>
        <span>
          <b className="font-semibold text-text">{value}</b>
          {detail && ` ${detail}`}
        </span>
      </div>
    </div>
  );
}
