import { Container } from "@/components/shared/Container";
import { Phrases } from "@/components/shared/Phrases";

type ProductsHeroProps = {
  title: string;
  lead: string;
};

export function ProductsHero({ title, lead }: ProductsHeroProps) {
  return (
    <section className="pb-[clamp(40px,6vw,64px)] pt-[clamp(48px,7vw,88px)] text-center">
      <Container>
        <h1 className="mx-auto max-w-[18ch] text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-balance">
          <Phrases text={title} />
        </h1>
        <p className="mx-auto mt-4 max-w-[44ch] text-[clamp(1.05rem,1.6vw,1.3rem)] text-text-muted text-balance">
          <Phrases text={lead} />
        </p>
      </Container>
    </section>
  );
}
