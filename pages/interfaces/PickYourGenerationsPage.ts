
export interface PickYourGenerationsPage {
  waitForLoadingSpinnerToDisappear(): Promise<PickYourGenerationsPage>;
  getGeneratedImagesCount(): Promise<number>;
  pickYourGenerations(): Promise<PickYourGenerationsPage>;
  clickOnNextButton(): Promise<PickYourGenerationsPage>;
  enterFirstName(firstName: string): Promise<PickYourGenerationsPage>;
  enterLastName(lastName: string): Promise<PickYourGenerationsPage>;
  enterEmail(email: string): Promise<PickYourGenerationsPage>;
  selectCountry(country: string): Promise<PickYourGenerationsPage>;
  acceptTnc(): Promise<PickYourGenerationsPage>;
  acceptPreferences(): Promise<PickYourGenerationsPage>;
  submitForm(): Promise<PickYourGenerationsPage>;
}
