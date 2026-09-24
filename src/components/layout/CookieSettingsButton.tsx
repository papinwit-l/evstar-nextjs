"use client";

import { CONSENT_EVENT } from "@/lib/consent";

/** Footer link that re-opens the consent bar — PDPA requires withdrawal to be easy. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}
      className="hover:text-text hover:underline"
    >
      ตั้งค่าคุกกี้
    </button>
  );
}
