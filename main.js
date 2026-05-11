/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO | main.js
   Vertical scroll with theme changes per section
   ═══════════════════════════════════════════════════════════════ */

import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Utility ─────────────────────────────────────────────────────
const isMobile = () => window.innerWidth <= 768;


// ════════════════════════════════════════════════════════════════
// HERO CANVASES
// ════════════════════════════════════════════════════════════════

// ── Hero 1: Geometric network (Light) ───────────────────────────
function initLandingHero() {
  const canvas = document.getElementById('hero-canvas-landing');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  let particles = [];

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    const count = isMobile() ? 20 : 45;
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.06 * (1 - dist / 140)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37, 99, 235, 0.12)';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
}

// ── Hero 2: Data streams (Dark) ─────────────────────────────────
function initExperienceHero() {
  const canvas = document.getElementById('hero-canvas-experience');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  let streams = [];

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function createStreams() {
    const count = isMobile() ? 6 : 14;
    streams = [];
    for (let i = 0; i < count; i++) {
      streams.push({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: Math.random() * 0.6 + 0.2,
        length: Math.random() * 100 + 50,
        opacity: Math.random() * 0.1 + 0.02,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const s of streams) {
      const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.length);
      grad.addColorStop(0, `rgba(167, 139, 250, 0)`);
      grad.addColorStop(0.5, `rgba(167, 139, 250, ${s.opacity})`);
      grad.addColorStop(1, `rgba(167, 139, 250, 0)`);

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x, s.y + s.length);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      s.y += s.speed;
      if (s.y > h + s.length) {
        s.y = -s.length;
        s.x = Math.random() * w;
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  createStreams();
  draw();
  window.addEventListener('resize', () => { resize(); createStreams(); });
}


// ════════════════════════════════════════════════════════════════
// GSAP ELEMENT ANIMATIONS
// ════════════════════════════════════════════════════════════════

function initElementAnimations() {
  // ── Landing reveals (always run, no scrollTrigger needed) ──
  const landingEls = document.querySelectorAll(
    '.landing__greeting, .landing__name, .landing__title, .landing__association, .btn--primary, .landing__meta, .landing__links, .landing__summary-card, #dyk-landing'
  );

  landingEls.forEach((el, i) => {
    gsap.from(el, {
      y: 24,
      opacity: 0,
      duration: 0.6,
      delay: 0.12 + i * 0.07,
      ease: 'power3.out',
    });
  });

  // ── Scroll animations for all sections ──
  initScrollAnimations();
}


function initScrollAnimations() {
  // Theme change on scroll
  const sections = [
    { id: 'landing', theme: 'theme-light' },
    { id: 'experience', theme: 'theme-dark' },
    { id: 'lab', theme: 'theme-green' }
  ];

  sections.forEach((section, index) => {
    const el = document.getElementById(section.id);
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        document.body.className = '';
        document.body.classList.add(section.theme);
      },
      onLeaveBack: () => {
        if (index > 0) {
          document.body.className = '';
          document.body.classList.add(sections[index - 1].theme);
        }
      }
    });
  });

  // Experience section
  gsap.from('.section__heading', {
    scrollTrigger: { trigger: '#experience', start: 'top 70%' },
    y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
  });

  document.querySelectorAll('.timeline__item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 80%' },
      x: -30, opacity: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
    });
  });

  gsap.from('#education', {
    scrollTrigger: { trigger: '#education', start: 'top 80%' },
    y: 24, opacity: 0, duration: 0.6, ease: 'power3.out',
  });

  document.querySelectorAll('.comp-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      y: 24, opacity: 0, duration: 0.5, delay: i * 0.06, ease: 'power3.out',
    });
  });

  document.querySelectorAll('.project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      y: 24, opacity: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out',
    });
  });

  // Lab section
  gsap.from('.section__heading--green', {
    scrollTrigger: { trigger: '#lab', start: 'top 70%' },
    y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
  });

}


// ════════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initLandingHero();
  initExperienceHero();
  initElementAnimations();
});
