@api
Feature: JSONPlaceholder Posts API

  Scenario: Create a post successfully
    When I send a valid create post request
    Then the API response status should be 201
    And the response should contain the created post

  Scenario: Handle an excessively long title
    When I send a post with an excessively long title
    Then the API should not return a server failure

  Scenario: Handle unsupported special characters
    When I send a post with unsupported special characters
    Then the API should not return a server failure

  Scenario: Handle missing required userId
    When I send a post without userId
    Then the API should not return a server failure