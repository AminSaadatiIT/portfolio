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
            text: 'Very professional and clean work. The project was delivered ahead of schedule and the quality was outstanding.',
            name: 'Ali Mohammadi',
            role: 'CTO — Pars Technology',
            initials: 'AM'
        },
        {
            text: 'The best team we have ever worked with. High precision and excellent support.',
            name: 'Sara Ahmadi',
            role: 'CEO — Negin Systems',
            initials: 'SA'
        },
        {
            text: 'The CCTV project was delivered with the best possible quality and within the allocated budget.',
            name: 'Reza Karimi',
            role: 'Building Manager — Commercial Complex',
            initials: 'RK'
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
        projects: loadData('projects', DEFAULT_PROJECTS),
        experience: loadData('experience', DEFAULT_EXPERIENCE),
        testimonials: loadData('testimonials', DEFAULT_TESTIMONIALS)
    };

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

    // ═══════ CUSTOM CURSOR SYSTEM ═══════
    function initCursorGlow() {
        if (prefersReducedMotion || isMobile) return;
        if (!window.matchMedia('(pointer: fine)').matches) return;

        var cursor = $('#rj45Cursor');
        var glow = $('#cursorGlow');
        if (!cursor) return;

        // cursor:none is handled in CSS via @media (pointer: fine)

        // Direct position via transform — zero delay, GPU composited
        document.addEventListener('mousemove', function(e) {
            cursor.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px) translate(-50%,-50%)';
            if (glow) { glow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px) translate(-50%,-50%)'; }
        });

        document.addEventListener('mousedown', function() { cursor.classList.add('rj45-click'); });
        document.addEventListener('mouseup', function() { cursor.classList.remove('rj45-click'); });

        var ripples = $('#cursorRipples');
        var rippleTimer = null;

        function spawnRipples() {
            if (!ripples) return;
            // Clear old ripples
            ripples.innerHTML = '';
            // Create 3 ripple rings
            for (var i = 0; i < 3; i++) {
                var r = document.createElement('div');
                r.className = 'cursor-ripple';
                ripples.appendChild(r);
            }
            // Auto-remove after animation
            clearTimeout(rippleTimer);
            rippleTimer = setTimeout(function() { ripples.innerHTML = ''; }, 1200);
        }

        var interactives = 'a, button, [role="button"], .nav-link, .filter-btn, .btn, .project-card, .modal-close, .slider-btn, .social-link, input, textarea, select, .custom-select-trigger, .tag';
        document.addEventListener('mouseover', function(e) {
            var el = e.target.closest(interactives);
            if (!el) { cursor.className = 'custom-cursor'; if (glow) glow.classList.remove('hover-glow'); return; }
            cursor.className = 'custom-cursor';
            if (el.matches('input, textarea, select')) cursor.classList.add('rj45-text');
            else {
                cursor.classList.add('rj45-hover');
                spawnRipples();
            }
            if (glow) glow.classList.add('hover-glow');
        });
        document.addEventListener('mouseout', function(e) {
            if (e.target.closest(interactives)) { cursor.className = 'custom-cursor'; if (glow) glow.classList.remove('hover-glow'); }
        });
    }

    // ═══════ PARTICLES & METEORS ═══════
    function initParticles() {
        if (prefersReducedMotion || isMobile) return;
        const container = $('#particles');
        if (!container) return;

        for (let i = 0; i < 12; i++) {
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
    function renderProjects() {
        const grid = $('#projectsGrid');
        if (!grid) return;

        if (!siteData.projects.length) {
            grid.innerHTML = '<p style="text-align:center;color:var(--text-3);padding:40px;">No projects available.</p>';
            return;
        }

        const CATEGORY_IMAGES = {
            cabling: 'images/project-cabling.svg',
            cctv: 'images/project-cctv.svg',
            security: 'images/project-cctv.svg',
            rack: 'images/project-server.svg',
            fiber: 'images/project-cabling.svg'
        };

        grid.innerHTML = siteData.projects.map(p => {
            const hasImages = p.images && p.images.length > 0;
            let imgSrc = hasImages ? p.images[0] : '';
            if (!imgSrc && p.categories && p.categories.length > 0) {
                imgSrc = CATEGORY_IMAGES[p.categories[0]] || '';
            }
            const coverStyle = imgSrc
                ? `background:url('${imgSrc}') center/cover no-repeat`
                : `background:${p.gradient || 'linear-gradient(135deg, #0070f3, #7928ca)'}`;
            return `
            <article class="project-card showing"
                     data-categories="${escapeHTML((p.categories || []).join(','))}"
                     data-id="${p.id}"
                     tabindex="0"
                     role="button"
                     aria-label="View details for ${escapeHTML(p.title)}">
                <div class="project-cover">
                    <div class="project-gradient" style="${coverStyle}"></div>
                    <span class="project-label">${escapeHTML(p.date || '')}</span>
                </div>
                <div class="project-body">
                    <h3>${escapeHTML(p.title)}</h3>
                    <p>${escapeHTML(p.short || '')}</p>
                    <div class="project-tags">
                        ${(p.categories || []).map(c => `<span class="tag">${escapeHTML(c)}</span>`).join('')}
                    </div>
                </div>
            </article>
        `;
        }).join('');

        grid.addEventListener('click', e => {
            const card = e.target.closest('.project-card');
            if (card) openProjectModal(parseInt(card.dataset.id, 10));
        });

        grid.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                const card = e.target.closest('.project-card');
                if (card) openProjectModal(parseInt(card.dataset.id, 10));
            }
        });
    }

    // ═══════ PROJECT FILTER ═══════
    function initProjectFilter() {
        const buttons = $$('.filter-btn');
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

    // ═══════ PROJECT MODAL ═══════
    var currentGalleryImages = [];
    var currentGalleryIndex = 0;

    function openProjectModal(id) {
        const project = siteData.projects.find(p => p.id === id);
        if (!project) return;

        const modal = $('#projectModal');
        const gallery = $('#modalGallery');
        const title = $('#modalTitle');
        const meta = $('#modalMeta');
        const desc = $('#modalDesc');
        const tags = $('#modalTags');
        const prevBtn = $('#galleryPrev');
        const nextBtn = $('#galleryNext');
        const counter = $('#galleryCounter');

        // Collect images: uploaded images + gradient fallback
        currentGalleryImages = [];
        if (project.images && project.images.length > 0) {
            currentGalleryImages = project.images.slice();
        }
        currentGalleryIndex = 0;

        // Render gallery
        renderModalGallery(project);

        // Show/hide nav buttons
        var hasMultiple = currentGalleryImages.length > 1;
        if (prevBtn) prevBtn.hidden = !hasMultiple;
        if (nextBtn) nextBtn.hidden = !hasMultiple;
        if (counter) {
            counter.hidden = !hasMultiple;
            if (hasMultiple) counter.textContent = '1 / ' + currentGalleryImages.length;
        }

        title.textContent = project.title;
        meta.innerHTML = '';
        if (project.client) meta.innerHTML += '<span>🏢 ' + escapeHTML(project.client) + '</span>';
        if (project.location) meta.innerHTML += '<span>📍 ' + escapeHTML(project.location) + '</span>';
        if (project.date) meta.innerHTML += '<span>📅 ' + escapeHTML(project.date) + '</span>';
        if (project.duration) meta.innerHTML += '<span>⏱️ ' + escapeHTML(project.duration) + '</span>';
        desc.textContent = project.long || project.short || '';
        tags.innerHTML = (project.categories || []).map(c => '<span class="tag">' + escapeHTML(c) + '</span>').join('');

        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        modal.focus();
    }

    function renderModalGallery(project) {
        var gallery = $('#modalGallery');
        if (!gallery) return;

        // Keep nav buttons, replace content
        var prevBtn = $('#galleryPrev');
        var nextBtn = $('#galleryNext');
        var counter = $('#galleryCounter');

        // Remove old content (but keep nav elements)
        var oldContent = gallery.querySelectorAll('.gallery-img, .gallery-gradient');
        oldContent.forEach(function(el) { el.remove(); });

        if (currentGalleryImages.length > 0) {
            var img = document.createElement('img');
            img.className = 'gallery-img';
            img.src = currentGalleryImages[currentGalleryIndex];
            img.alt = project.title + ' — Image ' + (currentGalleryIndex + 1);
            img.addEventListener('click', function() {
                openLightbox(currentGalleryImages, currentGalleryIndex, project.title);
            });
            gallery.insertBefore(img, prevBtn);
        } else {
            var grad = document.createElement('div');
            grad.className = 'gallery-gradient';
            grad.style.background = project.gradient || 'linear-gradient(135deg, #0070f3, #7928ca)';
            grad.innerHTML = '📁';
            gallery.insertBefore(grad, prevBtn);
        }

        if (counter && currentGalleryImages.length > 1) {
            counter.textContent = (currentGalleryIndex + 1) + ' / ' + currentGalleryImages.length;
        }
    }

    function galleryNav(dir) {
        if (currentGalleryImages.length < 2) return;
        currentGalleryIndex += dir;
        if (currentGalleryIndex < 0) currentGalleryIndex = currentGalleryImages.length - 1;
        if (currentGalleryIndex >= currentGalleryImages.length) currentGalleryIndex = 0;
        renderModalGallery({ title: $('#modalTitle').textContent });
    }

    function closeProjectModal() {
        const modal = $('#projectModal');
        modal.hidden = true;
        document.body.style.overflow = '';
    }

    // ═══════ LIGHTBOX (Full-screen image viewer) ═══════
    var lightboxImages = [];
    var lightboxIndex = 0;

    function openLightbox(images, startIndex, title) {
        lightboxImages = images || [];
        lightboxIndex = startIndex || 0;
        if (lightboxImages.length === 0) return;

        var overlay = $('#lightboxOverlay');
        var img = $('#lightboxImg');
        var counter = $('#lightboxCounter');
        var thumbs = $('#lightboxThumbnails');
        var prevBtn = $('#lightboxPrev');
        var nextBtn = $('#lightboxNext');

        // Set image
        img.src = lightboxImages[lightboxIndex];
        img.alt = (title || 'Project') + ' — Image ' + (lightboxIndex + 1);

        // Single image mode
        var isSingle = lightboxImages.length <= 1;
        overlay.classList.toggle('lightbox-single', isSingle);
        if (prevBtn) prevBtn.style.display = isSingle ? 'none' : '';
        if (nextBtn) nextBtn.style.display = isSingle ? 'none' : '';

        // Counter
        if (counter) {
            counter.textContent = isSingle ? '' : (lightboxIndex + 1) + ' / ' + lightboxImages.length;
        }

        // Thumbnails
        if (thumbs && lightboxImages.length > 1) {
            thumbs.innerHTML = lightboxImages.map(function(src, i) {
                return '<div class="lightbox-thumb' + (i === lightboxIndex ? ' active' : '') + '" data-index="' + i + '"><img src="' + src + '" alt="Thumb ' + (i + 1) + '"></div>';
            }).join('');
            thumbs.querySelectorAll('.lightbox-thumb').forEach(function(t) {
                t.addEventListener('click', function() {
                    lightboxIndex = parseInt(t.dataset.index, 10);
                    updateLightbox();
                });
            });
        } else if (thumbs) {
            thumbs.innerHTML = '';
        }

        overlay.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function updateLightbox() {
        var img = $('#lightboxImg');
        var counter = $('#lightboxCounter');
        var thumbs = $('#lightboxThumbnails');

        if (img) img.src = lightboxImages[lightboxIndex];
        if (counter) counter.textContent = (lightboxIndex + 1) + ' / ' + lightboxImages.length;
        if (thumbs) {
            thumbs.querySelectorAll('.lightbox-thumb').forEach(function(t, i) {
                t.classList.toggle('active', i === lightboxIndex);
            });
        }
    }

    function lightboxNav(dir) {
        lightboxIndex += dir;
        if (lightboxIndex < 0) lightboxIndex = lightboxImages.length - 1;
        if (lightboxIndex >= lightboxImages.length) lightboxIndex = 0;
        updateLightbox();
    }

    function closeLightbox() {
        var overlay = $('#lightboxOverlay');
        if (overlay) overlay.hidden = true;
        // Only restore scroll if project modal is also closed
        var modal = $('#projectModal');
        if (!modal || modal.hidden) {
            document.body.style.overflow = '';
        }
    }

    function initModal() {
        const modal = $('#projectModal');
        const closeBtn = $('#modalClose');
        const prevBtn = $('#galleryPrev');
        const nextBtn = $('#galleryNext');

        if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
        if (modal) {
            modal.addEventListener('click', e => {
                if (e.target === modal) closeProjectModal();
            });
        }
        if (prevBtn) prevBtn.addEventListener('click', function() { galleryNav(-1); });
        if (nextBtn) nextBtn.addEventListener('click', function() { galleryNav(1); });

        // Lightbox controls
        var lbClose = $('#lightboxClose');
        var lbPrev = $('#lightboxPrev');
        var lbNext = $('#lightboxNext');
        var lbOverlay = $('#lightboxOverlay');

        if (lbClose) lbClose.addEventListener('click', closeLightbox);
        if (lbPrev) lbPrev.addEventListener('click', function() { lightboxNav(-1); });
        if (lbNext) lbNext.addEventListener('click', function() { lightboxNav(1); });
        if (lbOverlay) {
            lbOverlay.addEventListener('click', function(e) {
                if (e.target === lbOverlay) closeLightbox();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            var lbVisible = lbOverlay && !lbOverlay.hidden;
            var modalVisible = modal && !modal.hidden;

            if (e.key === 'Escape') {
                if (lbVisible) closeLightbox();
                else if (modalVisible) closeProjectModal();
            }
            if (lbVisible) {
                if (e.key === 'ArrowLeft') lightboxNav(-1);
                if (e.key === 'ArrowRight') lightboxNav(1);
            } else if (modalVisible) {
                if (e.key === 'ArrowLeft') galleryNav(-1);
                if (e.key === 'ArrowRight') galleryNav(1);
            }
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

        openBtn.addEventListener('click', () => {
            modal.hidden = false;
            document.body.style.overflow = 'hidden';
        });

        function closeModal() {
            modal.hidden = true;
            document.body.style.overflow = '';
        }
        closeBtn?.addEventListener('click', closeModal);
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal();
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

            // Track review submission
            if (window.trackFormSubmit) {
                window.trackFormSubmit('review');
            }

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
                if (m) m.hidden = true;
                document.body.style.overflow = '';
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

                    // Save to localStorage (for admin panel)
                    const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
                    messages.push(formData);
                    localStorage.setItem('portfolio_messages', JSON.stringify(messages));

                    // Send email via EmailJS if configured
                    (async () => {
                        try {
                            const emailConfig = JSON.parse(localStorage.getItem('portfolio_emailjs') || '{}');
                            const adminEmail = localStorage.getItem('portfolio_admin_email') || '';
                            if (emailConfig.serviceId && emailConfig.templateId && emailConfig.publicKey && window.emailjs && adminEmail) {
                                await window.emailjs.send(
                                    emailConfig.serviceId,
                                    emailConfig.templateId,
                                    {
                                        from_name: formData.name || formData.fullName || 'Visitor',
                                        from_email: formData.email || '',
                                        company: formData.company || 'Not specified',
                                        service: formData.service || 'Not specified',
                                        subject: formData.subject || (formData.type === 'hire' ? 'Hire Request' : 'Contact Message'),
                                        message: formData.message || formData.description || ''
                                    },
                                    emailConfig.publicKey
                                );
                                console.log('Email sent successfully!');
                            } else {
                                console.log('EmailJS not configured or admin email missing');
                            }
                        } catch (err) {
                            console.warn('Email failed:', err);
                        }
                    })();

                    // Track form submission
                    if (window.trackFormSubmit) {
                        window.trackFormSubmit(form.id === 'hireForm' ? 'hire' : 'contact');
                    }

                    form.innerHTML = `
                        <div class="form-success" style="text-align:center;padding:40px 20px;">
                            <p style="color:var(--green);font-size:18px;margin-bottom:12px;">✅ Your message has been sent successfully!</p>
                            <p style="color:var(--text-3);font-size:13px;">
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

    // ═══════ ANALYTICS TRACKER ═══════
    function initAnalytics() {
        try {
            var analytics = JSON.parse(localStorage.getItem('portfolio_analytics') || '{}');
            if (!analytics.views) analytics.views = { total: 0, daily: {} };
            if (!analytics.forms) analytics.forms = { contact: 0, hire: 0, review: 0 };
            if (!analytics.sessions) analytics.sessions = 0;
            if (!analytics.firstVisit) analytics.firstVisit = new Date().toISOString();
            if (!analytics.dailyHistory) analytics.dailyHistory = [];

            // Track page view
            analytics.views.total = (analytics.views.total || 0) + 1;
            var today = new Date().toISOString().split('T')[0];
            analytics.views.daily[today] = (analytics.views.daily[today] || 0) + 1;

            // Keep only last 30 days of daily data
            var dates = Object.keys(analytics.views.daily).sort();
            while (dates.length > 30) {
                delete analytics.views.daily[dates.shift()];
            }

            // Track session (unique per tab refresh)
            if (!sessionStorage.getItem('portfolio_tracked')) {
                analytics.sessions = (analytics.sessions || 0) + 1;
                sessionStorage.setItem('portfolio_tracked', '1');
            }

            // Store referrer
            if (document.referrer && !analytics.lastReferrer) {
                analytics.lastReferrer = document.referrer;
            }

            analytics.lastVisit = new Date().toISOString();
            localStorage.setItem('portfolio_analytics', JSON.stringify(analytics));
        } catch (e) { /* ignore */ }
    }

    function trackFormSubmit(type) {
        try {
            var analytics = JSON.parse(localStorage.getItem('portfolio_analytics') || '{}');
            if (!analytics.forms) analytics.forms = { contact: 0, hire: 0, review: 0 };
            analytics.forms[type] = (analytics.forms[type] || 0) + 1;
            analytics.lastFormSubmit = new Date().toISOString();
            localStorage.setItem('portfolio_analytics', JSON.stringify(analytics));
        } catch (e) { /* ignore */ }
    }

    // Expose for form handlers
    window.trackFormSubmit = trackFormSubmit;

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
        initCursorGlow();
        initParticles();
        initTypewriter();
        initCounters();
        renderSkills();
        renderProjects();
        initProjectFilter();
        initModal();
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
        initAnalytics();      // Track page views & form submissions
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();