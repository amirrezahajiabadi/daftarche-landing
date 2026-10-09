/* ═══ Landing — enhancements only ═══
   The page is complete without this file: with scripting off it stays visible,
   readable and navigable. Everything here is progressive — the app-entry
   address from js/config.js, the scroll reveal, the hairline that appears
   under the header once the page has moved, and the phone menu. No external
   dependencies, no data, nothing to fetch. */
(function () {
  'use strict';

  /* ── Arming ──
     First statement on purpose. css/landing.css hides the `.lp-reveal` blocks
     whenever scripting is available, and a failsafe rule reveals them at 2.5s
     *unless* this class says otherwise. Setting it here — before anything can
     throw — is what keeps the scroll reveal in charge for as long as this file
     is alive, and hands the page back to CSS the moment it is not. */
  document.documentElement.classList.add('lp-live');

  var header = document.querySelector('.lp-header');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── App entry ──
     Every «ورود به دَفتَرچه» link points at one place: the app address from
     js/config.js. Editing that single value moves all of them at once. The
     markup already carries the same placeholder, so nothing here is
     load-bearing — a scripting-off visit still reaches the app. */
  var appUrl = window.DAFTARCHE_APP_URL;
  if (appUrl) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-app-link]'), function (a) {
      a.href = appUrl;
    });
  }

  /* ── Reveal on scroll ──
     The brief hidden state comes from css/landing.css, which arms it as soon as
     scripting is available; `lp-live` above keeps the CSS failsafe out of the
     way. The check below is driven by the viewport itself rather than by
     IntersectionObserver: the observer is skipped in some rendering
     environments, and content that depends on a callback that never runs is
     content that never appears. A rect test always answers.

     Anyone who asked for less motion gets the visible page with no transition,
     and a browser that never scrolls still shows whatever is on screen. */
  var items = Array.prototype.slice.call(document.querySelectorAll('.lp-reveal'));

  var revealInView = function () {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var left = 0;
    for (var i = 0; i < items.length; i++) {
      var el = items[i];
      if (el.classList.contains('is-in')) continue;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('is-in');
      else left++;
    }
    return left;
  };

  if (reduce) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var pending = items.length;
    var onScroll = function () {
      pending = revealInView();
      if (!pending) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  /* ── Header: a hairline once the page has moved past the top ── */
  if (header) {
    var ticking = false;
    var sync = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    };
    sync();
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(sync);
    }, { passive: true });
  }

  /* ── Phone menu ──
     A plain disclosure: one button, aria-expanded kept honest, closed by a tap
     outside the panel, by Escape, or by a resize back to the full nav. */
  var menuBtn = document.querySelector('.lp-menu-btn');
  var nav = document.getElementById('lpNav');
  if (header && menuBtn && nav) {
    /* The icon becomes a cross when the panel is open, so the name has to
       follow it — an × still announced as «منوی صفحه» is the kind of detail a
       screen reader user only notices when it is wrong. */
    var setOpen = function (open) {
      header.dataset.open = open ? 'true' : 'false';
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'بستن منو' : 'منوی صفحه');
    };
    menuBtn.addEventListener('click', function () {
      setOpen(header.dataset.open !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.dataset.open === 'true') {
        setOpen(false);
        menuBtn.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (header.dataset.open !== 'true') return;
      if (!header.contains(e.target)) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 881px)').matches) setOpen(false);
    });
  }
})();
