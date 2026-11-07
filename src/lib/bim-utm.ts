/** Forrás + UTM összefűzése az ajánlatkéréshez. */

export function collectBimLeadSource(fallback = ""): string {
  if (typeof window === "undefined") return fallback;
  const params = new URLSearchParams(window.location.search);
  const forras = params.get("forras")?.trim() || fallback;
  const parts = [
    forras ? `forras=${forras}` : "",
    params.get("utm_source") ? `utm_source=${params.get("utm_source")}` : "",
    params.get("utm_medium") ? `utm_medium=${params.get("utm_medium")}` : "",
    params.get("utm_campaign") ? `utm_campaign=${params.get("utm_campaign")}` : "",
    params.get("utm_content") ? `utm_content=${params.get("utm_content")}` : "",
  ].filter(Boolean);
  return parts.join("|").slice(0, 240);
}
