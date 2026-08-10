import { redirect } from "next/navigation";

/** Régi /beta-merge URL → egyesített túra oldal (lovable / vrgo-main kompatibilitás). */
export default function BetaMergeRedirectPage() {
  redirect("/egyesitett-tura");
}
