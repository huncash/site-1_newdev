"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";

import { SumCheckField } from "@/components/SumCheckField";
import { BIM_CONFIG } from "@/config/bim";
import { collectBimLeadSource } from "@/lib/bim-utm";
import { trackConversion } from "@/lib/conversion";

const INTENTS = [
  { id: "felmeres", label: "Felmérést szeretnék kérni" },
  { id: "alvallalkozo", label: "Alvállalkozói együttműködés érdekel" },
  { id: "egyeb", label: "Egyéb kérdésem van" },
] as const;

const SITE_TYPES = [
  "Ipari létesítmény",
  "Épület vagy rekonstrukció",
  "Lakás vagy családi ház",
] as const;

const OUTPUTS = [
  ["pontfelho", "Pontfelhő"],
  ["cad", "CAD / alaprajz"],
  ["revit", "Revit"],
  ["archicad", "ArchiCAD"],
  ["ifc", "IFC"],
  ["egyeb", "Egyéb"],
] as const;

type IntentId = (typeof INTENTS)[number]["id"];

function resolveIntent(raw: string | null): IntentId {
  if (raw === "kapacitas") return "alvallalkozo";
  if (raw === "egyeb") return "egyeb";
  if (raw === "ipar" || raw === "tervezo" || raw === "lakossagi" || raw === "felmeres") {
    return "felmeres";
  }
  return "felmeres";
}

function resolveSiteType(raw: string | null): (typeof SITE_TYPES)[number] {
  if (raw === "lakossagi") return "Lakás vagy családi ház";
  if (raw === "tervezo") return "Épület vagy rekonstrukció";
  return "Ipari létesítmény";
}

