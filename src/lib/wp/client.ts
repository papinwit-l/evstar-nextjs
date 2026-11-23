/**
 * WPGraphQL client.
 *
 * - Sent as POST, so Cloudways' Varnish/Breeze never serve a cached response.
 * - Cached by Next.js for REVALIDATE_SECONDS, and tagged so the WordPress
 *   plugin (evstar-core) can refresh a section the moment it is edited via
 *   /api/revalidate. The time-based revalidate is only a safety net; keeping
 *   it long limits ISR writes on Vercel.
 * - Without WORDPRESS_GRAPHQL_URL the API layer falls back to src/lib/mock,
 *   so the site still builds and runs before the CMS exists.
 */

/** Safety-net revalidation. Edits refresh immediately through tags. */
export const REVALIDATE_SECONDS = Number(process.env.WP_REVALIDATE_SECONDS) || 3600;

const endpoint = process.env.WORDPRESS_GRAPHQL_URL;

export const isWordPressEnabled = Boolean(endpoint);

/** Cache tags — must match evstar_tags_for_post() in evstar-core/inc/revalidate.php */
export type WpTag =
  | "home"
  | "products"
  | "services"
  | "portfolio"
  | "about"
  | "quote"
  | "privacy-policy"
  | "settings";

export const WP_TAGS: readonly WpTag[] = [
  "home",
  "products",
  "services",
  "portfolio",
  "about",
  "quote",
  "privacy-policy",
  "settings",
];

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function wpQuery<T>(
  query: string,
  tags: WpTag[],
  variables?: Record<string, unknown>,
): Promise<T> {
  if (!endpoint) {
    throw new Error("WORDPRESS_GRAPHQL_URL is not set");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: REVALIDATE_SECONDS, tags },
  });

  if (!res.ok) {
    throw new Error(`WordPress responded ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(`WPGraphQL: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  if (!json.data) {
    throw new Error("WPGraphQL returned no data");
  }
  return json.data;
}
