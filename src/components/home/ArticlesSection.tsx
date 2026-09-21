import { ArticleCard } from "@/components/shared/ArticleCard";
import { ChevronLink } from "@/components/shared/ChevronLink";
import { Container } from "@/components/shared/Container";
import type { ArticleCard as ArticleCardData } from "@/types/home";

type ArticlesSectionProps = {
  items: ArticleCardData[];
  title?: string;
};

/** Latest posts. Renders nothing when there are no posts (or the request failed). */
export function ArticlesSection({
  items,
  title = "บทความล่าสุด",
}: ArticlesSectionProps) {
  if (items.length === 0) return null;

  return (
    // No top padding: follows the OEM section on the same white background
    <section aria-labelledby="articles-title" className="pb-(--section-py)">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2
            id="articles-title"
            className="text-[clamp(1.8rem,3.4vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.015em]"
          >
            {title}
          </h2>
          <ChevronLink href="/articles">ดูทั้งหมด</ChevronLink>
        </div>

        <ul className="mt-9 grid gap-x-6 gap-y-10 md:grid-cols-3">
          {items.map((article) => (
            <li key={article.href}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
