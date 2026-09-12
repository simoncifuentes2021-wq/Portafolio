import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("observatory supports selection, keyboard rotation, reset and case navigation", async ({
  page,
}, testInfo) => {
  await page.goto("/#observatorio");
  const observatory = page.locator("#observatorio");
  await observatory
    .getByRole("button", { name: "02 Sitios para negocios" })
    .click();
  await expect(observatory.locator("#observatory-detail")).toContainText(
    "Una presencia digital",
  );
  const slider = page.getByRole("slider", { name: "Ángulo" });
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveValue("-23");
  await observatory.getByRole("button", { name: "Compactar" }).click();
  await expect(
    observatory.getByRole("button", { name: "Desplegar" }),
  ).toHaveAttribute("aria-pressed", "false");
  await observatory
    .getByRole("button", { name: "Restablecer perspectiva" })
    .click();
  await expect(slider).toHaveValue("-24");
  const surface = observatory.locator(".observatory-drag");
  await surface.scrollIntoViewIfNeeded();
  const bounds = await surface.boundingBox();
  if (!bounds) throw new Error("Missing 3D interaction surface");
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 70,
    bounds.y + bounds.height / 2,
  );
  await page.mouse.up();
  await expect(slider).not.toHaveValue("-24");
  await observatory
    .getByRole("button", { name: "Restablecer perspectiva" })
    .click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  const results = await new AxeBuilder({ page })
    .include("#observatorio")
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await observatory.screenshot({
    path: `artifacts/observatory-${testInfo.project.name}.png`,
  });
  await observatory
    .getByRole("link", { name: "Entrar en el proyecto" })
    .click();
  await expect(page).toHaveURL(/projects\/sitio-negocios$/);
});

test("system pulse completes and adapts to reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Recorrer una solicitud" }).click();
  await expect(page.locator(".system-pulse-controls [role=status]")).toHaveText(
    "El resultado vuelve a la persona.",
  );
  await expect(page.locator(".architecture")).not.toHaveAttribute("data-pulse");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Recorrer una solicitud" }).click();
  await expect(page.locator(".architecture")).not.toHaveAttribute("data-pulse");
});
