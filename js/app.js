/**
 * Portfolio App — Main JavaScript (v2.0 — Full Sync)
 * Vanilla JS, no frameworks
 * Full synchronization with Admin Dashboard via localStorage
 * ─────────────────────────────────────────────────────────
 */

(function () {
    'use strict';

    // ═══════ UTILITIES ═══════
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str || '';
        return div.innerHTML;
    }

    // ═══════ DEFAULT DATA ═══════
    const DEFAULT_SETTINGS = {
        _v: 2,
        heroTitle: "Hi, I'm Amin Saadati",
        heroDesc: 'Network infrastructure design and implementation specialist, security and surveillance systems with over 5 years of experience in commercial and industrial projects.',
        aboutBio: "I'm Amin Saadati, a specialist in designing and implementing network infrastructure and security systems. With experience in diverse commercial and industrial projects, my focus is on delivering professional, reliable, and scalable solutions.",
        aboutName: 'Amin Saadati',
        aboutEmail: 'amin@example.com',
        aboutLocation: 'Tehran, Iran',
        aboutPhone: '+98 912 345 6789',
        github: 'https://github.com/AminSaadatiIT',
        linkedin: 'https://linkedin.com',
        telegram: 'https://t.me/',
        statsProjects: 50,
        statsClients: 35,
        statsYears: 5,
        typewriterPhrases: [
            'Network Infrastructure Specialist',
            'CCTV & Security Systems',
            'Fiber Optic Expert',
            'Passive Network Designer',
            'Security System Architect'
        ]
    };

    const DEFAULT_SKILLS = [
        {
            group: 'Passive Network',
            icon: '🔌',
            color: 'rgba(0,112,243,0.15)',
            items: [
                { name: 'Structured Cabling', level: 95 },
                { name: 'Fiber Optic', level: 90 },
                { name: 'Rack Installation', level: 92 },
                { name: 'Cable Management', level: 88 }
            ]
        },
        {
            group: 'Active Network',
            icon: '📡',
            color: 'rgba(121,40,202,0.15)',
            items: [
                { name: 'Cisco Switching', level: 85 },
                { name: 'MikroTik', level: 88 },
                { name: 'Wireless Design', level: 82 },
                { name: 'VoIP Systems', level: 78 }
            ]
        },
        {
            group: 'Security',
            icon: '🛡️',
            color: 'rgba(255,0,128,0.15)',
            items: [
                { name: 'CCTV Systems', level: 94 },
                { name: 'Access Control', level: 86 },
                { name: 'Fire Alarm', level: 80 },
                { name: 'Intrusion Detection', level: 75 }
            ]
        }
    ];

    const DEFAULT_PROJECTS = [
        {
            id: 1,
            title: 'Commercial Building Cabling',
            client: 'Pars Technology Co.',
            date: '2025-01',
            location: 'Tehran',
            short: 'Structured Cat6A cabling implementation for a 12-story building.',
            long: 'The project included full network infrastructure design and execution from scratch. Horizontal and vertical cabling performed to TIA-568 standards with all links tested and certified.',
            metrics: ['12 floors', '480+ cable links', '100% certified', 'TIA-568 compliant'],
            categories: ['cabling'],
            gradient: 'linear-gradient(135deg, #0070f3, #00dfd8)',
            images: [],
            videos: []
        },
        {
            id: 2,
            title: 'Video Surveillance System',
            client: 'Bozorgmehr Commercial Center',
            date: '2024-09',
            location: 'Isfahan',
            short: '64 IP cameras installed with central NVR and 24/7 monitoring.',
            long: 'Design and implementation of a CCTV system including Bullet and Dome cameras for indoor and outdoor use. Remote access via mobile application.',
            metrics: ['64 cameras', '24/7 monitoring', '99.9% uptime', 'Mobile access'],
            categories: ['cctv', 'security'],
            gradient: 'linear-gradient(135deg, #7928ca, #ff0080)',
            images: [],
            videos: []
        },
        {
            id: 3,
            title: 'Standard Server Room',
            client: 'Sepah Bank',
            date: '2024-06',
            location: 'Tehran',
            short: 'Standard server room design and build with cooling system.',
            long: 'Project included installation of 4x 42-unit racks, patch panels, managed switches, UPS, and environmental monitoring system.',
            metrics: ['4x 42U racks', 'Redundant UPS', 'TIER-2 compliant', 'Zero downtime'],
            categories: ['rack', 'cabling'],
            gradient: 'linear-gradient(135deg, #ff0080, #f5a623)',
            images: [],
            videos: []
        },
        {
            id: 4,
            title: 'Inter-Building Fiber Optic',
            client: 'University of Tehran',
            date: '2024-03',
            location: 'Tehran',
            short: 'Connecting 5 buildings with single-mode fiber optic.',
            long: 'Fusion splicing, ODF installation, and OTDR testing to ensure link quality.',
            metrics: ['5 buildings', '2.4km fiber', '<0.3dB loss', 'OTDR certified'],
            categories: ['fiber'],
            gradient: 'linear-gradient(135deg, #00c853, #0070f3)',
            images: [],
            videos: []
        },
        {
            id: 5,
            title: 'Access Control System',
            client: 'Negin Office Building',
            date: '2023-11',
            location: 'Mashhad',
            short: 'Access control system with card reader and fingerprint.',
            long: 'Installation of 20 access control devices with central management software and reporting.',
            metrics: ['20 access points', 'Biometric + Card', 'Central management', 'Audit logs'],
            categories: ['security'],
            gradient: 'linear-gradient(135deg, #f5a623, #ff0080)',
            images: [],
            videos: []
        },
        {
            id: 6,
            title: 'Factory CCTV Network',
            client: 'Khuzestan Steel Factory',
            date: '2023-07',
            location: 'Ahvaz',
            short: '120-point video surveillance in an industrial environment.',
            long: 'Explosion-proof and waterproof cameras with IP68 ratings for harsh industrial environments.',
            metrics: ['120 cameras', 'IP68 rated', 'Explosion-proof', '-20°C to +60°C'],
            categories: ['cctv', 'cabling'],
            gradient: 'linear-gradient(135deg, #0070f3, #7928ca)',
            images: [],
            videos: []
        }
    ];

    const DEFAULT_EXPERIENCE = [
        {
            date: '2024 — Present',
            title: 'Network Project Manager',
            company: 'Freelance',
            desc: 'Managing and executing network infrastructure and security projects for diverse clients.'
        },
        {
            date: '2022 — 2024',
            title: 'Senior Network Engineer',
            company: 'IT Solutions Company',
            desc: 'Designing and implementing network infrastructure and security systems.'
        },
        {
            date: '2020 — 2022',
            title: 'Network Technician',
            company: 'Telecommunications Company',
            desc: 'Installing and maintaining network equipment and surveillance systems.'
        }
    ];

    const DEFAULT_TESTIMONIALS = [
        {
            text: 'We needed 480 network links certified across 12 floors in 3 weeks. Amin delivered ahead of schedule with 100% pass on first test — the cleanest rack work our data center team has seen.',
            name: 'Ali Mohammadi',
            role: 'CTO — Pars Technology',
            initials: 'AM'
        },
        {
            text: 'Amin upgraded our aging analog system to 64 IP cameras with zero disruption to business hours. Staff training and remote mobile access were included — our security response time dropped from minutes to seconds.',
            name: 'Sara Ahmadi',
            role: 'CEO — Negin Systems',
            initials: 'SA'
        },
        {
            text: 'The CCTV project was delivered with the best possible quality and within the allocated budget. Two years later, not a single callback — documentation made our own maintenance trivial.',
            name: 'Reza Karimi',
            role: 'Building Manager — Commercial Complex',
            initials: 'RK'
        },
        {
            text: 'Our campus backbone needed 2.4km of single-mode fiber between 5 buildings. OTDR results came back under 0.3dB per span. Precision splicing and immaculate ODF organization.',
            name: 'Dr. Hossein Rezaei',
            role: 'IT Director — University of Tehran',
            initials: 'HR'
        },
        {
            text: 'From empty room to a fully certified server room in 6 weeks — racks, redundant UPS, cooling, monitoring. Passed our bank\'s Tier-2 audit on first inspection.',
            name: 'Maryam Hosseini',
            role: 'Infrastructure Lead — Sepah Bank',
            initials: 'MH'
        }
    ];

    // ═══════ DATA LOADER ═══════
    function loadData(key, defaults) {
        try {
            const stored = localStorage.getItem('portfolio_' + key);
            if (!stored) return defaults;
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length === 0) return defaults;
            return parsed;
        } catch {
            return defaults;
        }
    }

    function loadSettings() {
        try {
            const stored = localStorage.getItem('portfolio_settings');
            if (!stored) return DEFAULT_SETTINGS;
            const parsed = JSON.parse(stored);
            if (!parsed._v || parsed._v < DEFAULT_SETTINGS._v) {
                localStorage.removeItem('portfolio_settings');
                return DEFAULT_SETTINGS;
            }
            return { ...DEFAULT_SETTINGS, ...parsed };
        } catch {
            return DEFAULT_SETTINGS;
        }
    }

    const siteData = {
        settings: loadSettings(),
        skills: loadData('skills', DEFAULT_SKILLS),
        projects: loadData('projects', DEFAULT_PROJECTS), // replaced by case-study JSON after fetch
        experience: loadData('experience', DEFAULT_EXPERIENCE),
        testimonials: loadData('testimonials', DEFAULT_TESTIMONIALS)
    };

    // ═══════ CASE-STUDY PROJECTS LOADER (data/projects.json + admin override) ═══════
    // Priority: 1) admin Case-Studies editor (portfolio_case_studies)
    //           2) data/projects.json (shipped file)
    //           3) built-in DEFAULT_PROJECTS (never an empty grid)
    function loadCaseStudyProjects() {
        // Admin Case-Studies editor wins over everything
        try {
            const adminCases = JSON.parse(localStorage.getItem('portfolio_case_studies') || 'null');
            if (Array.isArray(adminCases) && adminCases.length) {
                siteData.projects = adminCases;
                return Promise.resolve();
            }
        } catch (err) { /* fall through to JSON */ }

        return fetch('data/projects.json', { cache: 'no-cache' })
            .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(json => {
                if (!Array.isArray(json) || !json.length) return;
                const adminOverride = localStorage.getItem('portfolio_projects');
                let useAdmin = false;
                try { useAdmin = !!(adminOverride && JSON.parse(adminOverride).length); } catch { useAdmin = false; }
                if (!useAdmin) siteData.projects = json;
            })
            .catch(() => { /* offline or file missing: DEFAULT_PROJECTS stay in place */ });
    }

    // ═══════ APPLY SETTINGS TO DOM ═══════
    function applySettings() {
        const s = siteData.settings;

        // Hero Title (with gradient effect on last part)
        const heroTitle = $('.hero-title');
        if (heroTitle && s.heroTitle) {
            const parts = s.heroTitle.trim().split(' ');
            if (parts.length > 2) {
                const lastTwo = parts.slice(-2).join(' ');
                const rest = parts.slice(0, -2).join(' ');
                heroTitle.innerHTML = `${escapeHTML(rest)} <span class="text-gradient">${escapeHTML(lastTwo)}</span>`;
            } else {
                heroTitle.innerHTML = `<span class="text-gradient">${escapeHTML(s.heroTitle)}</span>`;
            }
        }

        // Hero Description
        const heroDesc = $('.hero-desc');
        if (heroDesc && s.heroDesc) {
            heroDesc.textContent = s.heroDesc;
        }

        // About Bio
        const aboutBio = $('.about-bio');
        if (aboutBio && s.aboutBio) {
            aboutBio.textContent = s.aboutBio;
        }

        // About Details (name, email, location, phone)
        const details = $$('.detail-item');
        if (details.length >= 4) {
            const nameVal = details[0]?.querySelector('.detail-value');
            const emailVal = details[1]?.querySelector('.detail-value a');
            const locVal = details[2]?.querySelector('.detail-value');
            const phoneVal = details[3]?.querySelector('.detail-value a');

            if (nameVal && s.aboutName) nameVal.textContent = s.aboutName;
            if (emailVal && s.aboutEmail) {
                emailVal.textContent = s.aboutEmail;
                emailVal.href = 'mailto:' + s.aboutEmail;
            }
            if (locVal && s.aboutLocation) locVal.textContent = s.aboutLocation;
            if (phoneVal && s.aboutPhone) {
                phoneVal.textContent = s.aboutPhone;
                phoneVal.href = 'tel:' + s.aboutPhone.replace(/[^\d+]/g, '');
            }
        }

        // Stats
        const statItems = $$('.stat-number');
        if (statItems.length >= 3) {
            if (s.statsProjects) statItems[0].dataset.count = s.statsProjects;
            if (s.statsClients) statItems[1].dataset.count = s.statsClients;
            if (s.statsYears) statItems[2].dataset.count = s.statsYears;
        }

        // Social Links (Footer)
        const footerLinks = $$('.footer-links a');
        if (footerLinks[0] && s.github) footerLinks[0].href = s.github;
        if (footerLinks[1] && s.linkedin) footerLinks[1].href = s.linkedin;
        if (footerLinks[2] && s.telegram) footerLinks[2].href = s.telegram;
    }

    // ═══════ SCROLL PROGRESS ═══════
    function initScrollProgress() {
        const bar = $('#scrollBar');
        if (!bar) return;

        function update() {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            const p = h > 0 ? (window.scrollY / h) * 100 : 0;
            bar.style.width = p + '%';
        }

        window.addEventListener('scroll', () => {
            requestAnimationFrame(update);
        }, { passive: true });

        update();
    }

    // ═══════ PARALLAX BACKGROUND ═══════
    function initParallax() {
        if (prefersReducedMotion || isMobile) return;

        const orbs = [
            { el: $('#orb1'), sx: 0.12, sy: -0.075 },
            { el: $('#orb2'), sx: -0.09, sy: 0.105 },
            { el: $('#orb3'), sx: 0.06, sy: -0.045, rotate: true },
            { el: $('#orb4'), sx: -0.075, sy: -0.06 },
            { el: $('#orb5'), sx: 0.045, sy: 0.09 }
        ];
        const grid = $('#auroraGrid');

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const y = window.scrollY;
                    orbs.forEach(o => {
                        if (!o.el) return;
                        const tx = y * o.sx;
                        const ty = y * o.sy;
                        const r = o.rotate ? ` rotate(${y * 0.015}deg)` : '';
                        o.el.style.transform = `translate3d(${tx}px,${ty}px,0)${r}`;
                    });
                    if (grid) {
                        grid.style.transform = `rotate(${y * 0.004}deg) scale(${1 + y * 0.00006})`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ═══════ CUSTOM CURSOR — zero-lag dot + ring (both synchronous) ═══════
    // Both layers are written DIRECTLY on mousemove — no lerp, no rAF hop,
    // no trailing. They move AT mouse speed: zero perceived latency.
    function initCustomCursor() {
        // Pointer feedback, not decoration — active even under reduced motion.
        // Gate on POINTER TYPE, not screen width: a narrow desktop window or
        // split-screen browser still has a fine mouse pointer.
        if (window.matchMedia('(pointer: coarse)').matches) return;
        const dot = $('#cursorDot');
        const ring = $('#cursorRing');
        if (!dot || !ring) return;

        document.body.classList.add('custom-cursor-active');

        let seen = false;
        let mx = -100, my = -100;   // last real mouse position
        let raf = 0;

        const write = () => {
            raf = 0;
            dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
            ring.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;
        };
        const schedule = () => { if (!raf) raf = requestAnimationFrame(write); };

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            if (!seen) { seen = true; dot.classList.add('is-visible'); ring.classList.add('is-visible'); write(); }
            schedule();   // coalesce moves into one write per frame — both layers ALWAYS in lockstep
        }, { passive: true });

        // Hover states: grow ring over interactive elements, text-bar over fields
        const HOVER_SELECTOR = 'a, button, [role="button"], .filter-btn, .slider-dot, .faq-item, .custom-select-trigger, label, summary';
        const TEXT_SELECTOR = 'input[type="text"], input[type="email"], input[type="tel"], input[type="number"], textarea, [contenteditable="true"]';

        document.addEventListener('mouseover', e => {
            if (e.target.closest(TEXT_SELECTOR)) ring.classList.add('is-text');
            else if (e.target.closest(HOVER_SELECTOR)) ring.classList.add('is-hover');
        });
        document.addEventListener('mouseout', e => {
            if (e.target.closest(TEXT_SELECTOR)) ring.classList.remove('is-text');
            else if (e.target.closest(HOVER_SELECTOR)) ring.classList.remove('is-hover');
        });

        // Press feedback
        document.addEventListener('mousedown', () => dot.classList.add('is-down'));
        document.addEventListener('mouseup', () => dot.classList.remove('is-down'));

        // Hide when pointer leaves the window
        document.addEventListener('mouseleave', () => { dot.classList.remove('is-visible'); ring.classList.remove('is-visible'); });
        document.addEventListener('mouseenter', () => { if (seen) { dot.classList.add('is-visible'); ring.classList.add('is-visible'); } });

        // Safety net: if the tab was backgrounded mid-move or an event was
        // coalesced away, one late frame re-syncs both layers before paint.
        document.addEventListener('visibilitychange', () => { if (!document.hidden && seen) schedule(); });

        console.info('[cursor] zero-lag cursor active');
    }

    // CURSOR GLOW: intentionally disabled. A 500px gradient easing behind the
    // pointer reads as mouse lag even at high fps, and costs a full-window
    // recomposite per frame. The dot+ring cursor above is the only pointer layer.

    // ═══════ PARTICLES & METEORS ═══════
    function initParticles() {
        if (prefersReducedMotion || isMobile) return;
        const container = $('#particles');
        if (!container) return;

        for (let i = 0; i < 35; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (8 + Math.random() * 14) + 's';
            p.style.animationDelay = (Math.random() * 10) + 's';
            const size = (1 + Math.random() * 2) + 'px';
            p.style.width = size;
            p.style.height = size;
            container.appendChild(p);
        }

        for (let i = 0; i < 3; i++) {
            const m = document.createElement('div');
            m.className = 'meteor';
            m.style.left = (15 + Math.random() * 70) + '%';
            m.style.top = Math.random() * 25 + '%';
            m.style.animationDuration = (3.5 + Math.random() * 4) + 's';
            m.style.animationDelay = (i * 6 + Math.random() * 5) + 's';
            container.appendChild(m);
        }
    }

    // ═══════ TYPEWRITER ═══════
    function initTypewriter() {
        const el = $('#typewriter');
        if (!el) return;

        const phrases = siteData.settings.typewriterPhrases || DEFAULT_SETTINGS.typewriterPhrases;

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const current = phrases[phraseIndex];

            if (!isDeleting) {
                el.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) {
                    isDeleting = true;
                    setTimeout(type, 2000);
                    return;
                }
                setTimeout(type, 80);
            } else {
                el.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(type, 400);
                    return;
                }
                setTimeout(type, 40);
            }
        }

        type();
    }

    // ═══════ COUNTER ANIMATION ═══════
    function initCounters() {
        const counters = $$('[data-count]');
        if (!counters.length) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count, 10);
                    animateCount(el, target);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }

    function animateCount(el, target) {
        // Screen readers get the final value immediately, never the animated zeros
        el.setAttribute('aria-label', String(target));
        let current = 0;
        const step = Math.max(1, Math.floor(target / 60));
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            el.textContent = current;
        }, 30);
    }

    // ═══════ SKILLS RENDER ═══════
    function renderSkills() {
        const container = $('#skillsContainer');
        if (!container) return;

        container.innerHTML = siteData.skills.map(group => `
            <div class="skill-group">
                <h3 class="skill-group-title">
                    <span class="skill-group-icon" style="background:${escapeHTML(group.color)}">${escapeHTML(group.icon)}</span>
                    ${escapeHTML(group.group)}
                </h3>
                ${(group.items || []).map(item => `
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>${escapeHTML(item.name)}</span>
                            <span>${item.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-fill" data-width="${item.level}"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');

        const skillsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $$('.skill-fill', entry.target).forEach(fill => {
                        fill.style.width = fill.dataset.width + '%';
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        $$('.skill-group', container).forEach(g => skillsObserver.observe(g));
    }

    // ═══════ PROJECTS RENDER ═══════
    // ═══════ CASE-STUDY CARD RENDER ═══════
    const CASE_FALLBACK = {
        cabling: 'images/projects/cabling/placeholder.svg',
        cctv: 'images/projects/cctv/placeholder.svg',
        security: 'images/projects/cctv/placeholder.svg',
        rack: 'images/projects/server-room/placeholder.svg',
        fiber: 'images/projects/fiber/placeholder.svg'
    };
    // Cover-photo probe: a missing photo must never leave a broken image
    const mediaCache = {};

    function probeMedia(url) {
        if (!url) return Promise.resolve(null);
        if (url in mediaCache) return Promise.resolve(mediaCache[url]);
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => { mediaCache[url] = url; resolve(url); };
            img.onerror = () => { mediaCache[url] = null; resolve(null); };
            img.src = url;
        });
    }

    function caseMedia(p) {
        const primary = p.cover || (p.gallery && p.gallery[0]) || '';
        const fallback = p.fallback || CASE_FALLBACK[(p.categories || [])[0]] || 'images/placeholder.svg';
        return probeMedia(primary).then(found => found || fallback);
    }

    function renderProjects() {
        const grid = $('#projectsGrid');
        if (!grid) return;

        if (!siteData.projects.length) {
            grid.innerHTML = '<p style="text-align:center;color:var(--text-3);padding:40px;">No projects available.</p>';
            return;
        }

        grid.innerHTML = siteData.projects.map(p => {
            const firstCat = (p.categories || [])[0] || 'cabling';
            const fallback = p.fallback || CASE_FALLBACK[firstCat] || 'images/placeholder.svg';
            const cover = p.cover || (p.gallery && p.gallery[0]) || fallback;
            const hasVideo = !!(p.video && String(p.video).trim());
            const hasGallery = !!(p.gallery && p.gallery.length);
            return `
            <article class="project-card case-card showing"
                     data-categories="${escapeHTML((p.categories || []).join(','))}"
                     data-id="${p.id}"
                     tabindex="0"
                     aria-label="Open case study: ${escapeHTML(p.title)}">
                <div class="case-cover">
                    <img class="case-cover-img" src="${escapeHTML(fallback)}" data-primary="${escapeHTML(cover)}"
                         alt="${escapeHTML(p.title)} cover" loading="lazy">
                    <div class="case-cover-shade"></div>
                    ${hasVideo ? '<span class="case-flag">▶ Video</span>' : ''}
                    <span class="case-year">${escapeHTML(p.year || '')}</span>
                </div>
                <div class="case-body">
                    <div class="case-kicker">
                        <span class="case-category">${escapeHTML(p.category || (p.categories || []).join(' / '))}</span>
                        ${p.location ? `<span class="case-loc">${escapeHTML(p.location)}</span>` : ''}
                    </div>
                    <h3 class="case-title">${escapeHTML(p.title)}</h3>
                    <p class="case-desc">${escapeHTML(p.description || p.short || '')}</p>
                    ${p.metrics ? `<div class="case-metrics">${p.metrics.slice(0, 4).map(m => `<span class="metric-tag">${escapeHTML(m)}</span>`).join('')}</div>` : ''}
                    <div class="case-role-line">
                        <span class="case-role-label">Role</span>
                        <span class="case-role-value">${escapeHTML(p.role || '')}</span>
                    </div>
                    <div class="case-actions">
                        <button class="case-btn case-btn-primary" data-action="case" data-id="${p.id}">
                            <span aria-hidden="true">▤</span> View Case Study
                        </button>
                        ${hasGallery ? `<button class="case-btn" data-action="gallery" data-id="${p.id}">
                            <span aria-hidden="true">▦</span> Photo Gallery
                        </button>` : ''}
                        ${hasVideo ? `<button class="case-btn" data-action="video" data-id="${p.id}">
                            <span aria-hidden="true">▶</span> Video Demo
                        </button>` : ''}
                    </div>
                </div>
            </article>`;
        }).join('');

        // Wire actions (event delegation) — idempotent
        if (!grid.dataset.csWired) {
            grid.dataset.csWired = '1';
            grid.addEventListener('click', e => {
                const btn = e.target.closest('.case-btn');
                if (btn) {
                    e.stopPropagation();
                    const id = parseInt(btn.dataset.id, 10);
                    const p = siteData.projects.find(x => x.id === id);
                    if (!p) return;
                    const action = btn.dataset.action;
                    if (action === 'gallery') {
                        const items = (p.gallery || []).filter(Boolean);
                        if (items.length) openLightbox(items, 0, p.title);
                        return;
                    }
                    if (action === 'video') { openProjectModal(id); openVideoDemo(p); return; }
                    openProjectModal(id);
                    return;
                }
                const card = e.target.closest('.case-card');
                if (card) openProjectModal(parseInt(card.dataset.id, 10));
            });
            grid.addEventListener('keydown', e => {
                if (e.key !== 'Enter') return;
                const card = e.target.closest('.case-card');
                if (!card) return;
                if (document.activeElement !== card) return;   // buttons handle their own Enter
                openProjectModal(parseInt(card.dataset.id, 10));
            });
        }

        // Resolve real covers async — instant SVG fallback, photo swaps in
        siteData.projects.forEach(p => {
            caseMedia(p).then(url => {
                if (!url) return;
                const img = grid.querySelector(`.case-card[data-id="${p.id}"] .case-cover-img`);
                if (img) img.src = url;
            });
        });
    }

    // ═══════ PROJECT FILTER ═══════
    function initProjectFilter() {
        const buttons = $$('#caseStudyFilters .filter-btn');
        const grid = $('#projectsGrid');
        if (!buttons.length || !grid) return;

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                const filter = btn.dataset.filter;
                const cards = $$('.project-card', grid);

                cards.forEach(card => {
                    const cats = card.dataset.categories.split(',');
                    const show = filter === 'all' || cats.includes(filter);

                    card.classList.remove('showing', 'hiding');
                    if (show) {
                        setTimeout(() => card.classList.add('showing'), 10);
                        card.style.display = '';
                    } else {
                        card.classList.add('hiding');
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // ═══════ PROJECT MODAL ═══════    // ═══════ MODAL ACCESSIBILITY HELPERS ═══════
    // Focus trap: keeps Tab cycling inside an open dialog, restores focus on close.
    const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    let lastFocused = null;

    function trapFocus(modal, e) {
        const focusables = $$(FOCUSABLE, modal).filter(el => el.offsetParent !== null);
        if (!focusables.length) { e.preventDefault(); return; }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    }

    function openModal(modal) {
        lastFocused = document.activeElement;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        const target = $$(FOCUSABLE, modal).filter(el => el.offsetParent !== null)[0];
        (target || modal).focus();
    }

    function closeModal(modal) {
        modal.hidden = true;
        document.body.style.overflow = '';
        if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function openProjectModal(id) {
        const p = siteData.projects.find(x => x.id === id);
        if (!p) return;

        // G4 deep link: keep URL shareable while the case study is open
        try {
            const u = new URL(location.href);
            u.searchParams.set('project', String(id));
            history.replaceState(null, '', u);
        } catch (err) {}        const modal = $('#projectModal');
        const hero = $('#csHero');
        const title = $('#csTitle');
        const facts = $('#csFacts');
        const metrics = $('#csMetrics');
        const overview = $('#csOverview');
        const scope = $('#csScope');
        const role = $('#csRole');
        const tech = $('#csTech');
        const gallerySection = $('#csGallerySection');
        const gallery = $('#csGallery');
        const diagramSection = $('#csDiagramSection');
        const diagram = $('#csDiagram');

        // 1. Hero media — video if present, otherwise the cover photo
        const heroFallback = p.fallback || CASE_FALLBACK[(p.categories || [])[0]] || 'images/placeholder.svg';
        if (p.video && String(p.video).trim()) {
            const poster = p.cover || heroFallback;
            hero.innerHTML = `
                <video class="cs-video" controls preload="metadata" poster="${escapeHTML(poster)}">
                    <source src="${escapeHTML(p.video)}" type="video/mp4">
                    Your browser does not support embedded video.
                </video>`;
        } else {
            hero.innerHTML = `<img class="cs-hero-img" src="${escapeHTML(heroFallback)}" data-primary="${escapeHTML(p.cover || '')}" alt="${escapeHTML(p.title)} hero">`;
            const heroImg = hero.querySelector('img');
            caseMedia(p).then(url => { if (url && heroImg) heroImg.src = url; });
        }

        // Header + key facts (recruiter answers in 10 seconds)
        title.textContent = p.title || '';
        facts.innerHTML = [
            p.category ? `<span class="cs-fact"><span class="cs-fact-label">Category</span>${escapeHTML(p.category)}</span>` : '',
            p.year ? `<span class="cs-fact"><span class="cs-fact-label">Year</span>${escapeHTML(p.year)}</span>` : '',
            p.role ? `<span class="cs-fact"><span class="cs-fact-label">Role</span>${escapeHTML(p.role)}</span>` : '',
            p.client ? `<span class="cs-fact"><span class="cs-fact-label">Client</span>${escapeHTML(p.client)}</span>` : '',
            p.location ? `<span class="cs-fact"><span class="cs-fact-label">Location</span>${escapeHTML(p.location)}</span>` : ''
        ].join('');

        // Metrics band
        metrics.innerHTML = (p.metrics || []).map(m => `<span class="cs-metric">${escapeHTML(m)}</span>`).join('');

        // 2. Overview
        overview.textContent = p.description || p.short || '';
        scope.textContent = p.scope ? 'Scope: ' + p.scope : '';
        scope.hidden = !p.scope;

        // 3. My role
        role.textContent = p.roleDetail || p.role || '';

        // 4. Technologies
        tech.innerHTML = (p.technologies || []).map(t => `<span class="cs-tech-tag">${escapeHTML(t)}</span>`).join('');

        // 5. Gallery (click → lightbox)
        const items = (p.gallery || []).filter(Boolean);
        if (items.length) {
            gallerySection.hidden = false;
            gallery.innerHTML = items.map((src, i) => `
                <button class="cs-thumb" data-index="${i}" aria-label="Enlarge photo ${i + 1} of ${items.length}">
                    <img src="${escapeHTML(src)}" alt="${escapeHTML(p.title)} photo ${i + 1}" loading="lazy"
                         onerror="this.closest('.cs-thumb').classList.add('cs-thumb-missing');this.removeAttribute('src');">
                    <span class="cs-thumb-index">${i + 1}</span>
                </button>
            `).join('');
            gallery.dataset.images = JSON.stringify(items);
            gallery.dataset.title = p.title || 'Project photo';
            $$('.cs-thumb', gallery).forEach(thumb => {
                thumb.addEventListener('click', () => openLightbox(items, parseInt(thumb.dataset.index, 10), p.title));
            });
        } else {
            gallerySection.hidden = true;
            gallery.innerHTML = '';
        }

        // 6. Diagram
        if (p.diagram) {
            diagramSection.hidden = false;
            diagram.src = p.diagram;
            diagram.onerror = () => { diagramSection.hidden = true; };
            diagram.alt = (p.title || 'Project') + ' technical diagram';
        } else {
            diagramSection.hidden = true;
        }

        // 7-9. Challenges / Solutions / Results
        const fill = (id, arr, sym) => {
            $(id).innerHTML = (arr && arr.length)
                ? arr.map(x => `<li><span class="cs-li-sym">${sym}</span><span>${escapeHTML(x)}</span></li>`).join('')
                : '<li class="cs-empty">—</li>';
        };
        fill('#csChallenges', p.challenges, '!');
        fill('#csSolutions', p.solutions, '→');
        fill('#csResults', p.results, '✓');

        openModal(modal);
    }

    // Open case study and auto-scroll to the hero video
    function openVideoDemo(p) {
        const hero = $('#csHero');
        const video = hero && hero.querySelector('video');
        if (video) {
            try { video.play().catch(() => {}); } catch (err) {}
        }
    }

    function closeProjectModal() {
        const modal = $('#projectModal');
        if (modal && !modal.hidden) {
            closeModal(modal);
            // G4: strip the share param when the case study closes
            try {
                const u = new URL(location.href);
                if (u.searchParams.has('project')) {
                    u.searchParams.delete('project');
                    history.replaceState(null, '', u);
                }
            } catch (err) {}
        }
    }

    // G4: open a case study directly from ?project=<id> once data is in
    function openFromDeepLink() {
        try {
            const raw = new URLSearchParams(location.search).get('project');
            if (!raw) return;
            const id = parseInt(raw, 10);
            if (siteData.projects.some(x => x.id === id)) {
                openProjectModal(id);
            }
        } catch (err) {}
    }

    // Wire case-study modal chrome: close button, backdrop click, Escape
    function initCaseStudyModal() {
        const modal = $('#projectModal');
        if (!modal || modal.dataset.csWired) return;
        modal.dataset.csWired = '1';

        $('#modalClose')?.addEventListener('click', closeProjectModal);
        modal.addEventListener('click', e => {
            if (e.target === modal) closeProjectModal();
        });
        modal.addEventListener('keydown', e => {
            if (e.key === 'Tab') trapFocus(modal, e);
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal && !modal.hidden && $('#lightbox').hidden) closeProjectModal();
        });
    }

    // ═══════ GALLERY LIGHTBOX ═══════
    let lightboxItems = [];
    let lightboxIndex = 0;
    let lightboxTitle = '';

    function openLightbox(items, index, title) {
        lightboxItems = items || [];
        lightboxIndex = Math.max(0, Math.min(index, lightboxItems.length - 1));
        lightboxTitle = title || 'Project photo';
        const box = $('#lightbox');
        if (!box || !lightboxItems.length) return;
        updateLightbox();
        box.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function updateLightbox() {
        const img = $('#lightboxImg');
        const cap = $('#lightboxCaption');
        img.src = lightboxItems[lightboxIndex];
        img.alt = lightboxTitle + ' — image ' + (lightboxIndex + 1) + ' of ' + lightboxItems.length;
        cap.textContent = lightboxTitle + ' — ' + (lightboxIndex + 1) + ' / ' + lightboxItems.length;
        const multi = lightboxItems.length > 1;
        $('#lightboxPrev').hidden = !multi;
        $('#lightboxNext').hidden = !multi;
    }

    function closeLightbox() {
        const box = $('#lightbox');
        if (!box || box.hidden) return;
        box.hidden = true;
        $('#lightboxImg').src = '';
        // return scroll to the case study beneath
        document.body.style.overflow = '';
    }

    function lightboxStep(delta) {
        if (!lightboxItems.length) return;
        lightboxIndex = (lightboxIndex + delta + lightboxItems.length) % lightboxItems.length;
        updateLightbox();
    }

    function initLightbox() {
        const box = $('#lightbox');
        if (!box) return;
        $('#lightboxClose').addEventListener('click', closeLightbox);
        $('#lightboxPrev').addEventListener('click', () => lightboxStep(-1));
        $('#lightboxNext').addEventListener('click', () => lightboxStep(1));
        box.addEventListener('click', e => { if (e.target === box) closeLightbox(); });
        document.addEventListener('keydown', e => {
            if (box.hidden) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightboxStep(-1);
            if (e.key === 'ArrowRight') lightboxStep(1);
        });
    }

    // ═══════ EXPERIENCE RENDER ═══════
    function renderExperience() {
        const container = $('#timelineContainer');
        if (!container) return;

        if (!siteData.experience.length) {
            container.innerHTML = '<p style="color:var(--text-3);">No experience recorded.</p>';
            return;
        }

        container.innerHTML = siteData.experience.map(exp => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-date">${escapeHTML(exp.date || '')}</div>
                <h3>${escapeHTML(exp.title || '')}</h3>
                <h4>${escapeHTML(exp.company || '')}</h4>
                <p>${escapeHTML(exp.desc || '')}</p>
            </div>
        `).join('');
    }

       // ═══════ TESTIMONIALS SLIDER (Pro with Stars) ═══════
    function renderStarsHTML(rating) {
        const r = parseInt(rating, 10) || 5;
        let html = '<div class="testimonial-stars">';
        for (let i = 1; i <= 5; i++) {
            html += `<span class="${i <= r ? '' : 'star-empty'}">★</span>`;
        }
        html += '</div>';
        return html;
    }

    function initTestimonials() {
        const track = $('#sliderTrack');
        const dotsContainer = $('#sliderDots');
        const prevBtn = $('#sliderPrev');
        const nextBtn = $('#sliderNext');
        if (!track) return;

        let current = 0;
        const data = siteData.testimonials;

        if (!data.length) {
            track.innerHTML = `
                <div class="testimonial-card" style="text-align:center;">
                    <p class="testimonial-text">No reviews yet. Be the first!</p>
                </div>
            `;
            return;
        }

        track.innerHTML = data.map(t => `
            <div class="testimonial-card">
                ${renderStarsHTML(t.rating || 5)}
                <p class="testimonial-text">${escapeHTML(t.text || '')}</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar">${escapeHTML(t.initials || '?')}</div>
                    <div>
                        <div class="testimonial-name">${escapeHTML(t.name || '')}</div>
                        <div class="testimonial-role">${escapeHTML(t.role || '')}</div>
                    </div>
                </div>
            </div>
        `).join('');

        if (dotsContainer) {
            dotsContainer.innerHTML = data.map((_, i) =>
                `<div class="slider-dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>`
            ).join('');

            dotsContainer.addEventListener('click', e => {
                const dot = e.target.closest('.slider-dot');
                if (dot) goTo(parseInt(dot.dataset.index, 10));
            });
        }

        function goTo(index) {
            current = Math.max(0, Math.min(index, data.length - 1));
            track.style.transform = `translateX(${current * 100}%)`;
            $$('.slider-dot', dotsContainer).forEach((d, i) => {
                d.classList.toggle('active', i === current);
            });
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

        let startX = 0;
        track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? goTo(current + 1) : goTo(current - 1);
            }
        }, { passive: true });
    }

    // ═══════ REVIEW SUBMISSION FORM ═══════
    function initReviewForm() {
        const openBtn = $('#openReviewFormBtn');
        const modal = $('#reviewModal');
        const closeBtn = $('#reviewClose');
        const form = $('#reviewForm');
        if (!openBtn || !modal || !form) return;

        const stars = $$('.star', $('#reviewStars'));

        openBtn.addEventListener('click', () => openModal(modal));

        const closeReviewModal = () => closeModal(modal);
        closeBtn?.addEventListener('click', closeReviewModal);
        modal.addEventListener('click', e => {
            if (e.target === modal) closeReviewModal();
        });
        modal.addEventListener('keydown', e => {
            if (e.key === 'Tab') trapFocus(modal, e);
        });

        const starsContainer = $('#reviewStars');
        stars.forEach((star, i) => {
            star.addEventListener('mouseenter', () => {
                stars.forEach((s, j) => s.classList.toggle('active', j <= i));
            });
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.value, 10);
                starsContainer.dataset.rating = rating;
                stars.forEach((s, j) => s.classList.toggle('active', j < rating));
            });
        });
        starsContainer.addEventListener('mouseleave', () => {
            const rating = parseInt(starsContainer.dataset.rating, 10) || 5;
            stars.forEach((s, j) => s.classList.toggle('active', j < rating));
        });

        stars.forEach((s, j) => s.classList.toggle('active', j < 5));

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = $('#reviewName').value.trim();
            const email = $('#reviewEmail').value.trim();
            const role = $('#reviewRole').value.trim();
            const text = $('#reviewText').value.trim();
            const rating = parseInt(starsContainer.dataset.rating, 10) || 5;

            let valid = true;
            if (name.length < 2) {
                $('#reviewNameError').textContent = 'Name must be at least 2 characters.';
                valid = false;
            } else $('#reviewNameError').textContent = '';

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                $('#reviewEmailError').textContent = 'Please enter a valid email.';
                valid = false;
            } else $('#reviewEmailError').textContent = '';

            if (text.length < 20) {
                $('#reviewTextError').textContent = 'Message must be at least 20 characters.';
                valid = false;
            } else $('#reviewTextError').textContent = '';

            if (!valid) return;

            const review = {
                _v: 2,
                name, email, role, text, rating,
                date: new Date().toISOString(),
                status: 'pending'
            };

            const pending = JSON.parse(localStorage.getItem('portfolio_testimonials_pending') || '[]');
            pending.push(review);
            localStorage.setItem('portfolio_testimonials_pending', JSON.stringify(pending));

            try {
                const emailConfig = JSON.parse(localStorage.getItem('portfolio_emailjs') || '{}');
                const adminEmail = localStorage.getItem('portfolio_admin_email') || '';
                if (emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey && window.emailjs && adminEmail) {
                    await window.emailjs.send(
                        emailConfig.serviceId,
                        emailConfig.templateId,
                        {
                            to_email: adminEmail,
                            from_name: name,
                            from_email: email,
                            role: role || 'N/A',
                            rating: rating + ' / 5',
                            message: text,
                            date: new Date().toLocaleDateString('en-US'),
                            status: 'Pending Approval'
                        },
                        emailConfig.publicKey
                    );
                }
            } catch (err) {
                console.warn('Email failed:', err);
            }

            form.innerHTML = `
                <div style="text-align:center;padding:40px 20px;">
                    <div style="font-size:48px;margin-bottom:16px;">✅</div>
                    <h3 style="color:var(--green);margin-bottom:12px;">Thank you!</h3>
                    <p style="color:var(--text-2);line-height:1.7;">
                        Your review has been submitted and will appear on the site after approval.
                    </p>
                    <button type="button" class="btn btn-outline review-close-btn" style="margin-top:20px;">
                        Close
                    </button>
                </div>
            `;
            form.querySelector('.review-close-btn')?.addEventListener('click', () => {
                const m = document.getElementById('reviewModal');
                if (m && !m.hidden) closeModal(m);
            });
        });
    }

    function validateField(input) {
        const errorEl = input.parentElement?.querySelector('.form-error');
        if (!errorEl) return true;
        let valid = true;
        let msg = '';

        if (input.type === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
                valid = false;
                msg = 'Please enter a valid email.';
            }
        } else if (input.tagName === 'TEXTAREA' || input.tagName === 'INPUT') {
            if (!input.value.trim()) {
                valid = false;
                msg = 'This field is required.';
            } else {
                const min = parseInt(input.getAttribute('minlength'), 10) || 2;
                if (input.value.trim().length < min) {
                    valid = false;
                    msg = `Minimum ${min} characters required.`;
                }
            }
        }

        errorEl.textContent = msg;
        input.classList.toggle('error', !valid);
        return valid;
    }

    function initForms() {
        const forms = $$('#contactForm, #hireForm');

        forms.forEach(form => {
            const inputs = $$('.form-input[required]', form);

            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) validateField(input);
                });
            });

            form.addEventListener('submit', e => {
                e.preventDefault();

                let valid = true;
                inputs.forEach(input => {
                    if (!validateField(input)) valid = false;
                });

                // Validate custom selects
                form.querySelectorAll('.custom-select[data-required]').forEach(sel => {
                    const hidden = sel.parentElement.querySelector('.custom-select-value');
                    const errorEl = sel.parentElement.querySelector('.form-error');
                    if (hidden && !hidden.value && errorEl) {
                        errorEl.textContent = 'Please select an option.';
                        valid = false;
                    } else if (errorEl) {
                        errorEl.textContent = '';
                    }
                });

                if (valid) {
                    const formData = {};
                    $$('input, textarea, select', form).forEach(el => {
                        if (el.name) formData[el.name] = el.value;
                    });
                    formData.type = form.id === 'hireForm' ? 'hire' : 'contact';
                    formData.date = new Date().toISOString();

                    // Save to localStorage (for admin panel, same-browser only)
                    const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
                    messages.push(formData);
                    localStorage.setItem('portfolio_messages', JSON.stringify(messages));

                    // ── Message delivery ──
                    // 1) EmailJS if configured (in-page constant; falls back to admin panel config)
                    // 2) GUARANTEED fallback: opens the visitor's mail client pre-filled
                    //    with the full message — works from every browser, no service needed.
                    // ═══════ EMAIL DELIVERY CONFIG ═══════
                    // PRIMARY: Web3Forms — free, no server, sends silently to your inbox.
                    // 1) Go to https://web3forms.com → enter your email → receive Access Key by email (1 min)
                    // 2) Paste the key below. Done — forms then send directly, no mail app involved.
                    // FALLBACK 1: EmailJS (if configured) · FALLBACK 2: visitor's mail client (mailto)
                    const WEB3FORMS_ACCESS_KEY = ''; // e.g. 'a1b2c3d4-5678-90ab-cdef-1234567890ab'
                    const EMAILJS_SERVICE_ID  = ''; // e.g. 'service_abc1234'
                    const EMAILJS_TEMPLATE_ID = ''; // e.g. 'template_xyz5678'
                    const EMAILJS_PUBLIC_KEY  = ''; // e.g. 'aBcD1234EfGh'
                    const OWNER_EMAIL = 'amin.saadati5195@gmail.com'; // fallback recipient

                    const name = formData.name || formData.fullName || 'Visitor';
                    const email = formData.email || '';
                    const company = formData.company || 'Not specified';
                    const service = formData.service || 'Not specified';
                    const budget = formData.budget || formData.budgetRange || '';
                    const timeline = formData.timeline || '';
                    const subject = formData.subject || (formData.type === 'hire' ? 'Hire Request' : 'Contact Message');
                    const message = formData.message || formData.description || '';

                    async function deliverMessage() {
                        let sent = false;

                        // 1) Web3Forms — silent, direct to inbox (recommended)
                        if (WEB3FORMS_ACCESS_KEY) {
                            try {
                                const res = await fetch('https://api.web3forms.com/submit', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                                    body: JSON.stringify({
                                        access_key: WEB3FORMS_ACCESS_KEY,
                                        subject: '[Portfolio] ' + subject,
                                        from_name: name,
                                        replyto: email,
                                        name,
                                        email,
                                        company,
                                        service,
                                        budget: budget || '—',
                                        timeline: timeline || '—',
                                        message
                                    })
                                });
                                const data = await res.json().catch(() => ({}));
                                if (res.ok && data.success) sent = true;
                                else console.warn('Web3Forms rejected:', data);
                            } catch (err) {
                                console.warn('Web3Forms failed:', err);
                            }
                        }

                        // 2) EmailJS (if configured)
                        if (!sent) {
                            const cfg = { serviceId: EMAILJS_SERVICE_ID, templateId: EMAILJS_TEMPLATE_ID, publicKey: EMAILJS_PUBLIC_KEY };
                            const stored = (() => { try { return JSON.parse(localStorage.getItem('portfolio_emailjs') || '{}'); } catch { return {}; } })();
                            const svc = cfg.serviceId || stored.serviceId || '';
                            const tpl = cfg.templateId || stored.templateId || '';
                            const key = cfg.publicKey || stored.publicKey || '';
                            const ownerEmail = OWNER_EMAIL || localStorage.getItem('portfolio_admin_email') || '';

                            if (svc && tpl && key && window.emailjs) {
                                try {
                                    await window.emailjs.send(svc, tpl, {
                                        to_email: ownerEmail,
                                        from_name: name,
                                        from_email: email,
                                        company,
                                        service,
                                        budget, timeline,
                                        subject,
                                        message
                                    }, key);
                                    sent = true;
                                } catch (err) {
                                    console.warn('EmailJS failed, using mailto fallback:', err);
                                }
                            }
                        }

                        // 3) GUARANTEED fallback: open the visitor's own mail client, fully pre-filled.
                        if (!sent) {
                            const body = [
                                'Name: ' + name,
                                'Email: ' + email,
                                'Company: ' + company,
                                'Service: ' + service,
                                budget ? 'Budget: ' + budget : '',
                                timeline ? 'Timeline: ' + timeline : '',
                                '',
                                message,
                                '',
                                '— Sent from portfolio contact form'
                            ].filter(Boolean).join('\n');
                            const mailto = 'mailto:' + OWNER_EMAIL +
                                '?subject=' + encodeURIComponent('[Portfolio] ' + subject) +
                                '&body=' + encodeURIComponent(body);
                            const win = window.open(mailto, '_blank');
                            if (win) win.close();
                        }
                    }

                    deliverMessage();

                    form.innerHTML = `
                        <div class="form-success" style="text-align:center;padding:40px 20px;">
                            <p style="color:var(--green);font-size:18px;margin-bottom:12px;">✅ Your message has been sent successfully!</p>
                            <p style="color:var(--text-3);font-size:13px;">
                                Your email app may open to confirm delivery — just press send.<br>
                                We will get back to you shortly.
                            </p>
                        </div>
                    `;
                }
            });
        });
    }

    // ═══════ NAVIGATION ═══════
    function initNavigation() {
        const toggle = $('#mobileToggle');
        const nav = $('#mainNav');
        const links = $$('.nav-link', nav);

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                const isOpen = nav.classList.toggle('open');
                toggle.setAttribute('aria-expanded', isOpen);
            });

            links.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        const sections = $$('section[id]');

        function updateActive() {
            const scrollY = window.scrollY + 120;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.id;

                if (scrollY >= top && scrollY < top + height) {
                    links.forEach(l => l.classList.remove('active'));
                    const activeLink = $(`a[href="#${id}"]`, nav);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', () => requestAnimationFrame(updateActive), { passive: true });
    }



    // ═══════ SCROLL REVEAL ═══════
    function initReveal() {
        // All animatable elements
        const selector = [
            '.reveal', '.reveal-stagger',
            '.section.expand-target',
            '.skill-group', '.project-card',
            '.timeline-item', '.glass-card',
            '.contact-form', '.footer-col'
        ].join(', ');

        const els = $$(selector);

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

        els.forEach(el => observer.observe(el));

        // Force-reveal elements already in viewport
        requestAnimationFrame(() => {
            els.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight + 50 && rect.bottom > -50) {
                    el.classList.add('visible');
                    observer.unobserve(el);
                }
            });
        });
    }

    // ═══════ CUSTOM SELECT ═══════
    function initCustomSelects() {
        $$('.custom-select').forEach(select => {
            const trigger = select.querySelector('.custom-select-trigger');
            const dropdown = select.querySelector('.custom-select-dropdown');
            const options = select.querySelectorAll('.custom-select-option:not(.disabled)');
            const hiddenInput = select.parentElement.querySelector('.custom-select-value');

            // Toggle dropdown
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close all other dropdowns
                $$('.custom-select.open').forEach(s => { if (s !== select) s.classList.remove('open'); });
                select.classList.toggle('open');
            });

            // Select option
            options.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const value = option.dataset.value;
                    const text = option.textContent;

                    // Update UI
                    trigger.textContent = text;
                    trigger.classList.remove('placeholder');
                    options.forEach(o => o.classList.remove('selected'));
                    option.classList.add('selected');

                    // Update hidden input
                    if (hiddenInput) hiddenInput.value = value;

                    // Close dropdown
                    select.classList.remove('open');
                });
            });
        });

        // Close on outside click
        document.addEventListener('click', () => {
            $$('.custom-select.open').forEach(s => s.classList.remove('open'));
        });
    }

    // ═══════ HERO TYPEWRITER ═══════
    function initHeroTypewriter() {
        const heading = $('#heroHeading');
        const cursor = $('#heroCursor');
        const ctaGroup = $('#heroCtaGroup');
        if (!heading) return;

        const blackSpan = heading.querySelector('.hero-heading-black');
        const whiteSpan = heading.querySelector('.hero-heading-white');
        if (!blackSpan || !whiteSpan) return;

        const fullText = blackSpan.textContent + whiteSpan.textContent;
        const splitIndex = 67; // Where black text ends

        blackSpan.textContent = '';
        whiteSpan.textContent = '';
        if (cursor) cursor.style.display = 'none';

        let i = 0;
        setTimeout(() => {
            if (cursor) cursor.style.display = 'inline-block';
            const type = () => {
                if (i < fullText.length) {
                    if (i < splitIndex) {
                        blackSpan.textContent += fullText[i];
                    } else {
                        whiteSpan.textContent += fullText[i];
                    }
                    i++;
                    setTimeout(type, 35);
                } else {
                    // Typing done - hide cursor after delay
                    setTimeout(() => { if (cursor) cursor.style.display = 'none'; }, 1000);
                }
            };
            type();
        }, 400);
    }    // Download Resume — opens GitHub repo

    // ═══════ HERO COUNTER ═══════
    function initHeroCounter() {
        const counter = $('#orbitCounter');
        if (!counter) return;

        const target = 50;
        const duration = 2000;
        const start = performance.now();
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
        setTimeout(() => {
            const animate = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.round(easeOutCubic(progress) * target);
                counter.textContent = value + '+';
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }, 1200);
    }

    // ═══════ LIVE SYNC — Listen for admin changes ═══════
    function initLiveSync() {
        // Listen to localStorage changes from other tabs (admin panel)
        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('portfolio_')) {
                console.log('🔄 Data updated from dashboard. Refreshing page...');
                setTimeout(() => location.reload(), 500);
            }
        });
    }

    // ═══════ SECRET ADMIN ACCESS — triple-click the logo ═══════
    // Standard discreet pattern (WordPress-style): 3 quick clicks within
    // 600ms opens the admin panel. Invisible to recruiters, instant for you.
    function initAdminAccess() {
        const logo = document.querySelector('a.logo');
        if (!logo) return;

        // Direct navigation wins over triple-click when ?login is already intended
        let clicks = 0;
        let timer = null;
        const WINDOW_MS = 600;

        logo.addEventListener('click', (e) => {
            clicks++;
            if (clicks === 1) {
                timer = setTimeout(() => { clicks = 0; }, WINDOW_MS);
                return; // single click = normal anchor behavior (#home)
            }
            // second or third click inside the window
            clearTimeout(timer);
            if (clicks >= 3) {
                clicks = 0;
                e.preventDefault();
                window.location.href = 'admin.html?login';
            }
        });
    }

    // ═══════ INIT ═══════
    function init() {
        // Initialize EmailJS with stored public key
        try {
            const emailConfig = JSON.parse(localStorage.getItem('portfolio_emailjs') || '{}');
            if (emailConfig.publicKey && window.emailjs) {
                window.emailjs.init(emailConfig.publicKey);
                console.log('EmailJS initialized with public key');
            }
        } catch (err) {
            console.warn('EmailJS init failed:', err);
        }

        applySettings();      // Apply admin settings first
        initScrollProgress();
        initParallax();
        initCustomCursor();
        initAdminAccess();
        initParticles();
        initTypewriter();
        initCounters();
        renderSkills();
        renderProjects();               // instant paint from defaults/admin data
        initProjectFilter();
        loadCaseStudyProjects().then(() => { renderProjects(); openFromDeepLink(); });  // re-render + deep link
        initCaseStudyModal();
        initLightbox();
        renderExperience();
        initTestimonials();
        initReviewForm();
        initForms();
        initCustomSelects();
        initHeroTypewriter();
        initHeroCounter();
        initNavigation();
        initReveal();

        initLiveSync();       // Enable live sync with admin
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();