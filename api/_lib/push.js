import crypto from "node:crypto";
import webpush from "web-push";

export const SUBS_KEY = "push:subs"; // Redis hash: sha256(endpoint) -> JSON

let configured = false;
export function getWebPush() {
  if (!configured) {
    const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT } = process.env;
    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || !VAPID_SUBJECT) {
      const err = new Error("VAPID keys are missing");
      err.code = "missing_vapid_config";
      throw err;
    }
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    configured = true;
  }
  return webpush;
}

export const hashEndpoint = (endpoint) =>
  crypto.createHash("sha256").update(endpoint).digest("hex");

// Only talk to the real browser push services (stops anyone from making the
// server send requests to arbitrary URLs).
const ALLOWED_HOSTS = [
  /^fcm\.googleapis\.com$/,                 // Chrome, Edge, Samsung, Android
  /(^|\.)push\.services\.mozilla\.com$/,    // Firefox
  /(^|\.)push\.apple\.com$/,                // Safari / iPhone
  /(^|\.)notify\.windows\.com$/,            // Edge on Windows
];

export function isValidSubscription(sub) {
  try {
    if (!sub || typeof sub.endpoint !== "string") return false;
    const u = new URL(sub.endpoint);
    if (u.protocol !== "https:") return false;
    if (!ALLOWED_HOSTS.some((re) => re.test(u.hostname))) return false;
    return typeof sub.keys?.p256dh === "string" && typeof sub.keys?.auth === "string";
  } catch {
    return false;
  }
}

// Returns "sent" | "gone" | "error"
export async function sendTo(record, payload) {
  const wp = getWebPush();
  try {
    await wp.sendNotification(record.subscription, JSON.stringify(payload), {
      TTL: 60 * 60 * 6, // drop it if the phone is offline for 6h
      urgency: "normal",
    });
    return "sent";
  } catch (err) {
    if (err.statusCode === 404 || err.statusCode === 410) return "gone";
    console.error("push send failed:", err.statusCode, err.body || err.message);
    return "error";
  }
}
