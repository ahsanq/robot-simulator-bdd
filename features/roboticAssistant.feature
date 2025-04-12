Feature: Robotic Assistant Navigation

  Scenario: Robot successfully loads map and navigates to a bin location
    Given the robotic assistant is powered on
    When the warehouse map is loaded
    When the robot is commanded to navigate to bin "A7"
    And the robot arrives at the bin location
    Then the robot should be at the specified location
