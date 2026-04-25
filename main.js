/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO | main.js
   Horizontal GSAP scroll (desktop) + vertical native (mobile)
   ═══════════════════════════════════════════════════════════════ */

import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Utility ─────────────────────────────────────────────────────
const isMobile = () => window.innerWidth <= 768;


// ════════════════════════════════════════════════════════════════
// HORIZONTAL SCROLL (Desktop only)
// ════════════════════════════════════════════════════════════════

function initHorizontalScroll() {
  if (isMobile()) return;

  const container = document.getElementById('scroll-container');
  const panels = gsap.utils.toArray('.panel');

  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      end: () => '+=' + container.offsetWidth,
      invalidateOnRefresh: true,
    },
  });
}


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

// ── Hero 3: Matrix rain (Green) ─────────────────────────────────
function initLabHero() {
  const canvas = document.getElementById('hero-canvas-lab');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  let columns = [];
  const chars = '01MTLUNIXDVETLSQL';
  const fontSize = 14;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    const cols = Math.floor(w / fontSize);
    columns = new Array(cols).fill(0).map(() => Math.random() * h / fontSize | 0);
  }

  function draw() {
    ctx.fillStyle = 'rgba(6, 14, 6, 0.06)';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(74, 222, 128, 0.1)';
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

    for (let i = 0; i < columns.length; i++) {
      const char = chars[Math.random() * chars.length | 0];
      ctx.fillText(char, i * fontSize, columns[i] * fontSize);

      if (columns[i] * fontSize > h && Math.random() > 0.975) {
        columns[i] = 0;
      }
      columns[i]++;
    }

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
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

  // ── For panels 2 and 3, use ScrollTrigger on mobile,
  //    and manual trigger on desktop (since horizontal scroll
  //    makes them off-screen initially) ──

  if (isMobile()) {
    initMobileScrollAnimations();
  } else {
    initDesktopPanelAnimations();
  }
}

function initMobileScrollAnimations() {
  // Experience
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

  // Lab
  gsap.from('.section__heading--green', {
    scrollTrigger: { trigger: '#lab', start: 'top 70%' },
    y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
  });



  document.querySelectorAll('.easter-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 90%' },
      scale: 0.92, opacity: 0, duration: 0.4, delay: i * 0.05, ease: 'back.out(1.2)',
    });
  });

  gsap.from('.terminal', {
    scrollTrigger: { trigger: '.terminal', start: 'top 85%' },
    y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
  });
}

function initDesktopPanelAnimations() {
  // On desktop, panels scroll horizontally. We use the horizontal
  // scroll progress to trigger animations when a panel enters view.

  const panels = gsap.utils.toArray('.panel');

  // Panel 2 (experience) | trigger when it enters
  ScrollTrigger.create({
    trigger: panels[0],
    start: 'top top',
    end: () => '+=' + window.innerWidth * 3,
    onUpdate: (self) => {
      const progress = self.progress;

      // Panel 2 enters at ~33% progress
      if (progress > 0.25 && !panels[1].dataset.animated) {
        panels[1].dataset.animated = 'true';
        animateExperiencePanel();
      }

      // Panel 3 enters at ~66% progress
      if (progress > 0.58 && !panels[2].dataset.animated) {
        panels[2].dataset.animated = 'true';
        animateLabPanel();
      }
    },
  });
}

function animateExperiencePanel() {
  const section = document.getElementById('experience');

  gsap.from(section.querySelector('.section__heading'), {
    y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
  });

  section.querySelectorAll('.timeline__item').forEach((item, i) => {
    gsap.from(item, {
      x: -30, opacity: 0, duration: 0.6, delay: 0.1 + i * 0.1, ease: 'power3.out',
    });
  });

  gsap.from(section.querySelector('#education'), {
    y: 24, opacity: 0, duration: 0.6, delay: 0.4, ease: 'power3.out',
  });

  section.querySelectorAll('.comp-card').forEach((card, i) => {
    gsap.from(card, {
      y: 24, opacity: 0, duration: 0.5, delay: 0.5 + i * 0.06, ease: 'power3.out',
    });
  });

  section.querySelectorAll('.project-card').forEach((card, i) => {
    gsap.from(card, {
      y: 24, opacity: 0, duration: 0.5, delay: 0.7 + i * 0.08, ease: 'power3.out',
    });
  });
}

function animateLabPanel() {
  const section = document.getElementById('lab');

  gsap.from(section.querySelector('.section__heading--green'), {
    y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
  });

  gsap.from(section.querySelector('.lab__subtitle'), {
    y: 16, opacity: 0, duration: 0.5, delay: 0.15, ease: 'power3.out',
  });



  section.querySelectorAll('.easter-card').forEach((card, i) => {
    gsap.from(card, {
      scale: 0.92, opacity: 0, duration: 0.4, delay: 0.4 + i * 0.05, ease: 'back.out(1.2)',
    });
  });

  gsap.from(section.querySelector('.terminal'), {
    y: 30, opacity: 0, duration: 0.7, delay: 0.6, ease: 'power3.out',
  });
}


// ════════════════════════════════════════════════════════════════
// EASTER EGGS
// ════════════════════════════════════════════════════════════════

