import { permanentRedirect } from "next/navigation";

import { BIM_INDUSTRIAL_HREF } from "@/config/menu";

/** Régi útvonal — 301 a Megoldások ipari hubra. */
export default function LegacyIndustrialPathRedirect() {
  permanentRedirect(BIM_INDUSTRIAL_HREF);
}
