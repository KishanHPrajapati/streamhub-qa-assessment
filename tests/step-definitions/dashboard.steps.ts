import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { DashboardPage } from '../pages/dashboard-page';
import { env } from "../../config/env";
import { calculateTotalExpense, calculateAverageExpense } from '../support/calculations';

let dashboardPage: DashboardPage;

Given('I launch the expense application', async function (this: CustomWorld) 
  {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error(
        'BASE_URL is not configured'
      );
    }
    await this.page.goto(baseUrl);
    dashboardPage = new DashboardPage(this.page);
  }
);

When('I navigate to the dashboard', async ()=> {
    await dashboardPage.navigateToDashboard();
  }
);

Then('the dashboard should be displayed', async ()=> {
    await dashboardPage.verifyDashboardLoaded();
  }
);

Then('the expense chart should be visible', async ()=> {
    await dashboardPage.verifyChartVisible();
  }
);

Then(
  'the total expense should match the independently calculated value',
  async function () {

    const testExpenses = [
      1200,
      4500,
      2000,
      3500,
      1800
    ];

    const expectedTotal =
      calculateTotalExpense(testExpenses);

    const actualTotal =
      await dashboardPage.getTotalExpenses();

    if (actualTotal !== expectedTotal) {
      throw new Error(
        `Total expense mismatch. Expected: ${expectedTotal}, Actual: ${actualTotal}`
      );
    }
  }
);

Then(
  'the transaction count should match the expected value',
  async function () {

    const expectedCount = 5;

    const actualCount =
      await dashboardPage.getTransactionCount();

    if (actualCount !== expectedCount) {
      throw new Error(
        `Transaction count mismatch. Expected: ${expectedCount}, Actual: ${actualCount}`
      );
    }
  }
);

Then(
  'the average expense should match the independently calculated value',
  async function () {

    const testExpenses = [
      1200,
      4500,
      2000,
      3500,
      1800
    ];

    const expectedAverage =
      calculateAverageExpense(testExpenses);

    const actualAverage =
      await dashboardPage.getAverageExpense();

    if (actualAverage !== expectedAverage) {
      throw new Error(
        `Average expense mismatch. Expected: ${expectedAverage}, Actual: ${actualAverage}`
      );
    }
  }
);

Then(
  'the expense chart should contain valid non-zero data',
  async function () {

    const categories = [
      'Food',
      'Travel',
      'Bills',
      'Shopping'
    ];

    for (const category of categories) {

      const value =
        await dashboardPage.getChartValue(
          category
        );

      if (!Number.isFinite(value)) {
        throw new Error(
          `Invalid chart value for ${category}: ${value}`
        );
      }

      if (value <= 0) {
        throw new Error(
          `Chart value for ${category} must be greater than zero. Actual: ${value}`
        );
      }
    }
  }
);

When(
  'I navigate back to the dashboard',
  async function (this: CustomWorld) {

    await this.page
      .getByTestId('back-dashboard-button')
      .click();
  }
);

Then(
  'the total expense should be {int}',
  async function (
    expectedTotal: number
  ) {

    const actualTotal =
      await dashboardPage.getTotalExpenses();

    if (actualTotal !== expectedTotal) {
      throw new Error(
        `Expected total ${expectedTotal}, but found ${actualTotal}`
      );
    }
  }
);