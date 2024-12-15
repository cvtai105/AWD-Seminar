import { test, expect } from '@playwright/test';

test.describe('movies', () => {
    test('search and view movie detail', async ({ page }) => {
        await page.goto('http://localhost:5173/');
        await page.getByPlaceholder('Search for a movie').click();
        await page.getByPlaceholder('Search for a movie').fill('your name');
        await page.getByPlaceholder('Search for a movie').press('Enter');
        await page.getByRole('link', { name: 'Your Name. 2016' }).click();
        await expect(page.getByRole('heading', { name: 'Your Name.' })).toBeVisible();
        await expect(page.getByText('User Score')).toBeVisible();
        await expect(page.getByRole('img', { name: 'Your Name.' }).first()).toBeVisible();
        await expect(page.getByRole('img', { name: 'Your Name.' }).nth(1)).toBeVisible();
    });
})