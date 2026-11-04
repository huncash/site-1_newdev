import nodemailer from "nodemailer";

/**
 * Server-only mail delivery.
 * Recipient addresses live exclusively in process.env — never hardcode them here
 * (this file ships in the repo / server bundle).
 *
 * Channels:
 * - listing → eladoingatlan.vrgo.hu (RECIPIENT_ELADOINGATLAN, legacy LISTING_INBOX_EMAIL)
 * - main    → vrgo.hu + bim.vrgo.hu (RECIPIENT_MAIN, legacy QUOTE_INBOX_EMAIL)
 */

export type MailRecipientChannel = "listing" | "main";

export interface QuoteDelivery {
  subject: string;
  text: string;
  /** Form submitter address — goes to Reply-To only, never From. */
  replyTo?: string;
  /** Which site inbox to use. Defaults to main (VRGO / BIM). */
  recipient?: MailRecipientChannel;
  /** @deprecated use `recipient` */
  inboxEnv?: "QUOTE_INBOX_EMAIL" | "LISTING_INBOX_EMAIL";
}

function channelOf(delivery: QuoteDelivery): MailRecipientChannel {
  if (delivery.recipient) return delivery.recipient;
  if (delivery.inboxEnv === "LISTING_INBOX_EMAIL") return "listing";
  return "main";
}

function resolveRecipient(channel: MailRecipientChannel): string | undefined {
  if (channel === "listing") {
    return (
      process.env.RECIPIENT_ELADOINGATLAN?.trim() ||
      process.env.LISTING_INBOX_EMAIL?.trim() ||
      undefined
    );
  }
  return process.env.RECIPIENT_MAIN?.trim() || process.env.QUOTE_INBOX_EMAIL?.trim() || undefined;
}

/**
 * From must be an authenticated SMTP identity.
 * Prefer SMTP_FROM, else SMTP_USER. Never invent a public mailbox in code.
 */
function resolveFrom(smtpUser: string): string {
  const raw = process.env.SMTP_FROM?.trim();
  if (raw) return raw;
  return smtpUser;
}

export async function sendQuoteEmail(delivery: QuoteDelivery): Promise<boolean> {
  const channel = channelOf(delivery);
  const to = resolveRecipient(channel);
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  if (!to || !host || !user || !pass) {
    console.error(
      JSON.stringify({
        event: "quote_mail_not_configured",
        channel,
        hasTo: Boolean(to),
        hasHost: Boolean(host),
        hasUser: Boolean(user),
        hasPass: Boolean(pass),
      })
    );
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
    console.log(JSON.stringify({ event: "quote_mail_sent", channel }));
    return true;
  } catch (err) {
    console.error(
      JSON.stringify({
        event: "quote_mail_failed",
        channel,
        message: err instanceof Error ? err.message : "unknown",
      })
    );
    return false;
  }
}
