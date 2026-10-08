import {
  Before,
  After
} from '@cucumber/cucumber';

import { CustomWorld } from './world';

Before(async function (this: CustomWorld) {
  await this.openBrowser();
});

After(async function (this: CustomWorld, scenario) {
  if (
    scenario.result?.status === 'FAILED' &&
    this.page
  ) {
    await this.page.screenshot({
      path: `screenshots/${Date.now()}-failure.png`,
      fullPage: true
    });
  }

  await this.closeBrowser();
});