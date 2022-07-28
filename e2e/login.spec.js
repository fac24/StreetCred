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

  await expect(page).toHaveURL(/groups/);

  await expect(page.locator("h2#my-groups")).toHaveText(/My/);
  await expect(page.locator("h2#member-of-groups")).toHaveText(/Member/);

  //   await expect(page).toHaveURL(/access_token/);
  //   await expect(page).toHaveURL(/create-profile/);

  //   const location = page.locator("input#currentLocation");
  //   await location.type("SE16 4SG");

  //   const bio = page.locator("textarea");
  //   await bio.type("this is minju", { delay: 100 });

  //   const create = page.locator("button#create");
  //   await create.click();
  //   // await expect(page.locator('.status')).toHaveText('Submitted');
  //   await expect(page.locator("h2")).toHaveText("Joe Valtchanovescu");
});
