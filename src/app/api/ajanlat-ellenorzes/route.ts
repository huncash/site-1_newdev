import { createSumChallenge } from "@/lib/sum-check";

export const dynamic = "force-dynamic";

export function GET(): Response {
  return Response.json(createSumChallenge(), {
    headers: { "Cache-Control": "no-store" },
  });
}
