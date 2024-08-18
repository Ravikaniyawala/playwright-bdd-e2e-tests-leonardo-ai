import { test as base, expect } from '@playwright/test';

import { PageFactory } from '../pages/PageFactory';
import {UppPageImpl} from '../pages/implementations/UppPageImpl';
import UppPageUrl from '../utils/UppPageUrl';

type Fixtures = {
  uppPage:UppPageImpl;
  uppPageUrl: UppPageUrl;
};

const test = base.extend<Fixtures>({
  uppPage: async ({ page }, use) => {
    const factory = new PageFactory(page);
    const version = 'v2';
    const uppPage = factory.createUppPage(version as 'v1' | 'v2');
    await use(uppPage);
  },
  // eslint-disable-next-line no-empty-pattern
  uppPageUrl: async ({},use) => {
    const uppPageUrl = new UppPageUrl();
    await use(uppPageUrl);
  },
});

export { test, expect };
