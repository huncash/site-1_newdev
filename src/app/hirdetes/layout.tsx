import type { Metadata } from "next";

import "./listing-fonts.css";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/hirdetes/favicon.ico", sizes: "any" },
      { url: "/hirdetes/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/hirdetes/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/hirdetes/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function ListingLayout({ children }: { children: React.ReactNode }) {
  return <div className="listing-root">{children}</div>;
}
