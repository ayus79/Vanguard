# Vanguard website

Marketing + docs site for Vanguard, an open-source Python API gateway.
Astro 6 · TypeScript (strict) · Tailwind CSS 4 · MDX content collections. Fully static output.

## Run

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-checks (astro check) then builds to dist/
npm run preview    # serve the production build
```

Requires Node 22.12+. (Astro 7 needs Node 22.23.4+, so this project pins Astro 6; Vite is pinned to 7.x
at the top level so Tailwind's plugin and Astro share one copy. Keep those two in sync when upgrading.)

## Change the colors

All colors are CSS variables in [src/styles/global.css](src/styles/global.css):

- `:root` holds the **dark** (default) palette: `--c-bg`, `--c-surface`, `--c-raised`, `--c-line`,
  `--c-primary`, `--c-secondary`, `--c-success`, `--c-danger`, `--c-fg`, `--c-muted`.
- `:root[data-theme='light']` holds the light palette. Light primary/secondary are deliberately darker
  than the dark-theme values so text stays WCAG AA.
- `@theme inline` maps the variables to Tailwind utilities (`bg-surface`, `text-primary`, `border-line`, ...),
  so changing a variable updates the whole site. `--g-from` / `--g-to` drive the logo and headline gradient.

If you change a color, re-check contrast in both themes (Lighthouse accessibility is a quick test).

## Edit content

| What | Where |
| --- | --- |
| Docs pages | `src/content/docs/**/*.mdx` (frontmatter: `title`, `description`, `section`, `order`). Sidebar and TOC are generated. |
| Changelog | `src/content/changelog/*.md` (frontmatter: `version`, `date`, `summary`, `tags`) |
| The six layers | `src/data/layers.ts` |
| Site name, GitHub URL, install command | `src/data/site.ts` |
| Logo | `src/components/Logo.astro`, `public/logo.svg`, `public/favicon.svg` |
| OG image | `node scripts/make-og.mjs` regenerates `public/og.png` |

## Deploy to GitHub Pages

A workflow is already set up in [.github/workflows/deploy.yml](.github/workflows/deploy.yml). It builds on every push to `main` and publishes `dist/`.

1. Push this project to a GitHub repo (branch `main`).
2. In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push again (or run the workflow from the **Actions** tab). The site appears at the URL shown in the deploy job.

The URL and base path come from the repository name, so nothing needs editing:

| Repo | Site URL |
| --- | --- |
| `you/vanguard` | `https://you.github.io/vanguard/` |
| `you/you.github.io` | `https://you.github.io/` |

**Custom domain:** add the domain in Settings → Pages, then set `SITE_URL` and `BASE_PATH` on the build step in the workflow:

```yaml
- run: npm run build
  env:
    SITE_URL: https://vanguard.dev
    BASE_PATH: /
```

To test a sub-path build locally: `GITHUB_REPOSITORY=you/vanguard npm run build && GITHUB_REPOSITORY=you/vanguard npm run preview`.

Internal links use the `url()` helper in `src/lib/url.ts`, and links inside docs MDX are prefixed automatically, so write them as `/docs/...`.

## Before publishing

These are placeholders to replace:

- The `pip install vanguard-gateway` package name in `src/data/site.ts` (the GitHub link already points to this repo)
- Docs and changelog content is realistic placeholder text, not documentation of a shipped product.
