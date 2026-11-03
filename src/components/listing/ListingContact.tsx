"use client";

import { MessageCircle, Phone, ShieldCheck } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { trackConversion } from "@/lib/conversion";
import { LISTING_SELLER } from "@/lib/listing";

type PhoneLinks = {
  display: string;
  telHref: string;
  whatsappHref: string;
};

type RevealCtx = {
  revealed: boolean;
  reveal: (place: string) => void;
  links: PhoneLinks | null;
};

const PhoneRevealContext = createContext<RevealCtx | null>(null);

/** Számjegyek char-kódból — a HTML-ben plain text telefonszám nem jelenik meg, amíg a látogató nem kattint. */
function assemblePhone(): PhoneLinks {
  const digits = String.fromCharCode(
    51, 54, 51, 48, 54, 54, 55, 50, 53, 49, 48
  );
  const display = `+${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  const telHref = `tel:+${digits}`;
  const whatsappHref = `https://wa.me/${digits}?text=${encodeURIComponent(LISTING_SELLER.whatsappPrefill)}`;
  return { display, telHref, whatsappHref };
}

function track(
  event: "listing_phone_click" | "listing_whatsapp_click" | "listing_cta_click" | "listing_phone_reveal",
  place: string
) {
  trackConversion(event, { place, seller: LISTING_SELLER.name });
}

export function ListingPhoneProvider({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const [links, setLinks] = useState<PhoneLinks | null>(null);

  const reveal = useCallback((place: string) => {
    const next = assemblePhone();
    setLinks(next);
    setRevealed(true);
    track("listing_phone_reveal", place);
  }, []);

  const value = useMemo(() => ({ revealed, reveal, links }), [revealed, reveal, links]);

  return <PhoneRevealContext.Provider value={value}>{children}</PhoneRevealContext.Provider>;
}

function usePhoneReveal() {
  const ctx = useContext(PhoneRevealContext);
  if (!ctx) throw new Error("ListingPhoneProvider hiányzik");
  return ctx;
}

function SellerPhoto({ size }: { size: "sm" | "md" }) {
  const [failed, setFailed] = useState(false);
  const dim = size === "sm" ? "h-11 w-11" : "h-14 w-14";
  if (failed) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[#1a4530] text-sm font-semibold text-[#e8b84a] ${dim}`}
        aria-hidden
      >
        {LISTING_SELLER.name.slice(0, 1)}
      </span>
    );
  }
  return (
    <img
      src={LISTING_SELLER.photoSrc}
      alt={`${LISTING_SELLER.name} — eladó`}
      width={size === "sm" ? 44 : 56}
      height={size === "sm" ? 44 : 56}
      className={`${dim} shrink-0 rounded-full object-cover ring-2 ring-[#e8b84a]/70`}
      onError={() => setFailed(true)}
      decoding="async"
    />
  );
}

function RevealButton({ place, className }: { place: string; className?: string }) {
  const { reveal } = usePhoneReveal();
  return (
    <button
      type="button"
      onClick={() => reveal(place)}
      className={
        className ??
        "inline-flex items-center gap-1.5 rounded-md bg-[#e8b84a] px-3 py-2 text-sm font-semibold text-[#241f18]"
      }
    >
      <ShieldCheck className="h-4 w-4" aria-hidden />
      Telefonszám megjelenítése
    </button>
  );
}

function RevealedActions({ place, compact }: { place: string; compact?: boolean }) {
  const { links } = usePhoneReveal();
  if (!links) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={links.telHref}
        onClick={() => track("listing_phone_click", place)}
        className="inline-flex items-center gap-1.5 rounded-md border border-[#d4c9b5] bg-[#efe8db] px-3 py-2 text-sm font-semibold text-[#241f18]"
      >
        <Phone className="h-4 w-4 text-[#e8b84a]" aria-hidden />
        {compact ? "Hívás" : links.display}
      </a>
      <a
        href={links.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("listing_whatsapp_click", place)}
        className="inline-flex items-center gap-1.5 rounded-md bg-[#e8b84a] px-3 py-2 text-sm font-semibold text-[#241f18]"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        WhatsApp
      </a>
    </div>
  );
}

/** Fejléc alatti bizalomépítő sáv — szám csak interakció után. */
export function ListingSellerStrip() {
  const { revealed } = usePhoneReveal();
  return (
    <div className="border-b border-[#d4c9b5] bg-[#f7f1e6]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <SellerPhoto size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#241f18]">{LISTING_SELLER.name}</p>
            <p className="truncate text-xs text-[#6b6154]">{LISTING_SELLER.role}</p>
          </div>
        </div>
        {revealed ? <RevealedActions place="header_strip" /> : <RevealButton place="header_strip" />}
      </div>
    </div>
  );
}

/** Fix alsó sticky CTA. */
export function ListingStickyCta() {
  const { revealed, links } = usePhoneReveal();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
      <div className="pointer-events-auto mx-auto flex max-w-lg items-center gap-3 rounded-xl border border-[#d4c9b5] bg-[#0f2e1f]/95 p-2.5 shadow-[0_8px_30px_rgba(15,46,31,0.45)] backdrop-blur">
        <SellerPhoto size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#f7f1e6]">{LISTING_SELLER.name}</p>
          <p className="truncate text-xs text-[#e8b84a]">
            {revealed && links ? links.display : "Közvetlen hívás / WhatsApp"}
          </p>
        </div>
        {revealed && links ? (
          <>
            <a
              href={links.telHref}
              onClick={() => track("listing_phone_click", "sticky")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#1a4530] text-[#e8b84a]"
              aria-label="Telefonhívás"
            >
              <Phone className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={links.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("listing_whatsapp_click", "sticky")}
              className="inline-flex h-11 items-center gap-1.5 rounded-md bg-[#e8b84a] px-3 text-sm font-semibold text-[#241f18]"
              aria-label="WhatsApp üzenet"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </>
        ) : (
          <RevealButton
            place="sticky"
            className="inline-flex items-center gap-1 rounded-md bg-[#e8b84a] px-3 py-2.5 text-xs font-semibold text-[#241f18] sm:text-sm"
          />
        )}
      </div>
    </div>
  );
}

/** Kapcsolati szekció személyes kártyája. */
export function ListingSellerCard({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { revealed } = usePhoneReveal();
  const dark = tone === "dark";
  return (
    <div
      className={`mt-6 rounded-lg border p-4 ${
        dark ? "border-[#e8b84a]/40 bg-[#1a4530]/50" : "border-[#d4c9b5] bg-[#f7f1e6]"
      }`}
    >
      <div className="flex items-center gap-3">
        <SellerPhoto size="md" />
        <div>
          <p className={`text-base font-semibold ${dark ? "text-[#f7f1e6]" : "text-[#241f18]"}`}>
            {LISTING_SELLER.name}
          </p>
          <p className={`text-sm ${dark ? "text-[#e8b84a]" : "text-[#6b6154]"}`}>{LISTING_SELLER.role}</p>
        </div>
      </div>
      <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-[#f7f1e6]/90" : "text-[#5a5146]"}`}>
        Egy kattintás a „Nem vagyok robot” jellegű megjelenítésre — így a szám nem kerül a HTML forrásba scraper-eknek.
      </p>
      <div className="mt-3">
        {revealed ? <RevealedActions place="contact_card" /> : <RevealButton place="contact_card" />}
      </div>
    </div>
  );
}

export function trackListingCta(place: string) {
  track("listing_cta_click", place);
}
