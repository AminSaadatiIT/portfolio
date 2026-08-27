# Portfolio — Feature Spec

*"Every screen must read as the same product if placed side by side."*

Binds to: `.ulpi/design/DESIGN.md`

## User Flows

### Primary Flow: Visitor → Contact

```
1. Landing (Hero)
   ├── Badge: "Amin Saadati | Network Specialist | ● Available"
   ├── Heading: "Network Infrastructure Built with Precision"
   ├── Stats: 50+ Projects | 35+ Clients | 5+ Years
   ├── CTA: "View My Work" → scrolls to Projects
   └── CTA: "Contact Me" → scrolls to Contact

2. About
   ├── Profile card with photo + floating text
   ├── Bio paragraph with gradient-highlighted keywords
   ├── Glass cards: Name, Email, Location, Phone
   └── Stats: 50+, 35+, 5+

3. Skills
   ├── 3-column grid (Network, Security, Other)
   ├── Each group: icon + title + skill bars
   └── Progress bars animate on scroll

4. Projects
   ├── Filter bar: All | Cabling | CCTV | Rack | Fiber | Security
   ├── Grid of project cards
   └── Click → modal with details

5. Experience
   ├── Timeline with 3 entries
   └── Hover → dot glows

6. Contact
   ├── Form: Name, Email, Company, Service, Subject, Message
   ├── Validation on submit
   └── Success state

7. Footer
   ├── Quick Links | Contact | Social
   └── Copyright
```

### Edge Cases

| State | Behavior |
|-------|----------|
| **Loading** | Skeleton cards for projects, skill bars at 0% |
| **Empty** | "No projects found" message for filtered views |
| **Error** | Form validation errors inline, red border |
| **Success** | Form shows success message, resets after 3s |
| **Offline** | Form disabled, "Check your connection" toast |
| **Mobile** | Single column, hamburger nav, stacked cards |

## Component Specs

### Hero Badge
- **Purpose:** Identity + availability status
- **Props:** name, title, status
- **States:** default, hover (subtle glow)
- **Responsive:** Full width on mobile, inline on desktop
- **Accessibility:** aria-label="Amin Saadati, Network Infrastructure Specialist, Available for hire"

### Profile Card
- **Purpose:** Personal introduction with photo
- **Props:** photo, name, title, socialLinks
- **States:** default, hover (social links appear)
- **Responsive:** Full width on mobile, 320px on desktop
- **Accessibility:** img alt text, social links have aria-labels

### Glass Card
- **Purpose:** Display information in elevated containers
- **Props:** icon, label, value
- **States:** default, hover (translateY -2px)
- **Responsive:** 2-column grid → 1-column on mobile
- **Accessibility:** Semantic heading or paragraph

### Skill Bar
- **Purpose:** Visualize proficiency level
- **Props:** name, percentage
- **States:** empty (0%), filled (animated on scroll)
- **Responsive:** Full width always
- **Accessibility:** aria-valuenow, aria-valuemin, aria-valuemax

### Project Card
- **Purpose:** Showcase portfolio work
- **Props:** title, description, tags, gradient, date
- **States:** default, hover (translateY -4px, shadow), hiding/showing (filter animation)
- **Responsive:** 3-column → 2-column → 1-column
- **Accessibility:** Click opens modal, keyboard navigable

### Filter Bar
- **Purpose:** Filter projects by category
- **Props:** categories, activeCategory
- **States:** default, hover, active
- **Responsive:** Horizontal scroll on mobile
- **Accessibility:** aria-selected, keyboard arrow navigation

### Timeline Item
- **Purpose:** Display work experience
- **Props:** date, title, company, description
- **States:** default, hover (dot glows)
- **Responsive:** Full width always
- **Accessibility:** Semantic list, heading hierarchy

### Contact Form
- **Purpose:** Collect visitor messages
- **Props:** fields (name, email, company, service, subject, message)
- **States:** default, focused, error, success, submitting
- **Responsive:** Full width always
- **Accessibility:** Labels associated with inputs, error messages linked via aria-describedby

### Custom Cursor
- **Purpose:** Domain-specific interaction feedback
- **Props:** none (global)
- **States:** default (orange), hover (green)
- **Responsive:** Desktop only (hidden on touch devices)
- **Accessibility:** Respects prefers-reduced-motion, cursor:none only on fine pointer

## Pre-Flight Checklist

- [x] Identity locked in DESIGN.md
- [x] No AI-slop patterns (purple gradients, cream backgrounds, generic fonts)
- [x] All states covered (loading, empty, error, success)
- [x] Responsive behavior defined
- [x] Accessibility notes for each component
- [x] Motion is motivated (scroll reveals, hover feedback)
- [x] Color contrast passes WCAG AA
- [x] Typography hierarchy clear (display/body/utility)
- [x] Spacing follows 4px scale
- [x] Radius is consistent (6/10/16/20/9999)

## Build Handoff

**Target agent:** Static site (HTML/CSS/JS)
**Design system:** Bespoke (brand register)
**Files to implement:**
1. `index.html` — all sections
2. `css/styles.css` — tokens + components
3. `css/hero-new.css` — hero-specific styles
4. `js/app.js` — interactions (cursor, filters, timeline, form)

**Acceptance criteria:**
1. All tokens from DESIGN.md as CSS custom properties
2. Custom cursor works on desktop, hidden on touch
3. Glass card pattern consistent everywhere
4. Section labels: monospace + accent color
5. Skill bars: gradient fill (accent → success)
6. Profile card: floating text + gradient overlay
7. Responsive: single column mobile, grid desktop
8. prefers-reduced-motion disables animations
9. WCAG AA contrast for all text
10. Cursor glow follows mouse on desktop only
