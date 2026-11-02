import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";

import { PropertyLanding } from "@/components/listing/PropertyLanding";

const display = Fraunces({ subsets: ["latin", "latin-ext"], weight: ["500", "600"], variable: "--font-listing-display" });
const sans = Outfit({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-listing-sans" });

export const metadata: Metadata = {
  title: { absolute: "Építési telek Börzsönyligeten, Lke-4 övezet" },
  description:
    "1046 m² hivatalos telek Kismaros-Börzsönyligeten, Lke-4 lakóövezetben. Natura 2000-es tölgyes: nyáron 4 °C-kal hűvösebb, mégis a Börzsönyliget naposabb oldala. Két szerződéses változat, vételár nélkül.",
  robots: { index: true, follow: true },
};

export default function ListingPage() {
  return (
    <div className={`${display.variable} ${sans.variable} font-[family-name:var(--font-listing-sans)] [&_h1]:font-[family-name:var(--font-listing-display)] [&_h2]:font-[family-name:var(--font-listing-display)] [&_h3]:font-[family-name:var(--font-listing-display)]`}>
      <PropertyLanding />
    </div>
  );
}
