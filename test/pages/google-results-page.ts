import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { driver } from '../steps/hooks';

export class GoogleResultsPage {
  private driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async pageContains(expectedResult: string): Promise<boolean> {
    const searchResults: WebElement[] = await driver.findElements(By.css('h3'));

    let containsExpectedResult: boolean = false;
    for (const result of searchResults) {
      const text: string = await result.getText();
      if (text.includes(expectedResult)) {
        containsExpectedResult = true;
        break;
      }
    }
    return containsExpectedResult;
  }
}
