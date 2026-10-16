import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { BimArticleUpcoming, BimArticleView } from "@/components/bim/BimArticle";
import {
  formatHuDate,
  getBimArticle,
  getBimArticleMeta,
  isBimArticlePublished,
} from "@/lib/bim-articles";
import { BIM_ORIGIN } from "@/lib/bim-site";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ elonezet?: string }>;
}

function isDevPreview(flag: string | undefined): boolean {
  return process.env.NODE_ENV === "development" && flag === "1";
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBimArticleMeta(slug);
  if (!article) return {};

  const canonical = `${BIM_ORIGIN}/cikkek/${article.slug}`;
  const preview = isDevPreview((await searchParams).elonezet);
  const published = isBimArticlePublished(article);

  if (!published || preview) {
    return {
      title: { absolute: `${article.seoTitle} | VRGO BIM` },
      description: `Ez a cikk ${formatHuDate(article.date, article.time)}-kor jelenik meg a bim.vrgo.hu oldalon.`,
      robots: { index: false, follow: false },
    };
  }

  return {
    title: { absolute: `${article.seoTitle} | VRGO BIM` },
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: canonical,
      title: article.title,
      description: article.description,
      locale: "hu_HU",
      siteName: "VRGO BIM",
      publishedTime: article.date,
      images: [{ url: `${BIM_ORIGIN}${article.image}`, alt: article.imageAlt }],
    },
  };
}

export default async function BimArticlePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const preview = isDevPreview((await searchParams).elonezet);
  const meta = getBimArticleMeta(slug);
  if (!meta) notFound();

  const published = isBimArticlePublished(meta);
  if (!published && !preview) {
    return <BimArticleUpcoming title={meta.title} date={meta.date} time={meta.time} />;
  }

  const article = await getBimArticle(slug);
  if (!article) notFound();
  const prefix = (await headers()).get("x-bim-prefix") === "1";
  return <BimArticleView article={article} prefix={prefix} preview={preview && !published} />;
}
