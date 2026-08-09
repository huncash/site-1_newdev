"use client";

import Image from "next/image";
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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a
          href={logoHref}
          className="flex items-center"
          aria-label={`${SITE_CONFIG.name} – főoldal`}
        >
          <Image
            src="/vrgo-logo.jpg"
            alt="VRGO"
            width={160}
            height={40}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Főmenü">
          {MENU_ITEMS.map((item) => (
            <a
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-wider text-brand-foreground/95 transition hover:underline hover:underline-offset-8"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Menü"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center lg:hidden"
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
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-semibold uppercase tracking-wider"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
