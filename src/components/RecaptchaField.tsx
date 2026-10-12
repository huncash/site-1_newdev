"use client";

import { useEffect, useRef, useState } from "react";

type Grecaptcha = {
  ready: (callback: () => void) => void;
  render: (element: HTMLElement, options: Record<string, unknown>) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadRecaptcha(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit&hl=hu";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("recaptcha"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export function RecaptchaField({
  onToken,
  resetKey = 0,
}: {
  onToken: (token: string) => void;
  resetKey?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const onTokenRef = useRef(onToken);
  const [failed, setFailed] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";

  onTokenRef.current = onToken;

  useEffect(() => {
    if (!siteKey || !hostRef.current) return;
    let cancelled = false;
    loadRecaptcha()
      .then(() => {
        if (cancelled || !hostRef.current || !window.grecaptcha) return;
        window.grecaptcha.ready(() => {
          if (cancelled || !hostRef.current || widgetId.current != null || !window.grecaptcha) return;
          widgetId.current = window.grecaptcha.render(hostRef.current, {
            sitekey: siteKey,
            callback: (token: string) => onTokenRef.current(token),
            "expired-callback": () => onTokenRef.current(""),
            "error-callback": () => onTokenRef.current(""),
          });
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  useEffect(() => {
    if (resetKey === 0) return;
    onTokenRef.current("");
    if (widgetId.current != null && window.grecaptcha) {
      window.grecaptcha.reset(widgetId.current);
    }
  }, [resetKey]);

  if (!siteKey) {
    return (
      <p className="text-sm text-red-700">
        Az ellenőrzés jelenleg nem elérhető. Próbáld újra később.
      </p>
    );
  }

  if (failed) {
    return (
      <p className="text-sm text-red-700">
        Az ellenőrzést most nem sikerült betölteni. Frissítsd az oldalt.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div ref={hostRef} className="min-h-[78px]" />
    </div>
  );
}
