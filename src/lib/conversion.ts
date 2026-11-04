/** Client-side conversion helpers for ajánlatkérő űrlap measurement. */

export type ConversionEvent =
  | "quote_form_view"
  | "quote_form_submit_success"
  | "quote_form_submit_error"
  | "quote_cta_click";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackConversion(
  event: ConversionEvent,
  params?: Record<string, string | undefined>
): void {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    ...params,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  try {
    window.dispatchEvent(new CustomEvent("vrgo:conversion", { detail: payload }));
  } catch {
    // ignore
  }
}

export function buildAjanlatHref(opts?: {
  csomag?: string;
  szegmens?: string;
  termek?: string;
  forras?: string;
}): string {
  const params = new URLSearchParams();
  if (opts?.csomag) params.set("csomag", opts.csomag);
  if (opts?.szegmens) params.set("szegmens", opts.szegmens);
  if (opts?.termek) params.set("termek", opts.termek);
  if (opts?.forras) params.set("forras", opts.forras);
  const q = params.toString();
  return q ? `/ajanlat?${q}` : "/ajanlat";
}
