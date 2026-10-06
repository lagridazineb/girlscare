import { getRedis } from "./_lib/redis.js";
import { SUBS_KEY, hashEndpoint, isValidSubscription, sendTo } from "./_lib/push.js";

// Sends a test notification to ONE already-registered device (the caller's).
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, reason: "method_not_allowed" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { subscription } = body;
    if (!isValidSubscription(subscription)) {
      return res.status(400).json({ ok: false, reason: "invalid_subscription" });
    }

    const raw = await getRedis().hget(SUBS_KEY, hashEndpoint(subscription.endpoint));
    if (!raw) return res.status(404).json({ ok: false, reason: "not_registered" });

    const result = await sendTo(JSON.parse(raw), {
      title: "تم تفعيل التذكيرات 🌸",
      body: "رائع! ستصلك رسالة كل صباح وكل مساء بإذن الله 💗",
      url: "/#/",
      tag: "fatislaaay-test",
    });
    return res.status(result === "sent" ? 200 : 502).json({ ok: result === "sent", result });
  } catch (err) {
    console.error("push-test error:", err);
    return res.status(500).json({ ok: false, reason: err.code || "server_error" });
  }
}
