import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I am on the Ducati Scrambler website', async function (this: CustomWorld) {
    //navigate could go to before hook and url should be parameterized using dotenv or config
    await this.scramblerDucatiHomePage?.navigate('https://hacktheicon.scramblerducati.com/');
    await this.scramblerDucatiHomePage?.acceptCookies();
});

When('I click {string}', async function (this: CustomWorld, buttonText: string) {
    await this.scramblerDucatiHomePage?.clickVisibleElementByText(buttonText);
});

Then('I should see the {string} page', async function (this: CustomWorld, pageTitle: string) {
    expect(await this.createScramblerPage?.isElementVisibleByText(pageTitle)).toBeTruthy();
});


Given('I am on the image creation page', async function (this: CustomWorld) {
    //navigate could go to before hook and url parameterized using dotenv or config
    await this.scramblerDucatiHomePage?.navigate('https://hacktheicon.scramblerducati.com/');
    await this.scramblerDucatiHomePage?.acceptCookies().then(page => page.startToCreate());
});

When('I fill in the prompt and click {string}', async function (this: CustomWorld, buttonText: string) {
    await this.createScramblerPage?.inputDescription("test");
    await this.createScramblerPage?.clickVisibleElementByText(buttonText);
});


//Should have a centralised place for a timeout config
When('I wait for the generation process to complete', { timeout: 60 * 1000 }, async function (this: CustomWorld) {
    await this.pickYourGenerationsPage?.waitForLoadingSpinnerToDisappear()
});

Then('I should see the 4 generated images', async function (this: CustomWorld) {
    expect(await this.pickYourGenerationsPage?.getGeneratedImagesCount()).toEqual(4);
});

//Should have a centralised place for a timeout config
Given('the 4 images have been generated and are visible', { timeout: 60 * 1000 }, async function (this: CustomWorld) {
    //navigate could go to before hook and url parameterized using dotenv or config
    await this.scramblerDucatiHomePage?.navigate('https://hacktheicon.scramblerducati.com/');

    await this.scramblerDucatiHomePage?.acceptCookies().then(page => page.startToCreate());
    await this.createScramblerPage?.inputDescription("test").then(page => page.clickOnGenerateButton());
    await this.pickYourGenerationsPage?.waitForLoadingSpinnerToDisappear().then(page => page.pickYourGenerations());
    expect(await this.pickYourGenerationsPage?.getGeneratedImagesCount()).toEqual(4);
});

When('I fill in my details and accept the terms', async function (this: CustomWorld) {
    //this can be done using faker library
    await this.pickYourGenerationsPage?.enterFirstName("test").
        then(page => page.enterLastName("test")).
        then(page => page.enterEmail("test@email.com")).
        then(page => page.selectCountry("United Kingdom")).
        then(page => page.acceptTnc()).
        then(page => page.acceptPreferences());
});


Then('I should be able to choose one of the 4 images', async function (this: CustomWorld) {
    await this.pickYourGenerationsPage?.pickYourGenerations().then(page => page.clickOnNextButton());
});

Then('the resolution of the saved file should be 2056 x 1368', async function (this: CustomWorld) {
    //download folder can be appended with timestamp and created to avoid conflicts in parallel runs and cleaned up after the test
    await this.downloadYourGenerationsPage?.downloadAndVerifyGeneration("./downloads", 2056, 1368);
});
