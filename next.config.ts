import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const bimHost = { type: "host" as const, value: "(bim\\.vrgo\\.hu|bim\\.localhost)" };

const nextConfig: NextConfig = {
  // Parent-folder package-lock.json otherwise hijacks the workspace root
  // and breaks CSS / Tailwind resolution in dev.
  outputFileTracingRoot: projectRoot,
  // VPS CPU lacks x86-64-v2; sharp prebuilds fail. Skip Next image optimizer.
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SITE_ID: "site-1",
  },
  async redirects() {
    return [
      {
        source: "/szolgaltatasok/allami-bim-megfeleles",
        destination: "/megoldasok/allami-beruhazasok-es-bim-eloirasok",
        statusCode: 301,
      },
      {
        source: "/bim/szolgaltatasok/allami-bim-megfeleles",
        destination: "/bim/megoldasok/allami-beruhazasok-es-bim-eloirasok",
        statusCode: 301,
      },
      {
        source: "/szolgaltatasok/tervezoknek-es-kivitelezoknek",
        has: [bimHost],
        destination: "/tervezoknek",
        statusCode: 301,
      },
      {
        source: "/bim/szolgaltatasok/tervezoknek-es-kivitelezoknek",
        destination: "/bim/tervezoknek",
        statusCode: 301,
      },
      {
        source: "/szolgaltatasok/ipari-letesitmenyek",
        has: [bimHost],
        destination: "/ipari-felmeres",
        statusCode: 301,
      },
      {
        source: "/bim/szolgaltatasok/ipari-letesitmenyek",
        destination: "/bim/ipari-felmeres",
        statusCode: 301,
      },
      {
        source: "/ipari-letesitmenyek",
        has: [bimHost],
        destination: "/ipari-felmeres",
        statusCode: 301,
      },
      {
        source: "/bim/ipari-letesitmenyek",
        destination: "/bim/ipari-felmeres",
        statusCode: 301,
      },
      {
        source: "/szolgaltatasok/lakas-es-hazfelmeres",
        has: [bimHost],
        destination: "/lakossagi-felmeres",
        statusCode: 301,
      },
      {
        source: "/bim/szolgaltatasok/lakas-es-hazfelmeres",
        destination: "/bim/lakossagi-felmeres",
        statusCode: 301,
      },
      {
        source: "/lakossagnak",
        has: [bimHost],
        destination: "/lakossagi-felmeres",
        statusCode: 301,
      },
      {
        source: "/bim/lakossagnak",
        destination: "/bim/lakossagi-felmeres",
        statusCode: 301,
      },
      {
        source: "/arak-es-folyamat",
        has: [bimHost],
        destination: "/munkafolyamat",
        statusCode: 301,
      },
      {
        source: "/bim/arak-es-folyamat",
        destination: "/bim/munkafolyamat",
        statusCode: 301,
      },
      {
        source: "/ajanlatkeres",
        has: [bimHost],
        destination: "/kapcsolat",
        statusCode: 301,
      },
      {
        source: "/bim/ajanlatkeres",
        destination: "/bim/kapcsolat",
        statusCode: 301,
      },
      {
        source: "/alvallalkozoi-egyuttmukodes",
        has: [bimHost],
        destination: "/scan-to-bim-kapacitas",
        statusCode: 301,
      },
      {
        source: "/bim/alvallalkozoi-egyuttmukodes",
        destination: "/bim/scan-to-bim-kapacitas",
        statusCode: 301,
      },
      {
        source: "/cikkek/matterport-bim-alapadat-pontossag",
        destination: "/cikkek/leica-3d-lezerszkenneles-bim-alapadat",
        permanent: true,
      },
      {
        source: "/bim/cikkek/matterport-bim-alapadat-pontossag",
        destination: "/bim/cikkek/leica-3d-lezerszkenneles-bim-alapadat",
        permanent: true,
      },
      {
        source: "/cikkek/leica-rtc360-blk360-bim-alapadat",
        destination: "/cikkek/leica-3d-lezerszkenneles-bim-alapadat",
        permanent: true,
      },
      {
        source: "/bim/cikkek/leica-rtc360-blk360-bim-alapadat",
        destination: "/bim/cikkek/leica-3d-lezerszkenneles-bim-alapadat",
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
