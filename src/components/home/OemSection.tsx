import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Media, OemData } from "@/types/home";

function LogoBanner({ logo }: { logo: Media }) {
  return (
    <div className="mx-auto mt-14 grid min-h-[200px] max-w-[1000px] place-items-center rounded-[18px] bg-surface-dim p-[clamp(28px,4vw,52px)]">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        sizes="(min-width: 1080px) 900px, 90vw"
        className="h-auto w-full object-contain"
      />
    </div>
  );
}

function LogoGrid({ logos }: { logos: Media[] }) {
  return (
    <ul className="mx-auto mt-14 grid max-w-[1000px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {logos.map((logo) => (
        <li
          key={logo.src}
          className="flex h-28 items-center justify-center rounded-[18px] bg-surface-dim px-6"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            sizes="200px"
            className="h-auto max-h-12 w-auto object-contain"
          />
        </li>
      ))}
    </ul>
  );
}

export function OemSection({ data }: { data: OemData }) {
  return (
    <section aria-labelledby="oem-title" className="py-(--section-py)">
      <Container>
        <SectionHeading id="oem-title" title={data.title} lead={data.lead} />

        {data.logos.length === 1 ? (
          <LogoBanner logo={data.logos[0]} />
        ) : (
          <LogoGrid logos={data.logos} />
        )}

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
