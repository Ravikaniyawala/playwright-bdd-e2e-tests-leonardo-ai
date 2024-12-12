
export interface CreateScramblerDucatiPage {
  inputDescription(prompt: string): Promise<CreateScramblerDucatiPage>;
  clickOnGenerateButton(): Promise<CreateScramblerDucatiPage>;
}
