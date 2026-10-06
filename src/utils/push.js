// Client side of Web Push (works on Android, desktop, and iPhone 16.4+ PWA).

const b64ToUint8 = (b64) => {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
};

export function isStandalone() {
  return window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

// -> "unsupported" | "ios-install" | "denied" | "ready"
export function getPushSupport() {
  if (isIOS() && !isStandalone()) return "ios-install"; // must be opened from the Home Screen icon
  if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
    return "unsupported";
  }
  if (Notification.permission === "denied") return "denied";
  return "ready";
}

export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  try {
    return await navigator.serviceWorker.register("/sw.js");
  } catch (e) {
    console.error("SW registration failed", e);
    return null;
  }
}

export async function getCurrentSubscription() {
  if (!("serviceWorker" in navigator)) return null;
  const reg = await navigator.serviceWorker.getRegistration();
  return reg ? reg.pushManager.getSubscription() : null;
}

async function post(path, method, body) {
  const r = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.ok) throw new Error(data.reason || `http_${r.status}`);
  return data;
}

// Must be called from a click handler (iOS requires a user gesture).
export async function enablePush({ code, name, startDate }) {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") throw new Error("permission_denied");

  const reg = (await registerServiceWorker()) && (await navigator.serviceWorker.ready);
  const keyRes = await fetch("/api/push-subscribe");
  const { publicKey } = await keyRes.json();
  if (!publicKey) throw new Error("missing_vapid_config");

  const sub =
    (await reg.pushManager.getSubscription()) ||
    (await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: b64ToUint8(publicKey),
    }));

  await post("/api/push-subscribe", "POST", { subscription: sub.toJSON(), code, name, startDate });
  return sub;
}

export async function disablePush(code) {
  const sub = await getCurrentSubscription();
  if (!sub) return;
  try { await post("/api/push-subscribe", "DELETE", { subscription: sub.toJSON(), code }); } catch { /* ignore */ }
  await sub.unsubscribe();
}

export async function sendTestPush() {
  const sub = await getCurrentSubscription();
  if (!sub) throw new Error("not_subscribed");
  return post("/api/push-test", "POST", { subscription: sub.toJSON() });
}

// Refreshes name / start date on the server each app open (only if already subscribed).
export async function syncSubscription({ code, name, startDate }) {
  if (!code || !("Notification" in window) || Notification.permission !== "granted") return;
  const sub = await getCurrentSubscription();
  if (sub) {
    try { await post("/api/push-subscribe", "POST", { subscription: sub.toJSON(), code, name, startDate }); } catch { /* ignore */ }
  }
}
