import { test } from './baseTest';
import { Card } from '../utils/testdata/Card';


test.describe.parallel('Upp Tests', () => {

  test.beforeEach(async ({ uppPageUrl,uppPage}) => {
    await uppPageUrl.createOrder()
      .then(page => page.createPaymentIntent())
      .then(page => page.getUrl());
    await uppPage.navigate(uppPageUrl.getUrl());
  });

  test.only('Upp Page Login Test with V2 - 1', async ({ uppPage }) => {
    await uppPage.enterCardDetails(Card.card)
      .then(page => page.clickConfirmPayment())
      .then(page => page.acceptTnc())
      .then(page => page.clickOnPayNow())
      .then(page => page.enter3DSCode(Card.card))
      .then(page => page.verifyErrorMessage("error message"));
  });

});
