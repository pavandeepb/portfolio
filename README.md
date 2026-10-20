# Pavandeep B. — Portfolio

A light, Apple-inspired personal portfolio and case-study site for software/product engineering and AI applications, with a fully functional dark mode.

Built with **React 19 + TypeScript + Vite + Tailwind CSS 4 + React Router**, with a centralized data layer so every claim, link, and project lives in one file. The contact form delivers through **Formspree** (`@formspree/react`). No backend, no tracking scripts, no fake data.

## Design & theming

- **Light by default, dark on request.** The theme toggle lives in the navbar (and the mobile menu). The choice is saved to `localStorage` under `pavandeep-theme`; an inline script in `index.html` applies it before first paint, so there is no flash on reload.
- **All colors are tokens.** Light values sit on `:root` and dark overrides on `[data-theme='dark']` in `src/index.css`; the `@theme inline` block maps them to Tailwind utilities (`bg-ink`, `text-muted`, `border-line`, `text-accent`, …). Add or adjust a color in one place and both themes stay in sync.
- **Type:** self-hosted Inter (variable) for UI/editorial text and IBM Plex Mono for labels and metadata.
- The project SVG diagrams (`ProjectVisual.tsx`) resolve their palette from the same `--pv-*` tokens, so they follow the active theme instead of being baked to one.
- Motion is restrained and respects `prefers-reduced-motion`, including the hero's ambient background.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | TypeScript project build |
| `npm run assets` | Regenerate the social card and the app icon (needs Chrome/Edge; override with `CHROME_PATH`) |

## Deploy (Vercel)

