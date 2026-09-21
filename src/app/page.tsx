import { ArticlesSection } from "@/components/home/ArticlesSection";
import { CompareSection } from "@/components/home/CompareSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { OemSection } from "@/components/home/OemSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { ProductTile } from "@/components/home/ProductTile";
import { getHomePage, getLatestArticles } from "@/lib/api/home";

export default async function HomePage() {
  // Independent sources → fetch in parallel.
  // Home fields are required (a failure shows error.tsx);
  // articles are optional (a failure just hides that section).
  const [home, articles] = await Promise.all([
    getHomePage(),
    getLatestArticles(3).catch(() => []),
  ]);

  return (
    <>
      {/* Apple-style stacked tiles with a 12px gap between them */}
      <div className="grid gap-3 pt-3">
        <HeroSection data={home.hero} />
        <ProductTile data={home.featured} variant="dark" />
        <ProductGrid items={home.grid} moreLink={home.productsLink} />
      </div>

      <CompareSection data={home.compare} />
      <HighlightsSection data={home.highlights} />
      <OemSection data={home.oem} />
      <ArticlesSection items={articles} />
      <FinalCtaSection data={home.finalCta} />
    </>
  );
}
