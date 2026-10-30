// v0.10.0 · Notificaciones Web Push (iPhone 16.4+ con la app instalada, Android y escritorio). Lo importa el service worker.
self.addEventListener('push', (event) => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = { body: event.data && event.data.text() }; }
  const title = d.title || 'Aviso';
  event.waitUntil(self.registration.showNotification(title, {
    body: d.body || '', tag: d.tag || undefined, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', data: { url: d.url || '/' },
  }));
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const route = (event.notification.data && event.notification.data.url) || '/';
  const target = new URL(self.registration.scope).href + '#' + route;
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const c of list) { if ('focus' in c) { c.navigate(target).catch(() => {}); return c.focus(); } }
    return self.clients.openWindow(target);
  }));
});
