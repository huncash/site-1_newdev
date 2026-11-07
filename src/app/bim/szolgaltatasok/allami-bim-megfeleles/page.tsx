import { permanentRedirect } from "next/navigation";

import { BIM_STATE_HUB_HREF } from "@/config/menu";

/** Régi hub URL — 301 a Megoldások alá. */
export default function LegacyStateHubRedirect() {
  permanentRedirect(BIM_STATE_HUB_HREF);
}
