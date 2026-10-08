# Streamhub LTD — Fullstack + QA Automation Assessment

## 1. Project Overview

This repository contains my solution for the **Streamhub LTD Fullstack + QA Automation Assessment**.

The project demonstrates:

* A small web application for expense analytics
* Playwright-based UI automation
* Cucumber BDD feature files and step definitions
* Page Object Model architecture
* Playwright API automation
* SQL solutions for the required data scenarios
* AI-assisted test automation and self-healing locator experimentation
* Test reports and failure screenshots
* Environment-based configuration

The assessment was implemented using **Section A — Fullstack + QA Automation**.

---

# 2. Technology Stack

| Technology            | Purpose                                                         |
| --------------------- | --------------------------------------------------------------- |
| Node.js               | JavaScript/TypeScript runtime                                   |
| TypeScript            | Application and automation code                                 |
| React                 | Web application                                                 |
| Vite                  | Frontend development/build tool                                 |
| Playwright            | UI and API automation                                           |
| Cucumber              | BDD feature files and step definitions                          |
| Recharts              | Dashboard chart                                                 |
| SQLite                | SQL assessment                                                  |
| DB Browser for SQLite | SQL execution and validation                                    |
| dotenv                | Environment configuration                                       |
| Git/GitHub            | Version control and submission                                  |
| AI coding assistant   | Development, debugging, test design and self-healing experiment |

---

# 3. Project Structure

```text
streamhub-qa-assessment/
│
├── app/
│   ├── src/
│   └── ...
│
├── tests/
│   ├── features/
│   │   ├── dashboard.feature
│   │   ├── reports.feature
│   │   └── api.feature
│   │
│   ├── step-definitions/
│   │   ├── dashboard.steps.ts
│   │   ├── reports.steps.ts
│   │   └── api.steps.ts
│   │
│   ├── pages/
│   │   ├── DashboardPage.ts
│   │   └── reports-page.ts
│   │
│   ├── api/
│   │   └── Json-placeholder-api-client.ts
│   │
│   └── support/
│       ├── world.ts
│       ├── hooks.ts
│       └── calculations.ts
│
├── sql/
│   ├── schema.sql
│   ├── test-data.sql
│   ├── round-trip-transfers.sql
│   ├── ipl-consecutive-scores.sql
│   └── assessment.db
│
├── self-healing/
│   └── ...
│
├── reports/
│   └── ...
│
├── screenshots/
│   └── ...
│
├── .env.example
├── .gitignore
├── cucumber.js
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

# 4. Environment Configuration

The application and API URLs are configured through environment variables instead of being hardcoded in the tests.

Example `.env`:

```env
BASE_URL=http://localhost:5173
API_BASE_URL=https://jsonplaceholder.typicode.com
```

A `.env.example` file is included in the repository.

The actual `.env` file is excluded from Git using `.gitignore`.

---

# 5. Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd streamhub-qa-assessment
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# 6. Start the Application

The application is implemented using React and Vite.

Start the application with:

```bash
cd app
npm install
npm run dev
```

The application runs on:

```text
http://localhost:5173
```

The URL is configured through `BASE_URL`.

---

# 7. Application Features

The application contains an expense analytics dashboard.

## Dashboard

The dashboard provides:

* Total expense
* Transaction count
* Average expense
* Expense category visualization
* Navigation to the reports page

## Reports

The reports page provides:

* Expense category input
* Expense amount input
* Add expense functionality
* Expense table
* Navigation back to the dashboard

The dashboard calculations are independently validated by the automation framework.

---

# 8. Test Automation Architecture

The automation framework follows a BDD + Page Object Model architecture.

```text
Feature File
     ↓
Step Definition
     ↓
Page Object / API Client
     ↓
Application / API
     ↓
Assertion
```

### Feature Files

Feature files contain business-readable scenarios.

Example:

```gherkin
Scenario: Dashboard loads successfully
  Given I launch the expense application
  Then the dashboard should be visible
