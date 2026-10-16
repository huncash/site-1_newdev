"use client";

import { useState, type FormEvent } from "react";

import { RecaptchaField } from "@/components/RecaptchaField";
import { QUOTE_USE_CASE_CODES, USE_CASES } from "@/lib/bim-site";

const ORG_TYPES = [
  "Egyetem vagy kutatóhely",
  "Kórház vagy közintézmény",
  "Vagyonkezelő vagy üzemeltető",
  "Generálkivitelező",
  "Tervezőiroda vagy BIM-modellező",
  "Egyéb",
] as const;

const quoteCases = USE_CASES.filter(([code]) =>
  (QUOTE_USE_CASE_CODES as readonly string[]).includes(code)
);

export function BimQuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      setStatus("error");
      setError("Az ellenőrzés jelenleg nem elérhető. Próbáld újra később.");
      return;
    }
    if (!captchaToken) {
      setStatus("error");
      setError("Jelöld be, hogy nem vagy robot.");
      return;
    }
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    const useCases = quoteCases
      .map(([code]) => code)
      .filter((code) => data.get(`usecase-${code}`) === "on");

    const formats = ["E57", "OBJ", "XYZ", "alaprajz", "IFC"].filter(
      (code) => data.get(`format-${code}`) === "on"
    );
    const source = new URLSearchParams(window.location.search).get("forras") ?? "";

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      organization: String(data.get("organization") ?? ""),
      organizationType: String(data.get("organizationType") ?? ""),
      buildingType: String(data.get("buildingType") ?? ""),
      area: String(data.get("area") ?? ""),
      location: String(data.get("location") ?? ""),
      spaces: String(data.get("spaces") ?? ""),
      deadline: String(data.get("deadline") ?? ""),
      eir: String(data.get("eir") ?? ""),
      eirLevel: String(data.get("eirLevel") ?? ""),
      survey: String(data.get("survey") ?? ""),
      formats,
      useCases,
      source,
      consent: data.get("consent") === "on",
      message: String(data.get("message") ?? ""),
      recaptchaToken: captchaToken,
    };

    try {
      const response = await fetch("/api/bim-ajanlat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        if (result.error === "recaptcha" || result.error === "unavailable") {
          setCaptchaToken("");
          setCaptchaReset((value) => value + 1);
        }
        setStatus("error");
        setError(
          result.error === "recaptcha"
            ? "Az ellenőrzés lejárt vagy nem sikerült. Jelöld be újra."
            : "Az űrlapot nem sikerült elküldeni. Ellenőrizd a mezőket, majd jelöld be újra az ellenőrzést."
        );
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setCaptchaToken("");
      setCaptchaReset((value) => value + 1);
      setStatus("error");
      setError("Az űrlapot nem sikerült elküldeni. Jelöld be újra az ellenőrzést.");
    }
  }

  if (status === "ok") {
    return (
      <p className="rounded-md border border-border bg-card p-6 text-sm">
        Megkaptuk az ajánlatkérést. 1 munkanapon belül jelentkezünk a megadott e-mail-címen.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-md border border-border bg-card p-6">
      <label className="block text-sm">
        Név
        <input name="name" required maxLength={120} className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        E-mail
        <input name="email" type="email" required maxLength={254} className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Telefon
        <input name="phone" type="tel" maxLength={40} className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Szervezet neve
        <input name="organization" required maxLength={160} className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Szervezet típusa
        <select name="organizationType" required className="mt-1 w-full rounded-md border border-border px-3 py-2">
          <option value="">Válassz</option>
          {ORG_TYPES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        Épület vagy létesítmény típusa
        <input name="buildingType" required maxLength={160} className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Alapterület
        <input name="area" required maxLength={80} className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Helyszín
        <input name="location" required maxLength={160} className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Belső vagy külső terek
        <select name="spaces" required className="mt-1 w-full rounded-md border border-border px-3 py-2">
          <option value="">Válassz</option>
          <option value="belső">Belső</option>
          <option value="külső">Külső</option>
          <option value="mindkettő">Mindkettő</option>
        </select>
      </label>
      <fieldset className="text-sm">
        <legend className="font-medium">Kívánt felhasználási esetek</legend>
        <div className="mt-2 space-y-2">
          {quoteCases.map(([code, label]) => (
            <label key={code} className="flex gap-2">
              <input type="checkbox" name={`usecase-${code}`} />
              <span>
                {code} {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="text-sm">
        <legend className="font-medium">Van EIR?</legend>
        <div className="mt-2 flex gap-4">
          <label className="flex gap-2">
            <input type="radio" name="eir" value="igen" required />
            Igen
          </label>
          <label className="flex gap-2">
            <input type="radio" name="eir" value="nem" />
            Nem
          </label>
          <label className="flex gap-2">
            <input type="radio" name="eir" value="nem tudom" />
            Nem tudom
          </label>
        </div>
      </fieldset>
      <label className="block text-sm">
        EIR pontossági szintje, ha ismert
        <input name="eirLevel" maxLength={160} className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </label>
      <fieldset className="text-sm">
        <legend className="font-medium">Szükséges geodéziai ellenőrző mérés?</legend>
        <div className="mt-2 flex flex-wrap gap-4">
          {["igen", "nem", "nem tudom"].map((value) => (
            <label key={value} className="flex gap-2">
              <input type="radio" name="survey" value={value} required />
              {value}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="text-sm">
        <legend className="font-medium">Kért formátumok</legend>
        <div className="mt-2 space-y-2">
          {[
            ["E57", "E57"],
            ["OBJ", "OBJ"],
            ["XYZ", "XYZ"],
            ["alaprajz", "Alaprajz"],
            ["IFC", "IFC modellezéssel"],
          ].map(([code, label]) => (
            <label key={code} className="flex gap-2">
              <input type="checkbox" name={`format-${code}`} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block text-sm">
        Határidő
        <input name="deadline" required maxLength={80} className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Megjegyzés
        <textarea name="message" maxLength={2000} rows={4} className="mt-1 w-full rounded-md border border-border px-3 py-2" />
      </label>
      <fieldset className="space-y-2 text-sm">
        <legend className="font-medium">Ellenőrzés</legend>
        <p className="text-muted-foreground">
          Az elküldés előtt igazold, hogy nem automata küldi az ajánlatkérést.
        </p>
        <RecaptchaField onToken={setCaptchaToken} resetKey={captchaReset} />
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
      <p className="text-xs text-muted-foreground">A helyszíni időpontot egyeztetjük.</p>
    </form>
  );
}
