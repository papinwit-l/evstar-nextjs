import Image from "next/image";
import Link from "next/link";
import type { ArticleCard as ArticleCardData } from "@/types/home";

type ArticleCardProps = {
  article: ArticleCardData;
  /** h3 under a section heading (home); h2 on the /articles listing */
  headingLevel?: "h2" | "h3";
};

/** Image, category, title — the whole card is one link. Reused on /articles. */
export function ArticleCard({
  article,
  headingLevel = "h3",
}: ArticleCardProps) {
  const Heading = headingLevel;

  return (
    <Link href={article.href} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-surface-dim">
        {article.image && (
          <Image
            src={article.image.src}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        )}
      </div>
      <p className="mt-[18px] text-[0.82rem] font-semibold text-text-muted">
        {article.category}
      </p>
      <Heading className="mt-1 text-[1.18rem] font-semibold leading-[1.4] text-balance group-hover:underline group-hover:underline-offset-[3px]">
        {article.title}
      </Heading>
    </Link>
  );
}
