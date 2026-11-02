import { sendQuoteEmail } from "@/lib/quote-delivery";
import { verifySumAnswer } from "@/lib/sum-check";

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_MESSAGE = 2000;

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  if (typeof data.company === "string" && data.company.trim()) {
    return Response.json({ ok: true });
  }

  const name = text(data.name, MAX_NAME);
  const email = text(data.email, MAX_EMAIL);
  const phone = text(data.phone, MAX_PHONE);
  const message = text(data.message, MAX_MESSAGE);
  const rawVariant = typeof data.variant === "string" ? data.variant.trim().toLowerCase() : "";
  const variant = rawVariant === "a" || rawVariant === "b" ? rawVariant.toUpperCase() : null;
  if (
    !name ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !phone ||
    !message ||
    data.consent !== true
  ) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  if (!verifySumAnswer(data.sumToken, data.sumAnswer)) {
    return Response.json({ error: "sum" }, { status: 400 });
  }

  const variantLine = variant ? `Változat: ${variant}` : "Változat: nem jelölt";
  const sent = await sendQuoteEmail({
    subject: variant
      ? `Érdeklődés (${variant}): Kismaros, Börzsönyliget`
      : "Érdeklődés: Kismaros, Börzsönyliget",
    replyTo: email,
    text: [`Név: ${name}`, `Telefon: ${phone}`, `E-mail: ${email}`, variantLine, "", message].join("\n"),
  });

  if (!sent) {
    return Response.json({ error: "mail" }, { status: 503 });
  }

  console.log(JSON.stringify({ event: "listing_enquiry", hasName: true, hasEmail: true }));
  return Response.json({ ok: true });
}
