import {
  listPublishableEducationalClaims,
  listPublishableServiceClaims,
} from "@/lib/bim-instrument-claims";

function formatValue(value: number, unit: string): string {
  const formatted =
    value >= 1_000_000
      ? `${(value / 1_000_000).toLocaleString("hu-HU", { maximumFractionDigits: 2 })} millió`
      : value.toLocaleString("hu-HU");
  return `${formatted} ${unit}`;
}

/** Csak jóváhagyott szolgáltatási állítások — üres, ha nincs publikálható rekord. */
export function BimServiceInstrumentClaims() {
  const claims = listPublishableServiceClaims();
  if (claims.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Biztosítható műszeradatok</h2>
      <p className="text-sm text-muted-foreground">
        Az alábbi mutatók teljes, jóváhagyott rekordból származnak. A gyártói maximum nem
        egyenlő automatikusan a projektben átadott eredménnyel.
      </p>
      <ul className="space-y-4">
        {claims.map((claim) => (
          <li key={claim.id} className="rounded-md border border-border bg-card p-4 text-sm">
            <p className="font-semibold text-foreground">
              {claim.instrumentType} — {claim.configuration}
            </p>
            <p className="mt-2">
              {claim.metricName}: {formatValue(claim.value, claim.unit)}
            </p>
            <p className="mt-2 text-muted-foreground">{claim.measurementConditions}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Forrásellenőrzés: {claim.verifiedOn}.{" "}
              <a
                href={claim.manufacturerSourceUrl}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gyártói forrás
              </a>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Oktató gyártói mutatók — csak ownerApproved rekordokból.
 * Jelenleg üres; soha nem kerül a főoldali szolgáltatási bizonyítékok közé.
 */
export function BimEducationalInstrumentNotes() {
  const claims = listPublishableEducationalClaims();
  if (claims.length === 0) return null;

  return (
    <section className="space-y-4 rounded-md border border-dashed border-border p-4">
      <h2 className="text-xl font-semibold text-foreground">
        Gyártói ismertető (nem VRGO szolgáltatási bizonyíték)
      </h2>
      <p className="text-sm text-muted-foreground">
        Az alábbi számok gyártói adatlapokból származnak. Nem jelentik, hogy az adott eszköz
        a VRGO jelenlegi, biztosítható eszközparkjának része, és nem ígérnek projekt szintű
        teljesítményt.
      </p>
      <ul className="space-y-3 text-sm">
        {claims.map((claim) => (
          <li key={claim.id}>
            <span className="font-medium text-foreground">
              {claim.instrumentType} ({claim.configuration})
            </span>
            : {claim.metricName} — {formatValue(claim.value, claim.unit)}.{" "}
            {claim.measurementConditions}
          </li>
        ))}
      </ul>
    </section>
  );
}
