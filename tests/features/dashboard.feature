Feature: Expense Dashboard

  @ui
  Scenario: Validate dashboard loads successfully
    Given I launch the expense application
    When I navigate to the dashboard
    Then the dashboard should be displayed

  @ui
  Scenario: Validate dashboard calculations
    Given I launch the expense application
    When I navigate to the dashboard
    Then the total expense should match the independently calculated value
    And the transaction count should match the expected value
    And the average expense should match the independently calculated value

  @ui
  Scenario: Validate expense chart
    Given I launch the expense application
    When I navigate to the dashboard
    Then the expense chart should be visible
    And the expense chart should contain valid non-zero data

  @ui
  Scenario: Validate dashboard total after adding an expense
    Given I launch the expense application
    When I navigate to the reports page
    And I add a "Food" expense of 5000
    And I navigate back to the dashboard
    Then the total expense should be 18000