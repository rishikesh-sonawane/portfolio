/* ============================================================
   PORTFOLIO SCRIPTS — Config-Driven Premium Editorial
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // -------------------------------------------
  // 0. LOAD CONFIG & POPULATE EVERYTHING
  // -------------------------------------------
  const defaultConfig = {
    name: 'Rishikesh',
    fullName: 'Rishikesh Sonawane',
    role: 'Platform Engineer',
    hero: {
      greeting: "Hi, I'm",
      name: 'Rishikesh',
      tagline: 'I design and build digital experiences that scale — enterprise CI/CD infrastructure powering 2,000+ engineers across global teams.',
      cta1: 'Get in touch',
      cta1Link: '#contact',
      cta2: 'View work',
      cta2Link: '#projects'
    },
    stats: [
      { value: '4+', label: 'Years Experience' },
      { value: '$160K+', label: 'Annual Savings' },
      { value: '2K+', label: 'Engineers' }
    ],
    about: {
      heading: 'About Me',
      paragraphs: [
        'Platform Engineer with <strong>4+ years of experience</strong> designing, scaling, and operating enterprise CI/CD infrastructure on AWS.',
        'Specialized in GitHub Actions, Terraform-driven infrastructure automation, Bash/Python scripting, self-hosted runner platforms, cloud cost optimization, and developer productivity engineering.',
        'Authored an approved RFC that rearchitected ECR image distribution across 8 AWS regions, delivering over $160K in annual cost savings. Passionate about building reliable engineering platforms at scale.'
      ],
      tags: ['AWS', 'Terraform', 'GitHub Actions', 'Docker', 'Python', 'Bash', 'Linux', 'Datadog', 'Kubernetes', 'ECR'],
      quote: 'Building reliable engineering platforms that empower developers to ship faster.'
    },
    projects: {
      heading: 'Selected Work',
      description: 'A selection of projects that showcase my work in platform engineering, infrastructure automation, and developer productivity.',
      items: [
        { title: 'ECR Pull-through Cache', description: 'Hybrid image distribution strategy across 8 AWS regions, cutting costs by $163K annually while reducing pull times by 3x.', tags: ['AWS', 'Terraform', 'Kubernetes'], icon: 'server' },
        { title: 'Internal Automation CLI', description: 'Bash-based developer CLI adopted by 2,000+ engineers, slashing onboarding from 1 week to 20 minutes.', tags: ['Bash', 'GitHub API', 'Automation'], icon: 'terminal' },
        { title: 'Self-Hosted Runner Platform', description: 'EC2-based GitHub Actions runner infrastructure with custom AMIs, auto-scaling, and Launch Templates.', tags: ['GitHub Actions', 'Packer', 'EC2'], icon: 'git-branch' },
        { title: 'CI/CD Observability Stack', description: 'Datadog dashboards, APM tracing, and alerting for pipeline performance across multi-region infrastructure.', tags: ['Datadog', 'APM', 'Monitoring'], icon: 'bar-chart-3' }
      ]
    },
    contact: {
      heading: "Let's Talk",
      description: "I'm always interested in hearing about new opportunities, exciting projects, or just chatting about platform engineering.",
      namePlaceholder: 'Your name',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'Write something...',
      buttonText: 'Send Message',
      successText: 'Sent!'
    },
    social: [
      { icon: 'github', url: 'https://github.com/rishikesh-sonawane', label: 'GitHub' },
      { icon: 'linkedin', url: 'https://linkedin.com/in/rishikeshsonawane1465', label: 'LinkedIn' },
      { icon: 'mail', url: 'mailto:rishikesh.s7711@gmail.com', label: 'Email' }
    ],
    audio: { label: 'Listening to', song: 'Midnight City', artist: 'M83' },
    footer: { copyright: '© 2025 Rishikesh Sonawane', tagline: 'Built with ✦ for platform engineering' },
    dock: [
      { label: 'Home', section: 'home', icon: 'home' },
      { label: 'About', section: 'about', icon: 'user' },
      { label: 'Projects', section: 'projects', icon: 'briefcase' },
      { label: 'Contact', section: 'contact', icon: 'mail' }
    ]
  };

  async function loadConfig() {
    let config = defaultConfig;
    try {
      const res = await fetch('config.json');
      if (res.ok) config = { ...defaultConfig, ...await res.json() };
    } catch (_) { /* use defaults */ }
    applyConfig(config);
  }

  function applyConfig(c) {
    // Hero
    setText('hero-role', c.role);
    setText('hero-greeting', c.hero.greeting);
    setText('hero-name', c.hero.name);
    setText('hero-tagline', c.hero.tagline);
    setText('hero-cta1', c.hero.cta1);
    setText('hero-cta2', c.hero.cta2);

    // Stats
    const statsEl = document.getElementById('hero-stats');
    if (statsEl && c.stats) {
      statsEl.innerHTML = c.stats.map((s, i) => `
        ${i > 0 ? '<div class="w-px h-10 bg-sand/60"></div>' : ''}
        <div>
          <span class="block text-3xl font-display font-bold text-charcoal">${s.value}</span>
          <span class="text-xs text-slate mt-1 block">${s.label}</span>
        </div>
      `).join('');
    }

    // About
    setText('about-heading', c.about.heading, true);
    const aboutContent = document.getElementById('about-content');
    if (aboutContent) {
      aboutContent.innerHTML = c.about.paragraphs.map(p =>
        `<p class="text-[clamp(1.1rem,2vw,1.3rem)] text-slate leading-relaxed">${p}</p>`
      ).join('');
    }
    const aboutTags = document.getElementById('about-tags');
    if (aboutTags) {
      aboutTags.innerHTML = c.about.tags.map(t =>
        `<span class="tech-tag">${t}</span>`
      ).join('');
    }
    const aboutQuote = document.getElementById('about-quote');
    if (aboutQuote) {
      aboutQuote.querySelector('p').textContent = c.about.quote;
    }

    // Projects
    setText('projects-heading', c.projects.heading, true);
    setText('projects-desc', c.projects.description);
    const grid = document.getElementById('projects-grid');
    if (grid && c.projects.items) {
      grid.innerHTML = c.projects.items.map((p, i) => `
        <div class="project-card scroll-reveal ${i % 2 === 1 ? 'md:mt-16' : ''}" style="transition-delay: ${i * 0.08}s">
          <div class="project-img">
            <span class="project-number">0${i + 1}</span>
            <i data-lucide="${p.icon || 'box'}" class="w-14 h-14 text-silver/50"></i>
          </div>
          <div class="p-6 pb-7">
            <h3 class="text-lg font-semibold mb-1.5 tracking-tight">${p.title}</h3>
            <p class="text-sm text-slate leading-relaxed mb-4">${p.description}</p>
            <div class="flex gap-2 flex-wrap">
              ${(p.tags || []).map(t => `<span class="px-2.5 py-1 bg-warm/40 rounded-md text-[11px] font-medium text-slate">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }

    // Contact
    setText('contact-heading', c.contact.heading, true);
    setText('contact-desc', c.contact.description);
    setPlaceholder('name', c.contact.namePlaceholder);
    setPlaceholder('email', c.contact.emailPlaceholder);
    setPlaceholder('message', c.contact.messagePlaceholder);
    setText('send-btn-text', c.contact.buttonText);
    setText('send-success-text', c.contact.successText);

    // Social links
    const socialEl = document.getElementById('social-links');
    if (socialEl) {
      socialEl.innerHTML = c.social.map(s =>
        `<a href="${s.url}" target="_blank" class="social-link" aria-label="${s.label}">
          <i data-lucide="${s.icon}" class="w-[18px] h-[18px]"></i>
        </a>`
      ).join('');
    }

    // Audio widget
    setText('audio-label', c.audio.label);
    setText('audio-song', c.audio.song);
    setText('audio-artist', c.audio.artist);

    // Footer
    setText('footer-copyright', c.footer.copyright);
    const footerTagline = document.getElementById('footer-tagline');
    if (footerTagline) {
      const parts = c.footer.tagline.split('✦').map(s => s.trim());
      footerTagline.innerHTML = `<span>${parts[0]}</span><span class="text-terra">✦</span><span>${parts[1] || ''}</span>`;
    }

    // Dock
    const dock = document.getElementById('dock');
    if (dock) {
      dock.innerHTML = c.dock.map((d, i) => `
        <a href="#${d.section}" data-section="${d.section}" class="dock-link ${i === 0 ? 'active' : ''} flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ${i === 0 ? 'text-charcoal' : 'text-slate'}">
          <i data-lucide="${d.icon}" class="w-4 h-4"></i>
          <span class="dock-label">${d.label}</span>
        </a>
      `).join('');
    }

    // Update page title
    document.title = `${c.fullName} — ${c.role}`;

    // Re-init icons after dynamic content
    lucide.createIcons();

    // Re-observe scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach((el) => scrollObserver.observe(el));

    // Re-observe project cards
    document.querySelectorAll('.project-card').forEach((el) => scrollObserver.observe(el));

    // Re-init dock
    initDock();
  }

  function setText(id, text, isHtml) {
    const el = document.getElementById(id);
    if (el) {
      if (isHtml) el.innerHTML = text;
      else el.textContent = text;
    }
  }

  function setPlaceholder(id, text) {
    const el = document.getElementById(id);
    if (el) el.placeholder = text;
  }

  loadConfig();

  // -------------------------------------------
  // 1. HERO ENTRANCE ANIMATION
  // -------------------------------------------
  setTimeout(() => {
    document.querySelectorAll('.hero-reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 200);

  // -------------------------------------------
  // 2. SCROLL REVEAL
  // -------------------------------------------
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.scroll-reveal').forEach((el) => scrollObserver.observe(el));

  // -------------------------------------------
  // 3. PROFILE PHOTO — localStorage persistence
  // -------------------------------------------
  const photoSlot = document.getElementById('photo-slot');
  const photoInput = document.getElementById('photo-input');
  const photoPreview = document.getElementById('photo-preview');
  const photoPlaceholder = document.getElementById('photo-placeholder');
  const photoRemove = document.getElementById('photo-remove');
  const photoDragOverlay = document.getElementById('photo-drag-overlay');
  const STORAGE_KEY = 'portfolio_photo';

  // Load saved photo on page load
  const savedPhoto = localStorage.getItem(STORAGE_KEY);
  if (savedPhoto) {
    photoPreview.src = savedPhoto;
    photoPreview.classList.remove('hidden');
    photoPlaceholder.classList.add('hidden');
    photoRemove.style.display = 'flex';
  }

  photoSlot.addEventListener('click', (e) => {
    if (e.target === photoRemove || photoRemove.contains(e.target)) return;
    photoInput.click();
  });

  photoSlot.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      photoInput.click();
    }
  });

  photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) showPhoto(file);
  });

  photoSlot.addEventListener('dragover', (e) => {
    e.preventDefault();
    photoSlot.classList.add('dragging');
    photoDragOverlay.classList.remove('hidden');
  });

  photoSlot.addEventListener('dragleave', () => {
    photoSlot.classList.remove('dragging');
    photoDragOverlay.classList.add('hidden');
  });

  photoSlot.addEventListener('drop', (e) => {
    e.preventDefault();
    photoSlot.classList.remove('dragging');
    photoDragOverlay.classList.add('hidden');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) showPhoto(file);
  });

  function showPhoto(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      photoPreview.src = dataUrl;
      photoPreview.classList.remove('hidden');
      photoPlaceholder.classList.add('hidden');
      photoRemove.style.display = 'flex';
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, dataUrl);
      } catch (err) {
        console.warn('Photo too large for localStorage:', err);
      }
    };
    reader.readAsDataURL(file);
  }

  photoRemove.addEventListener('click', (e) => {
    e.stopPropagation();
    photoPreview.src = '';
    photoPreview.classList.add('hidden');
    photoPlaceholder.classList.remove('hidden');
    photoRemove.style.display = 'none';
    photoInput.value = '';
    localStorage.removeItem(STORAGE_KEY);
  });

  // -------------------------------------------
  // 4. LIVE CLOCK & AVAILABILITY
  // -------------------------------------------
  const clockEl = document.getElementById('clock');
  const availDot = document.getElementById('availability-dot');
  const availText = document.getElementById('availability-text');

  function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const h12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    clockEl.textContent = `${h12}:${mins} ${ampm}`;

    if (hours >= 9 && hours < 18) {
      availDot.innerHTML = `
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>`;
      availText.textContent = 'Available for new projects';
      availText.className = 'text-xs font-medium text-slate hidden sm:inline';
    } else {
      availDot.innerHTML = `
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>`;
      availText.textContent = 'Away, but replying soon';
      availText.className = 'text-xs font-medium text-amber-600 hidden sm:inline';
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  // -------------------------------------------
  // 5. FLOATING DOCK — ACTIVE SECTION
  // -------------------------------------------
  function initDock() {
    const dockLinks = document.querySelectorAll('.dock-link');
    const sections = document.querySelectorAll('section[id]');

    function updateDock() {
      let currentSection = 'home';
      const scrollY = window.scrollY + window.innerHeight * 0.4;
      sections.forEach((section) => {
        if (section.offsetTop <= scrollY) currentSection = section.id;
      });
      dockLinks.forEach((link) => {
        const isActive = link.dataset.section === currentSection;
        if (isActive) {
          link.classList.add('active', 'text-charcoal');
          link.classList.remove('text-slate');
        } else {
          link.classList.remove('active');
          link.classList.add('text-slate');
        }
      });
    }

    window.addEventListener('scroll', updateDock, { passive: true });
    updateDock();

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Init dock for initial HTML links
  initDock();

  // -------------------------------------------
  // 6. CONTACT FORM
  // -------------------------------------------
  const form = document.getElementById('contact-form');
  const sendBtn = document.getElementById('send-btn');
  const sendBtnText = document.getElementById('send-btn-text');
  const sendBtnIcon = document.getElementById('send-btn-icon');
  const sendSuccess = document.getElementById('send-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) return;

    sendBtnText.classList.add('hidden');
    sendBtnIcon.classList.add('hidden');
    sendSuccess.classList.add('show');
    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.7';

    setTimeout(() => {
      form.reset();
      sendBtnText.classList.remove('hidden');
      sendBtnIcon.classList.remove('hidden');
      sendSuccess.classList.remove('show');
      sendSuccess.classList.add('hidden');
      sendBtn.disabled = false;
      sendBtn.style.opacity = '1';
    }, 3000);
  });
});
