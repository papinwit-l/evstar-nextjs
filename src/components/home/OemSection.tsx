import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { PartnerLogos } from "@/components/shared/PartnerLogos";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { OemData } from "@/types/home";

export function OemSection({ data }: { data: OemData }) {
  return (
    <section aria-labelledby="oem-title" className="py-(--section-py)">
      <Container>
        <SectionHeading id="oem-title" title={data.title} lead={data.lead} />

        <PartnerLogos logos={data.logos} className="mt-14" />

        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <Button href={data.primary.href}>{data.primary.label}</Button>
          {data.secondary && (
            <Button href={data.secondary.href} variant="outline">
              {data.secondary.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