Production origin: **`https://pavandeep.is-a.dev`** — a free [is-a.dev](https://is-a.dev) subdomain, registered by pull request instead of a registrar. The domain appears in four places; keep them in sync if it ever changes:

| Where | What |
| --- | --- |
| `index.html` | `rel="canonical"`, `og:url`, absolute `og:image` / `twitter:image`, JSON-LD `url` |
| `src/data/profile.ts` → `siteUrl` | Canonical URL set on case-study pages |
| `public/sitemap.xml` | All published routes |
| `public/robots.txt` | Sitemap reference |

1. Push this repository to GitHub.
2. Import it in Vercel — framework preset **Vite**, no extra settings needed.
3. `vercel.json` handles the SPA rewrite (excluding real files under `/assets/`, `/fonts/`, `/resume/`, `/projects/`, plus `sitemap.xml`) and baseline security headers.
4. **Connect the domain** — see the [is-a.dev Vercel guide](https://docs.is-a.dev/guides/vercel/):
   - Vercel → Project → Settings → Domains → add `pavandeep.is-a.dev`, and **uncheck** the suggested "redirect to www" option (a nested `www.pavandeep.is-a.dev` would need its own is-a.dev file).
   - Copy the DNS record values Vercel shows for your project — typically a `CNAME` target for the subdomain (older projects: `cname.vercel-dns.com`; newer ones a unique `*.vercel-dns-*.com` value) plus a `TXT` verification string.
   - Fork [`is-a-dev/register`](https://github.com/is-a-dev/register) and add two files under `domains/`: `pavandeep.json` carrying the `CNAME` (or `A`) record and `_vercel.pavandeep.json` carrying the `TXT` value. Open a pull request using their template, including the deployed URL and a screenshot.
   - After the PR is merged and DNS resolves, Vercel verifies the domain and provisions HTTPS automatically.
5. No environment variables are required — the contact form is wired to Formspree in code (see below).

If the site later moves to a paid apex domain (e.g. `pavandeep.in`), update the four places above and re-add a `www` → apex 301 in `vercel.json`.

## Contact form

The form submits through **Formspree** using the [`@formspree/react`](https://github.com/formspree/formspree-js/tree/master/packages/formspree-react) hook. The form ID lives in `src/data/profile.ts` → `contactForm.formspreeId` (currently `moejznjy`), so submissions post to `https://formspree.io/f/moejznjy` and are forwarded to the inbox configured in the Formspree dashboard. To point the form at a different Formspree form, edit that one field — no environment variables or rebuild-time secrets.

- The browser validates name/email/message inline before anything is sent (`aria-invalid` + `aria-describedby`, focus moves to the first invalid field).
- A hidden `_gotcha` honeypot field filters basic bots (client- and Formspree-side).
- **If `formspreeId` is left empty, the form renders in an explicit "not connected" state** with the submit disabled — it never shows a fake success.

Email links (hero, footer, and the contact row) open Gmail's prefilled compose page in a new tab, so they work on machines without a desktop mail client; the address is also shown as plain text in the Contact section. To go back to native `mailto:` behaviour, change `getEmailHref()` in `src/data/profile.ts`.

## Placeholders & configuration

Placeholders (if any are ever re-introduced) are rendered in the UI with a visible **Placeholder** tag and are never linked. Current status:

| What | Where | Status |
| --- | --- | --- |
| LinkedIn URL | `src/data/profile.ts` → `contact.linkedin` | Real (`https://www.linkedin.com/in/pavandeepb`) |
| Email | `src/data/profile.ts` → `contact.email` | Real (`pavandeep.net@gmail.com`, taken from the public project READMEs — change it here if it moves) |
| GitHub | `src/data/profile.ts` → `contact.github` | Real (`https://github.com/pavandeepb`) |
| Resume PDF | `public/resume/Pavandeep-B-Resume.pdf` | FlowCV export — replace the file to update (not generated by the repo) |
| Contact form | `src/data/profile.ts` → `contactForm.formspreeId` | Wired to Formspree (`moejznjy`) |

## Content verification & disclosure policy

Everything shown on the site is either supplied directly by the site owner or verified against the actual public repositories. The rules applied:

- **Project copy** in `src/data/projects.ts` was written by inspecting each repository's source — not inferred from repo names or READMEs alone.
- **No invented metrics.** Accuracy, latency, benchmark, user-count, or star figures are never published unless the repository itself contains verifiable evidence. Where a README states a number that is not verifiable from the code (for example, an accuracy figure without the trained weights or evaluation outputs), the site deliberately does not repeat it.
- **Figures** under `public/projects/` are original diagrams/screenshots from the owner's public repositories, used with their permission (they are the owner's own assets).
- **Fitness Tracker is excluded from the project sections.** Its repository is private (the GitHub API returns 404 for unauthenticated access), so it is kept out of the site's project cards. The owner-supplied resume PDF does include the project.
- **Confidential work** (the current R&D prototype engagement) is described at a non-identifying level only: no company name, no features, no screenshots.
- **Documentation drift noted during verification:** the `rag-telecom-chatbot` README mentions Groq, while the current code (`rag_chain.py`) routes through OpenRouter's OpenAI-compatible API. The site follows the code's behaviour. The `Potato-Disease-Detection-System-Using-ViT` app contains a placeholder Google Drive ID for auto-downloading the 982 MB checkpoint — the model must be trained or supplied manually before the app runs.

## Assets pipeline

| Source | Output | Command |
| --- | --- | --- |
| `scripts/og-image.html` (1200×630) | `public/og-image.png` | `npm run assets` |
| `scripts/touch-icon.html` (180×180) | `public/apple-touch-icon.png` | `npm run assets` |
| `public/projects/*` | Case-study figures (from public repos) | Static files — replace to update |
| `public/portrait-*.jpg` | Hero portrait — 4:5 crop, 800×1000 and 400×500 variants | Static files — replace to update |
| `public/mark-96.png` | Brand monogram used in the navbar, mobile menu, and footer | Static file — replace to update |
| `public/fonts/*` | Self-hosted Inter + IBM Plex Mono (no third-party font CDN) | Static files |

The resume PDF is maintained in FlowCV and uploaded directly to `public/resume/Pavandeep-B-Resume.pdf`; `npm run assets` does not touch it.

## Project structure

```
src/
  components/     Navbar (with mobile menu + theme toggle), Hero, About, Experience,
                  ProjectsSection (repo-linked cards), Skills, Education,
                  ContactSection (Formspree-backed form), Footer,
                  ProjectVisual (theme-aware SVG diagrams), ThemeToggle
  data/           profile.ts · experience.ts · projects.ts · skills.ts · education.ts
  lib/            scroll helpers · useActiveSection · theme store · cn
  pages/          HomePage · CaseStudyPage · NotFoundPage
  index.css       Design tokens (light + dark) + component classes (Tailwind 4 theme)
public/
  resume/         Downloadable resume PDF (FlowCV export)
  projects/       Case-study figures from public repositories
  fonts/          Self-hosted woff2 files (Inter, IBM Plex Mono)
scripts/
  generate-assets.mjs   Headless-Chrome social card + touch icon
  og-image.html         Social card source
  touch-icon.html       Apple touch icon source
```

## Accessibility & motion

- Skip link, visible focus states, semantic landmarks, and heading order.
- Mobile menu: keyboard-operable with focus trap, `Esc` to close, and scroll lock.
- All animation respects `prefers-reduced-motion`; content renders without JavaScript via `<noscript>` fallbacks.
- The contact form validates inline with `aria-invalid` / `aria-describedby` and announces status via `aria-live`.
