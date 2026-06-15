import { HomePage } from '#/pages/home';
import { test } from '@playwright/test';

test('opens home page', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();
  await homePage.expectOpened();
});
