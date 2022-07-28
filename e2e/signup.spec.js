// @ts-check
const { test, expect, chromium } = require("@playwright/test");

test("Signup and create profile", async ({}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("http://localhost:3000");

  // // create a locator
  const signup = page.locator("a.web-login-button");
  await signup.click();

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
  await expect(page).toHaveURL(/create-profile/);

  const location = page.locator("input#currentLocation");
  await location.type("SE16 4SG");

  const bio = page.locator("textarea");
  await bio.type("This is minju. Minju is cool.", { delay: 100 });

  const create = page.locator("button#create");
  await create.click();

  await expect(page.locator("h2")).toHaveText(/Joe Valtchanovescu/);
});
