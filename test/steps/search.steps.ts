import { When, Then } from '@cucumber/cucumber';
import { assert } from '../helpers/assertions';
import { driver } from './hooks';
import { GoogleSearchPage } from '../pages/google-search-page';
import { GoogleResultsPage } from '../pages/google-results-page';

When('I search for {string}', async function (searchTerm: string) {
  const googleSearchPage = new GoogleSearchPage(driver);
  await googleSearchPage.navigateToGoogle();
  await googleSearchPage.rejectCookies();
  await googleSearchPage.submitSearchTerm(searchTerm);
});

Then('I see {string} in the results', async function (expectedResult: string) {
  const googleResultsPage = new GoogleResultsPage(driver);
  assert(
    await googleResultsPage.pageContains(expectedResult),
    `Search results do not contain ${expectedResult}`
  );
});
