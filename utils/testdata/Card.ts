export class Card {

  public static readonly card = new Card("test", "cardnumber", "Auto TEST", "expMonth", "expYear", "111", false);

  private readonly cardTypeIdentifier: string;
  private readonly cardNumber: string;
  private readonly nameOnCard: string;
  private readonly expiryMonth: string;
  private readonly expiryYear: string;
  private readonly securityCode: string;
  private readonly supportsMcp: boolean;

  constructor(
    cardTypeIdentifier: string,
    cardNumber: string,
    nameOnCard: string,
    expiryMonth: string,
    expiryYear: string,
    securityCode: string,
    supportsMcp: boolean
  ) {
    this.cardTypeIdentifier = cardTypeIdentifier;
    this.cardNumber = cardNumber;
    this.nameOnCard = nameOnCard;
    this.expiryMonth = expiryMonth;
    this.expiryYear = expiryYear;
    this.securityCode = securityCode;
    this.supportsMcp = supportsMcp;
  }

  public getCardNumber(): string {
    return this.cardNumber;
  }

  public getLastDigits(numberOfDigits: number): string {
    return this.cardNumber.substring(this.cardNumber.length - numberOfDigits);
  }

  public getCardTypeIdentifier(): string {
    return this.cardTypeIdentifier;
  }

  public getNameOnCard(): string {
    return this.nameOnCard;
  }

  public getExpiryMonth(): string {
    return this.expiryMonth;
  }

  public getExpiryYear():string {
    return this.expiryYear;
  }

  public getSecurityCode(): string {
    return this.securityCode;
  }

  public getSupportsMcp(): boolean {
    return this.supportsMcp;
  }

}
