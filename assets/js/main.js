/* ════════════════════════════════════════════════════════════════════
   HOMESTYLE FURNITURE — assets/js/main.js
   ------------------------------------------------------------------
   Pure JS, no external libraries. All functionality:
   1. Announcement bar dismiss
   2. Sticky header + scroll state
   3. Mobile navigation toggle
   4. Active nav link on scroll (Intersection Observer)
   5. Gallery filter tabs
   6. Lightbox (keyboard + mouse + touch)
   7. Testimonials auto-slider
   8. FAQ accordion
   9. Offer countdown timer
   10. Quote form → WhatsApp redirect
   11. Scroll-reveal (Intersection Observer)
   12. Back-to-top FAB visibility
   ════════════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function debounce(fn, ms = 150) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

/* ─────────────────────────────────────────────
   1. ANNOUNCEMENT BAR
───────────────────────────────────────────── */
function initAnnouncement() {
  const bar = $('.announcement');
  const btn = $('.announcement-close');
  if (!bar || !btn) return;

  // Restore dismissed state across page loads
  if (sessionStorage.getItem('ann-dismissed') === '1') {
    bar.classList.add('is-hidden');
    return;
  }

  btn.addEventListener('click', () => {
    bar.classList.add('is-hidden');
    sessionStorage.setItem('ann-dismissed', '1');
    updateHeaderTop();
  });
}

/* ─────────────────────────────────────────────
   2. STICKY HEADER + SCROLL STATE
───────────────────────────────────────────── */
function updateHeaderTop() {
  const header = $('.site-header');
  if (!header) return;
  const ann = $('.announcement:not(.is-hidden)');
  const annH = ann ? ann.offsetHeight : 0;
  document.documentElement.style.setProperty('--header-h', (header.offsetHeight + annH) + 'px');
}

function initHeader() {
  const header = $('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
    // Show/hide back-to-top FAB
    const fab = $('.fab--top');
    if (fab) fab.classList.toggle('is-visible', window.scrollY > 500);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', debounce(updateHeaderTop), { passive: true });
  updateHeaderTop();
  onScroll();
}

/* ─────────────────────────────────────────────
   3. MOBILE NAVIGATION
───────────────────────────────────────────── */
function initMobileNav() {
  const toggle = $('#nav-toggle');
  const links  = $('#nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on link click
  $$('a', links).forEach(a => {
    a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

/* ─────────────────────────────────────────────
   4. ACTIVE NAV LINK ON SCROLL
───────────────────────────────────────────── */
function initActiveNav() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => obs.observe(s));
}

/* ─────────────────────────────────────────────
   5. GALLERY FILTER
───────────────────────────────────────────── */
function initGalleryFilter() {
  const btns  = $$('.filter-btn');
  const items = $$('.gallery-item');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      btns.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');

      items.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('is-hidden', !match);
      });
    });
  });
}

/* ─────────────────────────────────────────────
   6. LIGHTBOX
───────────────────────────────────────────── */
function initLightbox() {
  const lb      = $('#lightbox');
  const lbImg   = $('#lb-img');
  const lbCap   = $('#lb-caption');
  const lbClose = $('#lb-close');
  const lbPrev  = $('#lb-prev');
  const lbNext  = $('#lb-next');

  if (!lb || !lbImg) return;

  // Collect all lightbox-able items (excludes hidden ones at open-time)
  let items  = [];
  let current = 0;
  let startX  = 0;

  function getVisibleItems() {
    return $$('.gallery-item:not(.is-hidden)[data-full]');
  }

  function openLightbox(idx) {
    items   = getVisibleItems();
    current = idx;
    showSlide();
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lbClose && lbClose.focus();
  }

  function closeLightbox() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function showSlide() {
    const item = items[current];
    if (!item) return;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = item.dataset.full;
      lbImg.alt = item.dataset.caption || '';
      if (lbCap) lbCap.textContent = item.dataset.caption || '';
      lbImg.style.opacity = '1';
    }, 120);
  }

  function go(dir) {
    current = (current + dir + items.length) % items.length;
    showSlide();
  }

  // Open on gallery item click
  document.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item[data-full]');
    if (!item) return;
    const visible = getVisibleItems();
    openLightbox(visible.indexOf(item));
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click', () => go(-1));
  if (lbNext)  lbNext.addEventListener('click', () => go(1));

  // Close on backdrop click
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   go(1);
    if (e.key === 'ArrowRight')  go(-1);
  });

  // Touch swipe
  lb.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
  });
}

