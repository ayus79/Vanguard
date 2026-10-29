const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path ("/docs/x") with the site's base path (set for GitHub project pages). */
export const url = (path: string) => (path.startsWith('/') && !path.startsWith('//') ? base + path : path);

/** Current pathname without the base path, for active-link checks. */
export const stripBase = (pathname: string) => (base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname);
