import { chromium } from "playwright";
import { email, password } from "./user";
import { test, expect } from "@playwright/test";

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
    devtools: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', email);
  await page.fill('[placeholder="Пароль"]', password);
  await page.click("text=Войти");
  await expect(page.locator("text=Мои курсы и профессии")).toBeVisible();
  // ---------------------
  await context.close();
  await browser.close();
})();