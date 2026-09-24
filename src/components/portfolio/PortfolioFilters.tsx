import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PortfolioFilter } from "@/types/portfolio";

type PortfolioFiltersProps = {
  filters: PortfolioFilter[];
  /** Currently selected filter value, from ?type= */
  active?: string;
};

/**
 * Plain links, not buttons: each filter is a real URL (/portfolio?type=condo)
 * that works without JavaScript, can be shared, and is crawlable.
 */
export function PortfolioFilters({ filters, active }: PortfolioFiltersProps) {
  if (filters.length === 0) return null;

  const options = [{ value: "", label: "ทั้งหมด" }, ...filters];

  return (
    <nav aria-label="กรองตามประเภทสถานที่">
      <ul className="-mx-1 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {options.map((option) => {
          const selected = (active ?? "") === option.value;
          return (
            <li key={option.value || "all"}>
              <Link
                href={
                  option.value
                    ? `/portfolio?type=${option.value}`
                    : "/portfolio"
                }
                aria-current={selected ? "page" : undefined}
                scroll={false}
                className={cn(
                  "inline-block whitespace-nowrap rounded-full border px-4 py-1.5 text-[0.9rem] transition-colors",
                  selected
                    ? "border-cta bg-accent-subtle font-medium text-accent-text"
                    : "border-border-strong text-text-muted hover:border-text-muted hover:text-text",
                )}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
