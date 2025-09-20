// Centralized brand constants used across marketing and legal pages
// Values can be customized via environment variables without code changes.

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Quick Ping';
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'support@aquickping.com';
// Public site URL. Prefer explicit env var; fall back to localhost for dev builds.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aquickping.com';
// Bot/system message display name
export const BOT_NAME = process.env.NEXT_PUBLIC_BOT_NAME ?? 'Quick Ping';
