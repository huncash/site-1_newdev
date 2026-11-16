import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Éles index-gate pótló jelzőfájl — deploy írja, gitignore-olt.
 * Elkerüli a Next build-time env-beégetést.
 */
const FLAG_PATH = join(process.cwd(), ".bim-allow-public-indexing");

export function bimIndexingFlagFileAllows(): boolean {
  try {
    if (!existsSync(FLAG_PATH)) return false;
    const raw = readFileSync(FLAG_PATH, "utf8").trim();
    return raw === "1";
  } catch {
    return false;
  }
}
