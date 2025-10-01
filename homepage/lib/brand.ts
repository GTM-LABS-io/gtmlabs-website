// Centralized brand constants used across marketing and legal pages
// Values can be customized via environment variables without code changes.

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'GTM LABS';
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'jovanny@gtmlabs.io';
// Public site URL. Prefer explicit env var; fall back to localhost for dev builds.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gtmlabs.io';
// Bot/system message display name
export const BOT_NAME = process.env.NEXT_PUBLIC_BOT_NAME ?? 'GTM LABS';
