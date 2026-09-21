import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { Phrases } from "@/components/shared/Phrases";
import { cn } from "@/lib/utils";
import type { StoryData } from "@/types/about";

const frame = "aspect-[4/3] md:aspect-[4/5]";

/** Photo beside a short narrative. Stacks (photo first) below md. */
export function StorySection({ data }: { data: StoryData }) {
  const [intro, ...rest] = data.paragraphs;

  return (
    <section
      aria-labelledby="story-title"
      className="bg-surface-dim py-(--section-py)"
    >
      <Container className="grid items-center gap-[clamp(32px,6vw,96px)] md:grid-cols-2">
        {data.image ? (
          <div
            className={cn(
              "relative overflow-hidden rounded-[18px] bg-surface-deep",
              frame,
            )}
          >
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <ImagePlaceholder
            label="ภาพผู้ก่อตั้ง หรือบรรยากาศการทำงาน (4:5)"
            className={frame}
          />
        )}

        <div>
          {data.kicker && (
            <p className="text-[0.95rem] font-semibold text-accent-text">
              {data.kicker}
            </p>
          )}
          <h2
            id="story-title"
            className="mt-2 text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-balance"
          >
            <Phrases text={data.title} />
          </h2>

          {intro && (
            <p className="mt-6 max-w-[46ch] text-[clamp(1.15rem,1.7vw,1.35rem)] leading-[1.55] text-pretty">
              {intro}
            </p>
          )}
          {rest.map((paragraph, i) => (
            <p
              key={i}
              className="mt-5 max-w-[46ch] text-[1.06rem] text-text-muted text-pretty"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
