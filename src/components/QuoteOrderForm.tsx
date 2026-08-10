"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";

import { trackConversion } from "@/lib/conversion";
import { cn } from "@/lib/utils";

const PACKAGES = [
  {
    id: "CLASSIC" as const,
    name: "CLASSIC",
    blurb: "Egyszeri 3D-szken, virtuális túra, megosztható link.",
    range: "≤ 500 m²",
  },
  {
    id: "TWIN" as const,
    name: "TWIN",
    blurb: "Digital twin havi hostinggal, frissítésekkel, BIM/Property Intelligence opcióval.",
    range: "500 – 3000 m²",
  },
  {
    id: "ENTERPRISE" as const,
    name: "ENTERPRISE",
    blurb: "Nagy területek, több épület, integrációk, dedikált projektvezetés.",
    range: "> 3000 m² vagy több épület",
  },
];

const SEGMENTS = [
  { id: "oktatas", label: "Oktatás / kampusz" },
  { id: "ipari", label: "Ipari / gyártás / IoT" },
  { id: "fm", label: "Facility management / üzemeltetés" },
  { id: "biztositas", label: "Biztosítás / kárrendezés" },
  { id: "kereskedelem", label: "Kereskedelem / HoReCa" },
  { id: "ingatlan", label: "Ingatlanértékesítés (B2C)" },
  { id: "egyeb", label: "Egyéb" },
] as const;

const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";

function recommendTier(area: number | undefined): "CLASSIC" | "TWIN" | "ENTERPRISE" {
  if (!area || area <= 0) return "CLASSIC";
  if (area <= 500) return "CLASSIC";
  if (area <= 3000) return "TWIN";
  return "ENTERPRISE";
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 text-sm hover:border-brand/50">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[hsl(var(--brand))]"
      />
      <span>{label}</span>
    </label>
  );
}

