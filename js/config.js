/* ═══ Landing — deployment configuration ═══
   The address every «ورود به دَفتَرچه» entry points at, written down once.
   js/landing.js copies it onto each [data-app-link] on the page.

   The markup carries that same address on its own — the four `data-app-link`
   hrefs in index.html (header, hero, final CTA, footer) — so the buttons still
   reach the app with scripting switched off. Move the app to another host and
   both change together; start here, then follow the hrefs. */
window.DAFTARCHE_APP_URL = 'https://app.daftrche.ir/';