export function BimQuoteForm() {
  const searchParams = useSearchParams();
  const initialIntent = resolveIntent(searchParams.get("utvonal"));
  const [intent, setIntent] = useState<IntentId>(initialIntent);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [sumAnswer, setSumAnswer] = useState("");
  const [sumToken, setSumToken] = useState("");
  const [sumReset, setSumReset] = useState(0);

  const defaultSiteType = useMemo(
    () => resolveSiteType(searchParams.get("utvonal")),
    [searchParams]
  );

  const needsSurveyFields = intent === "felmeres";
  const needsPartnerFields = intent === "alvallalkozo";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!sumToken) {
      setStatus("error");
      setError("Az ellenőrző kérdés még töltődik. Pár másodperc múlva próbálja újra.");
      return;
    }
    if (!/^\d{1,3}$/.test(sumAnswer.trim())) {
      setStatus("error");
      setError("Írja be az eredményt számmal a kérdés alatti sorba.");
      return;
    }
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    const formats = OUTPUTS.map(([code]) => code).filter(
      (code) => data.get(`format-${code}`) === "on"
    );
    const intentLabel = INTENTS.find((item) => item.id === intent)?.label ?? intent;
    const siteType = String(data.get("siteType") ?? "");
    const source = collectBimLeadSource(searchParams.get("forras") || intent);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      organization: String(data.get("organization") ?? ""),
      organizationType: siteType || intentLabel,
      serviceInterest: intentLabel,
      buildingType: siteType || intentLabel,
      area: String(data.get("area") ?? ""),
      location: String(data.get("location") ?? ""),
      spaces: "—",
      deadline: String(data.get("deadline") ?? ""),
      eir: data.get("eirFileNote") ? "feltöltés jelezve" : "nem",
      eirLevel: "",
      survey: "nem tudom",
      formats,
      useCases: [intent],
      source,
      consent: data.get("consent") === "on",
      message: [
        `Érdeklődés: ${intentLabel}`,
        siteType ? `Helyszín típusa: ${siteType}` : null,
        formats.length ? `Kért kimenetek: ${formats.join(", ")}` : null,
        String(data.get("message") ?? ""),
      ]
        .filter(Boolean)
        .join("\n"),
      sumToken,
      sumAnswer: sumAnswer.trim(),
    };

    try {
      const response = await fetch("/api/bim-ajanlat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        if (result.error === "sum") setSumReset((value) => value + 1);
        setStatus("error");
        trackConversion("quote_form_submit_error", { forras: source, mode: "b2b" });
        setError(
          result.error === "sum"
            ? "Az eredmény nem helyes. Új kérdést kapott; írja be újra az eredményt."
            : "Az űrlapot nem sikerült elküldeni. Ellenőrizze a mezőket, majd írja be újra az eredményt."
        );
        return;
      }
      trackConversion("quote_form_submit_success", { forras: source, mode: "b2b" });
      setStatus("ok");
      form.reset();
    } catch {
      setSumReset((value) => value + 1);
      setStatus("error");
      trackConversion("quote_form_submit_error", { forras: source, mode: "b2b" });
      setError("Az űrlapot nem sikerült elküldeni. Írja be újra az eredményt.");
    }
  }

  if (status === "ok") {
    return (
      <p className="rounded-md border border-border bg-card p-6 text-sm">
        Megkaptuk az üzenetét.
        {BIM_CONFIG.replySlaText ? ` ${BIM_CONFIG.replySlaText}` : null}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-md border border-border bg-card p-6">
      <fieldset className="text-sm">
        <legend className="font-medium">Miben segíthetünk?</legend>
        <div className="mt-2 space-y-2">
          {INTENTS.map((item) => (
            <label key={item.id} className="flex gap-2">
              <input
                type="radio"
                name="intent"
                value={item.id}
                checked={intent === item.id}
                onChange={() => setIntent(item.id)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {needsSurveyFields ? (
        <label className="block text-sm">
          Milyen helyszínt kell felmérni?
          <select
            name="siteType"
            required
            defaultValue={defaultSiteType}
            key={`${intent}-${defaultSiteType}`}
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          >
            {SITE_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <label className="block text-sm">
        Név
        <input
          name="name"
          required
          maxLength={120}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Cégnév {needsPartnerFields ? "" : "(ha vállalkozás)"}
        <input
          name="organization"
          required={needsPartnerFields}
          maxLength={160}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        E-mail
        <input
          name="email"
          type="email"
          required
          maxLength={254}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Telefonszám (nem kötelező)
        <input
          name="phone"
          type="tel"
          maxLength={40}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>

      {needsSurveyFields || needsPartnerFields ? (
        <>
          <label className="block text-sm">
            Helyszín
            <input
              name="location"
              required={needsSurveyFields}
              maxLength={160}
              placeholder="Település vagy cím"
              className="mt-1 w-full rounded-md border border-border px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Hozzávetőleges alapterület vagy projektnagyság
            <input
              name="area"
              maxLength={120}
              placeholder="Pl. kb. 2000 m²"
              className="mt-1 w-full rounded-md border border-border px-3 py-2"
            />
          </label>
        </>
      ) : null}

      {needsSurveyFields || needsPartnerFields ? (
        <fieldset className="text-sm">
          <legend className="font-medium">Milyen anyagot szeretne kapni? (opcionális)</legend>
          <div className="mt-2 space-y-2">
            {OUTPUTS.map(([code, label]) => (
              <label key={code} className="flex gap-2">
                <input type="checkbox" name={`format-${code}`} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {needsSurveyFields || needsPartnerFields ? (
        <label className="block text-sm">
          Határidő (ha van)
          <input
            name="deadline"
            maxLength={80}
            placeholder="Pl. május végéig"
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>
      ) : null}

      <label className="block text-sm">
        Rövid leírás
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={4}
          placeholder="Írja le röviden, miben tudunk segíteni."
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>

      {needsSurveyFields || needsPartnerFields ? (
        <label className="block text-sm">
          Dokumentum vagy EIR (opcionális)
          <input
            name="eirFileNote"
            maxLength={200}
            placeholder="Pl. az EIR-t e-mailben küldöm"
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>
      ) : null}

      <fieldset className="space-y-2 text-sm">
        <legend className="font-medium">Ellenőrző kérdés</legend>
        <SumCheckField
          resetKey={sumReset}
          answer={sumAnswer}
          onAnswer={setSumAnswer}
          onToken={setSumToken}
          inputClassName="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </fieldset>

      <label className="flex gap-2 text-sm">
        <input type="checkbox" name="consent" required />
        <span>
          Elolvastam az{" "}
          <a href="https://vrgo.hu/adatvedelem" className="text-brand underline">
            adatvédelmi tájékoztatót
          </a>
          , és hozzájárulok, hogy a megadott adataimat a VRGO a megkereséshez kezelje.
        </span>
      </label>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand-dark disabled:opacity-60"
      >
        {status === "sending" ? "Küldés…" : "Üzenet küldése"}
      </button>

      {BIM_CONFIG.replySlaText ? (
        <p className="text-xs text-muted-foreground">{BIM_CONFIG.replySlaText}</p>
      ) : null}
    </form>
  );
}
