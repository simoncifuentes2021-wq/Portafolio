import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("presentation, project cases and contact journey", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ideas claras.",
  );
  await page
    .getByRole("link", { name: "Explorar proyectos", exact: true })
    .click();
  await expect(page).toHaveURL(/#proyectos$/);
  await page
    .getByRole("link", { name: "Ver caso de estudio: Reservas deportivas" })
    .click();
  await expect(page).toHaveURL(/projects\/reservas-deportivas$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Reservas deportivas",
  );
  await expect(page).toHaveTitle("Reservas deportivas | Simón Cifuentes");
  await page
    .getByRole("link", { name: "Conversemos sobre este proyecto" })
    .click();
  await expect(page.getByLabel("Hablemos de tu idea")).toHaveValue(
    /Reservas deportivas/,
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Hagamos",
  );
  expect(errors).toEqual([]);
});

test("three original interactions work with click and keyboard", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "03 Datos" }).click();
  await expect(page.locator("#layer-description")).toContainText(
    "PostgreSQL / SQL",
  );
  await page.getByRole("button", { name: "Separar las capas" }).click();
  await expect(
    page.getByRole("button", { name: "Unir las capas" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "03 Construir" }).click();
  await expect(page.locator("#process-detail")).toContainText(
    "Las partes se convierten en sistema.",
  );
  await page.getByRole("button", { name: "PostgreSQL", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#stack-context").getByRole("link")).toHaveCount(2);
  await expect(page.locator("#stack-context")).toContainText(
    "Panel administrativo",
  );
  await page.getByRole("button", { name: "TypeScript", exact: true }).click();
  await expect(page.locator("#stack-context")).toContainText(
    "Dentro de mi flujo de trabajo",
  );
});

test("form validation, network failure and success feedback", async ({
  page,
}) => {
  await page.goto("/contact");
  await page
    .getByRole("button", { name: "Iniciemos una conversación" })
    .click();
  await expect(page.locator("#name")).toBeFocused();
  await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#email-error")).toBeVisible();
  await page.getByLabel("Tu nombre").fill("Prueba local");
  await page.getByLabel("Tu correo").fill("test@example.com");
  await page
    .getByLabel("Hablemos de tu idea")
    .fill("Mensaje de prueba local sin envío real.");
  await page.route("**/api/contact", (route) => route.abort("failed"));
  await page
    .getByRole("button", { name: "Iniciemos una conversación" })
    .click();
  await expect(
    page.getByRole("form", { name: "Enviar un mensaje" }).getByRole("alert"),
  ).toContainText("No se pudo conectar");
  await expect(
    page.getByRole("button", { name: "Iniciemos una conversación" }),
  ).toBeEnabled();
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Mensaje recibido en la prueba." }),
    }),
  );
  await page
    .getByRole("button", { name: "Iniciemos una conversación" })
    .click();
  await expect(
    page.getByRole("status").filter({ hasText: "Mensaje recibido" }),
  ).toBeVisible();
  await expect(page.getByLabel("Tu nombre")).toHaveValue("");
});

test("all routes have one heading and no horizontal overflow", async ({
  page,
}) => {
  for (const path of [
    "/",
    "/projects",
    "/contact",
    "/projects/reservas-deportivas",
    "/projects/sitio-negocios",
    "/projects/panel-administrativo",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /\/opengraph-image/,
    );
  }
  await page.goto("/projects/does-not-exist");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Esta página no está aquí.",
  );
});

test("accessibility including contrast and mobile dialog", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  for (const selector of ["#proyectos", "#sobre-mi", "#stack", "#contacto"])
    await page.locator(selector).scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Abrir menú" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const dialogResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(dialogResults.violations).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Abrir menú" }),
    ).toBeFocused();
    await page.getByRole("button", { name: "Abrir menú" }).click();
    await page
      .getByRole("navigation", { name: "Navegación móvil" })
      .getByRole("link", { name: "01 Proyectos" })
      .click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page).toHaveURL(/#proyectos$/);
  }
});

test("reduced motion and no-JavaScript content remain usable", async ({
  browser,
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".cursor-follower")).toHaveCount(0);
  expect(
    await page
      .locator(".text-mask > span")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto(page.url());
  await expect(staticPage.getByRole("heading", { level: 1 })).toContainText(
    "Ideas claras.",
  );
  await expect(
    staticPage.getByRole("link", {
      name: "Ver caso de estudio: Reservas deportivas",
    }),
  ).toBeVisible();
  await context.close();
});

test("API rejects malformed, empty and oversized payloads without sending email", async ({
  request,
}) => {
  const malformed = await request.post("/api/contact", { data: "{" });
  expect(malformed.status()).toBe(400);
  const empty = await request.post("/api/contact", {
    data: { name: "  ", email: "invalid", message: "" },
  });
  expect(empty.status()).toBe(400);
  const oversized = await request.post("/api/contact", {
    data: { message: "x".repeat(25000) },
  });
  expect(oversized.status()).toBe(413);
});

test("social image and crawl metadata are served", async ({ request }) => {
  const image = await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/sw.js")).status()).toBe(200);
});
