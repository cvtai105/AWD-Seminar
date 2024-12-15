import { test, expect } from '@playwright/test';

test('register and login', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByText('Register here').click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('email@example.com');
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill('password');
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="name"]').fill('John Doe');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('img', { name: 'User Avatar' })).toBeVisible();
  await page.getByRole('img', { name: 'User Avatar' }).click();
  await expect(page.getByRole('banner')).toContainText('Login');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('email@example.com');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('img', { name: 'User Avatar' })).toBeVisible();
  await page.getByRole('img', { name: 'User Avatar' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByText('Register here').click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('email@example.com');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('xxx');
  await page.locator('input[name="password"]').press('Tab');
  await page.locator('input[name="name"]').fill('xxxx');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText('Email has already existed!')).toBeVisible();
  await page.getByText('Login here').click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('email@example.com');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Wrong password')).toBeVisible();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('email321@example.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Invalid email')).toBeVisible();
});


