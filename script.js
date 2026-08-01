/* ==========================================================================
   PORTFOLIO SITE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PROFILE PHOTO / AVATAR FALLBACK ---------- */
  const userPhotoImg = document.getElementById('userPhotoImg');
  const defaultAvatarSvg = document.getElementById('defaultAvatarSvg');

  if (userPhotoImg) {
    function showPhoto() {
      userPhotoImg.style.display = 'block';
      if (defaultAvatarSvg) defaultAvatarSvg.style.display = 'none';
    }
    function showAvatar() {
      userPhotoImg.style.display = 'none';
      if (defaultAvatarSvg) defaultAvatarSvg.style.display = 'block';
    }

    userPhotoImg.addEventListener('load', showPhoto);
    userPhotoImg.addEventListener('error', showAvatar);

    // Handle the case where the image was already loaded from cache
    // before this script ran (the 'load' event won't fire again).
    if (userPhotoImg.complete) {
      if (userPhotoImg.naturalWidth > 0) {
        showPhoto();
      } else {
        showAvatar();
      }
    }
  }

  /* ---------- THEME TOGGLE (Dark / Light) ---------- */
  const html = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  const savedTheme = localStorageSafeGet('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorageSafeSet('theme', next);
  });

  // Safe wrappers in case localStorage is unavailable (e.g. sandboxed preview)
  function localStorageSafeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function localStorageSafeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* no-op */ }
  }

  /* ---------- MOBILE NAV MENU ---------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  navLinks.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
  });

  /* ---------- HEADER SCROLL SHADOW ---------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 12) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ---------- LEETCODE CODE COLLAPSE TOGGLES ---------- */
  document.querySelectorAll('.toggle-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const codeBlock = document.getElementById(targetId);
      if (!codeBlock) return;

      const isOpen = codeBlock.classList.toggle('open');
      const icon = btn.querySelector('i');
      const label = btn.querySelector('span');

      if (icon) icon.classList.toggle('fa-chevron-down', !isOpen);
      if (icon) icon.classList.toggle('fa-chevron-up', isOpen);
      if (label) label.textContent = isOpen ? 'Hide Solution' : 'View Solution';
    });
  });

  /* ---------- PROJECT CASE STUDY MODAL ---------- */
  const caseStudyModal = document.getElementById('caseStudyModal');
  const modalContainer = document.getElementById('modalContainer');
  const closeModalBtn = document.getElementById('closeModalBtn');

  const caseStudies = {
    campuskart: {
      title: 'CampusKart - Peer Marketplace & Real-Time Chat',
      body: `
        <p><strong>Overview:</strong> A full-stack marketplace built for students to buy, sell, and trade textbooks and electronics within their campus network.</p>
        <p><strong>Architecture:</strong> React front end communicating with an Express REST API, MongoDB for listings and user data, and Socket.io for real-time buyer-seller chat. JWT-based authentication secures every route.</p>
        <p><strong>Highlights:</strong> Optimized MongoDB indexes for fast search, debounced client-side filtering, and a WebSocket layer that keeps chat state in sync across sessions.</p>
      `
    },
    algotrack: {
      title: 'AlgoTrack - DSA Revision Analytics',
      body: `
        <p><strong>Overview:</strong> A personal tracker for logging LeetCode-style problems and scheduling revisions using spaced repetition.</p>
        <p><strong>Architecture:</strong> React dashboard with Chart.js visualizations, an Express API for CRUD operations, and MongoDB storing problem metadata, difficulty, and review history.</p>
        <p><strong>Highlights:</strong> A spaced-repetition scheduler that reorders due problems automatically, and analytics views that break down solved problems by pattern and difficulty.</p>
      `
    },
    devfeed: {
      title: 'DevFeed - Tech Blogging & Snippet Platform',
      body: `
        <p><strong>Overview:</strong> A blogging platform for developers to publish markdown tutorials, share reusable code snippets, and engage through comments and reactions.</p>
        <p><strong>Architecture:</strong> React + Redux front end, Express backend, MongoDB for posts and comments, with a markdown parser rendering rich post content safely.</p>
        <p><strong>Highlights:</strong> Syntax-highlighted code blocks, optimistic UI updates for comments/reactions, and role-based access for authors vs. readers.</p>
      `
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const study = caseStudies[key];
      if (!study) return;

      modalContainer.innerHTML = `<h2>${study.title}</h2><div class="modal-body">${study.body}</div>`;
      caseStudyModal.classList.add('open');
      caseStudyModal.setAttribute('aria-hidden', 'false');
    });
  });

  function closeModal() {
    caseStudyModal.classList.remove('open');
    caseStudyModal.setAttribute('aria-hidden', 'true');
  }

  closeModalBtn.addEventListener('click', closeModal);
  caseStudyModal.addEventListener('click', (e) => {
    if (e.target === caseStudyModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------- COPY EMAIL BUTTON ---------- */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailVal = document.getElementById('emailVal');

  copyEmailBtn.addEventListener('click', async () => {
    const email = emailVal.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      showToast('Email copied to clipboard!');
    } catch (e) {
      showToast('Could not copy email — please copy manually.');
    }
  });

  /* ---------- CONTACT FORM SUBMIT (demo only, no backend wired) ---------- */
  const contactForm = document.getElementById('humanContactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Message ready! Connect a backend or mailto link to send it.');
    contactForm.reset();
  });

  /* ---------- TOAST NOTIFICATION ---------- */
  const toastNotification = document.getElementById('toastNotification');
  let toastTimeout;

  function showToast(message) {
    toastNotification.innerHTML = `
      <div class="toast-msg">
        <i class="fa-solid fa-circle-check text-emerald"></i>
        <span>${message}</span>
      </div>
    `;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.innerHTML = '';
    }, 3200);
  }

});