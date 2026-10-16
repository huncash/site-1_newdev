"use client";

import { useState } from "react";

export function MatterportEmbed({
  src,
  title,
  openHref,
}: {
  src: string;
  title: string;
  openHref: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {open ? (
        <div
          className="relative w-full overflow-hidden rounded-md border border-border bg-black"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            title={title}
            src={src}
            allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; vr"
            allowFullScreen
            className="absolute left-0 top-0 h-full w-full border-0"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-48 w-full items-center justify-center rounded-md border border-border bg-secondary px-4 text-sm font-semibold text-foreground"
        >
          Bejárható modell betöltése
        </button>
      )}
      <p className="mt-3 text-sm">
        <a
          href={openHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand underline underline-offset-2"
        >
          Megnyitás új lapon →
        </a>
      </p>
    </div>
  );
}
