import type { Metadata } from "next";

import { BimLink } from "@/components/bim/BimChrome";
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
  const published = articles.filter((article) => isBimArticlePublished(article.date));
  if (published.length === 0) {
    const start = articles[0] ? formatHuDate(articles[0].date, articles[0].time) : "2026. október 12.";
    return bimMetadata(
      "/cikkek",
      "Cikkek | VRGO BIM",
      `A 31/2024. ÉKM rendeletről szóló cikksorozat ${start} napon indul a bim.vrgo.hu oldalon.`
    );
  }
  return bimMetadata(
    "/cikkek",
    "Cikkek a 31/2024. ÉKM rendeletről | VRGO BIM",
    "Határidők, EIR, átadandó adatállomány és üzemeltetési mentés a 31/2024. ÉKM rendelet szerint. Tájékoztató cikkek, nem jogi tanácsadás."
  );
}

export default function ArticlesPage() {
  const articles = listBimArticles();
  const published = articles.filter((article) => isBimArticlePublished(article.date));
  const upcoming = articles.find((article) => !isBimArticlePublished(article));

  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">Cikkek</h1>
          <p className="mt-4 opacity-90">
            A 31/2024. ÉKM rendeletről: határidők, EIR és az átadandó adatállomány.
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
            napon indul. A megjelenés napjáig a cikkek szövege nem olvasható.
          </p>
        ) : (
          <ul className="flex flex-col divide-y">
            {published.map((article) => (
              <li key={article.slug} className="py-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                  {article.category}
                </p>
                <h2 className="mt-2 text-xl font-bold leading-snug md:text-2xl">
                  <BimLink href={`/cikkek/${article.slug}`} className="hover:text-brand">
                    {article.title}
                  </BimLink>
                </h2>
                <p className="mt-3 text-muted-foreground">{article.description}</p>
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <time dateTime={article.time === "00:00" ? article.date : `${article.date}T${article.time}`}>
                    {formatHuDate(article.date, article.time)}
                  </time>
                  <span>{article.readingTime} perc</span>
                  <BimLink
                    href={`/cikkek/${article.slug}`}
                    className="font-semibold uppercase tracking-wider text-brand hover:underline"
                  >
                    Olvasom →
                  </BimLink>
                </p>
              </li>
            ))}
          </ul>
        )}

        {published.length > 0 && upcoming ? (
          <p className="mt-8 text-sm text-muted-foreground">
            A következő cikk{" "}
            <time dateTime={`${upcoming.date}T${upcoming.time}`}>{formatHuDate(upcoming.date, upcoming.time)}</time>{"-kor jelenik meg."}
          </p>
        ) : null}

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
