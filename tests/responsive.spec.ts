import { test, expect } from "@playwright/test";
test("layout remains inside the viewport throughout the scroll", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Viewport sweep runs once.");
  for (const width of [320, 390, 768, 1024, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    for (const selector of [
      "#inicio",
      "#observatorio",
      "#proyectos",
      "#sobre-mi",
      "#stack",
      "#servicios",
      "#contacto",
    ]) {
      await page
        .locator(selector)
        .evaluate((element) =>
          element.scrollIntoView({ block: "start", behavior: "instant" }),
        );
      await expect
        .poll(
          () =>
            page.evaluate(
              () => document.documentElement.scrollWidth - innerWidth,
            ),
          { message: "Horizontal overflow at " + width + " in " + selector },
        )
        .toBeLessThanOrEqual(0);
      const masked = page.locator(selector + " .reveal-mask");
      for (const wrapper of await masked.all())
        await expect(wrapper).not.toHaveAttribute("data-reveal", "waiting");
    }
  }
});
