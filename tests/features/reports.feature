Feature: Expense Reports

  @ui
  Scenario: Add a new expense
    Given I launch the expense application
    When I navigate to the reports page
    And I add a "Food" expense of 5000
    Then the expense should appear in the report