```

### Step Definitions

Step definitions connect Cucumber scenarios with the automation implementation.

### Page Objects

Page Objects contain UI locators and page-specific actions.

This keeps the test scenarios readable and reduces duplication.

### Support

The support layer contains:

* Cucumber World
* Hooks
* Independent calculation functions

---

# 9. Locator Strategy

The framework uses resilient locators wherever possible.

Preferred locator strategies include:

1. `data-testid`
2. Accessible roles
3. Labels
4. Visible text

Examples:

```typescript
this.page.getByTestId('reports-link')
```

and:

```typescript
this.page.getByLabel('Amount')
```

The framework avoids unnecessary CSS/XPath selectors and avoids relying on fragile DOM structure.

---

# 10. Section A1 — Web Application

The web application implements an expense analytics dashboard.

The dashboard contains summary information and a chart showing expense distribution by category.

The report page allows the user to enter a category and amount and add an expense to the report.

The application is intentionally small so that the automation framework can focus on testability and validation.

---

# 11. Section A2 — UI Automation

The UI automation covers:

### Dashboard

* Application launch
* Dashboard visibility
* Dashboard navigation
* Independent total calculation
* Transaction count
* Average expense
* Chart visibility
* Chart data validation

### Reports

* Navigation to reports
* Adding an expense
* Verifying the expense appears in the report
* Returning to the dashboard
* Verifying the dashboard total updates correctly

The expected dashboard values are calculated independently from the UI rather than simply reading and reusing the displayed total.

For example:

```text
Initial expenses:
Food       1200
Travel     4500
Bills      2000
Shopping   3500
Food       1800

Expected total = 13000
Expected count = 5
Expected average = 2600
```

After adding a new Food expense of `5000`:

```text
Expected total = 18000
```

---

# 12. Section A3 — API Automation

The API automation uses Playwright API testing against:

```text
https://jsonplaceholder.typicode.com/posts
```

The API client is separated from the Cucumber step definitions.

## API Scenarios

The following scenarios are covered:

### Valid POST

A valid post containing:

```json
{
  "title": "Streamhub Assessment",
  "body": "Testing JSONPlaceholder API",
  "userId": 1
}
```

The test verifies the expected successful response and response fields.

### Excessively Long Title

A title containing a large number of characters is submitted.

The test verifies that the API does not produce a server-side failure.

### Unsupported Special Characters

A title containing special characters is submitted.

The test verifies that the request does not result in a server-side failure.

### Missing userId

A request without the `userId` field is submitted.

The test verifies that the API does not produce a server-side failure.

> Note: JSONPlaceholder is a demonstration/fake REST API. Its validation behavior is different from a production API and may accept payloads that a production API would reject. The tests therefore document and validate the actual behavior observed from the target API rather than inventing unsupported responses.

---

# 13. Section A4 — SQL

The SQL portion contains two independent solutions.

SQLite and DB Browser for SQLite were used to execute and validate the queries.

## SQL Scenario 1 — Round-Trip Transfers

The query identifies transactions where:

* The second transaction reverses the sender and receiver
* The returned amount is within 10% of the original amount
* The return transaction occurs within 24 hours

Relevant transaction relationships are validated using a self-join.

The query is available in:

```text
sql/round-trip-transfers.sql
```

## SQL Scenario 2 — IPL 2024 Consecutive Scores

The query identifies players who scored at least 30 runs in three consecutive matches.

Window functions such as `LAG()` are used to compare each match with the player's previous matches.

The query is available in:

```text
sql/ipl-consecutive-scores.sql
```

SQL test data is provided in:

```text
sql/test-data.sql
```

The database schema is provided in:

```text
sql/schema.sql
```

---

# 14. Running the Cucumber Tests

Run all Cucumber tests:

```bash
npm run test:cucumber
```

Run a specific feature:

```bash
npx cucumber-js tests/features/dashboard.feature
```

Run a specific scenario:

```bash
npx cucumber-js tests/features/dashboard.feature --name "Dashboard loads successfully"
```

---

# 15. Running UI Tests with a Visible Browser

For debugging, Playwright can be configured to run in headed mode.

In `world.ts`:

```typescript
this.browser = await chromium.launch({
  headless: false,
  slowMo: 500
});
```

This allows the browser and automation actions to be observed during execution.

For normal/CI execution, the browser can run in headless mode:

```typescript
headless: true
```

---

# 16. Test Reports

Cucumber generates an HTML report after execution.

The report is stored under:

```text
reports/
```

Failure screenshots are stored under:

```text
screenshots/
```

The screenshots provide visual evidence when a UI scenario fails.

---

# 17. AI-Assisted Development

AI assistance was used throughout the implementation rather than only for initial project scaffolding.

AI was used for:

* Project structure planning
* Playwright framework design
* Cucumber feature design
* Page Object Model implementation
* Locator strategy
* Test scenario generation
* Independent calculation logic
* API test design
* SQL query development
* Debugging Cucumber errors
* Resolving duplicate step definitions
* Test execution troubleshooting
* Self-healing locator experiment
* README/documentation preparation

AI-generated suggestions were reviewed and tested locally before being incorporated into the project.

---

# 18. AI Self-Healing Locator Experiment

A separate self-healing experiment is included under:

```text
self-healing/
```

The purpose of this exercise is to demonstrate how AI can identify broken or brittle locators and suggest replacements.

The experiment includes deliberately incorrect/brittle locators.

The intended workflow is:

```text
Broken Locator
      ↓
