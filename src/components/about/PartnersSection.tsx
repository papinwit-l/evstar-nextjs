import { Container } from "@/components/shared/Container";
import { PartnerLogos } from "@/components/shared/PartnerLogos";
import type { PartnersData } from "@/types/about";

/** Smaller heading + the shared partner logos (same component as the home OEM section). */
export function PartnersSection({ data }: { data: PartnersData }) {
  if (data.logos.length === 0) return null;

  return (
    <section
      aria-labelledby="partners-title"
      className="pb-(--section-py) pt-[clamp(80px,9vw,112px)] text-center"
    >
      <Container>
        <h2
          id="partners-title"
          className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold leading-[1.25] tracking-[-0.015em] text-balance"
        >
          {data.title}
        </h2>
        <PartnerLogos logos={data.logos} className="mt-8" />
      </Container>
    </section>
  );
}
