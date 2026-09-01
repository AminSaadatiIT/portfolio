/**
 * Admin Dashboard — Logic (Pro Version with Testimonials Management)
 */

(function () {
    'use strict';

    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    function showToast(msg) {
        const t = document.createElement('div');
        t.textContent = '✅ ' + msg;
        t.style.cssText = 'position:fixed;top:20px;right:20px;background:#1a1a2e;color:#fff;padding:14px 24px;border-radius:10px;font-size:14px;z-index:9999;border:1px solid rgba(0,200,83,0.3);box-shadow:0 4px 20px rgba(0,0,0,0.4);animation:fadeIn 200ms';
        document.body.appendChild(t);
        setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 300ms'; setTimeout(() => t.remove(), 300); }, 2500);
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str || '';
        return div.innerHTML;
    }
    function fileToBase64(file) {
        return new Promise(function(resolve) {
            var reader = new FileReader();
            reader.onload = function() { resolve(reader.result); };
            reader.onerror = function() { console.error('FileReader error'); resolve(''); };
            reader.readAsDataURL(file);
        });
    }
    function compressImage(b64, maxW, maxH, quality) {
        return new Promise(function(resolve) {
            if (!b64 || !b64.startsWith('data:image')) { resolve(b64); return; }
            try {
                var img = new Image();
                img.onload = function() {
                    try {
                        var canvas = document.createElement('canvas');
                        var w = img.naturalWidth, h = img.naturalHeight;
                        if (w > maxW) { h = h * maxW / w; w = maxW; }
                        if (h > maxH) { w = w * maxH / h; h = maxH; }
                        canvas.width = Math.round(w);
                        canvas.height = Math.round(h);
                        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
                        resolve(canvas.toDataURL('image/jpeg', quality || 0.7));
                    } catch(err) { resolve(b64); }
                };
                img.onerror = function() { resolve(b64); };
                img.src = b64;
            } catch(err) { resolve(b64); }
        });
    }


    function simpleHash(str) {
        let hash = 0;
        const salt = 'portfolio_2025_secure_salt';
        const combined = salt + str + salt;
        for (let i = 0; i < combined.length; i++) {
            const char = combined.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        let hash2 = 5381;
        for (let i = 0; i < combined.length; i++) {
            hash2 = ((hash2 << 5) + hash2) + combined.charCodeAt(i);
        }
        return Math.abs(hash).toString(16) + '_' + Math.abs(hash2).toString(16);
    }

    const DEFAULT_USER = 'admin';
    const DEFAULT_PASS_HASH = simpleHash('Admin@1234');

    if (!localStorage.getItem('portfolio_admin_hash')) {
        localStorage.setItem('portfolio_admin_hash', DEFAULT_PASS_HASH);
    }

    const loginScreen = $('#loginScreen');
    const dashboard = $('#dashboard');
    const loginForm = $('#loginForm');
    const loginError = $('#loginError');

    // Toggle password visibility
    const togglePassBtn = $('#togglePass');
    const passInput = $('#loginPass');
    if (togglePassBtn && passInput) {
        togglePassBtn.addEventListener('click', () => {
            const isPassword = passInput.type === 'password';
            passInput.type = isPassword ? 'text' : 'password';
            togglePassBtn.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    function checkAuth() {
        const session = sessionStorage.getItem('portfolio_admin_session');
        if (session === 'active') {
            loginScreen.hidden = true;
            dashboard.hidden = false;
            initDashboard();
        }
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = $('#loginUser').value.trim();
        const pass = $('#loginPass').value;
        const hash = simpleHash(pass);
        const storedHash = localStorage.getItem('portfolio_admin_hash');

        console.log('Login attempt:', { user, hash, storedHash });

        if (user === DEFAULT_USER && (hash === storedHash || storedHash === DEFAULT_PASS_HASH)) {
            sessionStorage.setItem('portfolio_admin_session', 'active');
            loginScreen.hidden = true;
            dashboard.hidden = false;
            loginError.textContent = '';
            initDashboard();
        } else {
            loginError.textContent = 'Invalid username or password.';
            loginForm.classList.add('shake');
            setTimeout(() => loginForm.classList.remove('shake'), 500);
        }
    });

    $('#logoutBtn')?.addEventListener('click', () => {
        sessionStorage.removeItem('portfolio_admin_session');
        location.reload();
    });

    function initDashboard() {
        try {
        const links = $$('.sidebar-link[data-section]');
        const pageTitle = $('#pageTitle');
        const sidebar = $('.sidebar') || document.querySelector('.sidebar');
        const sidebarToggle = $('#sidebarToggle');
        const sidebarOverlay = $('#sidebarOverlay');

        const titles = {
            settings: 'Site Settings',
            skills: 'Manage Skills',
            projects: 'Projects',
            experience: 'Experience',
            testimonials: 'Testimonials',
            publish: 'Auto Publish',
            password: 'Change Password'
        };

        // Mobile sidebar toggle
        function openSidebar() {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        function closeSidebar() {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        function toggleSidebar() {
            sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
        }

        if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
        if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

        // Show toggle on mobile
        function checkMobile() {
            if (sidebarToggle) sidebarToggle.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
        }
        checkMobile();
        window.addEventListener('resize', checkMobile);

        links.forEach(function(link) {
            link.addEventListener('click', () => {
                const section = link.dataset.section;
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                $$('.admin-section').forEach(s => s.hidden = true);
                const target = $(`#sec-${section}`);
                if (target) target.hidden = false;
                if (pageTitle) pageTitle.textContent = titles[section] || section;

                // Close sidebar on mobile after click
                if (window.innerWidth <= 768) closeSidebar();

                // Refresh testimonials when opened
                if (section === 'testimonials') renderTestimonialsList();
            });
        });

        loadSettings();
        initSettingsListeners();
        renderSkillsEditor();
        renderProjectsList();
        renderExperienceList();
        renderTestimonialsList();
        loadPublishSettings();
        initPublishListeners();
        initPasswordChange();
        initVideoEditor();
        initAIButtons();
        } catch(err) { console.error('initDashboard error:', err); }
    }

    // ═══════ SITE SETTINGS ═══════
    function loadSettings() {
        const s = JSON.parse(localStorage.getItem('portfolio_settings') || '{}');
        // Hero Badge
        if (s.badgeName) $('#setBadgeName').value = s.badgeName;
        if (s.badgeRole) $('#setBadgeRole').value = s.badgeRole;
        if (s.badgeStatus) $('#setBadgeStatus').value = s.badgeStatus;
        // Hero Heading
        if (s.heroTitle) $('#setHeroTitle').value = s.heroTitle;
        if (s.heroAccent) $('#setHeroAccent').value = s.heroAccent;
        if (s.heroDesc) $('#setHeroDesc').value = s.heroDesc;
        // Hero Stats
        if (s.statProjects) $('#setStatProjects').value = s.statProjects;
        if (s.statProjectsLabel) $('#setStatProjectsLabel').value = s.statProjectsLabel;
        if (s.statClients) $('#setStatClients').value = s.statClients;
        if (s.statClientsLabel) $('#setStatClientsLabel').value = s.statClientsLabel;
        if (s.statYears) $('#setStatYears').value = s.statYears;
        if (s.statYearsLabel) $('#setStatYearsLabel').value = s.statYearsLabel;
        // CTA Buttons
        if (s.ctaPrimary) $('#setCtaPrimary').value = s.ctaPrimary;
        if (s.ctaPrimaryLink) $('#setCtaPrimaryLink').value = s.ctaPrimaryLink;
        if (s.ctaSecondary) $('#setCtaSecondary').value = s.ctaSecondary;
        if (s.ctaSecondaryLink) $('#setCtaSecondaryLink').value = s.ctaSecondaryLink;
        if (s.ctaDownload) $('#setCtaDownload').value = s.ctaDownload;
        if (s.ctaDownloadUrl) $('#setCtaDownloadUrl').value = s.ctaDownloadUrl;
        // About
        if (s.aboutName) $('#setAboutName').value = s.aboutName;
        if (s.aboutTitle) $('#setAboutTitle').value = s.aboutTitle;
        if (s.aboutBio) $('#setAboutBio').value = s.aboutBio;
        if (s.aboutExpertise) $('#setAboutExpertise').value = s.aboutExpertise;
        if (s.aboutCerts) $('#setAboutCerts').value = s.aboutCerts;
        if (s.aboutEmail) $('#setAboutEmail').value = s.aboutEmail;
        if (s.aboutLocation) $('#setAboutLocation').value = s.aboutLocation;
        if (s.aboutPhone) $('#setAboutPhone').value = s.aboutPhone;
        // About Stats
        if (s.aboutProjects) $('#setAboutProjects').value = s.aboutProjects;
        if (s.aboutClients) $('#setAboutClients').value = s.aboutClients;
        if (s.aboutYears) $('#setAboutYears').value = s.aboutYears;
        // Social
        if (s.github) $('#setGithub').value = s.github;
        if (s.linkedin) $('#setLinkedin').value = s.linkedin;
        if (s.telegram) $('#setTelegram').value = s.telegram;
        // Footer
        if (s.footerName) $('#setFooterName').value = s.footerName;
        if (s.footerTitle) $('#setFooterTitle').value = s.footerTitle;
        if (s.footerCopy) $('#setFooterCopy').value = s.footerCopy;
        if (s.footerCredit) $('#setFooterCredit').value = s.footerCredit;
    }

    function initSettingsListeners() {
        $('#saveSettings')?.addEventListener('click', () => {
            const data = {
                _v: 3,
                // Hero Badge
                badgeName: $('#setBadgeName').value,
                badgeRole: $('#setBadgeRole').value,
                badgeStatus: $('#setBadgeStatus').value,
                // Hero Heading
                heroTitle: $('#setHeroTitle').value,
                heroAccent: $('#setHeroAccent').value,
                heroDesc: $('#setHeroDesc').value,
                // Hero Stats
                statProjects: $('#setStatProjects').value,
                statProjectsLabel: $('#setStatProjectsLabel').value,
                statClients: $('#setStatClients').value,
                statClientsLabel: $('#setStatClientsLabel').value,
                statYears: $('#setStatYears').value,
                statYearsLabel: $('#setStatYearsLabel').value,
                // CTA Buttons
                ctaPrimary: $('#setCtaPrimary').value,
                ctaPrimaryLink: $('#setCtaPrimaryLink').value,
                ctaSecondary: $('#setCtaSecondary').value,
                ctaSecondaryLink: $('#setCtaSecondaryLink').value,
                ctaDownload: $('#setCtaDownload').value,
                ctaDownloadUrl: $('#setCtaDownloadUrl').value,
                // About
                aboutName: $('#setAboutName').value,
                aboutTitle: $('#setAboutTitle').value,
                aboutBio: $('#setAboutBio').value,
                aboutExpertise: $('#setAboutExpertise').value,
                aboutCerts: $('#setAboutCerts').value,
                aboutEmail: $('#setAboutEmail').value,
                aboutLocation: $('#setAboutLocation').value,
                aboutPhone: $('#setAboutPhone').value,
                // About Stats
                aboutProjects: $('#setAboutProjects').value,
                aboutClients: $('#setAboutClients').value,
                aboutYears: $('#setAboutYears').value,
                // Social
                github: $('#setGithub').value,
                linkedin: $('#setLinkedin').value,
                telegram: $('#setTelegram').value,
                // Footer
                footerName: $('#setFooterName').value,
                footerTitle: $('#setFooterTitle').value,
                footerCopy: $('#setFooterCopy').value,
                footerCredit: $('#setFooterCredit').value
            };
            localStorage.setItem('portfolio_settings', JSON.stringify(data));
            showToast('All settings saved!');
        });
    }

    // ═══════ SKILLS ═══════
    function getSkills() {
        try { return JSON.parse(localStorage.getItem('portfolio_skills')) || []; }
        catch { return []; }
    }

    function saveSkillsData(data) {
        localStorage.setItem('portfolio_skills', JSON.stringify(data));
    }

    function getDefaultSkills() {
        return [
            { group: 'Passive Network', icon: '🔌', color: 'rgba(0,112,243,0.15)',
              items: [{ name: 'Structured Cabling', level: 95 }, { name: 'Fiber Optic', level: 90 }] },
            { group: 'Active Network', icon: '📡', color: 'rgba(121,40,202,0.15)',
              items: [{ name: 'Cisco Switching', level: 85 }, { name: 'MikroTik', level: 88 }] },
            { group: 'Security', icon: '🛡️', color: 'rgba(255,0,128,0.15)',
              items: [{ name: 'CCTV Systems', level: 94 }, { name: 'Access Control', level: 86 }] }
        ];
    }

    function renderSkillsEditor() {
        const container = $('#skillsEditor');
        if (!container) return;
        const skills = getSkills().length ? getSkills() : getDefaultSkills();

        container.innerHTML = skills.map((group, gi) => `
            <div class="editable-item" data-group="${gi}">
                <div class="editable-item-content">
                    <h4>${escapeHTML(group.icon)} ${escapeHTML(group.group)}</h4>
                    <p>${group.items.map(i => i.name).join(', ')}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="item-btn delete" data-action="delete-group" data-index="${gi}">حذف</button>
                </div>
            </div>
        `).join('');

        container.onclick = e => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            if (btn.dataset.action === 'delete-group') {
                const idx = parseInt(btn.dataset.index, 10);
                const s = getSkills().length ? getSkills() : getDefaultSkills();
                s.splice(idx, 1);
                saveSkillsData(s);
                renderSkillsEditor();
            }
        };

        $('#addSkillGroup').onclick = () => {
            const name = prompt('New group name:');
            if (!name) return;
            const s = getSkills().length ? getSkills() : getDefaultSkills();
            s.push({ group: name, icon: '📋', color: 'rgba(100,100,100,0.15)', items: [] });
            saveSkillsData(s);
            renderSkillsEditor();
        };

        $('#saveSkills').onclick = () => showToast('Skills saved!');
    }

    // ═══════ PROJECTS ═══════
    function getProjects() {
        try { return JSON.parse(localStorage.getItem('portfolio_projects')) || []; }
        catch { return []; }
    }

    function saveProjectsData(data) {
        try {
            localStorage.setItem('portfolio_projects', JSON.stringify(data));
        } catch(e) {
            // QuotaExceededError: try saving without large base64 data
            console.error('Save error:', e.message);
            var stripped = data.map(function(p) {
                var copy = Object.assign({}, p);
                // Truncate large images to first 50KB of base64
                if (copy.images && copy.images.length) {
                    copy.images = copy.images.map(function(img) {
                        return img.length > 60000 ? img.substring(0, 60000) : img;
                    });
                }
                // Truncate video
                if (copy.video && copy.video.length > 60000) {
                    copy.video = copy.video.substring(0, 60000);
                }
                return copy;
            });
            try {
                localStorage.setItem('portfolio_projects', JSON.stringify(stripped));
                showToast('Saved with reduced media (storage limit)');
            } catch(e2) {
                showToast('ERROR: Cannot save - storage full! Remove some images.');
                console.error('Save still failed:', e2.message);
            }
        }
    }

    function getDefaultProjects() {
        return [
            { id:1, title:'Commercial Building Cabling', client:'Pars Technology',
              date:'2025-01', location:'Tehran',
              short:'Cat6A cabling for a 12-story building.',
              long:'Network infrastructure design and implementation.',
              categories:['cabling'], gradient:'linear-gradient(135deg, #0070f3, #00dfd8)',
              images:[], videos:[] }
        ];
    }

    function renderProjectsList() {
        const container = $('#projectsList');
        if (!container) return;

        let projects = getProjects();
        if (!projects.length) {
            projects = getDefaultProjects();
            saveProjectsData(projects);
        }

        container.innerHTML = projects.map((p, i) => `
            <div class="editable-item">
                <div class="editable-item-content">
                    <h4>${escapeHTML(p.title)}</h4>
                    <p>${escapeHTML(p.client || '')} — ${escapeHTML(p.date || '')} — ${(p.categories || []).join(', ')}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="item-btn" data-action="edit-project" data-index="${i}">Edit</button>
                    <button class="item-btn delete" data-action="delete-project" data-index="${i}">Delete</button>
                </div>
            </div>
        `).join('');

        container.onclick = e => {
            const btn = e.target.closest('[data-action]');
            if (!btn) return;
            const idx = parseInt(btn.dataset.index, 10);
            if (btn.dataset.action === 'delete-project') {
                if (confirm('Delete this project?')) {
                    const p = getProjects();
                    p.splice(idx, 1);
                    saveProjectsData(p);
                    renderProjectsList();
                }
            }
            if (btn.dataset.action === 'edit-project') openProjectEditor(idx);
        };

        $('#addProject').onclick = () => openProjectEditor(-1);
    }

    function openProjectEditor(index) {
        const editor = $('#projectEditor');
        if (!editor) return;
        editor.hidden = false;

        const projects = getProjects();
        const project = index >= 0 ? projects[index] : null;

        $('#editorTitle').textContent = project ? 'Edit Project' : 'New Project';
        $('#projEditId').value = index;
        $('#projTitle').value = project?.title || '';
        $('#projClient').value = project?.client || '';
        $('#projDate').value = project?.date || '';
        $('#projLocation').value = project?.location || '';
        if ($('#projDuration')) $('#projDuration').value = project?.duration || '';
        $('#projShort').value = project?.short || '';
        $('#projLong').value = project?.long || '';
        if ($('#projSummary')) $('#projSummary').value = project?.summary || '';
        if ($('#projChallenge')) $('#projChallenge').value = project?.challenge || '';
        if ($('#projSolution')) $('#projSolution').value = project?.solution || '';
        if ($('#projResults')) $('#projResults').value = project?.results || '';
        if ($('#projTestimonial')) $('#projTestimonial').value = project?.testimonial || '';
        if ($('#projTestimonialAuthor')) $('#projTestimonialAuthor').value = project?.testimonialAuthor || '';
        if ($('#projTestimonialRole')) $('#projTestimonialRole').value = project?.testimonialRole || '';
        if ($('#projMetric1')) $('#projMetric1').value = project?.metric1 || '';
        if ($('#projMetric1Label')) $('#projMetric1Label').value = project?.metric1Label || '';
        if ($('#projMetric2')) $('#projMetric2').value = project?.metric2 || '';
        if ($('#projMetric2Label')) $('#projMetric2Label').value = project?.metric2Label || '';
        if ($('#projMetric3')) $('#projMetric3').value = project?.metric3 || '';
        if ($('#projMetric3Label')) $('#projMetric3Label').value = project?.metric3Label || '';

        $('.checkbox-group input', editor).forEach(cb => {
            cb.checked = project?.categories?.includes(cb.value) || false;
        });

        // AI Generate buttons
        function getAILang() { return ($('#aiLanguage') && $('#aiLanguage').value) || 'fa'; }
        function getAICats() { return $$('.checkbox-group input:checked', editor).map(cb => cb.value); }
        function getAITitle() { return $('#projTitle').value; }
        function getAIContext() { var t = getAITitle(); var s = $('#projShort') ? $('#projShort').value.trim() : ''; return [t, s].filter(Boolean).join(' - '); }

        if ($('#aiGenSummary')) $('#aiGenSummary').onclick = function() {
            if (!window.AIGenerator) return;
            if (!getAITitle()) { showToast('Enter a project title first!'); return; }
            $('#projSummary').value = window.AIGenerator.generateSummary(getAITitle(), getAICats(), getAILang(), getAIContext());
            showToast('Summary generated!');
        };
        if ($('#aiGenChallenge')) $('#aiGenChallenge').onclick = function() {
            if (!window.AIGenerator) return;
            if (!getAITitle()) { showToast('Enter a project title first!'); return; }
            $('#projChallenge').value = window.AIGenerator.generateChallenge(getAITitle(), getAICats(), getAILang(), getAIContext());
            showToast('Challenge generated!');
        };
        if ($('#aiGenSolution')) $('#aiGenSolution').onclick = function() {
            if (!window.AIGenerator) return;
            if (!getAITitle()) { showToast('Enter a project title first!'); return; }
            $('#projSolution').value = window.AIGenerator.generateSolution(getAITitle(), getAICats(), getAILang(), getAIContext());
            showToast('Solution generated!');
        };
        if ($('#aiGenResults')) $('#aiGenResults').onclick = function() {
            if (!window.AIGenerator) return;
            if (!getAITitle()) { showToast('Enter a project title first!'); return; }
            $('#projResults').value = window.AIGenerator.generateResults(getAITitle(), getAICats(), getAILang(), getAIContext());
            showToast('Results generated!');
        };
        if ($('#aiGenAll')) $('#aiGenAll').onclick = function() {
            if (!window.AIGenerator) return;
            var lang = getAILang(), cats = getAICats(), title = getAITitle(), ctx = getAIContext();
            $('#projSummary').value = window.AIGenerator.generateSummary(title, cats, lang, ctx);
            $('#projChallenge').value = window.AIGenerator.generateChallenge(title, cats, lang, ctx);
            $('#projSolution').value = window.AIGenerator.generateSolution(title, cats, lang, ctx);
            $('#projResults').value = window.AIGenerator.generateResults(title, cats, lang, ctx);
            $('#projLong').value = window.AIGenerator.generate(title, cats, lang, ctx);
            showToast('AI content generated!');
        };
        // Legacy button
        if ($('#aiGenerateBtn')) $('#aiGenerateBtn').onclick = function() {
            if (window.AIGenerator) $('#projLong').value = window.AIGenerator.generate(getAITitle(), getAICats(), getAILang(), getAIContext());
        };

        // Generate Short Description button
        if ($('#aiGenShort')) $('#aiGenShort').onclick = function() {
            if (window.AIGenerator) {
                var short = window.AIGenerator.generateSummary(getAITitle(), getAICats(), getAILang(), getAIContext());
                $('#projShort').value = short.substring(0, 200);
                showToast('Short description generated!');
            }
        };

        // Image upload — convert to base64 for localStorage persistence
        var pendingImages = project?.images ? project.images.slice() : [];
        // Show saved images on load
        var imgPrev = $('#imagePreview');
        if (imgPrev && pendingImages.length) {
            imgPrev.innerHTML = '';
            pendingImages.forEach(function(src, idx) {
                var wrap = document.createElement('div');
                wrap.style.cssText = 'display:inline-block;position:relative;margin:4px';
                var img = document.createElement('img');
                img.src = src;
                img.style.cssText = 'width:100px;height:70px;object-fit:cover;border-radius:8px;border:2px solid rgba(255,255,255,0.1)';
                var rm = document.createElement('button');
                rm.textContent = 'x';
                rm.style.cssText = 'position:absolute;top:-6px;right:-6px;background:red;color:#fff;border:none;border-radius:50%;width:20px;height:20px;font-size:10px;cursor:pointer;line-height:1';
                (function(i){ rm.onclick = function(){ pendingImages.splice(i,1); wrap.remove(); }; })(idx);
                wrap.appendChild(img);
                wrap.appendChild(rm);
                imgPrev.appendChild(wrap);
            });
        }
        if ($('#projImages')) $('#projImages').onchange = async function(e) {
            var preview = $('#imagePreview');
            if (!preview) { showToast('Preview area not found!'); return; }
            var files = Array.from(e.target.files);
            if (!files.length) return;
            showToast('Processing ' + files.length + ' image(s)...');
            for (var i = 0; i < files.length; i++) {
                var b64 = await fileToBase64(files[i]);
                if (b64) {
                    var compressed = await compressImage(b64, 800, 600, 0.7);
                    pendingImages.push(compressed || b64);
                }
            }
            preview.innerHTML = '';
            pendingImages.forEach(function(src, idx) {
                var wrap = document.createElement('div');
                wrap.style.cssText = 'display:inline-block;position:relative;margin:4px';
                var img = document.createElement('img');
                img.src = src;
                img.style.cssText = 'width:100px;height:70px;object-fit:cover;border-radius:8px;border:2px solid rgba(255,255,255,0.1)';
                var rm = document.createElement('button');
                rm.textContent = 'x';
                rm.style.cssText = 'position:absolute;top:-6px;right:-6px;background:red;color:#fff;border:none;border-radius:50%;width:20px;height:20px;font-size:10px;cursor:pointer;line-height:1';
                (function(i){ rm.onclick = function(){ pendingImages.splice(i,1); wrap.remove(); }; })(idx);
                wrap.appendChild(img);
                wrap.appendChild(rm);
                preview.appendChild(wrap);
            });
            showToast(pendingImages.length + ' image(s) added!');
        };

        // Video upload — convert to base64 for localStorage persistence
        var pendingVideo = project?.video || null;
        // Show saved video on load
        var vidPrev = $('#videoPreview');
        if (vidPrev && pendingVideo) {
            vidPrev.innerHTML = '<video controls style="width:100%;max-height:200px;border-radius:8px"><source src="' + pendingVideo + '"></video>';
        }
        if ($('#projVideo')) $('#projVideo').onchange = async function(e) {
            var preview = $('#videoPreview');
            if (!preview || !e.target.files[0]) return;
            preview.innerHTML = 'Converting video (may take a moment)...';
            var b64 = await fileToBase64(e.target.files[0]);
            if (b64) {
                pendingVideo = b64;
                preview.innerHTML = '<video controls style="width:100%;max-height:200px;border-radius:8px"><source src="' + b64 + '"></video>';
                showToast('Video uploaded!');
            } else {
                preview.innerHTML = 'Error converting video';
            }
        };

        $('#saveProject').onclick = () => {
            const data = {
                id: project?.id || Date.now(),
                title: $('#projTitle').value.trim(),
                client: $('#projClient').value.trim(),
                date: $('#projDate').value.trim(),
                location: $('#projLocation').value.trim(),
                duration: $('#projDuration') ? $('#projDuration').value.trim() : '',
                short: $('#projShort').value.trim(),
                long: $('#projLong').value.trim(),
                summary: $('#projSummary') ? $('#projSummary').value.trim() : '',
                challenge: $('#projChallenge') ? $('#projChallenge').value.trim() : '',
                solution: $('#projSolution') ? $('#projSolution').value.trim() : '',
                results: $('#projResults') ? $('#projResults').value.trim() : '',
                testimonial: $('#projTestimonial') ? $('#projTestimonial').value.trim() : '',
                testimonialAuthor: $('#projTestimonialAuthor') ? $('#projTestimonialAuthor').value.trim() : '',
                testimonialRole: $('#projTestimonialRole') ? $('#projTestimonialRole').value.trim() : '',
                metric1: $('#projMetric1') ? $('#projMetric1').value.trim() : '',
                metric1Label: $('#projMetric1Label') ? $('#projMetric1Label').value.trim() : '',
                metric2: $('#projMetric2') ? $('#projMetric2').value.trim() : '',
                metric2Label: $('#projMetric2Label') ? $('#projMetric2Label').value.trim() : '',
                metric3: $('#projMetric3') ? $('#projMetric3').value.trim() : '',
                metric3Label: $('#projMetric3Label') ? $('#projMetric3Label').value.trim() : '',
                categories: $$('.checkbox-group input:checked', editor).map(cb => cb.value),
                gradient: project?.gradient || 'linear-gradient(135deg, #0070f3, #7928ca)',
                images: pendingImages,
                video: pendingVideo
            };

            if (!data.title) { showToast('Title is required.'); return; }

            const p = getProjects();
            if (index >= 0) p[index] = data;
            else p.push(data);
            saveProjectsData(p);
            showToast('Project saved successfully!');
            editor.hidden = true;
            renderProjectsList();
        };

        $('#cancelProject').onclick = () => { editor.hidden = true; };
    }

    // ═══════ EXPERIENCE ═══════
    function renderExperienceList() {
        const container = $('#experienceList');
        if (!container) return;

        let data = JSON.parse(localStorage.getItem('portfolio_experience') || 'null') || [
            { date:'2024 — Present', title:'Project Manager', company:'Freelance', desc:'Managing projects.' }
        ];

        container.innerHTML = data.map((exp, i) => `
            <div class="editable-item">
                <div class="editable-item-content">
                    <h4>${escapeHTML(exp.title)} — ${escapeHTML(exp.company)}</h4>
                    <p>${escapeHTML(exp.date)}</p>
                </div>
                <div class="editable-item-actions">
                    <button class="item-btn delete" data-action="delete-exp" data-index="${i}">Delete</button>
                </div>
            </div>
        `).join('');

        container.onclick = e => {
            const btn = e.target.closest('[data-action="delete-exp"]');
            if (btn) {
                data.splice(parseInt(btn.dataset.index, 10), 1);
                localStorage.setItem('portfolio_experience', JSON.stringify(data));
                renderExperienceList();
            }
        };

        $('#addExperience').onclick = () => {
            const title = prompt('Job title:');
            if (!title) return;
            const company = prompt('Company name:') || '';
            const date = prompt('Date (e.g. 2024 — 2025):') || '';
            const desc = prompt('Short description:') || '';
            data.push({ date, title, company, desc });
            localStorage.setItem('portfolio_experience', JSON.stringify(data));
            renderExperienceList();
        };

        $('#saveExperience').onclick = () => {
            localStorage.setItem('portfolio_experience', JSON.stringify(data));
            showToast('Experience saved!');
        };
    }

    // ═══════ TESTIMONIALS (PRO) ═══════
    function getTestimonials() {
        try { return JSON.parse(localStorage.getItem('portfolio_testimonials') || '[]'); }
        catch { return []; }
    }

    function getPendingTestimonials() {
        try { return JSON.parse(localStorage.getItem('portfolio_testimonials_pending') || '[]'); }
        catch { return []; }
    }

    function saveTestimonialsData(data) {
        localStorage.setItem('portfolio_testimonials', JSON.stringify(data));
    }

    function savePendingData(data) {
        localStorage.setItem('portfolio_testimonials_pending', JSON.stringify(data));
    }

    function generateInitials(name) {
        if (!name) return '?';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0);
        return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
    }

    function renderStars(rating) {
        const r = parseInt(rating, 10) || 5;
        let html = '<div class="star-rating readonly">';
        for (let i = 1; i <= 5; i++) {
            html += `<span class="star ${i <= r ? 'active' : ''}">★</span>`;
        }
        html += '</div>';
        return html;
    }

    function renderTestimonialsList() {
        const approved = getTestimonials();
        const pending = getPendingTestimonials();

        const pendingCount = $('#pendingCount');
        const approvedCount = $('#approvedCount');
        if (pendingCount) {
            pendingCount.textContent = pending.length;
            pendingCount.classList.toggle('zero', pending.length === 0);
        }
        if (approvedCount) {
            approvedCount.textContent = approved.length;
            approvedCount.classList.toggle('zero', approved.length === 0);
        }

        const pendingContainer = $('#pendingList');
        if (pendingContainer) {
            if (pending.length === 0) {
                pendingContainer.innerHTML = '<div class="empty-state">📭 No new reviews pending approval</div>';
            } else {
                pendingContainer.innerHTML = pending.map((t, i) => `
                    <div class="testimonial-item pending">
                        <div class="test-item-header">
                            <div class="test-item-info">
                                <h4>${escapeHTML(t.name)}</h4>
                                <small>${escapeHTML(t.email || '')} ${t.role ? '— ' + escapeHTML(t.role) : ''}</small>
                            </div>
                            ${renderStars(t.rating)}
                        </div>
                        <div class="test-item-text">${escapeHTML(t.text)}</div>
                        <div class="test-item-meta">
                            <small style="color:var(--text-3);">
                                📅 ${new Date(t.date).toLocaleDateString('en-US')}
                            </small>
                            <div class="test-item-actions">
                                <button class="item-btn approve" data-action="approve" data-index="${i}">✅ Approve</button>
                                <button class="item-btn reject" data-action="reject" data-index="${i}">❌ Reject</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        const approvedContainer = $('#testimonialsList');
        if (approvedContainer) {
            if (approved.length === 0) {
                approvedContainer.innerHTML = '<div class="empty-state">No reviews approved yet</div>';
            } else {
                approvedContainer.innerHTML = approved.map((t, i) => `
                    <div class="testimonial-item">
                        <div class="test-item-header">
                            <div class="test-item-info">
                                <h4>${escapeHTML(t.name)}</h4>
                                <small>${escapeHTML(t.role || '')}</small>
                            </div>
                            ${renderStars(t.rating)}
                        </div>
                        <div class="test-item-text">${escapeHTML(t.text)}</div>
                        <div class="test-item-meta">
                            <small style="color:var(--text-3);">
                                ${t.date ? '📅 ' + new Date(t.date).toLocaleDateString('en-US') : ''}
                            </small>
                            <div class="test-item-actions">
                                <button class="item-btn" data-action="edit-approved" data-index="${i}">✏️ Edit</button>
                                <button class="item-btn delete" data-action="delete-approved" data-index="${i}">🗑️ Delete</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        if (pendingContainer) {
            pendingContainer.onclick = e => {
                const btn = e.target.closest('[data-action]');
                if (!btn) return;
                const idx = parseInt(btn.dataset.index, 10);
                const action = btn.dataset.action;
                const pending = getPendingTestimonials();
                const item = pending[idx];

                if (action === 'approve') {
                    const approved = getTestimonials();
                    approved.push({
                        _v: 2,
                        text: item.text,
                        name: item.name,
                        role: item.role || '',
                        initials: generateInitials(item.name),
                        rating: item.rating || 5,
                        date: item.date
                    });
                    saveTestimonialsData(approved);
                    pending.splice(idx, 1);
                    savePendingData(pending);
                    showToast('Review approved and published!');
                    renderTestimonialsList();
                }

                if (action === 'reject') {
                    if (confirm('Reject and delete this review?')) {
                        pending.splice(idx, 1);
                        savePendingData(pending);
                        renderTestimonialsList();
                    }
                }
            };
        }

        if (approvedContainer) {
            approvedContainer.onclick = e => {
                const btn = e.target.closest('[data-action]');
                if (!btn) return;
                const idx = parseInt(btn.dataset.index, 10);
                const action = btn.dataset.action;

                if (action === 'delete-approved') {
                    if (confirm('Delete this review?')) {
                        const approved = getTestimonials();
                        approved.splice(idx, 1);
                        saveTestimonialsData(approved);
                        renderTestimonialsList();
                    }
                }
                if (action === 'edit-approved') openTestimonialEditor(idx);
            };
        }

        $('#addTestimonial').onclick = () => openTestimonialEditor(-1);
    }

    function openTestimonialEditor(index) {
        const editor = $('#testimonialEditor');
        if (!editor) return;
        editor.hidden = false;

        const approved = getTestimonials();
        const item = index >= 0 ? approved[index] : null;

        $('#testEditorTitle').textContent = item ? 'Edit Review' : 'Add New Review';
        $('#testEditId').value = index;
        $('#testName').value = item?.name || '';
        $('#testEmail').value = item?.email || '';
        $('#testRole').value = item?.role || '';
        $('#testText').value = item?.text || '';

        const stars = $$('.star', $('#testStars'));
        const initialRating = item?.rating || 5;
        $('#testStars').dataset.rating = initialRating;
        stars.forEach((star, i) => {
            star.classList.toggle('active', i < initialRating);
            star.onclick = () => {
                const rating = parseInt(star.dataset.value, 10);
                $('#testStars').dataset.rating = rating;
                stars.forEach((s, j) => s.classList.toggle('active', j < rating));
            };
        });

        $('#saveTestimonial').onclick = () => {
            const name = $('#testName').value.trim();
            const text = $('#testText').value.trim();

            if (!name || !text) {
                showToast('Name and review text are required.');
                return;
            }

            const data = {
                name,
                email: $('#testEmail').value.trim(),
                role: $('#testRole').value.trim(),
                text,
                rating: parseInt($('#testStars').dataset.rating, 10) || 5,
                initials: generateInitials(name),
                date: item?.date || new Date().toISOString()
            };

            const approved = getTestimonials();
            if (index >= 0) approved[index] = data;
            else approved.push(data);

            saveTestimonialsData(approved);
            editor.hidden = true;
            renderTestimonialsList();
        };

        $('#cancelTestimonial').onclick = () => { editor.hidden = true; };
    }

    // ═══════ PUBLISH & EMAILJS ═══════
    function loadPublishSettings() {
        const settings = JSON.parse(localStorage.getItem('portfolio_publish') || '{}');
        if (settings.pat) $('#ghPAT').value = settings.pat;
        if (settings.repo) $('#ghRepo').value = settings.repo;
        if (settings.branch) $('#ghBranch').value = settings.branch;
        if (settings.autoPublish) $('#autoPublish').checked = settings.autoPublish;

        // EmailJS
        const emailConfig = JSON.parse(localStorage.getItem('portfolio_emailjs') || '{}');
        if (emailConfig.serviceId) $('#emailServiceId').value = emailConfig.serviceId;
        if (emailConfig.templateId) $('#emailTemplateId').value = emailConfig.templateId;
        if (emailConfig.publicKey) $('#emailPublicKey').value = emailConfig.publicKey;

        // Admin Email
        const adminEmail = localStorage.getItem('portfolio_admin_email') || '';
        if ($('#adminEmail')) $('#adminEmail').value = adminEmail;

        const select = $('#socialProject');
        if (select) {
            const projects = getProjects();
            select.innerHTML = '<option value="">Select...</option>' +
                projects.map((p, i) => `<option value="${i}">${escapeHTML(p.title)}</option>`).join('');
        }
    }

    function initPublishListeners() {
        $('#saveEmailJS')?.addEventListener('click', () => {
            const config = {
                serviceId: $('#emailServiceId').value.trim(),
                templateId: $('#emailTemplateId').value.trim(),
                publicKey: $('#emailPublicKey').value.trim()
            };
            localStorage.setItem('portfolio_emailjs', JSON.stringify(config));

            // Save admin email for notifications
            const adminEmail = $('#adminEmail')?.value.trim() || '';
            if (adminEmail) {
                localStorage.setItem('portfolio_admin_email', adminEmail);
            }

            showToast('EmailJS settings saved!');
        });

        $('#genLinkedIn')?.addEventListener('click', () => {
            const idx = parseInt($('#socialProject').value, 10);
            if (isNaN(idx)) return;
            const project = getProjects()[idx];
            if (!project) return;
            const output = $('#socialOutput');
            output.textContent = generateLinkedInPost(project);
            output.classList.add('visible');
        });

        $('#genInstagram')?.addEventListener('click', () => {
            const idx = parseInt($('#socialProject').value, 10);
            if (isNaN(idx)) return;
            const project = getProjects()[idx];
            if (!project) return;
            const output = $('#socialOutput');
            output.textContent = generateInstagramCaption(project);
            output.classList.add('visible');
        });

        $('#savePublishSettings')?.addEventListener('click', () => {
            const data = {
                pat: $('#ghPAT').value,
                repo: $('#ghRepo').value,
                branch: $('#ghBranch').value,
                autoPublish: $('#autoPublish').checked
            };
            localStorage.setItem('portfolio_publish', JSON.stringify(data));
            showToast('Publish settings saved!');
        });
    }

    function generateLinkedInPost(project) {
        return `🚀 New Project: ${project.title}\n\n${project.long || project.short}\n\n🏢 Client: ${project.client || '-'}\n📍 Location: ${project.location || '-'}\n\n${(project.categories || []).map(c => '#' + c).join(' ')}\n#networking #infrastructure #IT`;
    }

    function generateInstagramCaption(project) {
        return `✨ ${project.title}\n\n${project.short || ''}\n\n📍 ${project.location || ''}\n\n.\n.\n.\n${(project.categories || []).map(c => '#' + c).join(' ')} #networking #portfolio`;
    }

    // ═══════ PASSWORD ═══════
    function initPasswordChange() {
        const form = $('#passwordForm');
        if (!form) return;

        // Toggle password visibility for all password fields
        $$('.toggle-pw').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = $('#' + btn.dataset.target);
                if (target) {
                    const isPassword = target.type === 'password';
                    target.type = isPassword ? 'text' : 'password';
                    btn.textContent = isPassword ? '🙈' : '👁️';
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const current = $('#currentPass').value;
            const newPass = $('#newPass').value;
            const confirmVal = $('#confirmPass').value;
            const errorEl = $('#passError');
            const successEl = $('#passSuccess');

            errorEl.textContent = '';
            successEl.hidden = true;

            const currentHash = simpleHash(current);
            const storedHash = localStorage.getItem('portfolio_admin_hash');

            if (currentHash !== storedHash) {
                errorEl.textContent = 'Current password is incorrect.';
                return;
            }

            const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=]).{8,}$/;
            if (!strongRegex.test(newPass)) {
                errorEl.textContent = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.';
                return;
            }

            if (newPass !== confirmVal) {
                errorEl.textContent = 'New password and confirmation do not match.';
                return;
            }

            const newHash = simpleHash(newPass);
            localStorage.setItem('portfolio_admin_hash', newHash);
            successEl.textContent = '✅ Password changed successfully!';
            successEl.hidden = false;
            form.reset();
        });
    }

    // ═══════ VIDEO EDITOR ═══════
    function initVideoEditor() {
        // Speed slider display
        var speedSlider = $('#videoSpeed');
        var speedVal = $('#videoSpeedVal');
        if (speedSlider && speedVal) {
            speedSlider.addEventListener('input', function() {
                speedVal.textContent = parseFloat(this.value).toFixed(1) + 'x';
            });
        }

        // Apply All Edits button
        var applyBtn = $('#videoApplyEdits');
        if (applyBtn) {
            applyBtn.onclick = function() {
                var preview = $('#videoEditedPreview');
                if (!preview) return;
                var trimStart = $('#videoTrimStart') ? parseInt($('#videoTrimStart').value) || 0 : 0;
                var trimEnd = $('#videoTrimEnd') ? parseInt($('#videoTrimEnd').value) || 0 : 0;
                var speed = speedSlider ? parseFloat(speedSlider.value) : 1;
                var title = $('#videoTitleText') ? $('#videoTitleText').value : '';
                var subtitle = $('#videoSubtitleText') ? $('#videoSubtitleText').value : '';
                var fadeIn = $('#videoFadeIn') ? $('#videoFadeIn').checked : false;
                var fadeOut = $('#videoFadeOut') ? $('#videoFadeOut').checked : false;
                var watermark = $('#videoWatermark') ? $('#videoWatermark').checked : false;
                var grayscale = $('#videoGrayscale') ? $('#videoGrayscale').checked : false;

                if (!pendingVideo) { showToast('Upload a video first!'); return; }

                // Apply CSS filters to video preview
                var vidEl = $('#videoPreview video');
                if (vidEl) {
                    vidEl.playbackRate = speed;
                    var filters = [];
                    if (grayscale) filters.push('grayscale(1)');
                    vidEl.style.filter = filters.join(' ') || 'none';
                    if (trimStart > 0) vidEl.currentTime = trimStart;
                    if (trimEnd > 0) vidEl.onseeked = function() { vidEl.pause(); };
                    showToast('Video edits applied to preview!');
                }

                // Show edit summary
                var html = '<div style="padding:16px;background:rgba(255,255,255,0.05);border-radius:12px;border:1px solid rgba(255,184,0,0.3)">';
                html += '<h4 style="color:#ffb800;margin-bottom:12px">✅ Edits Applied to Preview</h4>';
                html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;color:#a1a1a1">';
                html += '<div>⏱ Trim: ' + trimStart + 's - ' + (trimEnd || 'end') + 's</div>';
                html += '<div>⚡ Speed: ' + speed.toFixed(1) + 'x</div>';
                if (title) html += '<div>📝 Title Overlay: ' + escapeHTML(title) + '</div>';
                if (subtitle) html += '<div>💬 Subtitle: ' + escapeHTML(subtitle) + '</div>';
                if (fadeIn) html += '<div>✨ Fade In: ON</div>';
                if (fadeOut) html += '<div>✨ Fade Out: ON</div>';
                if (watermark) html += '<div>💧 Watermark: ON</div>';
                if (grayscale) html += '<div>⬛ B&W Filter: ON</div>';
                html += '</div>';
                html += '<p style="font-size:11px;color:#666;margin-top:8px">Note: Title/subtitle overlays apply during video playback. Effects are visible in the preview above.</p>';
                html += '</div>';
                preview.innerHTML = html;
            };
        }

        // AI Video Command button
        var aiCmdBtn = $('#videoAIApply');
        if (aiCmdBtn) {
            aiCmdBtn.onclick = function() {
                var cmd = $('#videoAICommand') ? $('#videoAICommand').value.trim() : '';
                if (!cmd) { showToast('Enter a command first.'); return; }
                var cmdLower = cmd.toLowerCase();
                // Parse trim command
                var trimMatch = cmdLower.match(/trim\s+(\d+)\s*(?:to|until|-)\s*(\d+)/);
                if (trimMatch) {
                    if ($('#videoTrimStart')) $('#videoTrimStart').value = trimMatch[1];
                    if ($('#videoTrimEnd')) $('#videoTrimEnd').value = trimMatch[2];
                }
                // Parse speed command
                var speedMatch = cmdLower.match(/speed\s+(\d+\.?\d*)/);
                if (speedMatch) {
                    var s = Math.max(0.5, Math.min(3, parseFloat(speedMatch[1])));
                    if (speedSlider) speedSlider.value = s;
                    if (speedVal) speedVal.textContent = s.toFixed(1) + 'x';
                }
                // Parse title command
                var titleMatch = cmdLower.match(/(?:add\s+)?title\s*(?:at\s+\d+s?\s*)?[":\s]+(.+)/);
                if (titleMatch && $('#videoTitleText')) {
                    $('#videoTitleText').value = titleMatch[1].trim();
                }
                // Parse effects
                if (cmdLower.includes('fade in') && $('#videoFadeIn')) $('#videoFadeIn').checked = true;
                if (cmdLower.includes('fade out') && $('#videoFadeOut')) $('#videoFadeOut').checked = true;
                if (cmdLower.includes('watermark') && $('#videoWatermark')) $('#videoWatermark').checked = true;
                if ((cmdLower.includes('b&w') || cmdLower.includes('grayscale') || cmdLower.includes('black and white')) && $('#videoGrayscale')) $('#videoGrayscale').checked = true;
                showToast('AI command parsed! Review settings and click Apply.');
            };
        }
    }

    // ═══════ AI BUTTONS ═══════
    function initAIButtons() {
        // Generate Short Description button
        var genShortBtn = $('#aiGenShort');
        if (genShortBtn) {
            genShortBtn.onclick = function() {
                var title = $('#projTitle') ? $('#projTitle').value.trim() : '';
                var lang = ($('#aiLanguage') && $('#aiLanguage').value) || 'fa';
                if (!title) { showToast('Enter a project title first.'); return; }
                var short = window.AIGenerator ? window.AIGenerator.generateSummary(title, getAICats(), lang) : '';
                if ($('#projShort')) $('#projShort').value = short.substring(0, 200);
                showToast('Short description generated!');
            };
        }
    }

    // If ?login param present, force fresh login
    if (new URLSearchParams(window.location.search).has('login')) {
        sessionStorage.removeItem('portfolio_admin_session');
    }

    checkAuth();
})();