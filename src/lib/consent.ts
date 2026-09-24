/**
 * Cookie consent (PDPA).
 * Necessary cookies always run; analytics/ads wait for a decision.
 *
 * The choice lives in a COOKIE, not localStorage, so the server can read it:
 * the layout knows on the first render whether to show the bar, and the
 * Consent Mode defaults can be written with the stored value inline.
 */

export const CONSENT_COOKIE = "evstar_consent";
/** Footer button → banner */
export const CONSENT_EVENT = "evstar:open-consent";
const ONE_YEAR = 60 * 60 * 24 * 365;

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function isConsentChoice(value: unknown): value is ConsentChoice {
  return value === "granted" || value === "denied";
}

/** Client-side write; the server only ever reads this cookie. */
export function writeConsent(choice: ConsentChoice) {
  document.cookie = `${CONSENT_COOKIE}=${choice};path=/;max-age=${ONE_YEAR};SameSite=Lax`;
  updateConsentMode(choice);
}

/** Tells GTM/GA about the choice. Safe to call before GTM loads. */
export function updateConsentMode(choice: ConsentChoice) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "consent_update",
    consent: {
      analytics_storage: choice,
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
    },
  });
}

/** Inline <head> script: defaults must be set before GTM loads. */
export function consentDefaultScript(stored: ConsentChoice | null) {
  const value = stored ?? "denied";
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{analytics_storage:'${value}',ad_storage:'${value}',ad_user_data:'${value}',ad_personalization:'${value}'});`;
}