Test Failure
      ↓
Failure Information
      ↓
AI Analysis
      ↓
Suggested Locator
      ↓
Validation Against Application
```

The self-healing documentation explains:

* How locator failure is detected
* What information is provided to the AI
* The prompt used for locator repair
* How the suggested locator is validated
* Which locators were deliberately made brittle

The original broken locators are intentionally retained as required by the assessment.

---

# 19. AI Self-Healing Prompt

The self-healing process uses the following general prompt structure:

```text
The following Playwright locator has failed:

<FAILED_LOCATOR>

Page:
<PAGE_NAME>

Relevant DOM information:
<DOM_INFORMATION>

Test failure:
<FAILURE_MESSAGE>

Identify a more resilient locator for the same UI element.

Prefer:
1. data-testid
2. accessible role
3. label
4. visible text

Do not invent an element that does not exist.

Return:
- The corrected locator
- Why the original locator failed
- Why the replacement is more resilient
```

The suggested locator is then validated by executing the test against the application.

---

# 20. AI Reflection

## What worked well

AI was particularly useful for:

* Quickly creating the initial automation architecture
* Generating alternative locator strategies
* Identifying duplicated Cucumber step definitions
* Designing independent calculation logic
* Structuring API scenarios
* Creating SQL queries using window functions
* Debugging test execution problems

One useful example was identifying the Cucumber ambiguity caused by the same steps being defined in both `dashboard.steps.ts` and `reports.steps.ts`.

The duplicate definitions were removed so that each Cucumber step has a single implementation.

## What did not work perfectly

AI-generated code sometimes made assumptions about the existing project structure.

For example, changes proposed for the Cucumber World and hooks could have affected the already-working UI framework.

The implementation was therefore reviewed against the existing project before changes were applied.

This reinforced the importance of:

* Running tests after changes
* Checking existing architecture before modifying shared files
* Not blindly accepting generated code
* Validating API behavior against the real target
* Keeping UI, API and SQL responsibilities separated

## Overall Experience

AI was used as a development and debugging assistant rather than as a replacement for validation.

The final implementation was verified through local test execution and manual inspection.

---

# 21. Assessment Evidence

The repository contains evidence for:

* UI test execution
* Cucumber HTML report
* Failure screenshots where applicable
* SQL query results
* Self-healing experiment
* Application implementation
* API test implementation

Relevant evidence can be found under:

```text
reports/
screenshots/
self-healing/
sql/
```

---

# 22. Known Limitations

JSONPlaceholder is a mock/demo API and does not provide the same validation behavior expected from a production API.

Therefore, invalid payload tests focus on recording and validating the actual API behavior, particularly ensuring that invalid input does not result in an unexpected server-side failure.

The application itself is intentionally small and designed primarily to demonstrate the requested automation and QA capabilities.

---

# 23. Final Execution

Before submission, execute:

```bash
npm install
npx playwright install
npm run test:cucumber
```

Verify:

* All intended scenarios pass
* Cucumber report is generated
* Screenshots are available for failures
* SQL queries have been executed successfully
* Self-healing documentation is present
* `.env` is not committed
* README contains setup and execution instructions

---

# 24. Git Submission

Check the repository:

```bash
git status
```

Add the required files:

```bash
git add .
```

Commit:

```bash
git commit -m "Complete Streamhub QA automation assessment"
```

Push:

```bash
git push origin main
```

The final GitHub repository should contain the application, automation framework, SQL solutions, self-healing experiment, test evidence, and this README.
