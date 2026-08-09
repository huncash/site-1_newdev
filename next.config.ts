import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Parent-folder package-lock.json otherwise hijacks the workspace root
  // and breaks CSS / Tailwind resolution in dev.
  outputFileTracingRoot: projectRoot,
  env: {
    NEXT_PUBLIC_SITE_ID: "site-1",
  },
};

export default nextConfig;
