import { getRedis } from "./_lib/redis.js";
import { SUBS_KEY, sendTo } from "./_lib/push.js";
import { buildMessage } from "./_lib/reminderMessages.js";

// Called by Vercel Cron twice a day:  /api/cron-reminders?slot=morning|evening
// Vercel automatically sends "Authorization: Bearer $CRON_SECRET".
export default async function handler(req, res) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ ok: false, reason: "unauthorized" });
  }

  const slot = req.query?.slot === "evening" ? "evening" : req.query?.slot === "morning" ? "morning" : null;
  if (!slot) return res.status(400).json({ ok: false, reason: "bad_slot" });

  try {
    const db = getRedis();
    const all = await db.hgetall(SUBS_KEY); // { hash: json }
    const entries = Object.entries(all);
    const now = new Date();
    const stats = { total: entries.length, sent: 0, removed: 0, failed: 0 };

    // Send in small parallel batches.
    const BATCH = 25;
    for (let i = 0; i < entries.length; i += BATCH) {
      await Promise.all(
        entries.slice(i, i + BATCH).map(async ([field, raw]) => {
          let record;
          try { record = JSON.parse(raw); } catch { await db.hdel(SUBS_KEY, field); stats.removed++; return; }

          const result = await sendTo(record, buildMessage(slot, record, now));
          if (result === "sent") stats.sent++;
          else if (result === "gone") { await db.hdel(SUBS_KEY, field); stats.removed++; }
          else stats.failed++;
        })
      );
    }

    return res.status(200).json({ ok: true, slot, ...stats });
  } catch (err) {
    console.error("cron-reminders error:", err);
    return res.status(500).json({ ok: false, reason: err.code || "server_error" });
  }
}
