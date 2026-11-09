"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";

import { SumCheckField } from "@/components/SumCheckField";
import { BIM_CONFIG } from "@/config/bim";
import { collectBimLeadSource } from "@/lib/bim-utm";
import { trackConversion } from "@/lib/conversion";

const DEFAULT_INTENTS = [
  { id: "felmeres", label: "Felmérést szeretnék kérni" },
  { id: "alvallalkozo", label: "Alvállalkozói együttműködés érdekel" },
  { id: "egyeb", label: "Egyéb kérdésem van" },
] as const;

const PARTNER_INTENTS = [
  { id: "egyuttmukodes", label: "Terepi felmérési együttműködés" },
  { id: "ajanlat", label: "Konkrét felmérési ajánlatot kérek" },
  { id: "egyeb", label: "Egyéb kérdésem van" },
] as const;

const DEFAULT_SITE_TYPES = [
  "Ipari létesítmény",
  "Épület vagy rekonstrukció",
  "Lakás vagy családi ház",
] as const;

const PARTNER_PROJECT_TYPES = [
  "Ipari létesítmény",
  "Épület",
  "Terepmodell és kubatúra",
  "Egyéb",
] as const;

const DEFAULT_OUTPUTS = [
  ["pontfelho", "Pontfelhő"],
  ["cad", "CAD / alaprajz"],
  ["revit", "Revit"],
  ["archicad", "ArchiCAD"],
  ["ifc", "IFC"],
  ["egyeb", "Egyéb"],
] as const;

const PARTNER_OUTPUTS = [
  ["pontfelho", "Pontfelhő"],
  ["eov", "EOV-ba illesztett adat"],
  ["dron", "Drónos fotogrammetriai adat"],
  ["egyeb", "Egyéb"],
] as const;

const PARTNER_RECURRENCE = [
  "Egyszeri feladat",
  "Rendszeres együttműködés",
  "Még nem tudom",
] as const;

type DefaultIntentId = (typeof DEFAULT_INTENTS)[number]["id"];
type PartnerIntentId = (typeof PARTNER_INTENTS)[number]["id"];

export type BimQuoteFormProps = {
  /** partner = modellezői / kapacitás útvonal; default = általános kapcsolat űrlap */
  variant?: "default" | "partner";
};

function resolveDefaultIntent(raw: string | null): DefaultIntentId {
  if (raw === "kapacitas") return "alvallalkozo";
  if (raw === "egyeb") return "egyeb";
  if (raw === "ipar" || raw === "tervezo" || raw === "lakossagi" || raw === "felmeres") {
    return "felmeres";
  }
  return "felmeres";
}

function resolveSiteType(raw: string | null): (typeof DEFAULT_SITE_TYPES)[number] {
  if (raw === "lakossagi") return "Lakás vagy családi ház";
  if (raw === "tervezo") return "Épület vagy rekonstrukció";
  return "Ipari létesítmény";
}

function isPartnerRoute(variant: BimQuoteFormProps["variant"], utvonal: string | null): boolean {
  return variant === "partner" || utvonal === "kapacitas";
}

