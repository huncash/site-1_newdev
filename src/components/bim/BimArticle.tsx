import { BimLink } from "@/components/bim/BimChrome";
import {
  formatHuDate,
  prefixInternalHrefs,
  splitAfterFirstParagraph,
  type BimArticle,
} from "@/lib/bim-articles";
import { BIM_ORIGIN } from "@/lib/bim-site";
import { cn } from "@/lib/utils";

const bodyClass = cn(
  "text-sm leading-relaxed text-muted-foreground sm:text-base",
  "[&_p]:my-4 [&_p]:leading-relaxed",
  "[&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground",
  "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5",
  "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5",
  "[&_a]:font-semibold [&_a]:text-brand [&_a]:underline",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-4 [&_blockquote]:text-sm [&_blockquote]:italic",
  "[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
  "[&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-foreground",
  "[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:align-top"
);

export function bimArticleJsonLd(article: BimArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "hu",
    keywords: article.keywords.join(", "),
    image: `${BIM_ORIGIN}${article.image}`,
    author: {
      "@type": "Organization",
      name: article.author,
      url: "https://vrgo.hu",
    },
    publisher: {
      "@type": "Organization",
      name: "VRGO",
      url: BIM_ORIGIN,
    },
    mainEntityOfPage: `${BIM_ORIGIN}/cikkek/${article.slug}`,
  };
}

export function BimArticleUpcoming({
  title,
  date,
  time = "00:00",
}: {
  title: string;
  date: string;
  time?: string;
}) {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Cikk</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-section-dark-foreground sm:text-4xl">
            {title}
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <p>
          Ez a cikk <time dateTime={time === "00:00" ? date : `${date}T${time}`}>{formatHuDate(date, time)}</time>{"-kor jelenik meg. A szöveg addig nem olvasható."}
        </p>
        <p className="mt-6">
          <BimLink href="/cikkek" className="font-semibold text-brand underline">
            Vissza a cikkekhez
          </BimLink>
        </p>
      </div>
    </article>
  );
}

export function BimArticleView({
  article,
  prefix,
  preview,
}: {
  article: BimArticle;
  prefix: boolean;
  preview: boolean;
}) {
  const parts = splitAfterFirstParagraph(prefixInternalHrefs(article.contentHtml, prefix));
  const jsonLd = JSON.stringify(bimArticleJsonLd(article)).replace(/</g, "\\u003c");

  return (
    <article className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
            {article.category}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-section-dark-foreground sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base opacity-90">{article.description}</p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs opacity-80">
            <time dateTime={article.time === "00:00" ? article.date : `${article.date}T${article.time}`}>
              {formatHuDate(article.date, article.time)}
            </time>
            <span>{article.readingTime} perc</span>
            <span>{article.author}</span>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12">
        {preview ? (
          <p className="mb-8 rounded-md border border-border bg-muted px-4 py-3 text-sm text-foreground">
            Előnézet. A cikk{" "}
            <time dateTime={`${article.date}T${article.time}`}>{formatHuDate(article.date, article.time)}</time>{"-kor jelenik meg. Ez a nézet csak a helyi fejlesztői oldalon érhető el."}
          </p>
        ) : null}

        <div className={bodyClass} dangerouslySetInnerHTML={{ __html: parts.lead }} />

        <figure className="my-8">
          <img src={article.image} alt={article.imageAlt} className="w-full rounded-md" />
          <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {article.imageCaption} Forrás: {article.imageAuthor},{" "}
            <a
              href={article.imageSourceUrl}
              className="font-semibold text-brand underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Wikimedia Commons
            </a>
            {article.imageLicenseUrl ? (
              <>
                {", "}
                <a
                  href={article.imageLicenseUrl}
                  className="font-semibold text-brand underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {article.imageLicense}
                </a>
              </>
            ) : (
              <>, {article.imageLicense}</>
            )}
            .
          </figcaption>
        </figure>

        <div className={cn(bodyClass, "overflow-x-auto")} dangerouslySetInnerHTML={{ __html: parts.rest }} />

        <div className="mt-12 rounded-md border border-border bg-muted/40 p-6 text-center">
          <p className="text-sm font-medium text-foreground">
            Bejárható 3D felmérés kell a projekthez?
          </p>
          <BimLink
            href="/ajanlatkeres"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark"
          >
            Ajánlatot kérek
          </BimLink>
        </div>
      </div>
    </article>
  );
}
