import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { driver } from '../steps/hooks';

export class GoogleSearchPage {
  private driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  async navigateToGoogle() {
    await driver.get('https://www.google.co.uk');
  }

  async rejectCookies() {
    const rejectAllButton: WebElement = await driver.findElement(
      By.id('W0wltc')
    );
    await rejectAllButton.click();
  }

  async submitSearchTerm(searchTerm: string) {
    const searchBox: WebElement = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('cat');
    await searchBox.sendKeys('\n');
  }
}
