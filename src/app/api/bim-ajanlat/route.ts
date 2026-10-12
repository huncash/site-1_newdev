import { QUOTE_USE_CASE_CODES } from "@/lib/bim-site";
import { clientIp, sendQuoteEmail, verifyRecaptcha } from "@/lib/quote-delivery";

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_SHORT = 160;
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
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = text(data.name, MAX_NAME);
  const email = text(data.email, MAX_EMAIL);
  const organizationType = text(data.organizationType, MAX_SHORT);
  const buildingType = text(data.buildingType, MAX_SHORT);
  const area = text(data.area, 80);
  const location = text(data.location, MAX_SHORT);
  const deadline = text(data.deadline, 80);
  const eir = data.eir === "igen" || data.eir === "nem" ? data.eir : null;
  const message =
    data.message == null || data.message === "" ? "" : text(data.message, MAX_MESSAGE);

  if (
    !name ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !organizationType ||
    !buildingType ||
    !area ||
    !location ||
    !deadline ||
    !eir ||
    message === null ||
    data.consent !== true
  ) {
    return Response.json({ error: "Invalid fields" }, { status: 400 });
  }

  const allowed = new Set<string>(QUOTE_USE_CASE_CODES);
  const useCases = Array.isArray(data.useCases)
    ? data.useCases.filter((code): code is string => typeof code === "string" && allowed.has(code))
    : [];

  const human = await verifyRecaptcha(data.recaptchaToken, clientIp(request));
  if (!human) {
    return Response.json({ error: "recaptcha" }, { status: 400 });
  }

  console.log(
    JSON.stringify({
      event: "bim_quote_received",
      siteId: "bim.vrgo.hu",
      hasName: true,
      hasEmail: true,
      organizationType,
      hasBuildingType: true,
      hasArea: true,
      hasLocation: true,
      hasDeadline: true,
      eir,
      useCases,
      hasMessage: message.length > 0,
    })
  );

  const sent = await sendQuoteEmail({
    subject: `BIM ajánlatkérés – ${name.replace(/[\r\n]+/g, " ").slice(0, 120)}`,
    replyTo: email,
    text: [
      "BIM ajánlatkérés érkezett a weboldal űrlapjáról.",
      "",
      `Név: ${name}`,
      `E-mail: ${email}`,
      `Szervezet típusa: ${organizationType}`,
      `Épület vagy létesítmény: ${buildingType}`,
      `Alapterület: ${area}`,
      `Helyszín: ${location}`,
      `Határidő: ${deadline}`,
      `EIR: ${eir}`,
      `Felhasználási esetek: ${useCases.join(", ") || "—"}`,
      "",
      "Megjegyzés:",
      message || "—",
    ].join("\n"),
  });
  if (!sent) {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }

  return Response.json({ status: "ok" });
}
