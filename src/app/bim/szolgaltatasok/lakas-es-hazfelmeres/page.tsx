import { permanentRedirect } from "next/navigation";

/** Régi szolgáltatás-URL — 301 a lakossági Megoldások hubra. */
export default function LegacyResidentialServiceRedirect() {
  permanentRedirect("/lakossagi-felmeres");
}
