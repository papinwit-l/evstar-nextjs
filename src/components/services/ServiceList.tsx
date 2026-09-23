import { Cloud, Wrench, ShieldCheck, Check } from "lucide-react";
import { Container } from "@/components/shared/Container";
import type { ServiceItem } from "@/types/services";

const icons = {
  install: Wrench,
  platform: Cloud,
  maintenance: ShieldCheck,
};

/** The three services, each with its own anchor so other pages can link to it. */
export function ServiceList({ items }: { items: ServiceItem[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="services-title" className="py-(--band-py)">
      <Container>
        <h2 id="services-title" className="sr-only">
          บริการจาก EVSTAR SOLUTIONS
        </h2>

        <ul className="grid gap-3 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.id}
                id={item.id}
                className="scroll-mt-[calc(var(--header-height)+24px)] rounded-[18px] bg-surface-dim p-[clamp(24px,3vw,40px)]"
              >
                <Icon
                  size={26}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="text-accent-text"
                />
                <h3 className="mt-4 text-[1.35rem] font-semibold leading-snug text-balance">
                  {item.title}
                </h3>
                <p className="mt-2 text-text-muted text-pretty">{item.body}</p>

                {item.bullets && item.bullets.length > 0 && (
                  <ul className="mt-5 grid gap-2.5">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-[0.95rem]">
                        <Check
                          size={17}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-accent-text"
                        />
                        <span className="text-pretty">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
