// =========================================
// NIYAZ SHAIKH — CYBERSECURITY PORTFOLIO
// =========================================

// --- Theme Toggle ---
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let current = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', current);

  function setIcon(theme) {
    if (!toggle) return;
    if (theme === 'dark') {
      toggle.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      toggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      toggle.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
      toggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  setIcon(current);

  if (toggle) {
    toggle.addEventListener('click', () => {
      current = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', current);
      setIcon(current);
    });
  }
})();

// --- Mobile Menu ---
(function () {
  const btn = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', !isOpen);
    menu.setAttribute('aria-hidden', isOpen);
  });

  // Close on link click
  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
})();

// --- Header scroll shadow ---
(function () {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 10);
  }, { passive: true });
})();

// --- Typewriter Effect ---
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const texts = [
    'Penetration Tester',
    'Web App Security Researcher',
    'Ethical Hacker',
    'Network Security Enthusiast',
  ];

  let tIdx = 0, cIdx = 0, deleting = false;
  const speed = { type: 75, delete: 40, pause: 2200 };

  function type() {
    const current = texts[tIdx];
    if (deleting) {
      el.textContent = current.substring(0, cIdx--);
      if (cIdx < 0) {
        deleting = false;
        tIdx = (tIdx + 1) % texts.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, speed.delete);
    } else {
      el.textContent = current.substring(0, cIdx++);
      if (cIdx > current.length) {
        deleting = true;
        setTimeout(type, speed.pause);
        return;
      }
      setTimeout(type, speed.type);
    }
  }
  setTimeout(type, 800);
})();

// --- Fade-up on scroll (Intersection Observer) ---
(function () {
  const animatables = document.querySelectorAll(
    '.project-card, .skill-category, .cert-card, .about-text, .about-card, ' +
    '.contact-item, .cta-card, .skill-bars, .section-header'
  );

  animatables.forEach(el => el.classList.add('fade-up'));

  if (!('IntersectionObserver' in window)) {
    animatables.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animatables.forEach(el => observer.observe(el));
})();

// --- Skill bar animation ---
(function () {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const w = e.target.getAttribute('data-width');
          e.target.style.width = w + '%';
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  fills.forEach(f => observer.observe(f));
})();

// --- Smooth nav link active state ---
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach(s => observer.observe(s));
})();
