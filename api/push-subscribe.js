import { getRedis } from "./_lib/redis.js";
import { SUBS_KEY, hashEndpoint, isValidSubscription } from "./_lib/push.js";
import { VALID_ACCESS_CODES } from "./_lib/accessCodesList.js";

const VALID_SET = new Set(VALID_ACCESS_CODES);
const normalize = (s) => (s || "").trim().toUpperCase().replace(/\s+/g, "");

function readBody(req) {
  return typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
}

export default async function handler(req, res) {
  // GET -> public VAPID key the browser needs to subscribe
  if (req.method === "GET") {
    const publicKey = process.env.VAPID_PUBLIC_KEY;
    if (!publicKey) return res.status(500).json({ ok: false, reason: "missing_vapid_config" });
    return res.status(200).json({ ok: true, publicKey });
  }

  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).json({ ok: false, reason: "method_not_allowed" });
  }

  let body;
  try {
    body = readBody(req);
  } catch {
    return res.status(400).json({ ok: false, reason: "bad_request" });
  }

  const { subscription, code, name, startDate } = body;
  if (!isValidSubscription(subscription)) {
    return res.status(400).json({ ok: false, reason: "invalid_subscription" });
  }
  if (!VALID_SET.has(normalize(code))) {
    return res.status(403).json({ ok: false, reason: "invalid_code" });
  }

  try {
    const db = getRedis();
    const field = hashEndpoint(subscription.endpoint);

    if (req.method === "DELETE") {
      await db.hdel(SUBS_KEY, field);
      return res.status(200).json({ ok: true });
    }

    const record = {
      subscription,
      code: normalize(code),
      name: String(name || "").slice(0, 40),
      startDate: /^\d{4}-\d{2}-\d{2}/.test(startDate || "") ? startDate : null,
      updatedAt: new Date().toISOString(),
    };
    await db.hset(SUBS_KEY, field, JSON.stringify(record));
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("push-subscribe error:", err);
    return res.status(500).json({ ok: false, reason: "server_error" });
  }
}
