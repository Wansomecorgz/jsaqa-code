const jestConfig = require("./jest.config");

let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    await page.setDefaultTimeout(40000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  });

  test("The first link attribute", async () => {
    await page.setDefaultTimeout(50000);
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    await page.setDefaultTimeout(60000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) =>
      link.textContent.trim()
    );
    expect(actual).toContain("Get started with Team");
  });
});

describe("Tests for task №2", () => {
  afterEach(() => {
    page.close();
  });

  test("Should check security page header", async() => {
    await page.goto("https://github.com/features/security/code");
    const pageHeader = await page.$("div.sub-nav-mktg.js-toggler-container.js-sticky.js-position-sticky.top-0.width-full.z-3 > div > a");
    const elementText = await pageHeader.evaluate((el) => el.textContent);
    expect(elementText).toEqual("Security");
   });

  test("Should check gitHub blog header", async () => {
    await page.goto("https://github.blog");
    const title = await page.title();
    expect(title).toContain(
      "The GitHub Blog | Updates, ideas, and inspiration from GitHub to help developers build and design software."
    );
  });

  test("Should check shop page", async () => {
    await page.goto("https://github.com/marketplace");
    const title = await page.title();
    expect(title).toContain("GitHub Marketplace · to improve your workflow · GitHub")
  });

});