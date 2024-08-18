import OrderIntent from './OrderIntent';
import { config } from '../config';

class UppPageUrl extends OrderIntent {
  getUrl(): string {
    if (!this.paymentIntentRef) {
      throw new Error('Test error message');
    }

    const env = (process.env.TEST_ENV || 'defaultEnv').toLowerCase();
    // @ts-ignore
    const baseUrl = config.ui[env];

    return `generatetUrl`;
  }
}

export default UppPageUrl;
