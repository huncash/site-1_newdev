import nodemailer from "nodemailer";

export interface QuoteDelivery {
  subject: string;
  text: string;
  replyTo?: string;
  /** Server-only env key for the inbox. Never pass a raw address from the client. */
  inboxEnv?: "QUOTE_INBOX_EMAIL" | "LISTING_INBOX_EMAIL";
}

export async function sendQuoteEmail(delivery: QuoteDelivery): Promise<boolean> {
  const inboxKey = delivery.inboxEnv ?? "QUOTE_INBOX_EMAIL";
  const to = process.env[inboxKey]?.trim() || process.env.QUOTE_INBOX_EMAIL?.trim();
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM?.trim() || user;
  if (!to || !host || !user || !pass || !from) {
    console.error(JSON.stringify({ event: "quote_mail_not_configured", inboxKey }));
    return false;
  }

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
    console.log(JSON.stringify({ event: "quote_mail_sent" }));
    return true;
  } catch {
    console.error(JSON.stringify({ event: "quote_mail_failed" }));
    return false;
  }
}
