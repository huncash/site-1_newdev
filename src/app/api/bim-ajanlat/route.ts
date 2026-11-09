import {
  BIM_QUOTE_SERVICE_OPTIONS,
  BIM_RESIDENTIAL_SERVICE_OPTIONS,
} from "@/lib/bim-catalog";
import { QUOTE_USE_CASE_CODES } from "@/lib/bim-site";
import { sendQuoteEmail } from "@/lib/quote-delivery";
import { verifySumAnswer } from "@/lib/sum-check";

const RESIDENTIAL_SERVICES = new Set<string>(BIM_RESIDENTIAL_SERVICE_OPTIONS);
const QUOTE_SERVICES = new Set<string>([
  ...BIM_QUOTE_SERVICE_OPTIONS,
  "Felmérést szeretnék kérni",
  "Alvállalkozói együttműködés érdekel",
  "Egyéb kérdésem van",
]);
const PARTNER_SERVICES = new Set<string>([
  "Terepi felmérési együttműködés",
  "Konkrét felmérési ajánlatot kérek",
  "Egyéb kérdésem van",
]);
const PARTNER_FORMATS = new Set(["pontfelho", "eov", "dron", "egyeb"]);

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

async function handlePartner(data: Record<string, unknown>): Promise<Response> {
  const name = text(data.name, MAX_NAME);
  const email = text(data.email, MAX_EMAIL);
  const organization = text(data.organization, MAX_SHORT);
  const serviceInterest = text(data.serviceInterest, MAX_SHORT);
  const phone = data.phone == null || data.phone === "" ? "" : text(data.phone, 40);
  const projectType =
    data.projectType == null || data.projectType === "" ? "" : text(data.projectType, MAX_SHORT);
  const recurrence =
    data.recurrence == null || data.recurrence === "" ? "" : text(data.recurrence, MAX_SHORT);
  const modelingSoftware =
    data.modelingSoftware == null || data.modelingSoftware === ""
      ? ""
      : text(data.modelingSoftware, MAX_SHORT);
  const location = data.location == null || data.location === "" ? "" : text(data.location, MAX_SHORT);
  const area = data.area == null || data.area === "" ? "" : text(data.area, 80);
  const deadline = data.deadline == null || data.deadline === "" ? "" : text(data.deadline, 80);
  const eirNote = data.eirNote == null || data.eirNote === "" ? "" : text(data.eirNote, 200);
  const source = data.source == null || data.source === "" ? "" : text(data.source, 240);
  const utvonal = data.utvonal == null || data.utvonal === "" ? "" : text(data.utvonal, 80);
  const forras = data.forras == null || data.forras === "" ? "" : text(data.forras, 120);
  const message =
    data.message == null || data.message === "" ? "" : text(data.message, MAX_MESSAGE);
  const formats = Array.isArray(data.formats)
    ? data.formats.filter(
        (item): item is string => typeof item === "string" && PARTNER_FORMATS.has(item)
      )
    : [];

  if (
    !name ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !organization ||
    !serviceInterest ||
    !PARTNER_SERVICES.has(serviceInterest) ||
    phone === null ||
    projectType === null ||
    recurrence === null ||
    modelingSoftware === null ||
    location === null ||
    area === null ||
    deadline === null ||
    eirNote === null ||
    source === null ||
    utvonal === null ||
    forras === null ||
    message === null ||
    data.consent !== true
  ) {
    return Response.json({ error: "Invalid fields" }, { status: 400 });
  }

  if (!verifySumAnswer(data.sumToken, data.sumAnswer)) {
    return Response.json({ error: "sum" }, { status: 400 });
  }

  console.log(
    JSON.stringify({
      event: "bim_partner_received",
      siteId: "bim.vrgo.hu",
      serviceInterest,
      hasOrganization: true,
      hasProjectType: projectType.length > 0,
      hasRecurrence: recurrence.length > 0,
      hasModelingSoftware: modelingSoftware.length > 0,
    })
  );

  const sent = await sendQuoteEmail({
    subject: `Partneri együttműködés – ${serviceInterest} – ${name.replace(/[\r\n]+/g, " ").slice(0, 80)}`,
    replyTo: email,
    text: [
      "Partneri együttműködés / terepi felmérési megkeresés.",
      "",
      `Érdeklődés típusa: ${serviceInterest}`,
      `Név: ${name}`,
      `E-mail: ${email}`,
      `Telefon: ${phone || "—"}`,
      `Cégnév: ${organization}`,
      `Projekt típusa: ${projectType || "—"}`,
      `Ismétlődés: ${recurrence || "—"}`,
      `Modellező szoftver (tájékoztató): ${modelingSoftware || "—"}`,
      `Helyszín: ${location || "—"}`,
      `Méret / projektnagyság: ${area || "—"}`,
      `Várható terepi munka ideje: ${deadline || "—"}`,
      `Kimenetek: ${formats.join(", ") || "—"}`,
      `Felmérési specifikáció / EIR: ${eirNote || "—"}`,
      `Útvonal: ${utvonal || "kapacitas"}`,
      `Forrás: ${forras || source || "—"}`,
      `Source string: ${source || "—"}`,
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

async function handleResidential(data: Record<string, unknown>): Promise<Response> {
  const location = text(data.location, MAX_SHORT);
  const goal = text(data.goal, MAX_SHORT);
  const serviceInterest = text(data.serviceInterest, MAX_SHORT);
  const area = text(data.area, 80);
  const contact = text(data.contact, MAX_SHORT);
  const source = data.source == null || data.source === "" ? "" : text(data.source, 240);
  if (
    !location ||
    !goal ||
    !serviceInterest ||
    !RESIDENTIAL_SERVICES.has(serviceInterest) ||
    !area ||
    !contact ||
    source === null ||
    data.consent !== true
  ) {
    return Response.json({ error: "Invalid fields" }, { status: 400 });
  }
  if (!verifySumAnswer(data.sumToken, data.sumAnswer)) {
    return Response.json({ error: "sum" }, { status: 400 });
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const email = isEmail ? contact : undefined;
  const phone = isEmail ? "" : contact;

  console.log(
    JSON.stringify({
      event: "bim_residential_received",
      siteId: "bim.vrgo.hu",
      hasLocation: true,
      hasGoal: true,
      serviceInterest,
      hasArea: true,
      hasEmail: isEmail,
      hasPhone: !isEmail,
    })
  );

  const sent = await sendQuoteEmail({
    subject: `BIM lakossági érdeklődés – ${location.replace(/[\r\n]+/g, " ").slice(0, 80)}`,
    replyTo: email,
    text: [
      "Lakossági BIM / lézerszkennelés érdeklődés.",
      "",
      `Település: ${location}`,
      `Cél: ${goal}`,
      `Szolgáltatás: ${serviceInterest}`,
      `Méret: ${area}`,
      `Kapcsolat: ${contact}`,
      `Forrás: ${source || "lakossagnak"}`,
    ].join("\n"),
  });
  if (!sent) {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
  return Response.json({ status: "ok" });
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
  if (data.mode === "residential") {
    return handleResidential(data);
  }
  if (data.mode === "partner") {
    return handlePartner(data);
  }

  const name = text(data.name, MAX_NAME);
  const email = text(data.email, MAX_EMAIL);
  const organizationType = text(data.organizationType, MAX_SHORT);
  const serviceInterest = text(data.serviceInterest, MAX_SHORT);
  const buildingType = text(data.buildingType, MAX_SHORT);
  const area = text(data.area, 80);
  const location = text(data.location, MAX_SHORT);
  const deadline = text(data.deadline, 80);
  const eir = data.eir === "igen" || data.eir === "nem" || data.eir === "nem tudom" ? data.eir : null;
  const phone = data.phone == null || data.phone === "" ? "" : text(data.phone, 40);
  const spaces = data.spaces == null || data.spaces === "" ? "" : text(data.spaces, 40);
  const survey = data.survey == null || data.survey === "" ? "" : text(data.survey, 20);
  const eirLevel = data.eirLevel == null || data.eirLevel === "" ? "" : text(data.eirLevel, 160);
  const source = data.source == null || data.source === "" ? "" : text(data.source, 240);
  const organization =
    data.organization == null || data.organization === "" ? "" : text(data.organization, MAX_SHORT);
  const formatAllowed = new Set(["E57", "OBJ", "XYZ", "alaprajz", "IFC"]);
  const formats = Array.isArray(data.formats)
    ? data.formats.filter((item): item is string => typeof item === "string" && formatAllowed.has(item))
    : [];
  const message =
    data.message == null || data.message === "" ? "" : text(data.message, MAX_MESSAGE);

  if (
    !name ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !organizationType ||
    !serviceInterest ||
    !QUOTE_SERVICES.has(serviceInterest) ||
    !buildingType ||
    !area ||
    !location ||
    !deadline ||
    !eir ||
    phone === null ||
    spaces === null ||
    survey === null ||
    eirLevel === null ||
    source === null ||
    organization === null ||
    message === null ||
    data.consent !== true
  ) {
    return Response.json({ error: "Invalid fields" }, { status: 400 });
  }

  const allowed = new Set<string>(QUOTE_USE_CASE_CODES);
  const useCases = Array.isArray(data.useCases)
    ? data.useCases.filter((code): code is string => typeof code === "string" && allowed.has(code))
    : [];

  if (!verifySumAnswer(data.sumToken, data.sumAnswer)) {
    return Response.json({ error: "sum" }, { status: 400 });
  }

  console.log(
    JSON.stringify({
      event: "bim_quote_received",
      siteId: "bim.vrgo.hu",
      hasName: true,
      hasEmail: true,
      organizationType,
      serviceInterest,
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
      `Telefon: ${phone || "—"}`,
      `Szervezet: ${organization || "—"}`,
      `Szervezet típusa: ${organizationType}`,
      `Szolgáltatás: ${serviceInterest}`,
      `Épület vagy létesítmény: ${buildingType}`,
      `Alapterület: ${area}`,
      `Helyszín: ${location}`,
      `Belső vagy külső terek: ${spaces || "—"}`,
      `Határidő: ${deadline}`,
      `EIR: ${eir}`,
      `EIR pontossági szint: ${eirLevel || "—"}`,
      `Geodéziai ellenőrző mérés: ${survey || "—"}`,
      `Formátumok: ${formats.join(", ") || "—"}`,
      `Felhasználási esetek: ${useCases.join(", ") || "—"}`,
      `Forrás: ${source || "—"}`,
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