export function BimQuoteForm({ variant = "default" }: BimQuoteFormProps) {
  const searchParams = useSearchParams();
  const utvonal = searchParams.get("utvonal");
  const forrasParam = searchParams.get("forras");
  const partnerMode = isPartnerRoute(variant, utvonal);

  const initialDefaultIntent = resolveDefaultIntent(utvonal);
  const [defaultIntent, setDefaultIntent] = useState<DefaultIntentId>(initialDefaultIntent);
  const [partnerIntent, setPartnerIntent] = useState<PartnerIntentId>("egyuttmukodes");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [sumAnswer, setSumAnswer] = useState("");
  const [sumToken, setSumToken] = useState("");
  const [sumReset, setSumReset] = useState(0);

  const defaultSiteType = useMemo(() => resolveSiteType(utvonal), [utvonal]);

  const needsSurveyFields = !partnerMode && defaultIntent === "felmeres";
  const needsPartnerLegacyFields = !partnerMode && defaultIntent === "alvallalkozo";
  const showDefaultExtras = needsSurveyFields || needsPartnerLegacyFields;

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
    const source = collectBimLeadSource(forrasParam || (partnerMode ? "scan-to-bim" : defaultIntent));
    const hiddenUtvonal = String(data.get("utvonal") || utvonal || (partnerMode ? "kapacitas" : ""));
    const hiddenForras = String(data.get("forras") || forrasParam || "");

    if (partnerMode) {
      const intentLabel =
        PARTNER_INTENTS.find((item) => item.id === partnerIntent)?.label ?? partnerIntent;
      const outputs = PARTNER_OUTPUTS.map(([code]) => code).filter(
        (code) => data.get(`format-${code}`) === "on"
      );
      const projectType = String(data.get("projectType") ?? "");
      const recurrence = String(data.get("recurrence") ?? "");
      const modelingSoftware = String(data.get("modelingSoftware") ?? "");
      const payload = {
        mode: "partner",
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        organization: String(data.get("organization") ?? ""),
        serviceInterest: intentLabel,
        projectType,
        recurrence,
        modelingSoftware,
        location: String(data.get("location") ?? ""),
        area: String(data.get("area") ?? ""),
        deadline: String(data.get("deadline") ?? ""),
        eirNote: String(data.get("eirFileNote") ?? ""),
        formats: outputs,
        source,
        utvonal: hiddenUtvonal || "kapacitas",
        forras: hiddenForras,
        consent: data.get("consent") === "on",
        message: String(data.get("message") ?? ""),
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
          trackConversion("quote_form_submit_error", { forras: source, mode: "partner" });
          setError(
            result.error === "sum"
              ? "Az eredmény nem helyes. Új kérdést kapott; írja be újra az eredményt."
              : "Az űrlapot nem sikerült elküldeni. Ellenőrizze a mezőket, majd írja be újra az eredményt."
          );
          return;
        }
        trackConversion("quote_form_submit_success", { forras: source, mode: "partner" });
        setStatus("ok");
        form.reset();
      } catch {
        setSumReset((value) => value + 1);
        setStatus("error");
        trackConversion("quote_form_submit_error", { forras: source, mode: "partner" });
        setError("Az űrlapot nem sikerült elküldeni. Írja be újra az eredményt.");
      }
      return;
    }

    const formats = DEFAULT_OUTPUTS.map(([code]) => code).filter(
      (code) => data.get(`format-${code}`) === "on"
    );
    const intentLabel =
      DEFAULT_INTENTS.find((item) => item.id === defaultIntent)?.label ?? defaultIntent;
    const siteType = String(data.get("siteType") ?? "");

    const areaRaw = String(data.get("area") ?? "").trim();
    const locationRaw = String(data.get("location") ?? "").trim();
    const deadlineRaw = String(data.get("deadline") ?? "").trim();
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      organization: String(data.get("organization") ?? ""),
      organizationType: siteType || intentLabel,
      serviceInterest: intentLabel,
      buildingType: siteType || intentLabel,
      area: areaRaw || "nincs megadva",
      location: locationRaw || "nincs megadva",
      spaces: "—",
      deadline: deadlineRaw || "nincs megadva",
      eir: data.get("eirFileNote") ? "feltöltés jelezve" : "nem",
      eirLevel: "",
      survey: "nem tudom",
      formats,
      useCases: [],
      source,
      utvonal: hiddenUtvonal,
      forras: hiddenForras,
      consent: data.get("consent") === "on",
      message: [
        `Érdeklődés: ${intentLabel}`,
        siteType ? `Helyszín típusa: ${siteType}` : null,
        formats.length ? `Kért kimenetek: ${formats.join(", ")}` : null,
        hiddenUtvonal ? `Útvonal: ${hiddenUtvonal}` : null,
        hiddenForras ? `Forrás: ${hiddenForras}` : null,
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
        {partnerMode
          ? "A megkeresésre írásban válaszolunk, és egyeztetjük a feladat részleteit."
          : `Megkaptuk az üzenetét.${BIM_CONFIG.replySlaText ? ` ${BIM_CONFIG.replySlaText}` : ""}`}
      </p>
    );
  }

  if (partnerMode) {
    return (
      <form onSubmit={onSubmit} className="space-y-4 rounded-md border border-border bg-card p-6">
        <div>
          <h3 className="text-base font-semibold text-foreground">Együttműködés és ajánlatkérés</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Írja meg a feladatot vagy az együttműködési igényt, írásban válaszolunk.
          </p>
        </div>

        <input type="hidden" name="utvonal" value={utvonal || "kapacitas"} />
        <input type="hidden" name="forras" value={forrasParam || "scan-to-bim"} />

        <fieldset className="text-sm">
          <legend className="font-medium">Miben segíthetünk?</legend>
          <div className="mt-2 space-y-2">
            {PARTNER_INTENTS.map((item) => (
              <label key={item.id} className="flex gap-2">
                <input
                  type="radio"
                  name="intent"
                  value={item.id}
                  checked={partnerIntent === item.id}
                  onChange={() => setPartnerIntent(item.id)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm">
          Projekt típusa (opcionális)
          <select
            name="projectType"
            defaultValue=""
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          >
            <option value="">—</option>
            {PARTNER_PROJECT_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

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
          Cégnév
          <input
            name="organization"
            required
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

        <label className="block text-sm">
          Egyszeri feladat vagy rendszeres együttműködés? (opcionális)
          <select
            name="recurrence"
            defaultValue=""
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          >
            <option value="">—</option>
            {PARTNER_RECURRENCE.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          Helyszín (opcionális)
          <input
            name="location"
            maxLength={160}
            placeholder="Település vagy cím"
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Hozzávetőleges alapterület vagy projektnagyság (opcionális)
          <input
            name="area"
            maxLength={120}
            placeholder="Pl. kb. 2000 m²"
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>

        <fieldset className="text-sm">
          <legend className="font-medium">Milyen kimenetet vár? (opcionális)</legend>
          <div className="mt-2 space-y-2">
            {PARTNER_OUTPUTS.map(([code, label]) => (
              <label key={code} className="flex gap-2">
                <input type="checkbox" name={`format-${code}`} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm">
          Milyen szoftverben modelleznek? (opcionális)
          <input
            name="modelingSoftware"
            maxLength={160}
            placeholder="Csak tájékoztatás, nem szolgáltatási ígéret"
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>

        <label className="block text-sm">
          Várható terepi munka ideje (opcionális)
          <input
            name="deadline"
            maxLength={80}
            placeholder="Pl. május végéig"
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>

        <label className="block text-sm">
          Rövid leírás
          <textarea
            name="message"
            required
            maxLength={2000}
            rows={4}
            placeholder="Írja le röviden a feladatot vagy az együttműködési igényt."
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>

        <label className="block text-sm">
          Felmérési specifikáció vagy EIR (opcionális)
          <input
            name="eirFileNote"
            maxLength={200}
            placeholder="Pl. a specifikációt e-mailben küldöm"
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </label>

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
          {status === "sending" ? "Küldés…" : "Megkeresés küldése"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-md border border-border bg-card p-6">
      <input type="hidden" name="utvonal" value={utvonal || ""} />
      <input type="hidden" name="forras" value={forrasParam || ""} />

      <fieldset className="text-sm">
        <legend className="font-medium">Miben segíthetünk?</legend>
        <div className="mt-2 space-y-2">
          {DEFAULT_INTENTS.map((item) => (
            <label key={item.id} className="flex gap-2">
              <input
                type="radio"
                name="intent"
                value={item.id}
                checked={defaultIntent === item.id}
                onChange={() => setDefaultIntent(item.id)}
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
            key={`${defaultIntent}-${defaultSiteType}`}
            className="mt-1 w-full rounded-md border border-border px-3 py-2"
          >
            {DEFAULT_SITE_TYPES.map((item) => (
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
        Cégnév {needsPartnerLegacyFields ? "" : "(ha vállalkozás)"}
        <input
          name="organization"
          required={needsPartnerLegacyFields}
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

      {showDefaultExtras ? (
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

      {showDefaultExtras ? (
        <fieldset className="text-sm">
          <legend className="font-medium">Milyen anyagot szeretne kapni? (opcionális)</legend>
          <div className="mt-2 space-y-2">
            {DEFAULT_OUTPUTS.map(([code, label]) => (
              <label key={code} className="flex gap-2">
                <input type="checkbox" name={`format-${code}`} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {showDefaultExtras ? (
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

      {showDefaultExtras ? (
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
