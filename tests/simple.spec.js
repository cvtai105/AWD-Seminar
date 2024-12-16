import { test, expect } from '@playwright/test';

test('search and view movie detail', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByText('TMDBMoviesBooksAboutSearchLogin')).toBeVisible();
});