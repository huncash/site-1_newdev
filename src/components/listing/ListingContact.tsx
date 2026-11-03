"use client";

import { Mail, Phone, ShieldCheck } from "lucide-react";
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
};

type RevealCtx = {
  revealed: boolean;
  reveal: (place: string) => void;
  links: PhoneLinks | null;
};

const PhoneRevealContext = createContext<RevealCtx | null>(null);

/** Számjegyek char-kódból — plain text telefonszám nincs a HTML-ben, amíg a látogató nem kattint. */
function assemblePhone(): PhoneLinks {
  const digits = String.fromCharCode(51, 54, 51, 48, 54, 54, 55, 50, 53, 49, 48);
  const display = `+${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  return { display, telHref: `tel:+${digits}` };
}

/** Email char-kódból — mailto csak kattintáskor. */
function assembleMailto(): string {
  const addr = String.fromCharCode(
    105, 110, 102, 111, 64, 118, 114, 103, 111, 46, 104, 117
  );
  const subject = encodeURIComponent("Érdeklődés — Börzsönyliget telek");
  return `mailto:${addr}?subject=${subject}`;
}

function track(
  event: "listing_phone_click" | "listing_email_click" | "listing_cta_click" | "listing_phone_reveal",
  place: string
) {
  trackConversion(event, { place, seller: LISTING_SELLER.name });
}

export function ListingPhoneProvider({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const [links, setLinks] = useState<PhoneLinks | null>(null);

  const reveal = useCallback((place: string) => {
    setLinks(assemblePhone());
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

function EmailButton({ place, dark }: { place: string; dark?: boolean }) {
  return (
    <a
      href={assembleMailto()}
      onClick={() => track("listing_email_click", place)}
      className={
        dark
          ? "inline-flex items-center gap-1.5 rounded-md border border-[#e8b84a]/80 bg-[#1a4530]/50 px-3 py-2 text-sm font-semibold text-[#f7f1e6]"
          : "inline-flex items-center gap-1.5 rounded-md border border-[#d4c9b5] bg-[#efe8db] px-3 py-2 text-sm font-semibold text-[#241f18]"
      }
    >
      <Mail className="h-4 w-4 text-[#e8b84a]" aria-hidden />
      Email küldése
    </a>
  );
}

function PhoneAction({ place }: { place: string }) {
  const { links } = usePhoneReveal();
  if (!links) return null;
  return (
    <a
      href={links.telHref}
      onClick={() => track("listing_phone_click", place)}
      className="inline-flex items-center gap-1.5 rounded-md border border-[#d4c9b5] bg-[#efe8db] px-3 py-2 text-sm font-semibold text-[#241f18]"
    >
      <Phone className="h-4 w-4 text-[#e8b84a]" aria-hidden />
      {links.display}
    </a>
  );
}

/** Mobilmenü alján — nem sticky, csak a nyitott hamburgerben. */
export function ListingMobileContact({ onNavigate }: { onNavigate?: () => void }) {
  const { revealed } = usePhoneReveal();
  return (
    <div className="mt-3 border-t border-[#d4c9b5] pt-3">
      <p className="px-3 text-xs font-semibold uppercase tracking-wide text-[#6b6154]">{LISTING_SELLER.name}</p>
      <div className="mt-2 flex flex-col gap-2 px-3">
        {revealed ? <PhoneAction place="mobile_menu" /> : <RevealButton place="mobile_menu" />}
        <EmailButton place="mobile_menu" />
        <a
          href="#kapcsolat"
          onClick={() => {
            track("listing_cta_click", "mobile_menu_form");
            onNavigate?.();
          }}
          className="inline-flex items-center rounded-md px-1 py-1 text-sm font-semibold text-[#0f2e1f] underline-offset-2 hover:underline"
        >
          Üzenet az űrlapon
        </a>
      </div>
    </div>
  );
}

/** Kapcsolati szekció — szöveg + gombok, avatar nélkül (nem a fejlécben). */
export function ListingSellerCard({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { revealed } = usePhoneReveal();
  const dark = tone === "dark";
  return (
    <div
      className={`mt-6 rounded-lg border p-4 ${
        dark ? "border-[#e8b84a]/40 bg-[#1a4530]/50" : "border-[#d4c9b5] bg-[#f7f1e6]"
      }`}
    >
      <p className={`text-base font-semibold ${dark ? "text-[#f7f1e6]" : "text-[#241f18]"}`}>
        {LISTING_SELLER.name}
      </p>
      <p className={`text-sm ${dark ? "text-[#e8b84a]" : "text-[#6b6154]"}`}>{LISTING_SELLER.role}</p>
      <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-[#f7f1e6]/90" : "text-[#5a5146]"}`}>
        A telefonszám csak kattintás után jelenik meg (botvédelem). Írhatsz közvetlen emailt, vagy használd az űrlapot.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {revealed ? <PhoneAction place="contact_card" /> : <RevealButton place="contact_card" />}
        <EmailButton place="contact_card" dark={dark} />
        <a
          href="#kapcsolat"
          onClick={() => track("listing_cta_click", "contact_card_form")}
          className={
            dark
              ? "inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-[#e8b84a] underline-offset-2 hover:underline"
              : "inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-[#0f2e1f] underline-offset-2 hover:underline"
          }
        >
          Űrlap
        </a>
      </div>
    </div>
  );
}

export function trackListingCta(place: string) {
  track("listing_cta_click", place);
}
