"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { headerCta, mainNav } from "@/lib/site";

/** "/products/ac006" keeps "สินค้า" active; "/" only matches the home page. */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  // Remember which page the menu was opened on. When the pathname changes,
  // `open` becomes false by itself: no effect, no extra render.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const close = () => setOpenedOn(null);

  // While open: Escape closes it, and the page behind doesn't scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-60 h-(--header-height) border-b border-border bg-nav-glass backdrop-blur-[18px] backdrop-saturate-180">
      <nav
        aria-label="เมนูหลัก"
        className="mx-auto flex h-full max-w-page items-center gap-7 px-(--page-px)"
      >
        <Logo />

        {/* Desktop links */}
        <ul className="ml-auto hidden gap-[30px] text-[0.92rem] text-text-muted lg:flex">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 transition-colors duration-150 hover:text-text ${
                    active
                      ? "text-text after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-accent"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href={headerCta.href}
          className="ml-2 hidden whitespace-nowrap rounded-full bg-primary px-[17px] py-[7px] text-[0.88rem] font-medium text-on-primary transition-colors duration-150 hover:bg-cta lg:inline-block"
        >
          {headerCta.label}
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpenedOn(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
          className="-mr-2.5 ml-auto grid size-10 place-items-center lg:hidden"
        >
          {open ? (
            <X size={22} strokeWidth={1.5} />
          ) : (
            <Menu size={22} strokeWidth={1.5} />
          )}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-var(--header-height))] overflow-y-auto border-t border-border bg-surface px-(--page-px) pb-10 pt-4 lg:hidden"
      >
        <ul>
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={close}
                  className={`block py-2.5 text-[1.4rem] font-semibold ${
                    active ? "text-text" : "text-text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href={headerCta.href}
          onClick={close}
          className="mt-6 inline-block rounded-full bg-cta px-6 py-2.5 font-medium text-on-cta hover:bg-cta-hover"
        >
          {headerCta.label}
        </Link>
      </div>
    </header>
  );
}
