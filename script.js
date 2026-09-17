// ==================== LANGUAGE TOGGLE ====================
const langToggle = document.getElementById('langToggle');
const body = document.body;

langToggle.addEventListener('click', () => {
  const currentLang = body.getAttribute('data-lang');
  const newLang = currentLang === 'en' ? 'zh' : 'en';
  body.setAttribute('data-lang', newLang);
  document.documentElement.setAttribute('lang', newLang === 'en' ? 'en' : 'zh-CN');

  // Update page title
  if (newLang === 'zh') {
    document.title = '卢子昂 — 心理学研究者';
  } else {
    document.title = "Zi'ang Lu — Psychology Researcher";
  }
});

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      current = section.getAttribute('id');
    }
  });

  navLinksAll.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && href === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ==================== FADE-IN ANIMATION ====================
const fadeElements = document.querySelectorAll(
  '.section-title, .hero-photo-wrap, .about-content, .timeline-item, ' +
  '.method-group, .hobby-card, .pub-item, .pub-figure, .project-card, .exp-item, .award-item, .contact-card'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ==================== SMOOTH SCROLL WITH OFFSET ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 60; // navbar height
      const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== FOOTER YEAR ====================
document.getElementById('year').textContent = new Date().getFullYear();

// ==================== INIT ====================
updateActiveNav();
