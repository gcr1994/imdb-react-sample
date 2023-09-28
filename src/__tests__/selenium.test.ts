import * as selenium from "selenium-webdriver";
import { beforeEach, afterEach, test, it, expect } from "vitest";

const MOCK_BROWSER_URL = "http://localhost:3000/";

test("Selenium opens the browser", async () => {
  const browser = new selenium.Builder().forBrowser("chrome").build();
  beforeEach(async () => {
    await browser.get(MOCK_BROWSER_URL);
  });

  it("finds an element", async () => {
    const findElementById = await browser.findElement(
      selenium.By.id("editing")
    );
    expect(findElementById.getText()).toEqual("Get started by editing");
  });

  afterEach(async () => {
    await browser.quit();
  });
});
