// e2e/homepage.spec.ts
import { test, expect } from "@playwright/test";

test("homepage loads correctly", async ({ page }) => {
  await page.goto("/");

  // Verificar elementos clave en la página
  await expect(page.locator("h1")).toContainText("MusicExplorer");
  await expect(page.locator("form")).toBeVisible();
});

test("search functionality works", async ({ page }) => {
  await page.goto("/");

  // Realizar una búsqueda
  await page.fill('input[type="text"]', "coldplay");
  await page.click('button[type="submit"]');

  // Verificar que redirige a la página de resultados
  await expect(page).toHaveURL(/\/search\?q=coldplay/);
  await expect(page.locator("h1")).toContainText('Resultados para "coldplay"');

  // Debería mostrar resultados (asumiendo que la API devuelve resultados para "coldplay")
  const artistCardsCount = await page.locator(".artist-card").count();
  expect(artistCardsCount).toBeGreaterThan(0);
});
