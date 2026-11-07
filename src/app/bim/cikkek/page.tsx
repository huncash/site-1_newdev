import type { Metadata } from "next";

import { BimArticleIndex } from "@/components/bim/BimArticleIndex";
import { BimLink } from "@/components/bim/BimChrome";
import {
  formatHuDate,
  isBimArticlePublished,
  listBimArticles,
} from "@/lib/bim-articles";
import { bimMetadata } from "@/lib/bim-site";

export const revalidate = 900;

export async function generateMetadata(): Promise<Metadata> {
  const articles = listBimArticles();
  const published = articles.filter((article) => isBimArticlePublished(article));
  if (published.length === 0) {
    const start = articles[0]
      ? formatHuDate(articles[0].date, articles[0].time)
      : "2026. október 12.";
    return bimMetadata(
      "/cikkek",
      "Cikkek | VRGO BIM",
      `Georeferált felmérés, technológia és szabályozás — a cikksorozat ${start} napon indul.`
    );
  }
  return bimMetadata(
    "/cikkek",
    "Cikkek — lézerszkennelés, BIM, rendelet | VRGO BIM",
    "Lakossági felmérés, tervezői gyakorlat, technológia, ipar és állami BIM-megfelelés. Tájékoztató cikkek."
  );
}

export default function ArticlesPage() {
  const articles = listBimArticles();
  const published = articles.filter((article) => isBimArticlePublished(article)).reverse();
  const upcoming = articles.find((article) => !isBimArticlePublished(article));

  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">Cikkek</h1>
          <p className="mt-4 opacity-90">
            Felmérés, formátumok, gyakorlat — és ha érintett: az állami BIM-szabályozás.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12">
        {published.length === 0 ? (
          <p className="text-sm text-muted-foreground sm:text-base">
            A cikksorozat{" "}
            <time dateTime={articles[0]?.date ?? "2026-10-12"}>
              {articles[0] ? formatHuDate(articles[0].date, articles[0].time) : "2026. október 12."}
            </time>{" "}
            napon indul.
          </p>
        ) : (
          <BimArticleIndex articles={published} />
        )}

        {published.length > 0 && upcoming ? (
          <p className="mt-8 text-sm text-muted-foreground">
            A következő cikk{" "}
            <time dateTime={`${upcoming.date}T${upcoming.time}`}>
              {formatHuDate(upcoming.date, upcoming.time)}
            </time>
            -kor jelenik meg.
          </p>
        ) : null}

        <p className="mt-10 text-sm text-muted-foreground">
          Állami beruházások:{" "}
          <BimLink
            href="/megoldasok/allami-beruhazasok-es-bim-eloirasok"
            className="font-semibold text-brand"
          >
            Állami beruházások és BIM-előírások
          </BimLink>
          .
        </p>
      </div>
    </article>
  );
}
