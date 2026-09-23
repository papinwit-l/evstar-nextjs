"use client";

type Option = { value: string; label: string };

type OptionCardsProps = {
  name: string;
  options: readonly Option[];
  defaultValue?: string;
  /** Tailwind grid columns, e.g. "sm:grid-cols-4" */
  columns?: string;
  describedBy?: string;
  invalid?: boolean;
};

/**
 * Tappable radio cards — easier than a <select> on a phone,
 * and every option stays visible.
 */
export function OptionCards({
  name,
  options,
  defaultValue,
  columns = "sm:grid-cols-2",
  describedBy,
  invalid,
}: OptionCardsProps) {
  return (
    <div
      role="group"
      aria-describedby={describedBy}
      className={`grid grid-cols-2 gap-2.5 ${columns}`}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex cursor-pointer items-center justify-center rounded-[14px] border px-4 py-3 text-center text-[0.95rem] transition-colors has-[:checked]:border-cta has-[:checked]:bg-accent-subtle has-[:checked]:font-medium has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
            invalid ? "border-error" : "border-border-strong"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            className="sr-only"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
