/**
 * Quote form options and validation, shared by the form and the server action.
 * TODO: confirm the meter sizes and model list with the client.
 */

export const propertyTypes = [
  { value: "house", label: "บ้านเดี่ยว" },
  { value: "condo", label: "คอนโด" },
  { value: "factory", label: "โรงงาน" },
  { value: "office", label: "อาคารสำนักงาน" },
] as const;

export const meterSizes = [
  { value: "5-15", label: "5(15) แอมป์ 1 เฟส" },
  { value: "15-45", label: "15(45) แอมป์ 1 เฟส" },
  { value: "30-100", label: "30(100) แอมป์ 1 เฟส" },
  { value: "3phase", label: "3 เฟส" },
  { value: "unknown", label: "ไม่ทราบ / ให้ทีมงานตรวจสอบ" },
] as const;

export const chargerModels = [
  { value: "ac006", label: "AC006 — Home AC 7–22 kW" },
  { value: "ac002", label: "AC002 — Commercial AC 7–43 kW" },
  { value: "adc", label: "ADC Series — DC Fast 60–240 kW" },
  { value: "recommend", label: "ให้ทีมงานแนะนำ" },
] as const;

export const intents = [
  { value: "quote", label: "ขอใบเสนอราคา" },
  { value: "survey", label: "จองคิวสำรวจหน้างาน" },
] as const;

/** Values that may arrive as URL params from CTAs, e.g. /quote?model=ac006 */
export type QuoteDefaults = {
  propertyType?: string;
  model?: string;
  intent?: string;
};

export type FieldErrors = Record<string, string>;

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  errors: FieldErrors;
  /** Shown above the form when something failed outside a single field */
  message?: string;
};

export const initialQuoteState: QuoteFormState = { status: "idle", errors: {} };

const isOption = (options: readonly { value: string }[], value: string) =>
  options.some((o) => o.value === value);

/** Thai mobile/landline: 9–10 digits, spaces and dashes allowed. */
const phonePattern = /^0\d{1,2}[-\s]?\d{3}[-\s]?\d{3,4}$/;

export function validateQuote(form: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const get = (key: string) => String(form.get(key) ?? "").trim();

  const propertyType = get("propertyType");
  if (!propertyType) errors.propertyType = "เลือกประเภทสถานที่ติดตั้ง";
  else if (!isOption(propertyTypes, propertyType))
    errors.propertyType = "ตัวเลือกไม่ถูกต้อง";

  const meterSize = get("meterSize");
  if (meterSize && !isOption(meterSizes, meterSize))
    errors.meterSize = "ตัวเลือกไม่ถูกต้อง";

  const model = get("model");
  if (model && !isOption(chargerModels, model))
    errors.model = "ตัวเลือกไม่ถูกต้อง";

  const name = get("name");
  if (!name) errors.name = "กรอกชื่อผู้ติดต่อ";
  else if (name.length > 100) errors.name = "ชื่อยาวเกินไป";

  const phone = get("phone");
  if (!phone) errors.phone = "กรอกเบอร์โทรศัพท์";
  else if (!phonePattern.test(phone)) errors.phone = "รูปแบบเบอร์โทรไม่ถูกต้อง";

  const email = get("email");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "รูปแบบอีเมลไม่ถูกต้อง";

  if (!form.get("consent"))
    errors.consent = "กรุณายอมรับนโยบายความเป็นส่วนตัวก่อนส่งข้อมูล";

  return errors;
}
