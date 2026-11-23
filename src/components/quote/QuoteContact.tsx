import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/api/settings";

const iconClass = "size-5 shrink-0 text-accent-text";

/** "Prefer not to fill a form?" — the contact details that used to live on /contact. */
export async function QuoteContact() {
  const { contact } = await getSiteSettings();
  const place = [contact.address, contact.openingHours].filter(Boolean).join("\n");

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mt-(--band-py) scroll-mt-(--header-height) rounded-[18px] bg-surface-dim p-[clamp(28px,4vw,48px)]"
    >
      <h2 id="contact-title" className="text-[1.5rem] font-semibold">
        ไม่สะดวกกรอกฟอร์ม?
      </h2>
      <p className="mt-2 text-text-muted">ติดต่อทีมงานได้โดยตรง</p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        <li className="flex items-center gap-3">
          <Phone size={20} strokeWidth={1.5} className={iconClass} />
          <a href={contact.phoneHref} className="hover:underline">
            {contact.phone}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <MessageCircle size={20} strokeWidth={1.5} className={iconClass} />
          <a href={contact.lineUrl} className="hover:underline">
            แชทผ่าน LINE
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Mail size={20} strokeWidth={1.5} className={iconClass} />
          <a href={`mailto:${contact.email}`} className="hover:underline">
            {contact.email}
          </a>
        </li>
        <li className="flex items-start gap-3">
          <MapPin size={20} strokeWidth={1.5} className={iconClass} />
          <span className="whitespace-pre-line text-text-muted">
            {place || "[ที่อยู่สำนักงาน และเวลาทำการ]"}
            {contact.mapUrl && (
              <>
                {" "}
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-text hover:underline"
                >
                  ดูแผนที่
                </a>
              </>
            )}
          </span>
        </li>
      </ul>
    </section>
  );
}