export function QuoteOrderForm({
  className,
  defaultSource = "csomagok-megrendeles",
}: {
  className?: string;
  defaultSource?: string;
}) {
  const searchParams = useSearchParams();
  const initialPkg = (searchParams.get("csomag") || "CLASSIC").toUpperCase();
  const startPkg = PACKAGES.some((p) => p.id === initialPkg)
    ? (initialPkg as "CLASSIC" | "TWIN" | "ENTERPRISE")
    : "CLASSIC";
  const source = searchParams.get("forras") || defaultSource;

  const [pkg, setPkg] = useState<"CLASSIC" | "TWIN" | "ENTERPRISE">(startPkg);
  const [area, setArea] = useState("");
  const [segment, setSegment] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [siteCity, setSiteCity] = useState("");
  const [siteNotes, setSiteNotes] = useState("");
  const [needsBim, setNeedsBim] = useState(false);
  const [needsIntel, setNeedsIntel] = useState(false);
  const [needsFloorplan, setNeedsFloorplan] = useState(false);
  const [needsStreetview, setNeedsStreetview] = useState(false);
  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [intendedUse, setIntendedUse] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const recommended = useMemo(
    () => recommendTier(area ? Number(area) : undefined),
    [area]
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);
    const next: Record<string, string> = {};
    if (!pkg) next.package_tier = "Válassz csomagot";
    if (!segment) next.segment = "Válassz célszegmenst";
    if (!siteAddress.trim()) next.site_address = "Add meg a helyszín címét";
    if (contactName.trim().length < 2) next.contact_name = "Add meg a neved";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Érvénytelen e-mail cím";
    }
    if (Object.keys(next).length) {
      setErrors(next);
      const first = Object.keys(next)[0];
      document
        .querySelector(`[name="${first}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setPending(true);

    const bodyMessage = [
      `Csomag: ${pkg}`,
      `Szegmens: ${segment}`,
      companyName ? `Cég: ${companyName}` : null,
      `Helyszín: ${siteAddress}${siteCity ? `, ${siteCity}` : ""}`,
      area ? `Becsült terület: ${area} m²` : null,
      siteNotes ? `Helyszíni megjegyzés: ${siteNotes}` : null,
      `Kiegészítők: ${[
        needsBim && "BIM-export",
        needsIntel && "Property Intelligence",
        needsFloorplan && "2D alaprajz",
        needsStreetview && "Google Utcakép",
      ]
        .filter(Boolean)
        .join(", ") || "—"}`,
      intendedUse ? `Felhasználás: ${intendedUse}` : null,
      message ? `Üzenet: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: bodyMessage,
          package: pkg,
          segment,
          source,
        }),
      });
      if (!res.ok) {
        trackConversion("quote_form_submit_error", { reason: "http" });
        setServerError(
          "Sajnos a beküldés most nem sikerült. Kérjük, próbáld újra néhány perc múlva."
        );
        return;
      }
      trackConversion("quote_form_submit_success", {
        csomag: pkg,
        forras: source,
      });
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      trackConversion("quote_form_submit_error", { reason: "network" });
      setServerError("Hálózati hiba. Próbáld újra.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className={cn("mx-auto max-w-2xl px-4 py-10 text-center", className)}>
        <div className="rounded-lg border border-brand/40 bg-brand/5 p-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Köszönjük, megkaptuk a kérelmedet!</h2>
          <p className="mt-4 text-foreground/85">
            1 munkanapon belül a megadott e-mail címre küldünk ajánlatot. A helyszíni szkennelés
            időpontját a folyamat szükségletei és egyeztetés alapján rögzítjük.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Vissza a főoldalra
            </Link>
            <Link
              href="/csomagok"
              className="inline-flex items-center rounded-md border border-foreground/20 px-5 py-2.5 text-sm font-semibold hover:border-brand hover:text-brand"
            >
              Csomagok megnézése
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("space-y-8", className)}
      data-conversion="quote-order"
    >
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold uppercase tracking-wider text-brand">
          1. Csomag
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {PACKAGES.map((p) => {
            const isRec = recommended === p.id;
            const isSel = pkg === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPkg(p.id)}
                className={cn(
                  "rounded-lg border p-4 text-left transition",
                  isSel
                    ? "border-brand bg-brand/5 ring-2 ring-brand"
                    : "border-border hover:border-brand/50"
                )}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-bold">{p.name}</span>
                  {isRec ? (
                    <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-brand">
                      Ajánlott
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.range}</p>
                <p className="mt-2 text-xs">{p.blurb}</p>
              </button>
            );
          })}
        </div>
        <input type="hidden" name="package_tier" value={pkg} />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wider text-brand">
          2. Helyszín
        </legend>
        <Field label="Becsült alapterület (m²)" error={errors.estimated_area_m2}>
          <input
            name="estimated_area_m2"
            type="number"
            min={0}
            inputMode="numeric"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="pl. 1200"
            className={inputCls}
          />
        </Field>
        <Field label="Célszegmens *" error={errors.segment}>
          <select
            name="segment"
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            className={inputCls}
          >
            <option value="">Válassz…</option>
            {SEGMENTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Helyszín címe *" error={errors.site_address}>
          <input
            name="site_address"
            value={siteAddress}
            onChange={(e) => setSiteAddress(e.target.value)}
            placeholder="Utca, házszám"
            className={inputCls}
          />
        </Field>
        <Field label="Város">
          <input
            name="site_city"
            value={siteCity}
            onChange={(e) => setSiteCity(e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Helyszíni megjegyzés (megközelítés, biztonsági előírás)">
          <textarea
            name="site_notes"
            value={siteNotes}
            onChange={(e) => setSiteNotes(e.target.value)}
            rows={3}
            className={inputCls}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold uppercase tracking-wider text-brand">
          3. Igények (opcionális)
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          <Checkbox
            checked={needsBim}
            onChange={setNeedsBim}
            label="BIM-export (IFC / Revit / ArchiCAD)"
          />
          <Checkbox
            checked={needsIntel}
            onChange={setNeedsIntel}
            label="Property Intelligence (AI elemzés)"
          />
          <Checkbox checked={needsFloorplan} onChange={setNeedsFloorplan} label="2D alaprajz" />
          <Checkbox
            checked={needsStreetview}
            onChange={setNeedsStreetview}
            label="Google Utcakép integráció"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wider text-brand">
          4. Kapcsolat
        </legend>
        <Field label="Név *" error={errors.contact_name}>
          <input
            name="contact_name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Cégnév">
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="E-mail *" error={errors.email}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Telefon (opcionális — csak ha te kérsz visszahívást)">
          <input
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wider text-brand">
          5. Tervezett felhasználás és üzenet
        </legend>
        <Field label="Mire használnád a túrát?">
          <textarea
            value={intendedUse}
            onChange={(e) => setIntendedUse(e.target.value)}
            rows={3}
            placeholder="pl. egyetemi virtuális open day, BIM-modell hivatkozás, biztosítási dokumentáció…"
            className={inputCls}
          />
        </Field>
        <Field label="Egyéb üzenet">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className={inputCls}
          />
        </Field>
      </fieldset>

      {serverError ? (
        <div className="rounded-md border border-red-500/40 bg-red-500/5 p-3 text-sm text-red-700">
          {serverError}
        </div>
      ) : null}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          A beküldéssel hozzájárulsz ahhoz, hogy az ajánlatadás céljából felvegyük veled a
          kapcsolatot e-mailben. Adataidat nem osztjuk meg harmadik féllel.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark disabled:opacity-60"
        >
          {pending ? "Küldés…" : "Kérelem küldése"}
        </button>
      </div>
    </form>
  );
}