/* ─────────────────────────────────────────────
   7. TESTIMONIALS SLIDER
───────────────────────────────────────────── */
function initSlider() {
  const slides = $$('.testimonial-slide');
  const dots   = $$('.slider-dot');
  const prev   = $('#slider-prev');
  const next   = $('#slider-next');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('is-active');
    dots[current] && dots[current].setAttribute('aria-current', 'false');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current] && dots[current].setAttribute('aria-current', 'true');
  }

  function autoPlay() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  function resetTimer() {
    clearInterval(timer);
    autoPlay();
  }

  goTo(0);
  autoPlay();

  if (prev) prev.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  if (next) next.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
  });

  // Pause on hover / focus
  const track = $('.testimonial-track');
  if (track) {
    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', autoPlay);
    track.addEventListener('focusin',   () => clearInterval(timer));
    track.addEventListener('focusout',  autoPlay);
  }
}

/* ─────────────────────────────────────────────
   8. FAQ ACCORDION
───────────────────────────────────────────── */
function initFAQ() {
  $$('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.closest('.faq-item');
      const isOpen  = item.dataset.open === 'true';
      const answer  = item.querySelector('.faq-answer');

      // Close all others
      $$('.faq-item').forEach(i => {
        i.dataset.open = 'false';
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.dataset.open = 'true';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ─────────────────────────────────────────────
   9. OFFER COUNTDOWN TIMER
───────────────────────────────────────────── */
function initCountdown() {
  const d = $('#cd-days');
  const h = $('#cd-hours');
  const m = $('#cd-mins');
  const s = $('#cd-secs');
  if (!d || !h || !m || !s) return;

  // Countdown target: 72 hours from first visit (stored in sessionStorage)
  const KEY = 'hs-offer-end';
  let end = parseInt(sessionStorage.getItem(KEY) || '0', 10);
  if (!end || end < Date.now()) {
    end = Date.now() + 72 * 60 * 60 * 1000;
    sessionStorage.setItem(KEY, String(end));
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = Math.max(0, end - Date.now());
    const td   = Math.floor(diff / 86400000);
    const th   = Math.floor((diff % 86400000) / 3600000);
    const tm   = Math.floor((diff % 3600000)  / 60000);
    const ts   = Math.floor((diff % 60000)    / 1000);
    d.textContent = pad(td);
    h.textContent = pad(th);
    m.textContent = pad(tm);
    s.textContent = pad(ts);
    if (diff > 0) requestAnimationFrame(tick);
  }

  tick();
}

/* ─────────────────────────────────────────────
   10. QUOTE FORM → WHATSAPP
───────────────────────────────────────────── */
function initQuoteForm() {
  const form = $('#quote-form');
  if (!form) return;

  const WA_NUMBER = '966500000000'; // ← ضع رقم واتساب الصحيح هنا

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const name    = (data.get('name')    || '').trim();
    const phone   = (data.get('phone')   || '').trim();
    const type    = (data.get('type')    || '').trim();
    const details = (data.get('details') || '').trim();

    const msg = [
      'السلام عليكم ورحمة الله 🌿',
      'طلب عرض سعر جديد من موقع HomeStyle:',
      '',
      `👤 الاسم: ${name}`,
      phone   ? `📞 الهاتف: ${phone}` : '',
      type    ? `🛋️ نوع الأثاث: ${type}` : '',
      details ? `📝 التفاصيل: ${details}` : '',
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
}

/* ─────────────────────────────────────────────
   11. SCROLL-REVEAL (Intersection Observer)
───────────────────────────────────────────── */
function initReveal() {
  const els = $$('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => obs.observe(el));
}

/* ─────────────────────────────────────────────
   12. BACK-TO-TOP FAB
───────────────────────────────────────────── */
function initBackToTop() {
  const btn = $('.fab--top');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────
   INIT — DOM ready
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initAnnouncement();
  initHeader();
  initMobileNav();
  initActiveNav();
  initGalleryFilter();
  initLightbox();
  initSlider();
  initFAQ();
  initCountdown();
  initQuoteForm();
  initReveal();
  initBackToTop();
});
