import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Éles index-gate pótló jelzőfájl — deploy írja, gitignore-olt.
 * Több path: PM2 cwd eltérhet.
 */
const CANDIDATES = [
  join(process.cwd(), ".bim-allow-public-indexing"),
  "/var/www/site-1/.bim-allow-public-indexing",
];

export function bimIndexingFlagFileAllows(): boolean {
  try {
    for (const path of CANDIDATES) {
      if (!existsSync(path)) continue;
      if (readFileSync(path, "utf8").trim() === "1") return true;
    }
    return false;
  } catch {
    return false;
  }
}
