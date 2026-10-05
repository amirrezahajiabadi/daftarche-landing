/* ═══ Landing — deployment configuration ═══
   The one value to edit when the web app goes live: the address every
   «ورود به دَفتَرچه» entry points at. The real domain is not fixed yet, so it
   is written down here once, as a placeholder that cannot resolve, and
   js/landing.js copies it onto each [data-app-link] on the page.

   The markup carries the same placeholder on its own, so the page still works
   with scripting switched off; this file is simply the single place to change
   it. Replace `daftarche.example` with the real domain when the app is hosted
   at `app.<DOMAIN>`. */
window.DAFTARCHE_APP_URL = 'https://app.daftarche.example/';
