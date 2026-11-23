"use server";

import { getQuoteOptions } from "@/lib/api/quote";
import {
  initialQuoteState,
  validateQuote,
  type QuoteFormState,
} from "@/lib/quote";

/**
 * Handles a quote request.
 * TODO (next step): photo uploads, spam protection, then store the lead in
 * WordPress (private "lead" post type) and notify sales by email/LINE.
 */
export async function submitQuote(
  _prev: QuoteFormState,
  form: FormData,
): Promise<QuoteFormState> {
  // Same lists the form showed: an unpublished model no longer validates
  const errors = validateQuote(form, await getQuoteOptions());

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, message: "กรุณาตรวจสอบข้อมูลที่กรอก" };
  }

  try {
    // TODO: replace with the WordPress call
    console.info("[quote] new lead", Object.fromEntries(form.entries()));
    return { ...initialQuoteState, status: "success" };
  } catch {
    return {
      status: "error",
      errors: {},
      message: "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่ หรือติดต่อเราทาง LINE",
    };
  }
}
