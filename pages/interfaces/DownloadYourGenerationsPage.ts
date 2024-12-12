
export interface DownloadYourGenerationsPage {
  downloadAndVerifyGeneration(downloadDir: string, expectedWidth: number, expectedHeight: number): Promise<DownloadYourGenerationsPage>;
}
