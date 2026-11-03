"use client";

import { useEffect, useState, type FormEvent } from "react";

import type { ListingVariant } from "@/lib/listing";

const fieldClass =
  "mt-1 w-full rounded-md border border-[#d4c9b5] bg-[#f7f1e6] px-3 py-2.5 text-sm text-[#241f18] outline-none focus:border-[#e8b84a]";

type EnquiryFormProps = {
  variant?: ListingVariant;
  defaultMessage?: string;
};

export function EnquiryForm({ variant, defaultMessage = "" }: EnquiryFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(defaultMessage);
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");
  const [sumToken, setSumToken] = useState("");
  const [sumAnswer, setSumAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [checkFailed, setCheckFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "sum">("idle");

  useEffect(() => {
    let cancelled = false;
    setQuestion("");
    setSumToken("");
    setSumAnswer("");
    setCheckFailed(false);
    fetch("/api/ajanlat-ellenorzes", { cache: "no-store" })
      .then(async (response) => {
        const data = (await response.json()) as { token?: string; question?: string };
        if (!response.ok || !data.token || !data.question) throw new Error("check");
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        setQuestion(data.question ?? "");
        setSumToken(data.token ?? "");
      })
      .catch(() => {
        if (!cancelled) setCheckFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!sumToken) return;
    setStatus("sending");
    try {
      const response = await fetch("/api/hirdetes-erdeklodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          consent,
          company,
          sumToken,
          sumAnswer,
          variant: variant ?? null,
        }),
      });
      if (response.status === 400) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setStatus(data.error === "sum" ? "sum" : "error");
        if (data.error === "sum") setAttempt((value) => value + 1);
        return;
      }
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("sent");
      setName("");
      setEmail("");
      setPhone("");
      setMessage(defaultMessage);
      setConsent(false);
      setAttempt((value) => value + 1);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-md border border-[#d4c9b5] bg-[#f7f1e6] px-5 py-6 text-sm leading-relaxed">
        Megkaptuk az érdeklődést{variant ? ` (${variant.toUpperCase()} változat)` : ""}. Az eladó a megadott elérhetőségen jelentkezik.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {variant ? (
        <p className="rounded-md border border-[#d4c9b5] bg-[#f7f1e6] px-3 py-2 text-sm">
          Érdeklődés: <span className="font-semibold">{variant.toUpperCase()} változat</span>
        </p>
      ) : null}
      <label className="block text-sm">
        Név
        <input required value={name} onChange={(event) => setName(event.target.value)} className={fieldClass} autoComplete="name" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Telefon
          <input required value={phone} onChange={(event) => setPhone(event.target.value)} className={fieldClass} autoComplete="tel" inputMode="tel" />
        </label>
        <label className="block text-sm">
          E-mail
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={fieldClass} autoComplete="email" />
        </label>
      </div>
      <label className="block text-sm">
        Üzenet
        <textarea required rows={5} value={message} onChange={(event) => setMessage(event.target.value)} className={fieldClass} />
      </label>
      <div className="hidden" aria-hidden="true">
        <label>
          Cég
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} />
        </label>
      </div>
      <div>
        <p className="text-sm font-medium">
          {question || (checkFailed ? "Az ellenőrző kérdést nem sikerült betölteni." : "Az ellenőrző kérdés betöltése…")}
        </p>
        <input
          required
          inputMode="numeric"
          autoComplete="off"
          aria-label="Az eredmény"
          value={sumAnswer}
          onChange={(event) => setSumAnswer(event.target.value)}
          className={fieldClass}
        />
        {checkFailed ? (
          <button type="button" className="mt-2 text-sm font-semibold underline" onClick={() => setAttempt((value) => value + 1)}>
            Új kérdés
          </button>
        ) : null}
      </div>
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1"
        />
        <span>Az adataimat csak az érdeklődésem miatti kapcsolattartásra kérem használni.</span>
      </label>
      {status === "sum" ? <p className="text-sm">Az ellenőrző válasz nem egyezik. Új kérdést töltöttünk be.</p> : null}
      {status === "error" ? <p className="text-sm">Az üzenetet most nem sikerült elküldeni. Próbálja meg később.</p> : null}
      <button
        type="submit"
        disabled={status === "sending" || !sumToken}
        className="rounded-md bg-[#e8b84a] px-5 py-3 text-sm font-semibold text-[#241f18] disabled:opacity-60"
      >
        {status === "sending" ? "Küldés…" : "Érdeklődöm"}
      </button>
    </form>
  );
}
