
# Playwright E2E Tests with Leonardo AI

This project provides an end-to-end (E2E) testing framework using [Playwright](https://playwright.dev/) and [Cucumber.js](https://cucumber.io/) to validate Leonardo AI workflows. It follows a behavior-driven development (BDD) approach and integrates features like tracing, video recording on failures, and automated reporting.

The project uses a **Component Object Model (COM)** and **Page Factory Framework** to organize and manage page-specific logic, making the tests scalable and maintainable.

## Project Structure

```
.
├── features/                 # Contains feature files written in Gherkin syntax
│   └── scramblerTest.feature
├── step-definitions/         # Contains step definitions for Gherkin scenarios
│   └── ScramblerTest.steps.ts
├── support/                  # Cucumber.js support files (hooks, world, etc.)
│   ├── hooks.ts
│   └── world.ts
├── pages/                    # Page Object Model (POM) classes
├── reports/                  # Stores test reports and traces
├── utils/                    # Utility scripts (e.g., test data)
├── playwright-report/        # Playwright's HTML test reports
├── generate-report.js        # Script for generating custom HTML reports
├── package.json              # Node.js dependencies and scripts
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
```

## Features

- **BDD-Style Testing**: Uses Cucumber.js for Gherkin scenarios.
- **Playwright Automation**: For browser interactions and testing.
- **Page Object Model (POM)**: Encapsulates page-specific logic.
- **Component Object Model (COM)**: Modularizes page interactions for reusability and scalability.
- **Page Factory Framework**: Simplifies the initialization and management of page objects.
- **Tracing and Video Recording**: Captures execution traces and videos for debugging.
- **Automated Reporting**: Generates HTML reports for test execution summaries.

## Setup

### Prerequisites

- Node.js (v22)
- npm or Yarn
- Chromium

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd playwright-e2e-tests-leonardo-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure browsers are installed:
   ```bash
   npx playwright install
   ```

### Environment Variables

You can manage browser configurations and other parameters using a `.env` file. Example:

```env
BROWSER=chromium
```

## Running Tests

### Run All Tests

```bash
npm run specTest
```

This runs Playwright tests and generates an HTML report.

### Run Cucumber Tests with Specific Tags

```bash
npx cucumber-js --tags "@smoke"
```

### Generate HTML Report

```bash
node generate-report.js
```

### View Traces

```bash
npx playwright show-trace ./reports/trace-<timestamp>.zip
```

## Configuration

### Playwright Config

The `playwright.config.ts` file specifies browser options, test timeout, and default configurations.

### Cucumber.js Config

Located in `cucumber.js`:

```javascript
module.exports = {
    default: {
        require: ['step-definitions/**/*.ts', 'support/**/*.ts'],
        format: ['json:./reports/cucumber-report.json'],
        paths: ['features/**/*.feature'],
        requireModule: ['ts-node/register'],
    },
};
```

## Debugging

- **Trace Viewer**: Open `.zip` traces in the Playwright trace viewer.
- **Videos**: Check `./reports/videos` for videos of failed tests.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/foo`).
3. Commit your changes (`git commit -m 'Add foo'`).
4. Push to the branch (`git push origin feature/foo`).
5. Open a pull request.

## License

[MIT License](LICENSE)
