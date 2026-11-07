"use client";

import { useState, type FormEvent } from "react";

import { SumCheckField } from "@/components/SumCheckField";
import { BIM_CONFIG } from "@/config/bim";
import { BIM_RESIDENTIAL_SERVICE_OPTIONS } from "@/lib/bim-catalog";
import { collectBimLeadSource } from "@/lib/bim-utm";
import { trackConversion } from "@/lib/conversion";

const GOALS = ["Felújítás", "Tetőtér-beépítés", "Eladás / bérbeadás", "Egyéb"] as const;

type BimResidentialFormProps = {
  sourceDefault?: string;
};

/** 4 mezős lakossági űrlap — település, cél, méret, telefon/e-mail. */
export function BimResidentialForm({ sourceDefault = "lakossagnak" }: BimResidentialFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [sumAnswer, setSumAnswer] = useState("");
  const [sumToken, setSumToken] = useState("");
  const [sumReset, setSumReset] = useState(0);

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
    const contact = String(data.get("contact") ?? "").trim();
    const source = collectBimLeadSource(sourceDefault);

    const payload = {
      mode: "residential",
      location: String(data.get("location") ?? ""),
      goal: String(data.get("goal") ?? ""),
      serviceInterest: String(data.get("serviceInterest") ?? ""),
      area: String(data.get("area") ?? ""),
      contact,
      consent: data.get("consent") === "on",
      source,
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
        trackConversion("quote_form_submit_error", { forras: source, mode: "residential" });
        setError(
          result.error === "sum"
            ? "Az eredmény nem helyes. Új kérdést kapott, írja be az eredményt."
            : "Az űrlapot nem sikerült elküldeni. Ellenőrizze a mezőket."
        );
        return;
      }
      trackConversion("quote_form_submit_success", { forras: source, mode: "residential" });
      setStatus("ok");
      form.reset();
      setSumAnswer("");
    } catch {
      setSumReset((value) => value + 1);
      setStatus("error");
      trackConversion("quote_form_submit_error", { forras: source, mode: "residential" });
      setError("Az űrlapot nem sikerült elküldeni. Próbálja újra.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-md border border-border bg-card p-5 text-sm text-muted-foreground sm:text-base">
        <p className="font-semibold text-foreground">Köszönjük!</p>
        <p className="mt-2">
          Felvesszük Önnel a kapcsolatot, és megmondjuk, mit érdemes felmérni, mennyiért.
          {BIM_CONFIG.replySlaText
            ? ` ${BIM_CONFIG.replySlaText}`
            : " A válasz idejét az érdeklődés részletei határozzák meg — csak olyat vállalunk, amit tartani tudunk."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-md border border-border bg-card p-5">
      <div>
        <label className="text-sm font-semibold text-foreground" htmlFor="res-location">
          Település
        </label>
        <input
          id="res-location"
          name="location"
          required
          maxLength={160}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground" htmlFor="res-goal">
          Mi a cél?
        </label>
        <select
          id="res-goal"
          name="goal"
          required
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
          defaultValue=""
        >
          <option value="" disabled>
            Válasszon
          </option>
          {GOALS.map((goal) => (
            <option key={goal} value={goal}>
              {goal}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground" htmlFor="res-service">
          Melyik szolgáltatás iránt érdeklődik?
        </label>
        <select
          id="res-service"
          name="serviceInterest"
          required
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
          defaultValue=""
        >
          <option value="" disabled>
            Válasszon
          </option>
          {BIM_RESIDENTIAL_SERVICE_OPTIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground" htmlFor="res-area">
          Kb. mekkora (m²)
        </label>
        <input
          id="res-area"
          name="area"
          required
          maxLength={80}
          placeholder="pl. 85"
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground" htmlFor="res-contact">
          Telefon vagy e-mail
        </label>
        <input
          id="res-contact"
          name="contact"
          required
          maxLength={160}
          className="mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>
      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input name="consent" type="checkbox" required className="mt-1" />
        <span>
          Elfogadom, hogy az adataimat az érdeklődés megválaszolására használják az adatvédelmi
          tájékoztató szerint.
        </span>
      </label>
      <SumCheckField
        resetKey={sumReset}
        answer={sumAnswer}
        onAnswer={setSumAnswer}
        onToken={setSumToken}
        inputClassName="mt-1 w-full rounded-md border border-border px-3 py-2"
      />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
      >
        {status === "sending" ? "Küldés…" : "Kérek visszahívást / ajánlatot"}
      </button>
      {BIM_CONFIG.replySlaText ? (
        <p className="text-xs text-muted-foreground">{BIM_CONFIG.replySlaText}</p>
      ) : null}
    </form>
  );
}
