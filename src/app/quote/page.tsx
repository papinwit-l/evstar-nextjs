import type { Metadata } from "next";
import { QuoteContact } from "@/components/quote/QuoteContact";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Container } from "@/components/shared/Container";
import { Phrases } from "@/components/shared/Phrases";
import { getQuoteOptions, getQuotePage } from "@/lib/api/quote";
import { seoMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getQuotePage();
  return seoMetadata(page.seo, {
    title: "ขอใบเสนอราคา",
    description:
      "ขอใบเสนอราคาติดตั้งเครื่องชาร์จรถยนต์ไฟฟ้า ChargeCore สำหรับบ้าน คอนโด โรงงาน และอาคารสำนักงาน โดย EVSTAR SOLUTIONS",
  });
}

type QuotePageProps = {
  // CTAs link here with ?model=ac006 / ?type=house / ?intent=survey
  searchParams: Promise<{ model?: string; type?: string; intent?: string }>;
};

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const { model, type, intent } = await searchParams;
  const isSurvey = intent === "survey";
  const [page, options] = await Promise.all([getQuotePage(), getQuoteOptions()]);

  return (
    <div className="py-(--band-py)">
      <Container className="max-w-narrow">
        <h1 className="text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
          <Phrases text={isSurvey ? page.surveyTitle : page.title} />
        </h1>
        <p className="mt-3 max-w-[46ch] text-[1.1rem] text-text-muted text-pretty">
          <Phrases text={page.lead} />
          {page.responseTime && <> · {page.responseTime}</>}
        </p>

        <div className="mt-10">
          <QuoteForm
            defaults={{ model, propertyType: type, intent }}
            options={options}
            thankYou={page.thankYou}
          />
        </div>

        <QuoteContact />
      </Container>
    </div>
  );
}
