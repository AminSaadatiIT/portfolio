# 🚀 Portfolio + Admin Dashboard

A production-ready static portfolio website with an integrated admin dashboard.
Built with **Vanilla HTML/CSS/JS** — no frameworks required.

## 📸 Features

### Public Site
- ✅ Animated Aurora background with parallax scroll
- ✅ Typewriter effect in hero section
- ✅ Animated stat counters
- ✅ Filterable project grid with modal details
- ✅ Skills with animated progress bars
- ✅ Experience timeline
- ✅ Testimonials slider with touch support
- ✅ Contact & Hire forms with client-side validation
- ✅ Fully responsive (mobile/tablet/desktop)
- ✅ Accessible (WCAG 2.1 AA)
- ✅ SEO-optimized meta tags
- ✅ Reduced motion support
- ✅ Progressive enhancement (works without JS)

### Admin Dashboard
- ✅ Protected login with hashed password (SHA-256)
- ✅ Site Settings editor (Hero, About, Social links)
- ✅ Skills CRUD
- ✅ Projects CRUD with multi-image upload
- ✅ AI Description Generator (template-based + OpenAI prompt)
- ✅ Experience management
- ✅ Testimonials management
- ✅ GitHub Auto-Publish settings
- ✅ Social media content generator (LinkedIn + Instagram)
- ✅ Change admin password with strength validation

## 🛠️ Setup

### 1. Clone & Open

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

Open `index.html` in your browser — that's it!

### 2. Admin Access

Open `admin.html` in your browser.

**Default credentials:**
- Username: `admin`
- Password: `Admin@1234`

⚠️ **Change the password immediately** after first login.

### 3. Run Tests

```bash
npm test
```

## 🚀 Deploy to GitHub Pages

### Option A: Automatic (GitHub Actions)

1. Push to `main` branch
2. Go to **Settings → Pages**
3. Source: **GitHub Actions**
4. The workflow in `.github/workflows/deploy.yml` handles deployment

### Option B: Manual

1. Go to **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `/(root)`
4. Save

### Option C: Using publish script

```bash
export GITHUB_PAT=ghp_your_token_here
export GITHUB_REPO=username/repo
export GITHUB_BRANCH=main

npm run publish
```

## 🔐 Security Notes

### PAT (Personal Access Token)

1. Create at: **GitHub → Settings → Developer settings → Tokens**
2. **Never** commit your PAT to version control
3. Use environment variables:
   ```bash
   export GITHUB_PAT=ghp_xxxxxxxxxxxx
   ```
4. For GitHub Actions, use **Repository Secrets**:
   - Settings → Secrets and variables → Actions → New secret

### Password Storage

- Demo uses **SHA-256 hash** stored in `localStorage`
- **Production recommendation**: Use bcrypt/Argon2 with a proper backend
- Password requirements:
  - Minimum 8 characters
  - Uppercase + lowercase letters
  - At least 1 number
  - At least 1 special character

### Data Storage

- Demo uses **localStorage** for persistence
- **Production recommendation**: Use a backend (Node.js + MongoDB/PostgreSQL) or headless CMS (Strapi, Sanity, etc.)

### Input Validation

- All user inputs are escaped with `escapeHTML()` to prevent XSS
- Forms use client-side validation with proper error messages
- In production, add server-side validation

## 🤖 AI Description Generator

### Offline Mode (Default)

Uses template-based generation with randomized professional descriptions.

### Online Mode (OpenAI)

To connect to OpenAI API, modify `js/ai-generator.js`:

```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${YOUR_API_KEY}`
    },
    body: JSON.stringify(AIGenerator.getAPIPrompt(title, categories))
});
```

### Sample Prompt (Persian)

```
You are a professional technical writer specializing in network
infrastructure projects. Write a detailed project description for:
"[PROJECT TITLE]".
Categories: [CATEGORIES].
Include: scope, methodology, equipment, results.
Write in Persian. 150-200 words.
```

### Sample Prompt (English)

```
Generate a professional project description for a network
infrastructure project titled "[PROJECT TITLE]".
The project involves: [CATEGORIES].
Include technical details about equipment, standards compliance,
testing methodology, and outcomes.
Format: 2-3 paragraphs, professional tone.
```

## 📱 Social Media Generator

### LinkedIn

```bash
npm run social:linkedin -- "Project Title"
```

### Instagram

```bash
npm run social:instagram -- "Project Title"
```

Or use the Admin Dashboard → Auto Publish section.

## 📁 Project Structure

```
portfolio/
├── index.html           # Main portfolio page
├── admin.html           # Admin dashboard
├── css/
│   ├── styles.css       # Main styles
│   └── admin.css        # Dashboard styles
├── js/
│   ├── app.js           # Main site logic
│   ├── admin.js         # Dashboard logic
│   └── ai-generator.js  # AI description module
├── data/
│   ├── projects.json    # Sample projects
│   ├── skills.json      # Sample skills
│   └── testimonials.json # Sample testimonials
├── scripts/
│   ├── publish.js       # GitHub publish script
│   └── social-generator.js # Social content
├── tests/
│   └── validation.test.js  # Unit tests
├── .github/workflows/
│   └── deploy.yml       # GitHub Actions
├── images/
│   └── placeholder.svg  # Placeholder image
├── package.json
└── README.md
```

## 🧪 Data Format

### Project

```json
{
    "id": 1,
    "title": "Project Title",
    "client": "Client Name",
    "date": "2025-01",
    "location": "Tehran",
    "short": "Brief description...",
    "long": "Detailed description...",
    "categories": ["cabling", "security"],
    "gradient": "linear-gradient(135deg, #0070f3, #7928ca)",
    "images": ["url1", "url2"],
    "videos": ["url1"]
}
```

### Skill Group

```json
{
    "group": "Category Name",
    "icon": "🔌",
    "color": "rgba(0,112,243,0.15)",
    "items": [
        { "name": "Skill Name", "level": 95 }
    ]
}
```

### Testimonial

```json
{
    "text": "Review text...",
    "name": "Reviewer Name",
    "role": "Job Title — Company",
    "initials": "RN"
}
```

## 📝 License

MIT License — feel free to use and modify.

## ✨ Credits

Built with focus on:
- **UI/UX**: Vercel Design Guidelines
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized animations, lazy loading
- **Security**: XSS prevention, input validation