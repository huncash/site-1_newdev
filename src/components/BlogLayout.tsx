"use client";

import { AiContentLabel } from "@/components/legal/AiContentLabel";
import type { Post } from "@/lib/blog";
import { cn } from "@/lib/utils";

export interface BlogLayoutProps {
  post: Post;
  className?: string;
}

function resolveDisclosure(post: Post) {
  const kind = post.aiDisclosure ?? "none";
  // Art. 50(4): human review + editorial responsibility → no mandatory text label
  if (kind === "generated" && post.editorialReview) {
    return "assisted" as const;
  }
  if (kind === "none" || kind === "assisted") {
    return kind === "assisted" ? ("assisted" as const) : null;
  }
  return kind;
}

export function BlogLayout({ post, className }: BlogLayoutProps) {
  const disclosure = resolveDisclosure(post);

  return (
    <article
      className={cn("mx-auto max-w-2xl px-4 py-12", className)}
      data-ai-disclosure={disclosure ?? "none"}
    >
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mb-3 text-lg text-muted-foreground">{post.description}</p>
        ) : null}
        <div className="flex gap-4 text-xs text-muted-foreground">
          {post.date ? <time dateTime={post.date}>{post.date}</time> : null}
          {post.author ? <span>{post.author}</span> : null}
        </div>
      </header>

      {disclosure === "generated" || disclosure === "modified" ? (
        <AiContentLabel kind={disclosure} />
      ) : null}
      {disclosure === "assisted" ? (
        <AiContentLabel kind="assisted" className="opacity-90" />
      ) : null}

      <div
        className={cn(
          "prose prose-sm max-w-none",
          "prose-headings:font-semibold prose-headings:tracking-tight",
          "prose-a:text-brand prose-a:underline",
          "prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:text-sm",
          "prose-img:rounded-md prose-img:shadow",
          "prose-table:text-sm"
        )}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
