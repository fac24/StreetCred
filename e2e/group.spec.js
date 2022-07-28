const { test, expect, chromium } = require("@playwright/test");

test("Group UX ", async ({ page }) => {
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

  const addGroup = page.locator("button.add-new-group-button");
  await addGroup.click();

  await expect(page).toHaveURL(/add-group/);

  const groupname = page.locator("input#group-name");
  await groupname.type("se16 knitting with cat");

  const location = page.locator("input#currentLocation");
  await location.type("SE16 4SG");

  const description = page.locator("textarea#group-description");
  await description.type("Bring your own cat.");

  await page.setInputFiles(
    "input#group-avatar",
    "/Users/minju25kim/Desktop/FAC/10-tenth-week/StreetCred/e2e/upload/knitting-cat-illustration.png"
  );

  const create = page.locator("button#create-group");
  await create.click();

  await expect(page.locator("h2#groupName")).toHaveText(
    /se16 knitting with cat/
  );

  const groups = page.locator("a#groups");
  await groups.click();

  await expect(page.locator("h3#group-title")).toHaveText(
    /se16 knitting with cat/
  );
});
