import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { footerColumns, legalLinks } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-dim text-[0.76rem] leading-normal text-text-muted">
      <Container className="pb-7 pt-9">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h2 className="mb-2.5 text-[0.76rem] font-semibold text-text">
                {col.title}
              </h2>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-[3px] hover:text-text hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-border-strong pt-4">
          <p>© {year} EV Star สงวนลิขสิทธิ์</p>
          <ul className="flex">
            {legalLinks.map((link, i) => (
              <li
                key={link.href}
                className={
                  i > 0 ? "ml-2.5 border-l border-border-strong pl-2.5" : ""
                }
              >
                <Link
                  href={link.href}
                  className="hover:text-text hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
