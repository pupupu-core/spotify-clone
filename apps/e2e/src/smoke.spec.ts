import { LoginPage } from '#/pages/login';
import { test } from '@playwright/test';

test('opens login page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.expectOpened();
});
