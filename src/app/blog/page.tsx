import type { Metadata } from "next";

import { BlogIndex } from "@/components/BlogIndex";
import { getAllPostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — archív cikkek | VRGO",
  description:
    "Archív cikkek a virtuális túrákról és a 360°-os technológiáról (2016–2017).",
  alternates: { canonical: "https://vrgo.hu/blog" },
};

/** Nyilvános címke: archív WP cikkek — ne mutassuk a News / WP author mezőket. */
function publicArchiveMeta(posts: ReturnType<typeof getAllPostMeta>) {
  return posts.map((post) => ({
    ...post,
    category: "Archív (2016–2017)",
    author: undefined,
  }));
}

export default function BlogIndexPage() {
  return (
    <BlogIndex
      posts={publicArchiveMeta(getAllPostMeta())}
      title="Blog"
      subtitle="Archív cikkek a virtuális túrákról és a 360°-os technológiáról (2016–2017)."
    />
  );
}
