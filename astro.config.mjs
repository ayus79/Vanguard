// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages: in CI, GITHUB_REPOSITORY ("owner/name") decides the URL.
//   owner/name        -> https://owner.github.io/name/   (base "/name")
//   owner/owner.github.io -> https://owner.github.io/    (base "/")
// Custom domain (or any override): set SITE_URL and BASE_PATH (e.g. BASE_PATH=/) in the workflow env.
const [owner = '', name = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = name.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const site = process.env.SITE_URL ?? (owner ? `https://${owner}.github.io` : 'https://vanguard.example');
const base = (process.env.BASE_PATH ?? (owner && !isUserSite ? `/${name}` : '/')).replace(/\/+$/, '') || '/';
const prefix = base === '/' ? '' : base;

/** Prefix root-relative links in markdown/MDX ("/docs/x") with the base path. */
function rehypeBaseLinks() {
  /** @param {any} node */
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = node.properties?.href;
      if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) node.properties.href = prefix + href;
    }
    node.children?.forEach(walk);
  };
  return walk;
}

export default defineConfig({
  site,
  base,
  integrations: [mdx(), sitemap()],
  redirects: { '/docs': `${prefix}/docs/introduction` },
  markdown: {
    shikiConfig: { theme: 'github-dark-high-contrast', wrap: false },
    rehypePlugins: [rehypeBaseLinks],
  },
  vite: { plugins: [tailwindcss()] },
});
