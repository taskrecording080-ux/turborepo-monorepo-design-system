import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('theme toggle switches and persists across reload', async ({ page }) => {
	await page.goto('/');
	const html = page.locator('html');
	await expect(html).toHaveAttribute('data-theme', 'light');
	await page.getByRole('button', { name: 'Toggle theme' }).click();
	await expect(html).toHaveAttribute('data-theme', 'dark');
	await page.reload();
	await expect(html).toHaveAttribute('data-theme', 'dark');
});
test('brand switch changes the primary token', async ({ page }) => {
	await page.goto('/');
	const primary = () =>
		page.evaluate(() =>
			getComputedStyle(document.documentElement)
				.getPropertyValue('--color-primary')
				.trim()
		);
	const before = await primary();
	await page.getByLabel('Brand').selectOption('globex');
	await expect(page.locator('html')).toHaveAttribute('data-brand', 'globex');
	expect(await primary()).not.toBe(before);
});
test('dialog is keyboard operable and returns focus', async ({ page }) => {
	await page.goto('/');
	const trigger = page.getByRole('button', { name: 'Delete project' });
	await trigger.focus();
	await page.keyboard.press('Enter');
	await expect(
		page.getByRole('dialog', { name: 'Delete project?' })
	).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(page.getByRole('dialog')).toBeHidden();
	await expect(trigger).toBeFocused();
});
test('tabs support arrow-key navigation', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('tab', { name: 'Form' }).focus();
	await page.keyboard.press('ArrowRight');
	await expect(page.getByRole('tab', { name: 'Disclosure' })).toBeFocused();
});
test('no automatically detectable a11y violations (light and dark)', async ({
	page
}) => {
	await page.goto('/');
	expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
	await page.getByRole('button', { name: 'Toggle theme' }).click();
	expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
