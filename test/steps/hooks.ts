import {
  Before,
  BeforeAll,
  AfterStep,
  AfterAll,
  Status,
} from '@cucumber/cucumber';
import { WebDriver, Capabilities, Builder } from 'selenium-webdriver';
import { writeFileSync } from 'fs';
import fs from 'fs-extra';

export let driver: WebDriver;

// Before all scenarios
BeforeAll(async function () {
  driver = await new Builder().withCapabilities(Capabilities.chrome()).build();
  await driver.manage().setTimeouts({ implicit: 10000 });
});

// Before each scenario
Before(async function () {
  await driver.manage().deleteAllCookies();
});

// After each step
AfterStep(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    await driver.manage().window().maximize();

    const screenshot = await driver.takeScreenshot();
    const screenshotFolder = 'cucumber-report/screenshots';

    if (fs.existsSync(screenshotFolder)) {
      fs.removeSync(screenshotFolder);
    }

    fs.mkdirSync(screenshotFolder);

    const screenshotFileName = `${screenshotFolder}/${scenario.pickle.name} - page where failure occurred.png`;
    writeFileSync(screenshotFileName, screenshot, 'base64');
    this.attach(screenshot, { mediaType: 'base64:image/png' });

    await driver.navigate().back();

    const previousScreenshot = await driver.takeScreenshot();
    const previousScreenshotFileName = `${screenshotFolder}/${scenario.pickle.name} - page before failure.png`;
    writeFileSync(previousScreenshotFileName, previousScreenshot, 'base64');
    this.attach(previousScreenshot, { mediaType: 'base64:image/png' });
  }
});

// After all scenarios
AfterAll(async function () {
  await driver.quit();
});
