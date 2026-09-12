import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("profile brief gives a focused summary and restores keyboard focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Mi perfil en breve" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /Lo esencial/ });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Temuco");
  await expect(dialog).toContainText("Primera experiencia profesional");
  // The native modal makes the underlying page inert; that page is audited
  // separately. Scope this audit to the dialog actually available to visitors.
  expect(
    (
      await new AxeBuilder({ page })
        .include("#profile-brief")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await dialog.getByRole("link", { name: "Ver LinkedIn" }).focus();
  await page.keyboard.press("Tab");
  // Chrome may visit its own browser controls before wrapping into a native
  // dialog. It must never focus the inert page behind the modal.
  if (!(await page.evaluate(() => document.hasFocus())))
    await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Cerrar resumen del perfil" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: /Reservas deportivas/ }).click();
  await expect(page).toHaveURL(/projects\/reservas-deportivas$/);
  expect(
    await page.locator("body").evaluate((el) => getComputedStyle(el).overflow),
  ).not.toBe("hidden");
});

test("project journeys support keyboard exploration and returning to the exact project", async ({
  page,
}) => {
  for (const slug of [
    "reservas-deportivas",
    "sitio-negocios",
    "panel-administrativo",
  ]) {
    await page.goto("/projects/" + slug);
    const tabs = page.getByRole("tab");
    await expect(tabs).toHaveCount(3);
    await tabs.first().focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText(
      "Desde la experiencia",
    );
    await page.keyboard.press("End");
    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
    expect(
      (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
        .violations,
    ).toEqual([]);
    await page.getByRole("link", { name: "Todos los proyectos" }).click();
    await expect(page).toHaveURL(new RegExp("/#" + slug + "$"));
  }
});

test("service inquiry keeps its context and never replaces a visitor's own message", async ({
  page,
}) => {
  await page.goto("/#servicios");
  await page.getByText("Desarrollo Backend", { exact: true }).click();
  const service = page
    .locator("details")
    .filter({ has: page.getByText("Desarrollo Backend", { exact: true }) });
  await service
    .getByRole("link", { name: "Consultar sobre este servicio" })
    .click();
  await expect(page).toHaveURL(/contact\?service=backend$/);
  await expect(page.getByLabel("Hablemos de tu idea")).toHaveValue(
    /Desarrollo Backend/,
  );
  await page.getByLabel("Una oportunidad", { exact: true }).check();
  await expect(page.getByLabel("Hablemos de tu idea")).toHaveValue(
    /oportunidad profesional/,
  );
  const message = "Este es mi mensaje personal y quiero conservarlo.";
  await page.getByLabel("Hablemos de tu idea").fill(message);
  await page.getByLabel("Una conversación", { exact: true }).check();
  await expect(page.getByLabel("Hablemos de tu idea")).toHaveValue(message);
});
