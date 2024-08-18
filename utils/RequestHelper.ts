import { request, APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class RequestHelper {
  private context: Promise<APIRequestContext>;

  constructor(headers: Record<string, string>) {
    this.context = request.newContext({
      extraHTTPHeaders: {
        accept: 'application/json',
        ...headers,
      },
      ignoreHTTPSErrors: true,
    });
  }

  async getRequest(endpoint: string) {
    const context = await this.context;
    return await (context).get( endpoint);
  }

  async postRequest(endpoint: string, data: unknown) {
    const context = await this.context;
    return await (context).post(endpoint, { data });
  }

  async putRequest(endpoint: string, data: unknown) {
    const context = await this.context;
    return await (context).put(endpoint, { data });
  }

  async deleteRequest(endpoint: string) {
    const context = await this.context;
    return await (context).delete(endpoint);
  }

  async patchRequest(endpoint: string, data: unknown) {
    const context = await this.context;
    return await (context).patch(endpoint, { data });
  }
}
