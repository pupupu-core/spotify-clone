import { APP_ROUTES } from '#/shared/routes';
import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;
  private readonly logoLink: Locator;
  private readonly logoTitle: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.logoLink = page.getByRole('link', { name: 'Pupufy' });
    this.logoTitle = this.logoLink.getByRole('heading', { name: 'Pupufy' });
  }

  public async open(): Promise<void> {
    await this.page.goto(APP_ROUTES.HOME.to);
  }

  public async expectOpened(): Promise<void> {
    await expect(this.page).toHaveURL(APP_ROUTES.AUTH.LOGIN.to);
    await expect(this.logoLink).toBeVisible();
    await expect(this.logoTitle).toBeVisible();
  }
}
