"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";

import { SumCheckField } from "@/components/SumCheckField";
import { BIM_CONFIG } from "@/config/bim";
import { collectBimLeadSource } from "@/lib/bim-utm";
import { trackConversion } from "@/lib/conversion";

const PATHS = [
  {
    id: "ipar",
    label: "Ipari vagy épületfelmérési projekt",
  },
  {
    id: "kapacitas",
    label: "BIM-modellezőknek: kapacitás vagy alvállalkozói együttműködés",
  },
] as const;

const PROJECT_TYPES = [
  "Ipari létesítmény",
  "Épület vagy rekonstrukció",
  "BIM-modellező kapacitás",
  "Lakossági felmérés",
] as const;

const OUTPUTS = [
  ["pontfelho", "Pontfelhő"],
  ["cad", "CAD"],
  ["revit", "Revit"],
  ["archicad", "ArchiCAD"],
  ["ifc", "IFC"],
  ["egyeb", "Egyéb"],
] as const;

type PathId = (typeof PATHS)[number]["id"];

function resolvePath(raw: string | null): PathId {
  if (raw === "kapacitas") return "kapacitas";
  return "ipar";
}

function resolveProjectType(raw: string | null, path: PathId): (typeof PROJECT_TYPES)[number] {
  if (raw === "lakossagi") return "Lakossági felmérés";
  if (raw === "tervezo") return "Épület vagy rekonstrukció";
  if (path === "kapacitas" || raw === "kapacitas") return "BIM-modellező kapacitás";
  return "Ipari létesítmény";
}

export function BimQuoteForm() {
  const searchParams = useSearchParams();
  const initialPath = resolvePath(searchParams.get("utvonal"));
  const [path, setPath] = useState<PathId>(initialPath);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [sumAnswer, setSumAnswer] = useState("");
  const [sumToken, setSumToken] = useState("");
  const [sumReset, setSumReset] = useState(0);

  const defaultProjectType = useMemo(
    () => resolveProjectType(searchParams.get("utvonal"), path),
    [path, searchParams]
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!sumToken) {
      setStatus("error");
      setError("Az ellenőrző kérdés még töltődik. Pár másodperc, majd próbálja újra.");
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
    const source = collectBimLeadSource(searchParams.get("forras") || path);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      organization: String(data.get("organization") ?? ""),
      organizationType: String(data.get("projectType") ?? ""),
      serviceInterest: PATHS.find((item) => item.id === path)?.label ?? path,
      buildingType: String(data.get("projectType") ?? ""),
      area: String(data.get("area") ?? ""),
      location: String(data.get("location") ?? ""),
      spaces: "—",
      deadline: String(data.get("deadline") ?? ""),
      eir: data.get("eirFileNote") ? "feltöltés jelezve" : "nem",
      eirLevel: "",
      survey: "nem tudom",
      formats,
      useCases: [path],
      source,
      consent: data.get("consent") === "on",
      message: [
        `Útvonal: ${path}`,
        `Projekt típusa: ${String(data.get("projectType") ?? "")}`,
        `Kért kimenetek: ${formats.join(", ") || "—"}`,
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
            ? "Az eredmény nem helyes. Új kérdést kapott, írja be az eredményt."
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
        Megkaptuk az ajánlatkérést.
        {BIM_CONFIG.replySlaText ? ` ${BIM_CONFIG.replySlaText}` : null}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-md border border-border bg-card p-6">
      <fieldset className="text-sm">
        <legend className="font-medium">Melyik útvonalról van szó?</legend>
        <div className="mt-2 space-y-2">
          {PATHS.map((item) => (
            <label key={item.id} className="flex gap-2">
              <input
                type="radio"
                name="utvonal"
                value={item.id}
                checked={path === item.id}
                onChange={() => setPath(item.id)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

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
        Cégnév (ha vállalkozás)
        <input
          name="organization"
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
        Telefon (opcionális)
        <input
          name="phone"
          type="tel"
          maxLength={40}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Projekt típusa
        <select
          name="projectType"
          required
          defaultValue={defaultProjectType}
          key={defaultProjectType}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        >
          {PROJECT_TYPES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        Helyszín
        <input
          name="location"
          required
          maxLength={160}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Hozzávetőleges alapterület vagy projektnagyság
        <input
          name="area"
          maxLength={120}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>
      <fieldset className="text-sm">
        <legend className="font-medium">Kért kimenet</legend>
        <div className="mt-2 space-y-2">
          {OUTPUTS.map(([code, label]) => (
            <label key={code} className="flex gap-2">
              <input type="checkbox" name={`format-${code}`} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block text-sm">
        Határidő
        <input
          name="deadline"
          maxLength={80}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Rövid feladatleírás
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={4}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        EIR vagy dokumentum (opcionális megjegyzés a feltöltésről)
        <input
          name="eirFileNote"
          maxLength={200}
          placeholder="Pl. EIR-t e-mailben küldöm"
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>
      <fieldset className="space-y-2 text-sm">
        <legend className="font-medium">Ellenőrzés</legend>
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
          , és hozzájárulok, hogy az ajánlatkéréshez megadott adataimat a VRGO kezelje.
        </span>
      </label>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-brand px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark disabled:opacity-60"
      >
        {status === "sending" ? "Küldés…" : "Ajánlatot kérek"}
      </button>
      <p className="text-xs text-muted-foreground">{BIM_CONFIG.replySlaText}</p>
    </form>
  );
}
