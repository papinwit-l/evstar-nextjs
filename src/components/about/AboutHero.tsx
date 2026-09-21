import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { Phrases } from "@/components/shared/Phrases";
import type { AboutHeroData } from "@/types/about";

const frame = "mt-[clamp(48px,6vw,72px)] aspect-[4/3] md:aspect-[21/9]";

export function AboutHero({ data }: { data: AboutHeroData }) {
  return (
    <section className="pt-[clamp(64px,9vw,112px)] text-center">
      <Container>
        {data.kicker && (
          <p className="text-[0.95rem] font-semibold text-accent-text">
            {data.kicker}
          </p>
        )}
        <h1 className="mx-auto mt-2.5 max-w-[14ch] text-[clamp(2.15rem,6.2vw,4.4rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-balance">
          <Phrases text={data.title} />
        </h1>
        <p className="mx-auto mt-5 max-w-[44ch] text-[clamp(1.05rem,1.6vw,1.3rem)] text-text-muted text-balance">
          {data.lead}
        </p>

        {data.image ? (
          <div
            className={`relative overflow-hidden rounded-[18px] bg-surface-dim ${frame}`}
          >
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              sizes="(min-width: 1280px) 1152px, 100vw"
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
          </div>
        ) : (
          <ImagePlaceholder
            label="ภาพกว้าง: โรงงาน สายการผลิต หรือทีมงาน (21:9)"
            className={frame}
          />
        )}
      </Container>
    </section>
  );
}
