import { headers } from "next/headers";
import { redirect } from "next/navigation";

/** Legacy URL — a kapcsolat/űrlap oldalra vezet. */
export default async function BimQuoteRedirectPage() {
  const prefix = (await headers()).get("x-bim-prefix") === "1";
  redirect(prefix ? "/bim/kapcsolat" : "/kapcsolat");
}
