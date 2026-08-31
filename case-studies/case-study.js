/* ============================================================
   CASE STUDY — Dynamic Content Loader
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('project');

  if (!slug) {
    document.body.innerHTML = `
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-2xl font-display font-semibold mb-4">No project specified</h1>
          <a href="../index.html" class="text-terra underline">Back to Portfolio</a>
        </div>
      </div>`;
    return;
  }

  loadProject(slug);

  // Scroll reveal
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

  function observeScrollReveals() {
    document.querySelectorAll('.scroll-reveal:not(.visible)').forEach((el) => {
      scrollObserver.observe(el);
    });
  }

  // Hero entrance
  function animateHero() {
    setTimeout(() => {
      document.querySelectorAll('.hero-reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 120);
      });
    }, 200);
  }

  async function loadProject(slug) {
    try {
      const res = await fetch(`data/${slug}.json`);
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      renderProject(data);
    } catch (err) {
      document.body.innerHTML = `
        <div class="min-h-screen flex items-center justify-center">
          <div class="text-center">
            <h1 class="text-2xl font-display font-semibold mb-4">Case study not found</h1>
            <p class="text-slate mb-6">The project "${slug}" doesn't have a case study yet.</p>
            <a href="../index.html" class="text-terra underline">Back to Portfolio</a>
          </div>
        </div>`;
    }
  }

  function renderProject(d) {
    // Page title
    document.title = `${d.title} — Case Study | Rishikesh Sonawane`;

    // Section label
    setText('cs-section-label', d.category || 'Case Study');

    // Cover image
    if (d.coverImage) {
      const cover = document.getElementById('cs-cover');
      const coverImg = document.getElementById('cs-cover-img');
      if (cover && coverImg) {
        coverImg.src = d.coverImage;
        coverImg.alt = d.title;
        cover.classList.remove('hidden');
      }
    }

    // Hero
    setText('cs-category', d.category || 'Case Study');
    setText('cs-title', d.title);
    setText('cs-subtitle', d.subtitle);

    // Hero tags
    const heroTags = document.getElementById('cs-hero-tags');
    if (heroTags && d.tags) {
      heroTags.innerHTML = d.tags.map(t =>
        `<span class="tech-tag">${t}</span>`
      ).join('');
    }

    // Overview
    const overviewEl = document.getElementById('cs-overview');
    if (overviewEl && d.overview) {
      overviewEl.innerHTML = d.overview.map(p =>
        `<p class="text-[clamp(1.05rem,1.8vw,1.25rem)] text-slate leading-relaxed">${p}</p>`
      ).join('');
    }

    // Metrics
    const metricsEl = document.getElementById('cs-metrics');
    if (metricsEl && d.metrics) {
      metricsEl.innerHTML = d.metrics.map(m => `
        <div class="glass-surface rounded-2xl p-6 text-center">
          <span class="block text-3xl md:text-4xl font-display font-bold text-terra">${m.value}</span>
          <span class="text-xs text-slate mt-2 block">${m.label}</span>
        </div>
      `).join('');
    }

    // Hide metrics section if none
    if (!d.metrics || d.metrics.length === 0) {
      document.getElementById('cs-metrics-section').style.display = 'none';
    }

    // Challenge
    const challengeEl = document.getElementById('cs-challenge');
    if (challengeEl && d.challenge) {
      challengeEl.innerHTML = d.challenge.map(p =>
        `<p class="text-[clamp(1.05rem,1.8vw,1.25rem)] text-slate leading-relaxed">${p}</p>`
      ).join('');
    }

    // Solution
    const solutionEl = document.getElementById('cs-solution');
    if (solutionEl && d.solution) {
      solutionEl.innerHTML = `<h3 class="text-lg font-semibold mb-4 tracking-tight">The Solution</h3>` +
        d.solution.map(p =>
          `<p class="text-[clamp(1.05rem,1.8vw,1.25rem)] text-slate leading-relaxed">${p}</p>`
        ).join('');
    }

    // Architecture
    const archEl = document.getElementById('cs-architecture');
    if (archEl && d.architecture) {
      archEl.innerHTML = d.architecture.map(block => {
        if (block.heading) {
          return `<h3 class="text-lg font-semibold mb-3 tracking-tight">${block.heading}</h3>` +
            block.content.map(p =>
              `<p class="text-[clamp(1.05rem,1.8vw,1.25rem)] text-slate leading-relaxed">${p}</p>`
            ).join('');
        }
        return block.content.map(p =>
          `<p class="text-[clamp(1.05rem,1.8vw,1.25rem)] text-slate leading-relaxed">${p}</p>`
        ).join('');
      }).join('');
    }

    // Hide architecture section if none
    if (!d.architecture || d.architecture.length === 0) {
      document.getElementById('cs-architecture-section').style.display = 'none';
    }

    // Tech stack
    const techEl = document.getElementById('cs-tech');
    if (techEl && d.techStack) {
      techEl.innerHTML = d.techStack.map(t =>
        `<span class="tech-tag">${t}</span>`
      ).join('');
    }

    // Timeline
    const timelineEl = document.getElementById('cs-timeline');
    if (timelineEl && d.timeline) {
      timelineEl.innerHTML = d.timeline.map((item, i) => `
        <div class="flex gap-6 ${i < d.timeline.length - 1 ? 'pb-8' : ''}">
          <div class="flex flex-col items-center">
            <div class="w-3 h-3 rounded-full bg-terra flex-shrink-0 mt-1.5"></div>
            ${i < d.timeline.length - 1 ? '<div class="w-px flex-1 bg-sand/60 mt-2"></div>' : ''}
          </div>
          <div class="pb-2">
            <span class="text-[10px] font-mono font-medium text-terra uppercase tracking-[0.15em]">${item.phase}</span>
            <h4 class="text-base font-semibold mt-1 tracking-tight">${item.title}</h4>
            <p class="text-sm text-slate leading-relaxed mt-1">${item.description}</p>
          </div>
        </div>
      `).join('');
    }

    // Hide timeline section if none
    if (!d.timeline || d.timeline.length === 0) {
      document.getElementById('cs-timeline-section').style.display = 'none';
    }

    // Key learnings
    const learningsEl = document.getElementById('cs-learnings');
    if (learningsEl && d.learnings) {
      learningsEl.innerHTML = d.learnings.map(p =>
        `<p class="text-[clamp(1.05rem,1.8vw,1.25rem)] text-slate leading-relaxed">${p}</p>`
      ).join('');
    }

    // Hide learnings section if none
    if (!d.learnings || d.learnings.length === 0) {
      document.getElementById('cs-learnings-section').style.display = 'none';
    }

    // Re-init icons and animations
    lucide.createIcons();
    animateHero();
    setTimeout(observeScrollReveals, 100);
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
});
