import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Outfit } from "next/font/google";

import { VariantInterest } from "@/components/listing/VariantInterest";
import type { ListingVariant } from "@/lib/listing";

const display = Fraunces({ subsets: ["latin", "latin-ext"], weight: ["500", "600"], variable: "--font-listing-display" });
const sans = Outfit({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-listing-sans" });

const VARIANTS: ListingVariant[] = ["a", "b"];

export function generateStaticParams() {
  return VARIANTS.map((valtozat) => ({ valtozat }));
}

export function generateMetadata({ params }: { params: Promise<{ valtozat: string }> }): Promise<Metadata> {
  return params.then(({ valtozat }) => {
    const code = valtozat.toLowerCase();
    if (code !== "a" && code !== "b") {
      return { title: { absolute: "Érdeklődés" }, robots: { index: false, follow: false } };
    }
    return {
      title: { absolute: `Érdeklődés — ${code.toUpperCase()} változat` },
      description: "Ajánlat, árösszehasonlítás és kapcsolatfelvétel a kiválasztott adásvételi változathoz.",
      robots: { index: false, follow: false },
    };
  });
}

export default async function VariantInterestPage({ params }: { params: Promise<{ valtozat: string }> }) {
  const { valtozat } = await params;
  const code = valtozat.toLowerCase();
  if (code !== "a" && code !== "b") notFound();

  return (
    <div className={`${display.variable} ${sans.variable} font-[family-name:var(--font-listing-sans)] [&_h1]:font-[family-name:var(--font-listing-display)] [&_h2]:font-[family-name:var(--font-listing-display)] [&_h3]:font-[family-name:var(--font-listing-display)]`}>
      <VariantInterest variant={code} />
    </div>
  );
}
