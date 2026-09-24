"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, writeConsent, type ConsentChoice } from "@/lib/consent";

type CookieBannerProps = {
  /** Read from the cookie on the server — null means no decision yet */
  initialConsent: ConsentChoice | null;
};

/**
 * PDPA consent bar. Visibility is decided on the server from the cookie,
 * so there is no mount effect flipping state (and no second render).
 * The only effect here subscribes to the footer's "change settings" event.
 */
export function CookieBanner({ initialConsent }: CookieBannerProps) {
  const [visible, setVisible] = useState(initialConsent === null);

  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener(CONSENT_EVENT, open);
    return () => window.removeEventListener(CONSENT_EVENT, open);
  }, []);

  if (!visible) return null;

  function decide(choice: ConsentChoice) {
    writeConsent(choice);
    setVisible(false);
  }

  return (
    <section
      aria-label="การตั้งค่าคุกกี้"
      className="fixed inset-x-0 bottom-0 z-70 border-t border-border bg-nav-glass p-4 backdrop-blur-[18px] backdrop-saturate-180 sm:p-5"
    >
      <div className="mx-auto flex max-w-page flex-col gap-4 px-(--page-px) sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.9rem] text-text-muted text-pretty">
          เราใช้คุกกี้ที่จำเป็นต่อการทำงานของเว็บไซต์
          และคุกกี้เพื่อการวิเคราะห์การใช้งาน{" "}
          <Link
            href="/privacy-policy#cookies"
            className="text-accent-text underline underline-offset-2"
          >
            อ่านนโยบายความเป็นส่วนตัว
          </Link>
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="rounded-full border border-border-strong px-5 py-2 text-[0.88rem] font-medium transition-colors hover:border-text"
          >
            เฉพาะที่จำเป็น
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="rounded-full bg-cta px-5 py-2 text-[0.88rem] font-medium text-on-cta transition-colors hover:bg-cta-hover"
          >
            ยอมรับทั้งหมด
          </button>
        </div>
      </div>
    </section>
  );
}
