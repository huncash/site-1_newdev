import { appendFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import nodemailer from "nodemailer";

/** Private listing (eladoingatlan) fallback if LISTING_INBOX_EMAIL is unset on the server. */
const LISTING_INBOX_DEFAULT = "kisspatrikpetervr@gmail.com";

const PLACEHOLDER_HOSTS = new Set(["mail.domain.hu", "smtp.example.com", "localhost", "127.0.0.1"]);

export interface QuoteDelivery {
  subject: string;
  text: string;
  replyTo?: string;
  /** Server-only env key for the inbox. Never pass a raw address from the client. */
  inboxEnv?: "QUOTE_INBOX_EMAIL" | "LISTING_INBOX_EMAIL";
}

export type QuoteDeliveryResult = {
  ok: boolean;
  via?: "smtp" | "formsubmit" | "file";
  reason?: string;
};

function env(name: string): string | undefined {
  const raw = process.env[name];
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim().replace(/^['"]|['"]$/g, "");
  return trimmed || undefined;
}

function resolveInbox(inboxKey: "QUOTE_INBOX_EMAIL" | "LISTING_INBOX_EMAIL"): string | undefined {
  return (
    env(inboxKey) ||
    (inboxKey === "LISTING_INBOX_EMAIL" ? LISTING_INBOX_DEFAULT : undefined) ||
    env("QUOTE_INBOX_EMAIL")
  );
}

function persistListingEnquiry(payload: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): boolean {
  try {
    const dir = join(process.cwd(), "data");
    mkdirSync(dir, { recursive: true });
    const line = JSON.stringify({
      at: new Date().toISOString(),
      ...payload,
    });
    appendFileSync(join(dir, "listing-enquiries.jsonl"), `${line}\n`, "utf8");
    return true;
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "listing_enquiry_persist_failed",
        message: error instanceof Error ? error.message : "unknown",
      })
    );
    return false;
  }
}

async function sendViaSmtp(delivery: QuoteDelivery, to: string): Promise<QuoteDeliveryResult> {
  const host = env("SMTP_HOST");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  const from = env("SMTP_FROM") || env("MAIL_FROM") || user;

  if (!host || PLACEHOLDER_HOSTS.has(host.toLowerCase()) || !user || !pass || !from) {
    return { ok: false, reason: "smtp_not_configured" };
  }

  const port = Number(env("SMTP_PORT") || "587");
  const secure = env("SMTP_SECURE") === "true" || port === 465;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 12_000,
    greetingTimeout: 12_000,
    socketTimeout: 20_000,
  });

  try {
    await transporter.sendMail({
      from,
      to,
      ...(delivery.replyTo ? { replyTo: delivery.replyTo } : {}),
      subject: delivery.subject,
      text: delivery.text,
    });
    console.log(JSON.stringify({ event: "quote_mail_sent", via: "smtp" }));
    return { ok: true, via: "smtp" };
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "quote_mail_failed",
        via: "smtp",
        message: error instanceof Error ? error.message.slice(0, 180) : "unknown",
      })
    );
    return { ok: false, reason: "smtp_send_failed" };
  }
}

/** HTTP email relay — used when SMTP is missing/broken on the VPS. */
async function sendViaFormSubmit(delivery: QuoteDelivery, to: string): Promise<QuoteDeliveryResult> {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: delivery.subject,
        _template: "box",
        _captcha: "false",
        ...(delivery.replyTo ? { _replyto: delivery.replyTo, email: delivery.replyTo } : {}),
        message: delivery.text,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      const body = (await response.text()).slice(0, 180);
      console.error(JSON.stringify({ event: "quote_mail_failed", via: "formsubmit", status: response.status, body }));
      return { ok: false, reason: "formsubmit_http" };
    }
    console.log(JSON.stringify({ event: "quote_mail_sent", via: "formsubmit" }));
    return { ok: true, via: "formsubmit" };
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "quote_mail_failed",
        via: "formsubmit",
        message: error instanceof Error ? error.message.slice(0, 180) : "unknown",
      })
    );
    return { ok: false, reason: "formsubmit_error" };
  }
}

export async function sendQuoteEmail(delivery: QuoteDelivery): Promise<boolean> {
  const result = await deliverQuoteEmail(delivery);
  return result.ok;
}

export async function deliverQuoteEmail(delivery: QuoteDelivery): Promise<QuoteDeliveryResult> {
  const inboxKey = delivery.inboxEnv ?? "QUOTE_INBOX_EMAIL";
  const to = resolveInbox(inboxKey);
  if (!to) {
    console.error(JSON.stringify({ event: "quote_mail_not_configured", inboxKey, reason: "missing_inbox" }));
    return { ok: false, reason: "missing_inbox" };
  }

  const smtp = await sendViaSmtp(delivery, to);
  if (smtp.ok) return smtp;

  // Listing must not silently die when VPS SMTP is a placeholder / down.
  if (inboxKey === "LISTING_INBOX_EMAIL") {
    const persisted = persistListingEnquiry({
      to,
      subject: delivery.subject,
      text: delivery.text,
      replyTo: delivery.replyTo,
    });
    const relay = await sendViaFormSubmit(delivery, to);
    if (relay.ok) return relay;
    if (persisted) {
      console.error(
        JSON.stringify({
          event: "listing_enquiry_saved_without_mail",
          smtpReason: smtp.reason,
          relayReason: relay.reason,
        })
      );
      // Still accept the lead so the visitor is not blocked; owner has the jsonl + FormSubmit activation mail.
      return { ok: true, via: "file", reason: "saved_without_mail" };
    }
    return { ok: false, reason: relay.reason || smtp.reason || "delivery_failed" };
  }

  console.error(JSON.stringify({ event: "quote_mail_not_configured", inboxKey, reason: smtp.reason }));
  return smtp;
}
