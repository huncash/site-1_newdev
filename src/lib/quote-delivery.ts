import nodemailer from "nodemailer";

export interface QuoteDelivery {
  subject: string;
  text: string;
  replyTo: string;
}

export async function sendQuoteEmail(delivery: QuoteDelivery): Promise<boolean> {
  const to = process.env.QUOTE_INBOX_EMAIL?.trim();
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM?.trim() || user;
  if (!to || !host || !user || !pass || !from) {
    console.error(JSON.stringify({ event: "quote_mail_not_configured" }));
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
      replyTo: delivery.replyTo,
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
