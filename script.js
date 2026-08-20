/* ============================================================
   PORTFOLIO SCRIPTS — Scandinavian Minimal Light Theme
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // -------------------------------------------
  // 0. LOAD PROJECTS FROM JSON
  // -------------------------------------------
  const defaultProjects = [
    {
      title: 'ECR Pull-through Cache',
      description: 'Hybrid image distribution strategy across 8 AWS regions, cutting costs by $163K annually.',
      tags: ['AWS', 'Terraform', 'Kubernetes'],
      icon: 'server'
    },
    {
      title: 'Internal Automation CLI',
      description: 'Bash-based developer CLI adopted by 2,000+ engineers, slashing onboarding from 1 week to 20 minutes.',
      tags: ['Bash', 'GitHub API', 'Automation'],
      icon: 'terminal'
    },
    {
      title: 'Self-Hosted Runner Platform',
      description: 'EC2-based GitHub Actions runner infrastructure with custom AMIs, auto-scaling, and Launch Templates.',
      tags: ['GitHub Actions', 'Packer', 'EC2'],
      icon: 'git-branch'
    },
    {
      title: 'CI/CD Observability Stack',
      description: 'Datadog dashboards, APM tracing, and alerting for pipeline performance across multi-region infrastructure.',
      tags: ['Datadog', 'APM', 'Monitoring'],
      icon: 'bar-chart-3'
    }
  ];

  async function loadProjects() {
    let projects = defaultProjects;
    try {
      const res = await fetch('projects.json');
      if (res.ok) projects = await res.json();
    } catch (_) { /* use defaults */ }

    const grid = document.getElementById('projects-grid');

      projects.forEach((p, i) => {
        const card = document.createElement('div');
        const offset = i % 2 === 1 ? 'md:mt-12' : '';
        card.className = `project-card group relative bg-white rounded-3xl border border-soft-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-charcoal/5 hover:-translate-y-1 hover:border-charcoal/15 ${offset}`;
        card.innerHTML = `
          <div class="aspect-[4/3] bg-gradient-to-br from-charcoal/[0.03] to-silver/10 flex items-center justify-center">
            <i data-lucide="${p.icon || 'box'}" class="w-16 h-16 text-silver/60 group-hover:text-charcoal/40 transition-colors duration-500"></i>
          </div>
          <div class="p-6 pb-7">
            <h3 class="text-lg font-semibold mb-1.5 tracking-tight">${p.title}</h3>
            <p class="text-sm text-slate leading-relaxed mb-4">${p.description}</p>
            <div class="flex gap-2 flex-wrap">
              ${(p.tags || []).map(t => `<span class="px-2.5 py-1 bg-charcoal/[0.04] rounded-md text-[11px] font-medium text-slate">${t}</span>`).join('')}
            </div>
          </div>
        `;
        grid.appendChild(card);
      });

      // Re-init Lucide icons for dynamically added elements
      lucide.createIcons();

      // Re-apply fade-up to new cards
      document.querySelectorAll('.project-card').forEach((el, i) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = `${i * 0.05}s`;
        fadeObserver.observe(el);
      });
    }
  }

  loadProjects();

  // -------------------------------------------
  // 1. PROFILE PHOTO UPLOADER
  // -------------------------------------------
  const photoSlot = document.getElementById('photo-slot');
  const photoInput = document.getElementById('photo-input');
  const photoPreview = document.getElementById('photo-preview');
  const photoPlaceholder = document.getElementById('photo-placeholder');
  const photoRemove = document.getElementById('photo-remove');
  const photoDragOverlay = document.getElementById('photo-drag-overlay');

  // Click to upload
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

  // File selected
  photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) showPhoto(file);
  });

  // Drag and drop
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
      photoPreview.src = e.target.result;
      photoPreview.classList.remove('hidden');
      photoPlaceholder.classList.add('hidden');
      photoRemove.style.display = 'flex';
      photoSlot.classList.remove('border-dashed');
      photoSlot.style.borderStyle = 'solid';
    };
    reader.readAsDataURL(file);
  }

  // Remove photo
  photoRemove.addEventListener('click', (e) => {
    e.stopPropagation();
    photoPreview.src = '';
    photoPreview.classList.add('hidden');
    photoPlaceholder.classList.remove('hidden');
    photoRemove.style.display = 'none';
    photoInput.value = '';
    photoSlot.classList.add('border-dashed');
    photoSlot.style.borderStyle = 'dashed';
  });

  // -------------------------------------------
  // 2. LIVE CLOCK & AVAILABILITY
  // -------------------------------------------
  const clockEl = document.getElementById('clock');
  const availDot = document.getElementById('availability-dot');
  const availText = document.getElementById('availability-text');

  function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');

    // 12-hour format
    const h12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    clockEl.textContent = `${h12}:${mins} ${ampm}`;

    // Availability: 9 AM to 6 PM
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
  // 3. FLOATING DOCK — ACTIVE SECTION TRACKING
  // -------------------------------------------
  const dockLinks = document.querySelectorAll('.dock-link');
  const sections = document.querySelectorAll('section[id]');

  function updateDock() {
    let currentSection = 'home';
    const scrollY = window.scrollY + window.innerHeight * 0.4;

    sections.forEach((section) => {
      if (section.offsetTop <= scrollY) {
        currentSection = section.id;
      }
    });

    dockLinks.forEach((link) => {
      const isActive = link.dataset.section === currentSection;
      if (isActive) {
        link.classList.add('active', 'text-charcoal', 'bg-charcoal/5');
        link.classList.remove('text-slate');
      } else {
        link.classList.remove('active', 'bg-charcoal/5');
        link.classList.add('text-slate');
      }
    });
  }

  window.addEventListener('scroll', updateDock, { passive: true });
  updateDock();

  // -------------------------------------------
  // 4. SMOOTH SCROLL FOR DOCK LINKS
  // -------------------------------------------
  dockLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -------------------------------------------
  // 5. FADE-UP ON SCROLL (Intersection Observer)
  // -------------------------------------------
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach((el) => fadeObserver.observe(el));

  // Apply fade-up to key sections for entrance animation
  document.querySelectorAll('.max-w-xl form, #about .grid, #about h2, #projects h2, #contact h2').forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${i * 0.05}s`;
    fadeObserver.observe(el);
  });

  // -------------------------------------------
  // 6. CONTACT FORM HANDLING
  // -------------------------------------------
  const form = document.getElementById('contact-form');
  const sendBtn = document.getElementById('send-btn');
  const sendBtnText = document.getElementById('send-btn-text');
  const sendBtnIcon = document.getElementById('send-btn-icon');
  const sendSuccess = document.getElementById('send-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) return;

    // Show success state
    sendBtnText.classList.add('hidden');
    sendBtnIcon.classList.add('hidden');
    sendSuccess.classList.add('show');
    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.7';

    // Reset after 3 seconds
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
