import { Redis } from "@upstash/redis";
import { VALID_ACCESS_CODES } from "./_lib/accessCodesList.js";

const VALID_SET = new Set(VALID_ACCESS_CODES);

function normalize(input) {
  return (input || "").trim().toUpperCase().replace(/\s+/g, "");
}

// Vercel's Upstash integration can name its variables either
// UPSTASH_REDIS_REST_* or KV_REST_API_* depending on how it was created,
// so we accept both.
let redis = null;
function getRedis() {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    if (!url || !token) {
      const err = new Error("Redis environment variables are missing");
      err.code = "missing_database_config";
      throw err;
    }
    redis = new Redis({ url, token });
  }
  return redis;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, reason: "method_not_allowed" });
    return;
  }

  let code;
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    code = body?.code;
  } catch {
    res.status(400).json({ ok: false, reason: "bad_request" });
    return;
  }

  const normalized = normalize(code);
  if (!normalized) {
    res.status(400).json({ ok: false, reason: "missing_code" });
    return;
  }

  if (!VALID_SET.has(normalized)) {
    res.status(200).json({ ok: false, reason: "invalid" });
    return;
  }

  try {
    const db = getRedis();
    const key = `redeemed:${normalized}`;

    // SET ... NX only sets the key if it does NOT already exist, and does so
    // atomically — so two people submitting the same code at the same
    // instant can never both "win".
    const firstTimeRedeemed = await db.set(key, new Date().toISOString(), { nx: true });

    if (!firstTimeRedeemed) {
      res.status(200).json({ ok: false, reason: "already_used" });
      return;
    }

    res.status(200).json({ ok: true, code: normalized });
  } catch (err) {
    console.error("redeem-code error:", err);
    res.status(500).json({
      ok: false,
      reason: err.code === "missing_database_config" ? "missing_database_config" : "server_error",
    });
  }
}
