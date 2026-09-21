import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
    default: "EV Star — เครื่องชาร์จรถยนต์ไฟฟ้า สำหรับบ้านและธุรกิจ",
    template: "%s | EV Star",
  },
  description:
    "ผู้ผลิตและจัดจำหน่ายเครื่องชาร์จรถยนต์ไฟฟ้า AC และ DC พร้อมบริการติดตั้งและดูแลหลังการขายทั่วประเทศ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={anuphan.variable}>
      <body className="flex min-h-dvh flex-col bg-surface font-sans text-text antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
