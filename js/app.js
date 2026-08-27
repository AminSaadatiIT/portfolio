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
        if (prefersReducedMotion) return;

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

    // ═══════ CURSOR GLOW ═══════
    function initCursorGlow() {
        if (prefersReducedMotion) return;
        const glow = $('#cursorGlow');
        if (!glow || !window.matchMedia('(pointer: fine)').matches) return;

        let mx = 0, my = 0, gx = 0, gy = 0;

        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

        function animate() {
            gx += (mx - gx) * 0.07;
            gy += (my - gy) * 0.07;
            glow.style.left = gx + 'px';
            glow.style.top = gy + 'px';
            requestAnimationFrame(animate);
        }
        animate();
    }

    // ═══════ PARTICLES & METEORS ═══════
    function initParticles() {
        if (prefersReducedMotion) return;
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
    function openProjectModal(id) {
        const project = siteData.projects.find(p => p.id === id);
        if (!project) return;

        const modal = $('#projectModal');
        const gallery = $('#modalGallery');
        const title = $('#modalTitle');
        const meta = $('#modalMeta');
        const desc = $('#modalDesc');
        const tags = $('#modalTags');

        gallery.innerHTML = `<div style="width:100%;height:100%;background:${project.gradient || 'linear-gradient(135deg, #0070f3, #7928ca)'}"></div>`;
        title.textContent = project.title;
        meta.innerHTML = `
            ${project.client ? `<span>🏢 ${escapeHTML(project.client)}</span>` : ''}
            ${project.location ? `<span>📍 ${escapeHTML(project.location)}</span>` : ''}
            ${project.date ? `<span>📅 ${escapeHTML(project.date)}</span>` : ''}
        `;
        desc.textContent = project.long || project.short || '';
        tags.innerHTML = (project.categories || []).map(c => `<span class="tag">${escapeHTML(c)}</span>`).join('');

        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        modal.focus();
    }

    function closeProjectModal() {
        const modal = $('#projectModal');
        modal.hidden = true;
        document.body.style.overflow = '';
    }

    function initModal() {
        const modal = $('#projectModal');
        const closeBtn = $('#modalClose');

        if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
        if (modal) {
            modal.addEventListener('click', e => {
                if (e.target === modal) closeProjectModal();
            });
        }
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeProjectModal();
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
    }

    // ═══════ DOWNLOAD MENU ═══════
    function initDownloadMenu() {
        const wrap = $('#downloadWrap');
        const btn = $('#downloadResume');
        const menu = $('#downloadMenu');
        if (!wrap || !btn || !menu) return;

        // Create overlay in document.body (not inside transformed ancestors)
        let overlay = document.querySelector('.download-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'download-overlay';
            document.body.appendChild(overlay);
        } else if (overlay.parentElement !== document.body) {
            document.body.appendChild(overlay);
        }

        let menuParent = menu.parentElement;
        let menuNextSibling = menu.nextSibling;

        function openMenu() {
            const rect = btn.getBoundingClientRect();
            // Move both menu AND overlay to body to escape stacking context
            document.body.appendChild(overlay);
            document.body.appendChild(menu);
            menu.style.position = 'fixed';
            menu.style.top = (rect.bottom + 8) + 'px';
            menu.style.left = rect.left + 'px';
            menu.classList.add('visible');
            overlay.classList.add('active');
            wrap.classList.add('active');
        }

        function closeMenu() {
            // Move menu back to wrap
            if (menu.parentElement === document.body) {
                if (menuNextSibling) {
                    menuParent.insertBefore(menu, menuNextSibling);
                } else {
                    menuParent.appendChild(menu);
                }
            }
            menu.classList.remove('visible');
            overlay.classList.remove('active');
            wrap.classList.remove('active');
            // Reset inline styles
            menu.style.position = '';
            menu.style.top = '';
            menu.style.left = '';
        }

        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const isActive = wrap.classList.contains('active');
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close on overlay click
        overlay.addEventListener('click', closeMenu);

        // Close on clicking ANYWHERE outside the menu and button
        document.addEventListener('click', e => {
            if (!wrap.contains(e.target) && !menu.contains(e.target) && !e.target.closest('.download-option')) {
                if (wrap.classList.contains('active')) {
                    closeMenu();
                }
            }
        });

        // Close on Escape
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && wrap.classList.contains('active')) {
                closeMenu();
            }
        });

        wrap.querySelectorAll('.download-option').forEach(opt => {
            opt.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                const format = opt.dataset.format;
                downloadResume(format);
                closeMenu();
            });
        });
    }

    function downloadResume(format) {
        if (format === 'html') {
            window.open('resume.html', '_blank');
            return;
        }

        if (format === 'txt') {
            const txt = generateResumeText();
            const blob = new Blob([txt], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Amin_Saadati_Resume.txt';
            a.click();
            URL.revokeObjectURL(url);
            return;
        }

        if (format === 'pdf') {
            // Open print-friendly version
            const printWindow = window.open('resume.html', '_blank');
            if (printWindow) {
                printWindow.addEventListener('load', () => {
                    setTimeout(() => printWindow.print(), 300);
                });
            }
            return;
        }
    }

    function generateResumeText() {
        return `AMIN SAADATI
Network Infrastructure & Security Specialist

CONTACT
Email: amin.saadati5195@gmail.com
Phone: +98 999-971-8581
Location: Mashhad, Iran
GitHub: github.com/AminSaadatiIT

PROFESSIONAL SUMMARY
Network infrastructure and security systems specialist with 5+ years of hands-on experience. Completed 50+ projects across Iran including structured cabling, fiber optic, CCTV, access control, and server room design.

CORE COMPETENCIES
- Structured Cabling (Cat5e/Cat6/Cat6a) — 95%
- Fiber Optic (Single & Multi-mode) — 90%
- CCTV & IP Surveillance — 94%
- Access Control Systems — 86%
- Rack Installation & Design — 92%
- Cisco Switching & Routing — 85%
- MikroTik Configuration — 88%
- Wireless Network Design — 82%

WORK EXPERIENCE

Network Project Manager | Freelance | 2024 — Present
Managing and executing network infrastructure and security projects for commercial and industrial clients.

Network Engineer | Pars Technology Co. | 2022 — 2024
Designed and implemented network infrastructure for multi-story commercial buildings.

CCTV & Security Technician | Security Solutions Iran | 2020 — 2022
Installed and configured IP surveillance systems up to 120 cameras per site.

KEY PROJECTS

1. Commercial Building Structured Cabling — Cat6A (Jan 2025, Tehran)
   Complete network infrastructure for a 12-story commercial building.

2. 64-Channel IP CCTV System (Sep 2024, Isfahan)
   IP surveillance with 64 cameras, central NVR, 24/7 monitoring.

3. Standard Server Room Design & Build (Jun 2024, Tehran)
   4× 42U racks, patch panels, managed switches, UPS, cooling.

4. Inter-Building Fiber Optic Network (Mar 2024, Mashhad)
   Single-mode fiber backbone connecting 5 buildings.

CERTIFICATIONS
- Cisco CCNA — Cisco Certified Network Associate
- MikroTik MTCNA — MikroTik Certified Network Associate
- Fiber Optic Technician — Certified Fiber Optic Installation & Testing

EDUCATION
Bachelor of Computer Engineering — Ferdowsi University of Mashhad (2016-2020)
`;
    }

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
        initDownloadMenu();
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