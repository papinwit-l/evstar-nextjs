import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import { cookies } from "next/headers";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import {
  CONSENT_COOKIE,
  consentDefaultScript,
  isConsentChoice,
} from "@/lib/consent";
import "./globals.css";

const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-anuphan",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.evstarthailand.com"),
  title: {
    default: "EVSTAR SOLUTIONS — ตัวแทนจำหน่ายและติดตั้งสถานีชาร์จ ChargeCore",
    template: "%s | EVSTAR SOLUTIONS",
  },
  description:
    "ตัวแทนจำหน่ายอย่างเป็นทางการของ ChargeCore จำหน่ายและติดตั้งเครื่องชาร์จรถยนต์ไฟฟ้า AC และ DC พร้อมบริการครบวงจรโดยทีมวิศวกรคนไทย",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const stored = (await cookies()).get(CONSENT_COOKIE)?.value;
  const consent = isConsentChoice(stored) ? stored : null;

  return (
    <html lang="th" className={anuphan.variable}>
      <head>
        {/*
          Consent Mode defaults must run BEFORE GTM loads. The stored choice is
          inlined here, so a returning visitor's tags aren't blocked for a tick.
          TODO: add the GTM container script after this.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: consentDefaultScript(consent) }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-surface font-sans text-text antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner initialConsent={consent} />
      </body>
    </html>
  );
}
