import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { privacyPolicy } from "@/lib/mock/legal";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว",
  description:
    "นโยบายความเป็นส่วนตัวและการใช้คุกกี้ของ EVSTAR SOLUTIONS ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562",
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  const data = privacyPolicy;

  return (
    <div className="py-(--band-py)">
      <Container className="max-w-[70ch]">
        <h1 className="text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
          {data.title}
        </h1>
        {data.updated && (
          <p className="mt-3 text-[0.9rem] text-text-subtle">{data.updated}</p>
        )}
        {data.intro && (
          <p className="mt-6 text-[1.05rem] text-pretty">{data.intro}</p>
        )}

        {data.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mt-12 scroll-mt-(--header-height)"
          >
            <h2 className="text-[1.35rem] font-semibold leading-snug">
              {section.title}
            </h2>

            {section.paragraphs?.map((paragraph, i) => (
              <p key={i} className="mt-3 text-text-muted text-pretty">
                {paragraph}
              </p>
            ))}

            {section.bullets && (
              <ul className="mt-4 grid gap-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2.5 text-text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="text-pretty">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </Container>
    </div>
  );
}
