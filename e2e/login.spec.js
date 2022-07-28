// @ts-check
const { test, expect, chromium } = require("@playwright/test");

test("Login ", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await expect(page).toHaveURL(/login/);
  const facebook = page.locator("button.facebook");
  await facebook.click();

  const cookie = page.locator("text=Allow essential and optional cookies");
  await cookie.click();

  const email = page.locator("input#email");
  await email.type("fbogojgmtn_1658154416@tfbnw.net", { delay: 50 });

  const pass = page.locator("input#pass");
  await pass.type("StreetCred22", { delay: 50 });

  const login = page.locator("button[name='login']");
  await login.click();

  await expect(page).toHaveURL(/login-success/);
  await expect(page).toHaveURL(/groups/);

  await expect(page.locator("h2#my-groups")).toHaveText(/My/);
  await expect(page.locator("h2#member-of-groups")).toHaveText(/Member/);

  const profile = page.locator("a#profile");
  await profile.click();

  await expect(page).toHaveURL(/af0236b7-6bea-4a23-a7f9-87aef14293e2/);

  const messages = page.locator("a#messages");
  await messages.click();

  await expect(page).toHaveURL(/messages/);

  const logout = page.locator("button#logout");
  await logout.click();

  await expect(page).toHaveURL(/login/);
});
