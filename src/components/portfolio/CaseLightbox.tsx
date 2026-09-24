"use client";

import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Media } from "@/types/common";

type CaseLightboxProps = {
  image: Media;
  /** Read out on the open button and shown under the large image */
  caption: string;
};

/**
 * Card photo that opens full size. Uses <dialog> so the browser provides
 * focus trapping, Escape to close, and the backdrop — the parts that
 * hand-built overlays usually get wrong.
 */
export function CaseLightbox({ image, caption }: CaseLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // showModal() doesn't stop the page behind from scrolling on every browser
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function show() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label={`ดูรูปขนาดเต็ม: ${caption}`}
        className="group/zoom relative block aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-surface-dim"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover/zoom:scale-[1.03] motion-reduce:transition-none"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-primary/70 text-on-primary opacity-0 transition-opacity group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100 motion-reduce:transition-none"
        >
          <ZoomIn size={17} strokeWidth={1.75} />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        // Clicking the backdrop lands on the dialog element itself
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-4 backdrop:bg-black/80 sm:p-8"
      >
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="100vw"
            className="h-auto max-h-[80vh] w-auto rounded-[12px] object-contain"
          />
          <p className="text-center text-[0.9rem] text-on-primary-muted">
            {caption}
          </p>
        </div>

        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="ปิด"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-inverse-raised text-on-primary sm:right-8 sm:top-8"
        >
          <X size={20} strokeWidth={1.75} />
        </button>
      </dialog>
    </>
  );
}
