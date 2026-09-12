import { chromium } from "@playwright/test";
import fs from "node:fs/promises";

const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000";
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.addInitScript(() => {
  window.__portfolioMetrics = { lcp: 0, cls: 0 };
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries())
      window.__portfolioMetrics.lcp = entry.startTime;
  }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries())
      if (!entry.hadRecentInput) window.__portfolioMetrics.cls += entry.value;
  }).observe({ type: "layout-shift", buffered: true });
});
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
await page.goto(baseURL, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const metrics = await page.evaluate(() => ({
  ...window.__portfolioMetrics,
  javascriptBytes: performance
    .getEntriesByType("resource")
    .filter((r) => r.name.endsWith(".js"))
    .reduce((sum, r) => sum + r.encodedBodySize, 0),
  fontRequests: performance
    .getEntriesByType("resource")
    .filter((r) => r.name.includes(".woff2")).length,
  imageRequests: performance
    .getEntriesByType("resource")
    .filter((r) => r.initiatorType === "img").length,
}));
const metadata = [];
for (const path of [
  "/",
  "/projects",
  "/contact",
  "/projects/reservas-deportivas",
  "/projects/sitio-negocios",
  "/projects/panel-administrativo",
]) {
  await page.goto(baseURL + path);
  metadata.push(
    await page.evaluate(() => ({
      path: location.pathname,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      ogTitle: document.querySelector('meta[property="og:title"]')?.content,
      ogImage: document.querySelector('meta[property="og:image"]')?.content,
    })),
  );
}
await fs.mkdir("artifacts", { recursive: true });
const report = {
  note: "Local production measurement, no throttling; not field Core Web Vitals.",
  metrics,
  errors,
  metadata,
};
await fs.writeFile(
  "artifacts/production-report.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report));
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(baseURL + "/#contacto");
await page.waitForTimeout(1000);
await page.screenshot({ path: "artifacts/mobile-contact.png" });
await page.goto(baseURL + "/projects/reservas-deportivas");
await page.screenshot({ path: "artifacts/mobile-case.png", fullPage: true });
await browser.close();
