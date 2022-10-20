import { test, expect } from "@playwright/test";
import { email, password } from "../user";

test("Should login with valid auth data test", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', email);
  await page.fill('[placeholder="Пароль"]', password);
  await page.click("text=Войти");
  await expect(page.locator("text=Мои курсы и профессии")).toBeVisible();
});