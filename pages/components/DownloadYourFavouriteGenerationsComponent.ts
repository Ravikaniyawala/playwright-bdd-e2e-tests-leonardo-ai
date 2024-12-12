import { BasePage } from '../BasePage';
import * as path from 'path';
import { promisify } from 'util';
import * as fs from 'fs';
import sizeOf from 'image-size';


export class DownloadYourFavouriteGenerationsComponent extends BasePage {
    private locators = {
        downloadButton: '//p[contains(text(),"DOWNLOAD")]'
    };


    async downloadAndVerifyImage(downloadDir: string, expectedWidth: number, expectedHeight: number): Promise<void> {
        const element = await this.getVisibleElement(this.locators.downloadButton);

        // Ensure the download directory exists
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }

        // Wait for the download to start and get the Download object
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            element.click(),
        ]);

        // Save the downloaded file to the specified directory
        const filePath = path.join(downloadDir, await download.suggestedFilename());
        await download.saveAs(filePath);

        // Verify the image resolution
        const dimensions = await sizeOf(filePath);
        if (dimensions.width !== expectedWidth || dimensions.height !== expectedHeight) {
            throw new Error(`Image resolution mismatch: expected ${expectedWidth}x${expectedHeight}, but got ${dimensions.width}x${dimensions.height}`);
        }
    }




}