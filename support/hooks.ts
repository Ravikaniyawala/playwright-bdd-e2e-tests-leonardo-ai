// support/hooks.ts
import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { CustomWorld } from './world';
import { PageFactory } from '../pages/PageFactory';
import * as fs from 'fs';
import * as path from 'path';

let browser: Browser;

Before(async function (this: CustomWorld) {
    // Browser configuration should be parameterized using dotenv
    browser = await chromium.launch();
    const context = await browser.newContext();
    this.page = await context.newPage();

    // Initialize page objects
    const factory = new PageFactory(this.page);
    const version = 'v2' as 'v1' | 'v2';
    // @ts-ignore
    this.scramblerDucatiHomePage = factory.createScramblerDucatiHomePage(version);
    // @ts-ignore
    this.createScramblerPage = factory.createCreateScramblerPage(version);
    // @ts-ignore
    this.pickYourGenerationsPage = factory.createPickYourGenerationsPage(version);
    // @ts-ignore
    this.downloadYourGenerationsPage = factory.createDownloadYourGenerationsPage(version);

    // Start tracing
    await context.tracing.start({ screenshots: true, snapshots: true });
});

After(async function (this: CustomWorld) {
    const context = this.page?.context();
    if (context) {
        // Ensure the ./reports directory exists
        const reportsDir = path.resolve('./reports');
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }

        // Stop tracing and save it to a file in the ./reports directory
        const tracePath = path.join(reportsDir, `trace-${Date.now()}.zip`);
        await context.tracing.stop({ path: tracePath });
        console.log(`Trace saved at: ${tracePath}`);
    }
    await this.page?.close();
    await browser.close();
});