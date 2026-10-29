export interface Layer {
  n: number;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  doc: string;
}

export const LAYERS: Layer[] = [
  {
    n: 1,
    name: 'Edge guard',
    tagline: 'Stop malformed traffic at the door.',
    description:
      'Terminates TLS and enforces hard limits before a single byte reaches your logic.',
    features: ['TLS', 'Size limits', 'Timeouts'],
    doc: '/docs/layers/edge-guard',
  },
  {
    n: 2,
    name: 'Traffic control',
    tagline: 'Decide who gets in, and how often.',
    description:
      'IP allow and deny lists plus sliding-window rate limiting, per IP, key or user.',
    features: ['IP rules', 'Rate limiting'],
    doc: '/docs/layers/traffic-control',
  },
  {
    n: 3,
    name: 'Authentication',
    tagline: 'Know exactly who is calling.',
    description:
      'Verify identity with API keys, JWTs against your JWKS, or mutual TLS client certificates.',
    features: ['API keys', 'JWT', 'mTLS'],
    doc: '/docs/layers/authentication',
  },
  {
    n: 4,
    name: 'Authorization',
    tagline: 'Check what they are allowed to do.',
    description:
      'Map identities to roles, scopes and declarative policies evaluated per route.',
    features: ['RBAC', 'Scopes', 'Policies'],
    doc: '/docs/layers/authorization',
  },
  {
    n: 5,
    name: 'Request validation',
    tagline: 'Trust nothing in the payload.',
    description:
      'Validate bodies, queries and headers against schemas and strip dangerous input.',
    features: ['Schema checks', 'Sanitization'],
    doc: '/docs/layers/request-validation',
  },
  {
    n: 6,
    name: 'Proxy and resilience',
    tagline: 'Deliver clean requests, reliably.',
    description:
      'Route to upstreams with circuit breakers, retries and backoff so one bad service stays one bad service.',
    features: ['Routing', 'Circuit breakers', 'Retries'],
    doc: '/docs/layers/proxy-resilience',
  },
];

export const pad = (n: number) => String(n).padStart(2, '0');
