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
      
    },
    algotrack: {
     
    },
    devfeed: {
     
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

  /* ---------- CONTACT FORM SUBMIT (mailto — opens the visitor's email client) ---------- */
  const contactForm = document.getElementById('humanContactForm');
  const DEST_EMAIL = 'omgujar105@gmail.com';

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameField = document.getElementById('cName');
    const emailField = document.getElementById('cEmail');
    const messageField = document.getElementById('cMessage');

    const name = nameField.value.trim();
    const senderEmail = emailField.value.trim();
    const message = messageField.value.trim();

    if (!name || !senderEmail || !message) {
      showToast('Please fill in all fields before sending.');
      return;
    }

    const subject = `Portfolio Inquiry from ${name}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${senderEmail}\n\n` +
      `${message}`;

    const mailtoUrl =
      `mailto:${DEST_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    // Opens the visitor's default email client (Gmail, Outlook, Mail app, etc.)
    // with the message pre-filled and ready to send.
    window.location.href = mailtoUrl;

    showToast('Opening your email client to send the message...');
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