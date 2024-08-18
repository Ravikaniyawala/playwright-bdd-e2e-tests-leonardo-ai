import { RequestHelper } from './RequestHelper';
import { config } from '../config';
import { orderPayload } from '../fixture/orderPayload';

interface OrderResponse {
  id: string;
  [key: string]: unknown;
}

interface PaymentIntentResponse {
  paymentIntentRef: string;
  [key: string]: unknown;
}

class OrderIntent {
  private orderRequestHelper: RequestHelper;
  private paymentRequestHelper: RequestHelper;
  private orderId: string | null = null;
  protected paymentIntentRef: string | null = null;

  constructor() {
    const dependencyEnv = (process.env.DEPENDENCY_ENV || 'defaultEnv').toLowerCase();

    this.orderRequestHelper = new RequestHelper({
      // @ts-ignore
      Authorization: `Bearer ${config.orderApi[dependencyEnv].jwt}`,
    });


    this.paymentRequestHelper = new RequestHelper({
      // @ts-ignore
      Authorization: `Bearer ${config.TestConfigIntentApi[dependencyEnv].jwt}`,
    });
  }

  async createOrder(): Promise<this> {
    const dependencyEnv = (process.env.DEPENDENCY_ENV || 'defaultEnv').toLowerCase();
    // @ts-ignore
    const orderUrl = config.orderApi[dependencyEnv].url;

    const response = await this.orderRequestHelper.postRequest(orderUrl, orderPayload);
    const data: OrderResponse = await response.json();
    if (response.ok()) {
      this.orderId = data.id;
    } else {
      throw new Error(`Failed to create order: ${response.status()} ${data.message}`);
    }
    return this;
  }

  async createPaymentIntent(): Promise<this> {
    if (!this.orderId) {
      throw new Error('Order ID is not set. Call createOrder() first.');
    }

    const dependencyEnv = (process.env.DEPENDENCY_ENV || 'qual').toLowerCase();

    // @ts-ignore
    const paymentUrl = config.TestConfigIntentApi[dependencyEnv].url;

    const response = await this.paymentRequestHelper.postRequest(paymentUrl, {
      currencyCode: 'test',
      paymentPartnerId: '1234',
      orderDetails: {
        orderId: this.orderId,
      },
    });

    const data: PaymentIntentResponse = await response.json();
    if (response.ok()) {
      this.paymentIntentRef = data.paymentIntentRef;
    } else {
      throw new Error(`Failed to create intent: ${response.status()} ${data.message}`);
    }
    return this;
  }
}

export default OrderIntent;
