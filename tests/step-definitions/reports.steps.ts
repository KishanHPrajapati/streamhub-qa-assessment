import { When, Then } from '@cucumber/cucumber';
import { ReportsPage } from '../pages/reports-page';
import { CustomWorld } from '../support/world';

let reportsPage: ReportsPage;



When('I navigate to the reports page',
  async function (this: CustomWorld) {
    reportsPage = new ReportsPage(this.page);
    await this.page.getByTestId('reports-link').click();
    await reportsPage.verifyReportsLoaded();
  }
);

When('I add a {string} expense of {int}', async function (this: CustomWorld, category: string, amount: number) {
    await reportsPage.addNewExpense(category, amount);
  }
);

Then('the expense should appear in the report', async function () {
    const tableText = await reportsPage.getTableText();
    if (!tableText.includes('Food')) {
      throw new Error(
        'Food expense was not found in the report'
      );
    }
    if (!tableText.includes('5,000')) {
      throw new Error(
        '₹5,000 expense was not found in the report'
      );
    }
  }
);
