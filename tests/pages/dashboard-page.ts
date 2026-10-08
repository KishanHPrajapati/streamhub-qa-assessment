import { Page, expect } from "@playwright/test";
import { BasePage } from "../utils/base-page";
import { env } from "../../config/env";

export class DashboardPage extends BasePage {

  private readonly dashboardLink = this.page.getByTestId('dashboard-link');
  private readonly reportsLink = this.page.getByTestId('reports-link');
  private readonly totalExpenses = this.page.getByTestId('total-expenses');
  private readonly transactionCount = this.page.getByTestId('transaction-count');
  private readonly averageExpense = this.page.getByTestId('average-expense');
  private readonly expenseChart = this.page.getByTestId('expense-chart');
  private readonly viewReportsButton = this.page.getByTestId('view-reports-button');

  constructor(page: Page) {
    super(page);
  }

  async navigateToDashboard() {
    await this.dashboardLink.click();
  }

  async navigateToReports() {
    await this.reportsLink.click();
  }

  async clickReports() {
  await this.reportsLink.click();
}

  async verifyDashboardLoaded() {
    await expect(this.totalExpenses).toBeVisible();
    await expect(this.transactionCount).toBeVisible();
    await expect(this.averageExpense).toBeVisible();
  }

  async getTotalExpenses(): Promise<number> {
    const text = await this.totalExpenses.innerText();
    return Number(text.replace('₹', '').replace(/,/g, '').trim());
  }

  async verifyChartVisible() {
    await expect(this.expenseChart).toBeVisible();
  }

  async clickViewReports() {
    await this.viewReportsButton.click();
  }

  async getTransactionCount(): Promise<number> {
    const text = await this.transactionCount.innerText();
    return Number(text.trim());
  }

  async getAverageExpense(): Promise<number> {
    const text = await this.averageExpense.innerText();
    return Number(
      text
        .replace('₹', '')
        .replace(/,/g, '')
        .trim()
    );
  }

  async getChartValue(category: string): Promise<number> {

    const locator =
      this.page.getByTestId(
        `chart-value-${category.toLowerCase()}`
      );

    const value =
      await locator.getAttribute('data-value');

    return Number(value);
  }

}

