import { MessageCircle } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { contact } from "@/lib/site";
import type { CtaData } from "@/types/common";

/** Closing call-to-action on a grey band. Used on Home, About, and later pages. */
export function CtaSection({ data }: { data: CtaData }) {
  return (
    <section
      aria-labelledby="cta-title"
      className="bg-surface-dim py-(--section-py)"
    >
      <Container>
        <SectionHeading id="cta-title" title={data.title} lead={data.lead} />

        <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
          <Button href={data.primary.href}>{data.primary.label}</Button>

          {data.secondary && (
            <Button href={data.secondary.href} variant="outline">
              {data.secondary.label}
            </Button>
          )}

          {data.showLine && (
            <Button href={contact.lineUrl} variant="neutral">
              {/* TODO: swap for the official LINE icon from LINE's brand resources */}
              <span className="grid size-5 place-items-center rounded-[5px] bg-line text-white">
                <MessageCircle size={13} strokeWidth={2.5} />
              </span>
              แชทผ่าน LINE
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
