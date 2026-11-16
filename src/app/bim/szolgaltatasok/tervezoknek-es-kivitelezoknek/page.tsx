import { permanentRedirect } from "next/navigation";

/** Régi szolgáltatás-URL — 301 a Megoldások tervezői hubra. */
export default function LegacyDesignersServiceRedirect() {
  permanentRedirect("/tervezoknek");
}
