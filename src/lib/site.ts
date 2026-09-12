const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const siteUrl =
  configuredUrl && /^https?:\/\//.test(configuredUrl)
    ? new URL(configuredUrl).origin
    : undefined;
export const siteTitle = "Simón Cifuentes — Desarrollador Fullstack";
export const socialImage = "/opengraph-image";
export const siteDescription =
  "Ideas claras. Software con intención. Portfolio de Simón Cifuentes: React, Next.js, FastAPI y PostgreSQL. Desarrollo web en Temuco, Chile.";
