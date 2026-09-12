import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
await fs.mkdir("artifacts", { recursive: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.goto("http://127.0.0.1:3000", { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);
await page.screenshot({ path: "artifacts/desktop-hero.png" });
for (const selector of ["#proyectos", "#sobre-mi", "#stack", "#contacto"]) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "artifacts/" + selector.slice(1) + ".png" });
}
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:3000", { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: "artifacts/mobile-hero.png" });
await page.locator("#proyectos").scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
await page.screenshot({ path: "artifacts/mobile-projects.png" });
console.log(
  JSON.stringify({
    errors,
    title: await page.title(),
    overflow: await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  }),
);
await browser.close();
