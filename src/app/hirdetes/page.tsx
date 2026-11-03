import type { Metadata } from "next";

import { PropertyLanding } from "@/components/listing/PropertyLanding";

export const metadata: Metadata = {
  title: { absolute: "Erdei faház Börzsönyligeten — 1046 m² privát telek" },
  description:
    "Kismaros-Börzsönyliget, zsákutca vége. 1046 m² Lke-4 telek azonnal használható faházzal. Fix ár: 32,2 M Ft (2027-es birtokbaadás) vagy 33 M Ft (2026 végéig). Jutalék nincs.",
  robots: { index: true, follow: true },
};

export default function ListingPage() {
  return <PropertyLanding />;
}
