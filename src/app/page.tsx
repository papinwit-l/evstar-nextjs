import { CompareSection } from "@/components/home/CompareSection";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { OemSection } from "@/components/home/OemSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { ProductTile } from "@/components/home/ProductTile";
import { getHomePage, getLatestArticles } from "@/lib/api/home";

export default async function HomePage() {
  // Independent sources → fetch in parallel, not one after another
  const [home, articles] = await Promise.all([
    getHomePage(),
    getLatestArticles(3),
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

      {/* next: <ArticlesSection items={articles} /> */}
    </>
  );
}
