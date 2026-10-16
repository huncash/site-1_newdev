import { createHmac, randomInt, timingSafeEqual } from "crypto";

const ONES = [
  "nulla",
  "egy",
  "kettő",
  "három",
  "négy",
  "öt",
  "hat",
  "hét",
  "nyolc",
  "kilenc",
  "tíz",
  "tizenegy",
  "tizenkettő",
  "tizenhárom",
  "tizennégy",
  "tizenöt",
  "tizenhat",
  "tizenhét",
  "tizennyolc",
  "tizenkilenc",
] as const;

const TENS = ["", "", "húsz", "harminc", "negyven", "ötven", "hatvan", "hetven", "nyolcvan", "kilencven"] as const;

const TTL_MS = 15 * 60 * 1000;

function numberWord(value: number): string {
  if (value < 20) return ONES[value];
  const ten = Math.floor(value / 10);
  const one = value % 10;
  if (one === 0) return TENS[ten];
  if (ten === 2) return `huszon${ONES[one]}`;
  return `${TENS[ten]}${ONES[one]}`;
}

function secret(): string {
  return process.env.SUM_CHECK_SECRET?.trim() || "vrgo-ajanlat-osszeadas";
}

export function createSumChallenge(now = Date.now()): { token: string; question: string } {
  const left = randomInt(0, 100);
  const right = randomInt(0, 100);
  const exp = now + TTL_MS;
  const payload = `${left}.${right}.${exp}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("base64url");
  return {
    token: `${payload}.${sig}`,
    question: `Mennyi ${numberWord(left)} meg ${numberWord(right)}?`,
  };
}

export function verifySumAnswer(token: unknown, answer: unknown, now = Date.now()): boolean {
  if (typeof token !== "string" || typeof answer !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 4) return false;
  const [leftRaw, rightRaw, expRaw, sig] = parts;
  const payload = `${leftRaw}.${rightRaw}.${expRaw}`;
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
  const givenSig = Buffer.from(sig);
  const expectedSig = Buffer.from(expected);
  if (givenSig.length !== expectedSig.length || !timingSafeEqual(givenSig, expectedSig)) return false;

  const left = Number(leftRaw);
  const right = Number(rightRaw);
  const exp = Number(expRaw);
  if (!Number.isInteger(left) || left < 0 || left > 99) return false;
  if (!Number.isInteger(right) || right < 0 || right > 99) return false;
  if (!Number.isFinite(exp) || exp < now) return false;

  const parsed = Number(answer.trim());
  if (!Number.isInteger(parsed)) return false;
  return parsed === left + right;
}
