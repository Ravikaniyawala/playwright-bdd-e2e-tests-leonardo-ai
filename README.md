# README #

# Project Structure and Setup Guide

## Project Structure

### Component Tests

componentTest/
├── fixture/
│   ├── orderIntent2.ts
│   ├── orderPayload2.ts
│   └── orderPayload.ts
├── handlers/
│   ├── nullOrderHandlers.ts
│   └── OrderHandlers.ts
├── node_modules/
├── pages/
│   ├── implementations/
│   │   └── UppPageImpl.ts
│   ├── interfaces/
│   │   └── IUppPage.ts
│   └── BasePage.ts
├── test-results/
├── tests/
│   ├── baseTest.ts
│   └── mockexample.spec.ts
└── utils/
    ├── testdata/
    │   └── Card.ts
    ├── MockHelper.ts
    └── OrderIntent.ts


### End-to-End Tests

endToEndTest/
├── fixture/
│   └── orderPayload.ts
├── node_modules/
├── pages/
│   ├── components/
│   │   ├── CardDetailsComponent.ts
│   │   ├── ThreeDSComponent.ts
│   ├── implementations/
│   │   └── UppPageImpl.ts
│   ├── interfaces/
│   │   └── IUppPage.ts
│   ├── BasePage.ts
│   └── PageFactory.ts
├── test-results/
├── tests/
│   ├── 3dsError.spec.ts
│   └── baseTest.ts
└── utils/
    ├── testdata/
    │   └── Card.ts
    ├── OrderIntent.ts
    ├── RequestHelper.ts
    ├── UppPageUrl.ts
    ├── config.ts


## Page Object and Factory Pattern

This project uses the Page Object and Factory Pattern for managing the page objects.

### Example of Page Factory
```typescript
import { Page } from '@playwright/test';
import { IUppPage } from './IUppPage';
import { UppPageImpl } from './implementations/UppPageImpl';

export class PageFactory {
  constructor(private page: Page) {}

  createUppPage(version: 'v1' | 'v2'): IUppPage {
    if (version === 'v2') {
      return new UppPageImpl(this.page);
    }
    // Add logic for v1 if necessary
    throw new Error('Unsupported version');
  }
}


Component Tests

Adding Mocks

Mocks can be added either using the ...handlers or the MockHelper.

Using ...handlers

await worker.use(...handlers);


Using MockHelper

import { MockHelper } from '../utils/MockHelper';

const mockHelper = new MockHelper(page);
await mockHelper.mockApi('/v1/orders/*', [null], 200);


End-to-End Tests

Configurations

The project uses environment variables to configure the testing environment and dependency environment. The configurations are defined in utils/config.ts.

Environment Variables

	•	DEPENDENCY_ENV: Specifies the environment for dependencies (e.g., dev, abc, xyz).
	•	TEST_ENV: Specifies the environment for testing (e.g., local, dev, test, abc, xyz).
    •	ORDER_API_[ENV]: Specifies the xyz for order creation (e.g., local, dev, test, abc, xyz).
    •	PAYMENT_API_[ENV]: Specifies the xyz for intent creation (e.g., local, dev, test, abc, xyz).


Ensure these environment variables are set appropriately before running the tests.

Proxy Configuration

The playwright.config.ts file is configured to use different proxies based on the TEST_ENV environment variable.


const proxy = {
  server: process.env.TEST_ENV?.toLowerCase() === 'local'
    ? 'qrst'
    : process.env.TEST_ENV?.toLowerCase() === 'dev'
    ? 'mnop'
    : process.env.TEST_ENV?.toLowerCase() === 'test'
    ? 'ijkl'
    : process.env.TEST_ENV?.toLowerCase() === 'xyz'
    ? 'efgh'
    : 'abcd',
};


JWT Setup and Parameters

Ensure that the JWTs and environment parameters are correctly set up for end-to-end tests. These can be configured in the config.ts file using process.env.

JWT Configuration

In utils/config.ts, JWT tokens are configured based on the environment variables:

const config = {
  orderApi: {
    dev: {
      url: '',
      jwt: process.env.varA || '',
    },
    test: {
      url: '',
      jwt: process.env.varB || '',
    },
    qual: {
      url: '',
      jwt: process.env.varC || '',
    },
    prod: {
      url: '',
      jwt: process.env.varD || '',
    },
  },
  paymentIntentApi: {
    dev: {
      url: '',
      jwt: process.env.varA || '',
    },
    test: {
      url: '',
      jwt: process.env.varB || '',
    },
    qual: {
      url: '',
      jwt: process.env.varC || '',
    },
    prod: {
      url: '',
      jwt: process.env.varD || '',
    },
  },
};

export default config;



Request Helper

The end-to-end tests use the RequestHelper class for making API requests. This class leverages Playwright’s API capabilities.


import { request } from '@playwright/test';

export class RequestHelper {
  constructor(private headers: Record<string, string>) {}

  async postRequest(url: string, data: any) {
    const response = await request.post(url, {
      headers: this.headers,
      data,
    });
    return response;
  }.....
}



Running Tests

Navigate to the respective directory (endToEndTest or componentTest), install the dependencies, and run the tests.

npm install
npx playwright install
npm test
