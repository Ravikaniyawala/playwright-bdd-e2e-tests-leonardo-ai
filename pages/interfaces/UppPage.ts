import { Card } from '../../utils/testdata/Card';

export interface UppPage {
  enterCardDetails(Card: Card): Promise<UppPage>;
  clickOnPayNow(): Promise<UppPage>;
  clickConfirmPayment(): Promise<UppPage>;
  acceptTnc(): Promise<UppPage>;
  enter3DSCode(Card: Card): Promise<UppPage>;
  login(username: string, password: string): Promise<UppPage>;
  verifyErrorMessage(errorMessage: string): Promise<UppPage>;
}