function initEasterEggs() {
  // ── Click counter ──
  let clickCount = 0;
  const clickEl = document.getElementById('easter-click-counter');
  const countEl = document.getElementById('click-count');
  const hintEl = document.getElementById('click-hint');

  const clickMessages = [
    { threshold: 5, msg: 'Getting there.' },
    { threshold: 10, msg: 'Committed.' },
    { threshold: 25, msg: 'Testing limits?' },
    { threshold: 50, msg: 'You win.' },
    { threshold: 100, msg: 'Counter broken. Satisfied?' },
  ];

  if (clickEl) {
    clickEl.addEventListener('click', () => {
      clickCount++;
      countEl.textContent = clickCount;
      const message = [...clickMessages].reverse().find(m => clickCount >= m.threshold);
      hintEl.textContent = message ? message.msg : 'Keep going...';
    });
  }

  // ── Time-based message ──
  const timeEl = document.getElementById('time-message');
  if (timeEl) {
    const hour = new Date().getHours();
    let msg;
    if (hour >= 0 && hour < 5) msg = 'Late session. Probably debugging.';
    else if (hour < 9) msg = 'Early start. Good.';
    else if (hour < 12) msg = 'Peak hours. Build something.';
    else if (hour < 17) msg = 'Afternoon. Stay focused.';
    else if (hour < 21) msg = 'Evening. Good time to explore.';
    else msg = 'Night mode. Code flows better after dark.';
    timeEl.textContent = msg;
  }

  // ── Konami code ──
  const konamiSeq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIdx = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiSeq[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konamiSeq.length) {
        konamiIdx = 0;
        activateKonami();
      }
    } else {
      konamiIdx = 0;
    }
  });

  function activateKonami() {
    document.body.classList.add('konami-active');
    const card = document.getElementById('easter-konami');
    if (card) {
      card.querySelector('h4').textContent = 'Unlocked.';
      card.querySelector('p').textContent = 'You found it. Respect.';
      card.style.borderColor = '#F59E0B';
      card.style.background = '#1A1A0D';
    }
    setTimeout(() => document.body.classList.remove('konami-active'), 600);
  }

  // ── Random facts ──
  const facts = [
    'First line of code was Python | automating a spreadsheet.',
    '"LunixDV" is a portmanteau of Linux + Data Visualization.',
    'Once debugged a 400-line SQL query. One misplaced comma.',
    'Tested DuckDB analytics on a Raspberry Pi. It worked.',
    'Preferred distro: Fedora. "It just works."',
    'Centaur API named after the chess concept | human + machine.',
    'Every data engineer should know basic probability theory.',
    'Terminal theme: always dark green on black.',
  ];
  let factIdx = 0;

  const factCard = document.getElementById('easter-fact');
  const factText = document.getElementById('random-fact');
  if (factCard) {
    factCard.addEventListener('click', () => {
      factText.textContent = facts[factIdx % facts.length];
      factIdx++;
    });
  }

  // ── Uptime counter ──
  const uptimeEl = document.getElementById('uptime-counter');
  const startTime = Date.now();

  function updateUptime() {
    if (!uptimeEl) return;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    uptimeEl.textContent = m > 0 ? `${m}m ${s}s` : `${s}s`;
    requestAnimationFrame(updateUptime);
  }
  updateUptime();

  // ── Terminal commands ──
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  const commands = {
    help: 'Available: help, whoami, skills, projects, clear, neofetch, echo, date',
    whoami: 'Michael Tunwashe | Data & Systems Engineer, Lagos',
    skills: 'Python, SQL, Bash, Docker, Linux, dbt, SQLAlchemy, GSAP',
    projects: 'WXATA | BRIS | Centaur Trading API | ClauseZero',
    neofetch: `  LUNIX DV
  OS: Fedora Linux  |  Shell: bash  |  DE: tty`,
    date: new Date().toLocaleString(),
    echo: 'Usage: echo <message>',
    clear: '__CLEAR__',
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const raw = terminalInput.value.trim();
        if (!raw) return;
        terminalInput.value = '';

        const [cmd, ...args] = raw.toLowerCase().split(' ');

        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal__line';
        cmdLine.innerHTML = `<span class="terminal__prompt">$</span> <span class="terminal__cmd">${escapeHtml(raw)}</span>`;

        const inputLine = terminalBody.querySelector('.terminal__line--input');
        terminalBody.insertBefore(cmdLine, inputLine);

        if (cmd === 'clear') {
          const lines = terminalBody.querySelectorAll('.terminal__line:not(.terminal__line--input), .terminal__output');
          lines.forEach(l => l.remove());
          return;
        }

        let output;
        if (cmd === 'echo') {
          output = args.join(' ') || '';
        } else {
          output = commands[cmd] || `command not found: ${cmd}. Try "help"`;
        }

        const outEl = document.createElement('div');
        outEl.className = 'terminal__output';
        outEl.style.whiteSpace = 'pre-wrap';
        outEl.textContent = output;
        terminalBody.insertBefore(outEl, inputLine);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


function initProjectModals() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const overlay = modal.querySelector('.modal__overlay');
  const closeBtn = modal.querySelector('.modal__close');
  const titleEl = document.getElementById('modal-title');
  const detailsEl = document.getElementById('modal-details');
  const githubLink = document.getElementById('modal-github');
  const liveLink = document.getElementById('modal-live');

  const openModal = (data) => {
    titleEl.textContent = data.title;
    detailsEl.textContent = data.details;
    githubLink.href = data.github || '#';
    liveLink.href = data.live || '#';
    
    // Toggle visibility of buttons if no link provided
    githubLink.style.display = data.github ? 'inline-flex' : 'none';
    liveLink.style.display = data.live && data.live !== '#' ? 'inline-flex' : 'none';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      openModal(card.dataset);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}


// ════════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initLandingHero();
  initExperienceHero();
  initLabHero();
  initHorizontalScroll();
  initElementAnimations();
  initEasterEggs();
  initProjectModals();
});
