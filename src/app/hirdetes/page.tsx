import type { Metadata } from "next";

import { PropertyLanding } from "@/components/listing/PropertyLanding";

export const metadata: Metadata = {
  title: { absolute: "Építési telek Börzsönyligeten, Lke-4 övezet" },
  description:
    "1046 m² hivatalos telek Kismaros-Börzsönyligeten, Lke-4 lakóövezetben. Natura 2000-es tölgyes: nyáron 4 °C-kal hűvösebb, mégis a Börzsönyliget naposabb oldala. Két szerződéses változat, vételár nélkül.",
  robots: { index: true, follow: true },
};

export default function ListingPage() {
  return <PropertyLanding />;
}
