"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { MENU_ITEMS } from "@/config/menu";
import { SITE_CONFIG } from "@/config/site-config";
import { cn } from "@/lib/utils";

export function Navbar({ logoHref = "/", className }: { logoHref?: string; className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-brand text-brand-foreground shadow-sm",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16">
        <Link
          href={logoHref}
          className="flex shrink-0 items-center"
          aria-label={`${SITE_CONFIG.name} – főoldal`}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/vrgo-logo.jpg"
            alt="VRGO"
            width={160}
            height={40}
            priority
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <nav
          className="hidden items-center gap-x-3 gap-y-1 lg:flex xl:gap-x-4"
          aria-label="Főmenü"
        >
          {MENU_ITEMS.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-brand-foreground/95 transition hover:underline hover:underline-offset-4 xl:text-xs"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Menü"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open ? (
        <nav className="border-t border-white/20 bg-brand lg:hidden" aria-label="Mobil menü">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {MENU_ITEMS.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-semibold uppercase tracking-wider"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
