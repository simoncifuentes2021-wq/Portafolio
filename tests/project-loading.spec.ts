import { test, expect } from "@playwright/test";

test("project client modules survive navigation and reload", async ({
  page,
}) => {
  test.setTimeout(180000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const cases = [
    ["reservas-deportivas", "Reservas deportivas"],
    ["sitio-negocios", "Sitios para negocios"],
    ["panel-administrativo", "Panel administrativo"],
  ];
  for (const [slug, name] of cases) {
    await page.goto("/");
    await page
      .getByRole("link", { name: `Ver caso de estudio: ${name}`, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`/projects/${slug}$`), {
      timeout: 60000,
    });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(name, {
      timeout: 60000,
    });
    await page.getByRole("tab").last().click();
    await expect(page.getByRole("tab").last()).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await page.reload();
    await expect(page.getByRole("tab").first()).toHaveAttribute(
      "aria-selected",
      "true",
    );
  }
  expect(errors).toEqual([]);
});
