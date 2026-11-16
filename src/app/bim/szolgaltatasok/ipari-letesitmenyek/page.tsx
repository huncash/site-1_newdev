import { permanentRedirect } from "next/navigation";

import { BIM_INDUSTRIAL_HREF } from "@/config/menu";

/** Régi szolgáltatás-URL — 301 a Megoldások ipari hubra. */
export default function LegacyIndustrialServiceRedirect() {
  permanentRedirect(BIM_INDUSTRIAL_HREF);
}
