"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { isMenuGroup, MENU_ITEMS } from "@/config/menu";
import { SITE_CONFIG } from "@/config/site-config";
import { cn } from "@/lib/utils";

function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: readonly { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointer(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-brand-foreground/95 transition hover:underline hover:underline-offset-4 xl:text-xs"
      >
        {label}
        <svg
          viewBox="0 0 20 20"
          className={cn("h-3.5 w-3.5 transition", open && "rotate-180")}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.25 7.5L10 12.25 14.75 7.5" />
        </svg>
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute left-0 top-full z-50 min-w-[12rem] pt-1"
        >
          <ul className="rounded-md border border-white/15 bg-brand py-1 shadow-lg">
            {items.map((child) => (
              <li key={child.href} role="none">
                <Link
                  role="menuitem"
                  href={child.href}
                  className="block px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-brand-foreground/95 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function Navbar({ logoHref = "/", className }: { logoHref?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [mobileGroupOpen, setMobileGroupOpen] = useState<string | null>(null);

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
          {MENU_ITEMS.map((item) =>
            isMenuGroup(item) ? (
              <DesktopDropdown key={item.label} label={item.label} items={item.children} />
            ) : (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-brand-foreground/95 transition hover:underline hover:underline-offset-4 xl:text-xs"
              >
                {item.label}
              </Link>
            )
          )}
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
            {MENU_ITEMS.map((item) => {
              if (isMenuGroup(item)) {
                const expanded = mobileGroupOpen === item.label;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileGroupOpen((cur) => (cur === item.label ? null : item.label))
                      }
                      className="flex w-full items-center justify-between py-3 text-sm font-semibold uppercase tracking-wider"
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 20 20"
                        className={cn("h-4 w-4 transition", expanded && "rotate-180")}
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M5.25 7.5L10 12.25 14.75 7.5" />
                      </svg>
                    </button>
                    {expanded ? (
                      <ul className="mb-2 border-l border-white/25 pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="block py-2.5 text-sm font-medium uppercase tracking-wider opacity-95"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              }
              return (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm font-semibold uppercase tracking-wider"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
