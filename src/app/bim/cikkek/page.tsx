import type { Metadata } from "next";

import { BimArticleIndex } from "@/components/bim/BimArticleIndex";
import { BimLink } from "@/components/bim/BimChrome";
import { BimScopeNote } from "@/components/bim/BimScopeNote";
import {
  formatHuDate,
  isBimArticlePublished,
  listBimArticles,
} from "@/lib/bim-articles";
import { BIM_PUBLISH_RHYTHM_NOTE } from "@/lib/bim-publish-rhythm";
import { bimMetadata, MAIN_ORIGIN } from "@/lib/bim-site";

export const dynamic = "force-dynamic";

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
          <p className="mt-3 text-sm opacity-80">{BIM_PUBLISH_RHYTHM_NOTE}</p>
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

        <div className="mt-10 text-sm text-muted-foreground sm:text-base">
          <BimScopeNote />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Állami beruházások:{" "}
          <BimLink
            href="/megoldasok/allami-beruhazasok-es-bim-eloirasok"
            className="font-semibold text-brand"
          >
            Állami beruházások és BIM-előírások
          </BimLink>
          .
        </p>
        <p className="mt-8 text-sm text-muted-foreground">
          A vrgo.hu blog 2016–2017-es anyagai archívak:{" "}
          <a
            href={`${MAIN_ORIGIN}/blog`}
            className="font-semibold text-brand underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            vrgo.hu/blog
          </a>
        </p>
      </div>
    </article>
  );
}
