# EVSTAR — WordPress CMS

Headless WordPress for the Next.js site. Everything custom lives in the
`evstar-core` plugin in this folder; the rest is free WordPress.org plugins.

## 1. Plugins (all free)

Install from **Plugins → Add New** in wp-admin:

| Plugin | Notes |
|---|---|
| Secure Custom Fields | Fields, repeaters, options page |
| WPGraphQL | `/graphql` endpoint |
| WPGraphQL for ACF | Exposes the fields in GraphQL (works with SCF) |
| EVSTAR Core | This folder. Upload `evstar-core.zip` via **Plugins → Add New → Upload Plugin**, or copy the `evstar-core` folder to `wp-content/plugins/` over FTP |

Activate the three free plugins first, then EVSTAR Core. Activation:

- creates the 7 site pages (หน้าแรก, สินค้า, บริการ, ผลงาน, เกี่ยวกับเรา,
  ขอใบเสนอราคา, นโยบายความเป็นส่วนตัว) and sets หน้าแรก as the front page;
  WordPress's default "Privacy Policy" draft is adopted and published, so
  replace its sample text
- creates the terms `dc-fast` / `ac` / `accessories` and
  `house` / `condo` / `office` / `factory` / `station`

### Starting content (EVSTAR Seed)

`evstar-seed.zip` imports the current site content — 13 products with photos,
categories, every page's fields, the privacy policy (as editable blocks) and
the site settings. Upload and activate it, open **Tools → EVSTAR Import**,
click **Run import**, check the site, then deactivate and delete it.

- Running it again only fills what is empty; tick *Overwrite* to replace.
- Portfolio cases are not imported (the mock ones are placeholders).
- Regenerate after changing the mocks: `npx tsx scripts/export-wp-seed.ts`,
  then zip `wordpress/evstar-seed`.

Don't install an SEO plugin, a page builder or a theme framework. Any default
theme is fine — nobody sees it.

## 2. WordPress settings

- **Settings → Permalinks → Post name.** Required for `/graphql`.
- **GraphQL → Settings:** leave *Public introspection* off in production
  (turn it on locally if you want the GraphiQL IDE to autocomplete).
- **Users:** give the client the **Editor** role, not Administrator.
  Editors can edit pages, products, portfolio, media and ตั้งค่าเว็บไซต์.

## 3. wp-config.php (over FTP)

On Cloudways the file is at `applications/<app>/public_html/wp-config.php`.
Add above `/* That's all, stop editing! */`:

```php
define( 'EVSTAR_NEXT_URL', 'https://www.<domain>' );          // no trailing slash
define( 'EVSTAR_REVALIDATE_SECRET', '<long random string>' );  // same as REVALIDATE_SECRET in Next.js
define( 'DISALLOW_FILE_EDIT', true );
```

With `EVSTAR_NEXT_URL` set:

- the WordPress front end 301-redirects to the Next.js site (`/about/` → `/about`)
- saving anything POSTs the affected cache tags to `{EVSTAR_NEXT_URL}/api/revalidate`
- the admin bar gets **รีเฟรชหน้าเว็บ** (refresh everything) and **ดูเว็บไซต์**

Without it, wp-admin shows a warning and nothing is redirected or revalidated.

## 4. Cloudways caching

GraphQL responses must not be cached by the server, or revalidation fetches
stale data.

- **Varnish:** Application → Application Settings → Varnish → add an exclusion
  for URL `/graphql`. (Or disable Varnish for this app entirely — it only
  serves API requests.)
- **Breeze** (if installed): Settings → Advanced → *Never cache these URLs* → `/graphql`.
- The Next.js side sends queries as **POST**, which neither layer caches anyway;
  the exclusions are a safety net.

## 5. Next.js environment (Vercel)

| Variable | Value |
|---|---|
| `WORDPRESS_GRAPHQL_URL` | `https://cms.<domain>/graphql` — unset = mock data |
| `REVALIDATE_SECRET` | same as `EVSTAR_REVALIDATE_SECRET` |
| `WP_REVALIDATE_SECONDS` | optional, default `3600` |

Every WordPress query is cached in the Next.js data cache with
`revalidate: WP_REVALIDATE_SECONDS` and a tag. Edits refresh their tags
immediately through `/api/revalidate`, so the time-based revalidate is only a
safety net and can be raised (e.g. `86400`) to cut cache writes further.

## 6. Domain and SSL

Point `cms.<domain>` at the Cloudways server, add it under Domain Management,
and enable the free Let's Encrypt certificate. Then add the host to
`images.remotePatterns` in `next.config.ts`.

## GraphQL reference

```graphql
query Home {
  evstarPage(key: HOME) {           # HOME PRODUCTS SERVICES PORTFOLIO ABOUT QUOTE PRIVACY_POLICY
    homePage { hero { title primary { label href } } ... }
    pageSeo { seoTitle seoDescription }
  }
}

query Products {
  products(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
    nodes {
      title slug menuOrder
      featuredImage { node { sourceUrl altText mediaDetails { width height } } }
      productCategories { nodes { slug } }
      productFields { brand kicker tagline ctaType features { text } specs { label value } audience }
    }
  }
  productCategories { nodes { slug name productCategoryFields { navLabel title lead order } } }
}

query Portfolio {
  portfolioCases(first: 100) {
    nodes {
      title featuredImage { node { sourceUrl altText mediaDetails { width height } } }
      siteTypes { nodes { slug name } }
      portfolioFields { location featuredOnHome review { quote author context }
        model { nodes { ... on Product { title slug } } } }
    }
  }
}

query Settings {
  siteSettings { siteSettingsFields { nameTh nameEn phone email lineUrl address openingHours mapUrl
    meterSizes { value label } responseTime } }
}
```

Shapes to handle in the mappers:

- **Product pickers** (`featuredProduct.product`, `gridProducts[].product`,
  `portfolioFields.model`) return a connection: `product.nodes[0]`.
- **Selects** (`ctaType`, `services[].icon`) return a list: `ctaType[0]`.
- **Text lists** (`features`, `bullets`, `paragraphs`) return `[{ text }]`.
- **Images** return `{ node { sourceUrl altText mediaDetails { width height } } }`.
- Textareas keep raw `\n` — pass straight to `<Phrases>`.

## Field structure

Field groups are registered in PHP (`inc/fields.php`), not in the SCF UI, so
they are versioned in git and identical on every environment. To change a
field, edit the PHP and redeploy the plugin; **don't** create or edit field
groups under ACF/SCF → Field Groups.

Field keys are `field_evstar_<group>_<path>` (e.g. `field_evstar_home_hero_title`).
Several pages share field names (`hero`, `cta`, `title`), so any script that
writes content with `update_field()` must use **keys**, not names.

Site pages are protected: they can't be deleted, unpublished or re-slugged,
because Next.js asks for them by key.
