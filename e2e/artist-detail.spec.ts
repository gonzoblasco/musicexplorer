// e2e/artist-detail.spec.ts
import { test, expect } from "@playwright/test";

test("artist page loads correctly when accessed directly", async ({ page }) => {
  // ID de Coldplay en la API
  await page.goto("/artist/111239");

  // Verificar que la página del artista carga correctamente
  await expect(page.locator("h1")).toContainText("Coldplay");

  // Verificar que se muestran álbumes
  const albumSection = page.locator('h2:has-text("Álbumes")');
  await expect(albumSection).toBeVisible();
});
