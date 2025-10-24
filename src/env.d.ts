/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SANITY_PROJECT_ID: string;
  readonly SANITY_DATASET: string;
  readonly SANITY_API_VERSION: string;
  readonly SANITY_READ_TOKEN?: string;
  readonly PUBLIC_GA4_ID?: string;
  readonly EMAIL_API_KEY?: string;
  readonly EMAIL_FROM: string;
  readonly EMAIL_TO: string;
  readonly PUBLIC_SITE_URL: string;
  readonly VERCEL_ENV?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
