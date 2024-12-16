// import { test, expect } from '@playwright/test';

// test('register and login', async ({ page }) => {
//   await page.goto('http://localhost:5173');
//   await page.getByRole('link', { name: 'Login' }).click();
//   await page.getByText('Register here').click();
//   await page.locator('input[name="email"]').click();
//   await page.locator('input[name="email"]').fill('testmail12@example.com');
//   await page.locator('input[name="email"]').press('Tab');
//   await page.locator('input[name="password"]').fill('123456');
//   await page.locator('input[name="name"]').click();
//   await page.locator('input[name="name"]').fill('John');
//   await page.getByRole('button', { name: 'Register' }).click();
//   await expect(page.getByRole('img', { name: 'User Avatar' })).toBeVisible();
//   await page.getByRole('img', { name: 'User Avatar' }).click();
//   await page.getByRole('link', { name: 'Login' }).click();
//   await page.locator('input[name="email"]').click();
//   await page.locator('input[name="email"]').fill('testmail12@example.com');
//   await page.locator('input[name="email"]').press('Tab');
//   await page.locator('input[name="password"]').fill('123456');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await expect(page.getByRole('img', { name: 'User Avatar' })).toBeVisible();
// });