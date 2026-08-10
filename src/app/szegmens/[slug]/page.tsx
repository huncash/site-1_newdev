import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buildAjanlatHref } from "@/lib/conversion";
import { getSegmentBySlug, SEGMENTS } from "@/lib/segments";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SEGMENTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const segment = getSegmentBySlug(slug);
  if (!segment) return { title: "Szegmens — VRGO" };
  return {
    title: `${segment.title} — VRGO`,
    description: segment.summary,
  };
}

export default async function SegmentPage({ params }: Props) {
  const { slug } = await params;
  const segment = getSegmentBySlug(slug);
  if (!segment) notFound();

  const ctaHref = buildAjanlatHref({
    szegmens: segment.slug,
    forras: `szegmens-${segment.slug}`,
  });

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">
          Főoldal
        </Link>
        <span className="mx-2">/</span>
        <Link href="/#szegmensek" className="hover:underline">
          Szegmensek
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{segment.title}</span>
      </nav>

      <h1 className="text-3xl font-extrabold tracking-tight">{segment.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{segment.summary}</p>

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-foreground">
        {segment.paragraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>

      <ul className="mt-8 list-disc space-y-2 pl-5 text-sm">
        {segment.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground transition hover:bg-brand-dark"
        >
          {segment.ctaLabel}
        </a>
        <Link
          href="/#csomagok"
          className="text-sm font-medium text-brand underline-offset-4 hover:underline"
        >
          Csomagok megtekintése
        </Link>
      </div>
    </article>
  );
}
