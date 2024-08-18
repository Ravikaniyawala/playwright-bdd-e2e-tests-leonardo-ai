// @ts-ignore
import { PlaywrightTestConfig, devices } from '@playwright/test';
import { config } from './config';

const iPhone = devices['iPhone 14'];
let testEnv: string;
testEnv = (process.env.TEST_ENV || 'default').toLowerCase(); // Default to 'default' if not specified


const proxy = {
  // @ts-ignore
  server: config.proxy[testEnv],
};

const playwrightConfig: PlaywrightTestConfig = {
  timeout: 30000,
  testDir: './tests',
  reporter: 'html',
  workers: undefined,
  retries: 1,
  use: {
    trace: 'on-first-retry',
    video: 'retry-with-video',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        ignoreHTTPSErrors: true,
        launchOptions: {
          proxy,
        },
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        browserName: 'chromium',
        viewport: iPhone.viewport,
        userAgent: iPhone.userAgent,
        headless: true,
        ignoreHTTPSErrors: true,
        launchOptions: {
          proxy,
        },
      },
    },
  ],
};

export default playwrightConfig;
