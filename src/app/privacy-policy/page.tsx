import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { getPrivacyPolicy } from "@/lib/api/legal";
import { seoMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPrivacyPolicy();
  return seoMetadata(data.seo, {
    title: "นโยบายความเป็นส่วนตัว",
    description:
      "นโยบายความเป็นส่วนตัวและการใช้คุกกี้ของ EVSTAR SOLUTIONS ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562",
    robots: { index: false },
  });
}

/*
 * Block-editor HTML from WordPress. It is safe to render: evstar-core removes
 * unfiltered_html from non-admins, so WordPress runs it through kses on save.
 * Headings keep their HTML anchor as id (the cookie banner links to #cookies).
 */
const content = [
  "[&>p:first-child]:text-[1.05rem] [&>p:first-child]:text-text",
  "[&_h2]:mt-12 [&_h2]:scroll-mt-(--header-height) [&_h2]:text-[1.35rem] [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:text-text",
  "[&_h3]:mt-8 [&_h3]:text-[1.1rem] [&_h3]:font-semibold [&_h3]:text-text",
  "[&_p]:mt-3 [&_p]:text-pretty",
  "[&_ul]:mt-4 [&_ul]:grid [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:mt-4 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:pl-1 [&_li]:marker:text-accent",
  "[&_a]:text-accent-text [&_a]:underline",
  "[&_strong]:font-semibold [&_strong]:text-text",
].join(" ");

export default async function PrivacyPolicyPage() {
  const data = await getPrivacyPolicy();

  return (
    <div className="py-(--band-py)">
      <Container className="max-w-[70ch]">
        <h1 className="text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
          {data.title}
        </h1>
        {data.updated && (
          <p className="mt-3 text-[0.9rem] text-text-subtle">{data.updated}</p>
        )}
        <div
          className={`mt-6 text-text-muted ${content}`}
          dangerouslySetInnerHTML={{ __html: data.html }}
        />
      </Container>
    </div>
  );
}
