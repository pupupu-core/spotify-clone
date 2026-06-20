import { APP_ROUTES } from '#/shared/routes';
import { expect, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async open(): Promise<void> {
    await this.page.goto(APP_ROUTES.HOME.to);
  }

  public async expectOpened(): Promise<void> {
    await expect(this.page).toHaveURL(APP_ROUTES.AUTH.LOGIN.to);
  }
}
