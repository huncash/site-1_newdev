import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { ASZF_BLOCKS, ASZF_SOURCE } from "@/content/aszf-data";

export const metadata: Metadata = {
  title: `${ASZF_SOURCE.title} | VRGO`,
  description:
    "Az ADP-TOP Kft. (VRGO) Általános Szerződési Feltételei — a www.vrgo.hu szolgáltatásaira vonatkozó szerződési feltételek.",
};

export default function AszfPage() {
  const nodes: ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    nodes.push(
      <ul key={key} className="mb-6 list-disc space-y-2 pl-5 text-muted-foreground">
        {listBuffer.map((item, idx) => (
          <li key={`${key}-${idx}`}>{item}</li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  ASZF_BLOCKS.forEach((block, index) => {
    if (block.kind === "li") {
      listBuffer.push(block.text);
      return;
    }
    flushList(`list-before-${index}`);

    if (block.kind === "h1") {
      nodes.push(
        <h1 key={index} className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
          {block.text}
        </h1>,
      );
      return;
    }

    if (block.kind === "h2") {
      nodes.push(
        <h2 key={index} className="mb-3 mt-10 text-lg font-semibold text-foreground">
          {block.text}
        </h2>,
      );
      return;
    }

    nodes.push(
      <p key={index} className="mb-4 text-muted-foreground">
        {block.text}
      </p>,
    );
  });
  flushList("list-end");

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed">
      <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
        Hatályos: {ASZF_SOURCE.effectiveDate}-től · Forrás: eredeti VRGO ÁSZF
      </p>
      <p className="mb-8 text-sm text-muted-foreground">
        Letölthető PDF:{" "}
        <Link href={ASZF_SOURCE.pdfHref} className="underline underline-offset-2" target="_blank">
          VRGO Általános Szerződési Feltételek
        </Link>
      </p>
      {nodes}
    </article>
  );
}
