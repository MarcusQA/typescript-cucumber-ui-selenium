@UITest
Feature: Search Google

  Scenario: Search for "cat"
    When I search for "cat"
    # The following step will fail
    Then I see "Rabbits" in the results
