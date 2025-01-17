@e2e
Feature: Scrambler Ducati Customization

  @smoke
  Scenario: Navigate to the Create Your Custom Scrambler Ducati page
    Given I am on the Ducati Scrambler website
    When I click "Start to Create"
    Then I should see the "CREATE YOUR CUSTOM SCRAMBLER DUCATI" page

  Scenario: Generate custom images
    Given I am on the image creation page
    When I fill in the prompt and click "Generate"
    And I wait for the generation process to complete
    Then I should see the 4 generated images

  Scenario: Submit details and select an image
    Given the 4 images have been generated and are visible
    When I fill in my details and accept the terms
    And I click "Submit"
    Then I should be able to choose one of the 4 images
    And the resolution of the saved file should be 2056 x 1368