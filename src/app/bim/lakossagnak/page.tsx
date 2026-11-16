import { permanentRedirect } from "next/navigation";

/** Legacy URL — 301 a lakossági Megoldások hubra. */
export default function LegacyResidentialRedirect() {
  permanentRedirect("/lakossagi-felmeres");
}
