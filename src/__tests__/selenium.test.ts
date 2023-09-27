import * as selenium from "selenium-webdriver";
import { beforeEach, expect, test } from "vitest";

const MOCK_BROWSER_URL = "http://localhost:3000/";
const browser = new selenium.Builder().forBrowser("chrome").build();

test("Selenium opens the browser", async () => {
  beforeEach(async () => {
    await browser.get(MOCK_BROWSER_URL);
  });

  afterEach(async () => {
    await browser.quit();
  });
});
