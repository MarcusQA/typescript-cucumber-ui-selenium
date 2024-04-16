@UITest
Feature: Search Google

  Scenario: Search for "cat"
    When I search for "cat"
    Then I see "Breeds" in the results
