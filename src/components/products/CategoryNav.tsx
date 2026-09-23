import { Container } from "@/components/shared/Container";
import type { ProductCategory } from "@/types/products";

/**
 * Anchor links to each category, sticky under the site header —
 * the local sub-nav pattern Apple uses on product pages.
 * Scrolls horizontally on phones instead of wrapping.
 */
export function CategoryNav({ categories }: { categories: ProductCategory[] }) {
  if (categories.length === 0) return null;

  return (
    <nav
      aria-label="หมวดหมู่สินค้า"
      className="sticky top-(--header-height) z-50 border-b border-border bg-nav-glass backdrop-blur-[18px] backdrop-saturate-180"
    >
      <Container>
        <ul className="-mx-1 flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                className="inline-block whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.9rem] text-text-muted transition-colors hover:bg-surface-dim hover:text-text"
              >
                {category.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
