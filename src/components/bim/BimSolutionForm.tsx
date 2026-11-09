"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { SumCheckField } from "@/components/SumCheckField";
import { collectBimLeadSource } from "@/lib/bim-utm";
import { trackConversion } from "@/lib/conversion";

export type BimSolutionFormConfig = {
  heading: string;
  topicId: string;
  forras: string;
  projectTypes: readonly string[];
  dataNeeds: readonly string[];
  companyRequired?: boolean;
};

export function BimSolutionForm({ config }: { config: BimSolutionFormConfig }) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [sumAnswer, setSumAnswer] = useState("");
  const [sumToken, setSumToken] = useState("");
  const [sumReset, setSumReset] = useState(0);
  const companyRequired = config.companyRequired !== false;

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
    const source = collectBimLeadSource(searchParams.get("forras") || config.forras);
    const payload = {
      mode: "solution",
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      organization: String(data.get("organization") ?? ""),
      serviceInterest: config.heading,
      topicId: config.topicId,
      projectType: String(data.get("projectType") ?? ""),
      dataNeed: String(data.get("dataNeed") ?? ""),
      surveyWindow: String(data.get("surveyWindow") ?? ""),
      location: String(data.get("location") ?? ""),
      deadline: String(data.get("deadline") ?? ""),
      source,
      forras: config.forras,
      utvonal: config.topicId,
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
        trackConversion("quote_form_submit_error", { forras: source, mode: "solution" });
        setError(
          result.error === "sum"
            ? "Az eredmény nem helyes. Új kérdést kapott; írja be újra az eredményt."
            : "Az űrlapot nem sikerült elküldeni. Ellenőrizze a mezőket, majd írja be újra az eredményt."
        );
        return;
      }
      trackConversion("quote_form_submit_success", { forras: source, mode: "solution" });
      setStatus("ok");
      form.reset();
    } catch {
      setSumReset((value) => value + 1);
      setStatus("error");
      trackConversion("quote_form_submit_error", { forras: source, mode: "solution" });
      setError("Az űrlapot nem sikerült elküldeni. Írja be újra az eredményt.");
    }
  }

  if (status === "ok") {
    return (
      <p className="rounded-md border border-border bg-card p-6 text-sm">
        A megkeresésre írásban válaszolunk, és egyeztetjük a feladat részleteit.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-md border border-border bg-card p-6">
      <input type="hidden" name="utvonal" value={config.topicId} />
      <input type="hidden" name="forras" value={config.forras} />

      <label className="block text-sm">
        Projekt típusa
        <select
          name="projectType"
          required
          defaultValue=""
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        >
          <option value="" disabled>
            Válasszon…
          </option>
          {config.projectTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        Szükséges adat
        <select
          name="dataNeed"
          required
          defaultValue=""
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        >
          <option value="" disabled>
            Válasszon…
          </option>
          {config.dataNeeds.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        Várható mérési időszak
        <input
          name="surveyWindow"
          maxLength={160}
          placeholder="Rövid megjegyzés"
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>

      <label className="block text-sm">
        Cégnév
        <input
          name="organization"
          required={companyRequired}
          maxLength={160}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
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
        Helyszín
        <input
          name="location"
          required
          maxLength={160}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Határidő (opcionális)
        <input
          name="deadline"
          maxLength={80}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Megjegyzés
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={4}
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
