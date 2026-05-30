/* ============================================================
   ENRICHMENT: HOLISTIC SKIN HEALTH
   Homepage Script — Digital Rush Studios
   ============================================================ */

(function () {
  'use strict';

  /* ── Announcement bar dismiss ────────────────────────────── */
  const announcementBar   = document.getElementById('announcement-bar');
  const announcementClose = document.getElementById('announcement-close');

  if (announcementClose && announcementBar) {
    announcementClose.addEventListener('click', function () {
      announcementBar.classList.add('hidden');
      // Nudge nav back to top
      const nav = document.getElementById('nav');
      if (nav) nav.style.top = '0';
    });
  }

  /* ── Footer year ─────────────────────────────────────────── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ── Sticky Nav ──────────────────────────────────────────── */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* ── Mobile Menu ─────────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('nav-mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on any link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }


  /* ── Scroll Reveal (Intersection Observer) ───────────────── */
  const revealClasses = ['.reveal', '.reveal-left', '.reveal-right'];
  const revealEls = document.querySelectorAll(revealClasses.join(', '));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    revealEls.forEach(function (el) {
      // If element is already in the viewport on page load, reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('revealed');
      } else {
        observer.observe(el);
      }
    });
  } else {
    // Fallback: show everything immediately
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
  }


  /* ── Smooth Scroll for anchor links ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#' || id === '#book') return; // let booking links pass through
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();

      const navHeight = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── Floating Book Button: hide when CTA section is visible ─ */
  const floatingBtn = document.querySelector('.floating-book');
  const bookSection  = document.getElementById('book');

  if (floatingBtn && bookSection && 'IntersectionObserver' in window) {
    const floatObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          floatingBtn.style.opacity    = entry.isIntersecting ? '0' : '1';
          floatingBtn.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
        });
      },
      { threshold: 0.2 }
    );
    floatObserver.observe(bookSection);
  }


  /* ── Subtle parallax on hero image (desktop only) ────────── */
  const heroImage = document.querySelector('.hero-image-wrap');

  if (heroImage && window.matchMedia('(min-width: 1024px)').matches) {
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      heroImage.style.transform = 'translateY(' + y * 0.07 + 'px)';
    }, { passive: true });
  }

})();
