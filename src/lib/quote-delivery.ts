import nodemailer from "nodemailer";

/** Server-only defaults — never import these into client components. */
const QUOTE_INBOX_DEFAULT = "adptopkft@gmail.com";
const LISTING_INBOX_DEFAULT = "kisspatrikpetervr@gmail.com";
const RETIRED_FROM = /info@vrgo\.hu/i;

export interface QuoteDelivery {
  subject: string;
  text: string;
  replyTo?: string;
  /** Server-only env key for the inbox. Never pass a raw address from the client. */
  inboxEnv?: "QUOTE_INBOX_EMAIL" | "LISTING_INBOX_EMAIL";
}

function resolveInbox(inboxKey: "QUOTE_INBOX_EMAIL" | "LISTING_INBOX_EMAIL"): string | undefined {
  const fromEnv = process.env[inboxKey]?.trim();
  if (fromEnv && !RETIRED_FROM.test(fromEnv)) return fromEnv;
  return inboxKey === "LISTING_INBOX_EMAIL" ? LISTING_INBOX_DEFAULT : QUOTE_INBOX_DEFAULT;
}

/** Prefer SMTP auth identity; never send From: info@vrgo.hu (invalid / rejected). */
function resolveFrom(smtpUser: string): string {
  const raw = process.env.SMTP_FROM?.trim() || smtpUser;
  if (!raw || RETIRED_FROM.test(raw)) return smtpUser;
  return raw;
}

export async function sendQuoteEmail(delivery: QuoteDelivery): Promise<boolean> {
  const inboxKey = delivery.inboxEnv ?? "QUOTE_INBOX_EMAIL";
  const to = resolveInbox(inboxKey);
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  if (!to || !host || !user || !pass) {
    console.error(JSON.stringify({ event: "quote_mail_not_configured", inboxKey, hasTo: Boolean(to), hasHost: Boolean(host), hasUser: Boolean(user), hasPass: Boolean(pass) }));
    return false;
  }
  const from = resolveFrom(user);

  const port = Number(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from,
      to,
      ...(delivery.replyTo ? { replyTo: delivery.replyTo } : {}),
      subject: delivery.subject,
      text: delivery.text,
    });
    console.log(JSON.stringify({ event: "quote_mail_sent", inboxKey }));
    return true;
  } catch (err) {
    console.error(
      JSON.stringify({
        event: "quote_mail_failed",
        inboxKey,
        message: err instanceof Error ? err.message : "unknown",
      })
    );
    return false;
  }
}
