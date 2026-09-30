import Redis from "ioredis";
import { VALID_ACCESS_CODES } from "./_lib/accessCodesList.js";

const VALID_SET = new Set(VALID_ACCESS_CODES);

function normalize(input) {
  return (input || "").trim().toUpperCase().replace(/\s+/g, "");
}

// Different Redis add-ons on Vercel name their connection variable
// differently (REDIS_URL, KV_URL, etc.), so we accept a few common ones.
function getConnectionString() {
  return (
    process.env.REDIS_URL ||
    process.env.KV_URL ||
    process.env.REDIS_CONNECTION_STRING ||
    null
  );
}

// Reused across "warm" invocations of the same serverless instance so we
// don't open a brand new connection on every request.
let redisClient = null;
function getRedis() {
  if (!redisClient) {
    const url = getConnectionString();
    if (!url) {
      const err = new Error("Redis connection string is missing");
      err.code = "missing_database_config";
      err.debug = {
        REDIS_URL: Boolean(process.env.REDIS_URL),
        KV_URL: Boolean(process.env.KV_URL),
        REDIS_CONNECTION_STRING: Boolean(process.env.REDIS_CONNECTION_STRING),
      };
      throw err;
    }
    redisClient = new Redis(url, {
      maxRetriesPerRequest: 2,
      lazyConnect: false,
    });
    redisClient.on("error", (e) => console.error("Redis client error:", e));
  }
  return redisClient;
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
    // instant can never both "win". Returns "OK" if it was set, null if the
    // key already existed.
    const result = await db.set(key, new Date().toISOString(), "NX");

    if (result !== "OK") {
      res.status(200).json({ ok: false, reason: "already_used" });
      return;
    }

    res.status(200).json({ ok: true, code: normalized });
  } catch (err) {
    console.error("redeem-code error:", err);
    res.status(500).json({
      ok: false,
      reason: err.code === "missing_database_config" ? "missing_database_config" : "server_error",
      // Safe to expose: just which variable NAMES were found, never values.
      // This is here purely to make setup issues diagnosable from the
      // browser's Network tab instead of needing Vercel's function logs.
      debug: err.debug || { message: String(err.message || err) },
    });
  }
}
