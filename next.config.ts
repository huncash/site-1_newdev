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
  async redirects() {
    return [
      {
        source: "/cikkek/matterport-bim-alapadat-pontossag",
        destination: "/cikkek/leica-rtc360-blk360-bim-alapadat",
        permanent: true,
      },
      {
        source: "/bim/cikkek/matterport-bim-alapadat-pontossag",
        destination: "/bim/cikkek/leica-rtc360-blk360-bim-alapadat",
        permanent: true,
      },
      {
        source: "/cikkek/esettanulmany-pannon-egyetem-zalaegerszeg",
        destination: "/referenciak",
        permanent: true,
      },
      {
        source: "/bim/cikkek/esettanulmany-pannon-egyetem-zalaegerszeg",
        destination: "/bim/referenciak",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
