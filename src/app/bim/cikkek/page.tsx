import { bimMetadata, MAIN_ORIGIN } from "@/lib/bim-site";

export const metadata = bimMetadata(
  "/cikkek",
  "Cikkek | VRGO BIM",
  "A bim.vrgo.hu cikkei még nincsenek közzétéve. A vrgo.hu 2016–2017-es blogja archív."
);

export default function ArticlesPage() {
  return (
    <article className="bg-background">
      <section className="bg-section-dark py-14 text-section-dark-foreground">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold text-section-dark-foreground sm:text-4xl">Cikkek</h1>
        </div>
      </section>
      <div className="mx-auto max-w-4xl px-4 py-12 text-sm text-muted-foreground sm:text-base">
        <p>
          A rendelet szerinti cikkek még nincsenek közzétéve. Nem teszünk ki címet vagy
          állítást, amíg a szöveg el nem készül.
        </p>
        <p className="mt-4">
          A vrgo.hu blog 2016–2017-es anyagai archívak:{" "}
          <a href={`${MAIN_ORIGIN}/blog`} className="font-semibold text-brand underline">
            vrgo.hu/blog
          </a>
        </p>
      </div>
    </article>
  );
}
