// support/world.ts
import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Page } from 'playwright';
import { ScramblerDucatiHomePageImpl } from '../pages/implementations/ScramblerDucatiHomePageImpl';
import { CreateScramblerDucatiPageImpl } from '../pages/implementations/CreateScramblerDucatiPageImpl';
import { PickYourGenerationsPageImpl } from '../pages/implementations/PickYourGenerationsPageImpl';
import { DownloadYourGenerationsPageImpl } from '../pages/implementations/DownloadYourGenerationsPageImpl';

export interface CustomWorld extends World {
    page?: Page;
    scramblerDucatiHomePage?: ScramblerDucatiHomePageImpl;
    createScramblerPage?: CreateScramblerDucatiPageImpl;
    pickYourGenerationsPage?: PickYourGenerationsPageImpl;
    downloadYourGenerationsPage?: DownloadYourGenerationsPageImpl;
}

setWorldConstructor(function (this: CustomWorld) {
    // Initialization can be handled in hooks
});