"use client";

import { useActionState } from "react";
import { submitQuote } from "@/lib/actions/quote";
import { controlClass, FormField } from "@/components/quote/FormField";
import { OptionCards } from "@/components/quote/OptionCards";
import {
  chargerModels,
  initialQuoteState,
  meterSizes,
  propertyTypes,
  type QuoteDefaults,
} from "@/lib/quote";

function Legend({ step, children }: { step: number; children: string }) {
  return (
    <legend className="flex items-baseline gap-2.5 text-[1.15rem] font-semibold">
      <span className="text-[0.82rem] font-semibold text-accent-text">
        {String(step).padStart(2, "0")}
      </span>
      {children}
    </legend>
  );
}

export function QuoteForm({ defaults }: { defaults: QuoteDefaults }) {
  const [state, formAction, pending] = useActionState(
    submitQuote,
    initialQuoteState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-[18px] bg-surface-dim p-[clamp(28px,4vw,48px)] text-center">
        <h2 className="text-[1.6rem] font-semibold">
          ได้รับข้อมูลแล้ว ขอบคุณครับ
        </h2>
        <p className="mx-auto mt-3 max-w-[40ch] text-text-muted text-pretty">
          ทีมงานจะติดต่อกลับตามเบอร์ที่แจ้งไว้
          หากต้องการส่งรูปตู้ไฟหรือจุดติดตั้งเพิ่มเติม ส่งทาง LINE ได้เลย
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-10">
      {state.message && (
        <p
          role="alert"
          className="rounded-[14px] bg-accent-pale px-4 py-3 text-[0.95rem] text-accent-dark"
        >
          {state.message}
        </p>
      )}

      <fieldset className="grid gap-3">
        <Legend step={1}>สถานที่ติดตั้ง</Legend>
        <OptionCards
          name="propertyType"
          options={propertyTypes}
          defaultValue={defaults.propertyType}
          columns="sm:grid-cols-4"
          invalid={Boolean(state.errors.propertyType)}
          describedBy={
            state.errors.propertyType ? "propertyType-error" : undefined
          }
        />
        {state.errors.propertyType && (
          <p
            id="propertyType-error"
            role="alert"
            className="text-[0.85rem] text-error"
          >
            {state.errors.propertyType}
          </p>
        )}
      </fieldset>

      <fieldset className="grid gap-3">
        <Legend step={2}>ระบบไฟฟ้า</Legend>
        <FormField
          id="meterSize"
          label="ขนาดมิเตอร์ไฟฟ้า"
          hint="ดูได้จากตัวเลขบนหน้ามิเตอร์ เช่น 15(45) — ถ้าไม่แน่ใจ เลือก “ไม่ทราบ” ได้"
          error={state.errors.meterSize}
        >
          <select
            id="meterSize"
            name="meterSize"
            defaultValue=""
            className={controlClass}
            aria-invalid={Boolean(state.errors.meterSize)}
            aria-describedby="meterSize-hint"
          >
            <option value="">เลือกขนาดมิเตอร์</option>
            {meterSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </FormField>
      </fieldset>

      <fieldset className="grid gap-3">
        <Legend step={3}>รุ่นที่สนใจ</Legend>
        <OptionCards
          name="model"
          options={chargerModels}
          defaultValue={defaults.model}
          columns="sm:grid-cols-2"
        />
      </fieldset>

      <fieldset className="grid gap-5">
        <Legend step={4}>ข้อมูลติดต่อ</Legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="name"
            label="ชื่อผู้ติดต่อ"
            required
            error={state.errors.name}
          >
            <input
              id="name"
              name="name"
              autoComplete="name"
              className={controlClass}
              aria-invalid={Boolean(state.errors.name)}
              aria-describedby={state.errors.name ? "name-error" : undefined}
            />
          </FormField>

          <FormField
            id="phone"
            label="เบอร์โทรศัพท์"
            required
            error={state.errors.phone}
          >
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="08x-xxx-xxxx"
              className={controlClass}
              aria-invalid={Boolean(state.errors.phone)}
              aria-describedby={state.errors.phone ? "phone-error" : undefined}
            />
          </FormField>

          <FormField id="lineId" label="LINE ID" hint="ไม่บังคับ">
            <input id="lineId" name="lineId" className={controlClass} />
          </FormField>

          <FormField
            id="email"
            label="อีเมล"
            hint="ไม่บังคับ"
            error={state.errors.email}
          >
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={controlClass}
              aria-invalid={Boolean(state.errors.email)}
              aria-describedby={state.errors.email ? "email-error" : undefined}
            />
          </FormField>
        </div>

        <FormField id="area" label="พื้นที่ติดตั้ง" hint="เขต/อำเภอ และจังหวัด">
          <input id="area" name="area" className={controlClass} />
        </FormField>

        <FormField id="note" label="รายละเอียดเพิ่มเติม" hint="ไม่บังคับ">
          <textarea id="note" name="note" rows={4} className={controlClass} />
        </FormField>
      </fieldset>

      {/* Which CTA the visitor came from */}
      <input type="hidden" name="intent" value={defaults.intent ?? "quote"} />

      <div className="grid gap-4">
        <label className="flex items-start gap-3 text-[0.9rem] text-text-muted">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            className="mt-1 size-4 shrink-0 accent-[var(--color-cta)]"
            aria-invalid={Boolean(state.errors.consent)}
          />
          <span>
            ยินยอมให้ EVSTAR SOLUTIONS
            เก็บและใช้ข้อมูลนี้เพื่อติดต่อกลับและเสนอราคา ตาม
            <a
              href="/privacy-policy"
              className="text-accent-text underline underline-offset-2"
            >
              นโยบายความเป็นส่วนตัว
            </a>
          </span>
        </label>
        {state.errors.consent && (
          <p role="alert" className="text-[0.85rem] text-error">
            {state.errors.consent}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="justify-self-start rounded-full bg-cta px-7 py-3 font-medium text-on-cta transition-colors hover:bg-cta-hover disabled:opacity-60"
        >
          {pending ? "กำลังส่ง…" : "ส่งข้อมูล"}
        </button>
      </div>
    </form>
  );
}
