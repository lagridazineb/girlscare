/* Fatislaaay service worker — receives Web Push messages and shows them.
   Works on Android (Chrome/Samsung/Firefox), desktop, and iPhone (iOS 16.4+,
   when the app is added to the Home Screen). */

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { body: event.data ? event.data.text() : "" };
  }

  const title = data.title || "Fatislaaay 🌸";
  // iOS requires that every push shows a notification, so we always do.
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "",
      icon: "/icon-192.png",
      tag: data.tag || "fatislaaay-reminder",
      renotify: true,
      lang: "ar",
      dir: "rtl",
      data: { url: data.url || "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || "/", self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(async (list) => {
      for (const client of list) {
        if (new URL(client.url).origin === self.location.origin && "focus" in client) {
          await client.focus();
          if ("navigate" in client) {
            try { await client.navigate(target); } catch { /* ignore */ }
          }
          return;
        }
      }
      return self.clients.openWindow(target);
    })
  );
});
