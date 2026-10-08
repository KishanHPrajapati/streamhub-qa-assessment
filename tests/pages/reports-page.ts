import { Page, expect } from '@playwright/test';
import { BasePage } from '../utils/base-page';

export class ReportsPage extends BasePage {

  private readonly category = this.page.getByLabel('Category');
  private readonly amount = this.page.getByLabel('Amount');
  private readonly addExpenseButton = this.page.getByTestId('add-expense-button');
  private readonly expenseTable = this.page.getByTestId('expense-table');
  private readonly backDashboardButton = this.page.getByTestId('back-dashboard-button');

  constructor(page: Page) {
    super(page);
  }

  async verifyReportsLoaded() {
    await expect(this.expenseTable).toBeVisible();
  }

  async selectCategory(category: string) {
    await this.category.selectOption(category);
  }

  async enterAmount(amount: number) {
    await this.amount.fill(amount.toString());
  }

  async addExpense() {
    await this.addExpenseButton.click();
  }

  async addNewExpense(category: string, amount: number) {
    await this.selectCategory(category);
    await this.enterAmount(amount);
    await this.addExpense();
  }

  async getTableText(): Promise<string> {
    return await this.expenseTable.innerText();
  }

  async goBackToDashboard() {
    await this.backDashboardButton.click();
  }

  async addExpenseAndReturnToDashboard(category: string, amount: number) {
  await this.addNewExpense(category,amount);
  await this.backDashboardButton.click();
}
}