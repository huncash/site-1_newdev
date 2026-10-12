import nodemailer from "nodemailer";

export interface QuoteDelivery {
  subject: string;
  text: string;
  replyTo: string;
}

export function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (!forwarded) return null;
  const first = forwarded.split(",")[0]?.trim();
  return first ? first.slice(0, 64) : null;
}

export async function verifyRecaptcha(token: unknown, remoteIp?: string | null): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret || typeof token !== "string") return false;
  const response = token.trim();
  if (response.length < 20 || response.length > 4096) return false;

  try {
    const body = new URLSearchParams({ secret, response });
    if (remoteIp) body.set("remoteip", remoteIp);
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
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
