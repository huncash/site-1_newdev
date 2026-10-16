"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

import { SumCheckField } from "@/components/SumCheckField";
import { Button } from "@/components/ui/button";
import { trackConversion } from "@/lib/conversion";
import { cn } from "@/lib/utils";

export interface ContactFormProps {
  className?: string;
  /** Prefill context when not using URL search params */
  defaultPackage?: string;
  defaultSegment?: string;
  defaultSource?: string;
}

function contextLine(opts: {
  csomag?: string | null;
  szegmens?: string | null;
  termek?: string | null;
  forras?: string | null;
}): string {
  const parts: string[] = [];
  if (opts.csomag) parts.push(`Csomag: ${opts.csomag}`);
  if (opts.szegmens) parts.push(`Szegmens: ${opts.szegmens}`);
  if (opts.termek) parts.push(`Termék: ${opts.termek}`);
  if (opts.forras) parts.push(`Forrás: ${opts.forras}`);
  return parts.join(" · ");
}

export function ContactForm({
  className,
  defaultPackage,
  defaultSegment,
  defaultSource,
}: ContactFormProps) {
  const searchParams = useSearchParams();
  const csomag = searchParams.get("csomag") ?? defaultPackage ?? "";
  const szegmens = searchParams.get("szegmens") ?? defaultSegment ?? "";
  const termek = searchParams.get("termek") ?? "";
  const forras = searchParams.get("forras") ?? defaultSource ?? "";

  const context = useMemo(
    () => contextLine({ csomag, szegmens, termek, forras }),
    [csomag, szegmens, termek, forras]
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sumAnswer, setSumAnswer] = useState("");
  const [sumToken, setSumToken] = useState("");
  const [sumReset, setSumReset] = useState(0);
  const [done, setDone] = useState(false);
  const seeded = useRef(false);

  useEffect(() => {
    trackConversion("quote_form_view", {
      csomag: csomag || undefined,
      szegmens: szegmens || undefined,
      forras: forras || undefined,
    });
  }, [csomag, szegmens, forras]);

  useEffect(() => {
    if (seeded.current || !context) return;
    seeded.current = true;
    setMessage(
      `Ajánlatot kérek.\n\n(${context})\n\nHelyszín / igény röviden:\n`
    );
  }, [context]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!sumToken) {
      setError("Az ellenőrző kérdés még töltődik. Pár másodperc, majd próbáld újra.");
      return;
    }
    if (!/^\d{1,3}$/.test(sumAnswer.trim())) {
      setError("Írd be az eredményt számmal a kérdés alatti sorba.");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          package: csomag || undefined,
          segment: szegmens || undefined,
          product: termek || undefined,
          source: forras || "ajanlat-form",
          sumToken,
          sumAnswer: sumAnswer.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        trackConversion("quote_form_submit_error", { reason: data.error ?? "http" });
        if (data.error === "sum") setSumReset((value) => value + 1);
        setError(
          data.error === "Invalid email"
            ? "Érvénytelen e-mail cím."
            : data.error === "sum"
              ? "Az eredmény nem helyes. Új kérdést kaptál, írd be az eredményt."
              : "Küldés sikertelen. Írd be újra az eredményt, majd próbáld meg még egyszer."
        );
        return;
      }
      trackConversion("quote_form_submit_success", {
        csomag: csomag || undefined,
        szegmens: szegmens || undefined,
        forras: forras || "ajanlat-form",
      });
      setDone(true);
    } catch {
      trackConversion("quote_form_submit_error", { reason: "network" });
      setSumReset((value) => value + 1);
      setError("Hálózati hiba. Írd be újra az eredményt, majd próbáld meg még egyszer.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div
        className={cn(
          "rounded-md border border-brand/30 bg-brand/5 p-6 text-sm",
          className
        )}
        role="status"
      >
        <p className="text-base font-semibold text-foreground">Köszönjük az ajánlatkérést.</p>
        <p className="mt-2 text-muted-foreground">
          Hamarosan felvesszük veled a kapcsolatot — 1 munkanapon belül.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("space-y-4", className)}
      data-conversion="quote-form"
    >
      {context ? (
        <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
          {context}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Név *</span>
          <input
            required
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">E-mail *</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium">Telefon</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium">Üzenet / igény</span>
        <textarea
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <div className="space-y-2">
        <p className="text-sm font-medium">Ellenőrzés</p>
        <SumCheckField
          resetKey={sumReset}
          answer={sumAnswer}
          onAnswer={setSumAnswer}
          onToken={setSumToken}
          inputClassName="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Küldés…" : "Ajánlatot kérek"}
      </Button>

      <p className="text-xs text-muted-foreground">
        Az űrlap elküldésével elfogadod, hogy a megadott adatokat az ajánlatadáshoz
        felhasználjuk. Részletek:{" "}
        <a href="/adatvedelem" className="underline underline-offset-2">
          Adatvédelem
        </a>
        .
      </p>
    </form>
  );
}
