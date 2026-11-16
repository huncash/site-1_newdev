import type { Metadata } from "next";
import { headers } from "next/headers";

import { BimChrome } from "@/components/bim/BimChrome";
import { bimLayoutMetadata } from "@/lib/bim-site";

export const metadata: Metadata = bimLayoutMetadata();

export default async function BimLayout({ children }: { children: React.ReactNode }) {
  const prefix = (await headers()).get("x-bim-prefix") === "1";
  return <BimChrome prefix={prefix}>{children}</BimChrome>;
}
