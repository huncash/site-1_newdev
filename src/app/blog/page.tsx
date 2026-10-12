import type { Metadata } from "next";

import { BlogIndex } from "@/components/BlogIndex";
import { listPublishedBimArticles } from "@/lib/bim-articles";
import { getAllPostMeta } from "@/lib/blog";
import { BIM_ORIGIN } from "@/lib/bim-site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogIndexPage() {
  const bimPosts = listPublishedBimArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    date: article.date,
    author: article.author,
    category: article.category,
    readingTime: article.readingTime,
    aiDisclosure: "none" as const,
    editorialReview: true,
    href: `${BIM_ORIGIN}/cikkek/${article.slug}`,
  }));
  const posts = [...bimPosts, ...getAllPostMeta()].sort((a, b) => b.date.localeCompare(a.date));
  return <BlogIndex posts={posts} />;
}
