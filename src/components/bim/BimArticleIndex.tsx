"use client";

import { useMemo, useState } from "react";

import { BimLink } from "@/components/bim/BimChrome";
import {
  BIM_ARTICLE_FILTERS,
  normalizeBimArticleCategory,
  type BimArticleFilter,
} from "@/lib/bim-article-categories";
import { formatHuDate, type BimArticleListItem } from "@/lib/bim-article-format";

export function BimArticleIndex({ articles }: { articles: BimArticleListItem[] }) {
  const [filter, setFilter] = useState<BimArticleFilter | "all">("all");

  const visible = useMemo(() => {
    if (filter === "all") return articles;
    return articles.filter((a) => normalizeBimArticleCategory(a.category) === filter);
  }, [articles, filter]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Kategóriaszűrő">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={
            filter === "all"
              ? "rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground"
              : "rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground"
          }
        >
          Összes
        </button>
        {BIM_ARTICLE_FILTERS.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={
              filter === cat
                ? "rounded-md bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground"
                : "rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground"
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">Ebben a kategóriában még nincs megjelent cikk.</p>
      ) : (
        <ul className="flex flex-col divide-y">
          {visible.map((article) => (
            <li key={article.slug} className="py-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                {normalizeBimArticleCategory(article.category)}
              </p>
              <h2 className="mt-2 text-xl font-bold leading-snug md:text-2xl">
                <BimLink href={`/cikkek/${article.slug}`} className="hover:text-brand">
                  {article.title}
                </BimLink>
              </h2>
              <p className="mt-3 text-muted-foreground">{article.description}</p>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <time
                  dateTime={
                    article.time === "00:00" ? article.date : `${article.date}T${article.time}`
                  }
                >
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
    </div>
  );
}
