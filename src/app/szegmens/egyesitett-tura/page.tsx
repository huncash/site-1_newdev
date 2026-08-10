import { redirect } from "next/navigation";

/** Korábbi szegmens-URL → a valódi egyesített túra oldal. */
export default function LegacyEgyesitettSegmentRedirect() {
  redirect("/egyesitett-tura");
}
