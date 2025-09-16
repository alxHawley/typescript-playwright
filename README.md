# Playwright TypeScript Test Framework

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](LICENSE)

A comprehensive test automation framework built with TypeScript and Playwright, featuring both end-to-end and API testing capabilities.

## 🚀 Features

- **End-to-End Testing**: Automated browser testing with Playwright
- **API Testing**: RESTful API validation and testing
- **TypeScript Support**: Full type safety and modern JavaScript features
- **Page Object Model**: Organized and maintainable test structure
- **Multiple Test Types**: UI, API, and integration tests
- **CI/CD Ready**: GitHub Actions workflow included
- **Cross-Browser Support**: Chrome, Firefox, Safari, and Edge

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Git

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd playwright-ts-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 🏃‍♂️ Quick Start

### Running All Tests
```bash
npm test
```

### Running Specific Test Suites
```bash
# Run only E2E tests
npx playwright test src/tests/e2e/

# Run only API tests
npx playwright test src/tests/api/

# Run tests in headed mode
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug
```

### Running Tests with Different Browsers
```bash
# Run tests on Chrome
npx playwright test --project=chromium

# Run tests on Firefox
npx playwright test --project=firefox

# Run tests on Safari
npx playwright test --project=webkit
```

## 📁 Project Structure

```
playwright-ts-project/
├── src/
│   └── tests/
│       ├── api/                    # API test specifications
│       │   └── restfulbooker.spec.ts
│       └── e2e/                    # End-to-end test specifications
│           ├── auth.spec.ts
│           └── purchase.spec.ts
├── utils/                          # Utility functions and configurations
│   ├── api.config.ts              # API configuration
│   ├── sauce.users.ts             # Test user data
│   └── schemas/
│       └── booking.schema.ts      # JSON schemas for validation
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
```

## 🔧 Configuration

### API Testing Setup

The API tests can run against either a local Docker container or the hosted service:

**Option 1: Local Docker Container**
```bash
# Pull and run the Docker image
docker run -d -p 3001:3001 mwinteringham/restfulbooker
```

**Option 2: Hosted Service**
Update the base URL in `utils/api.config.ts`:
```typescript
export const API_BASE_URL = 'https://restful-booker.herokuapp.com/';
```

### Test Data

Test user credentials and data are managed in `utils/sauce.users.ts`. Update this file to use your own test data.

## 📊 Test Reports

Test results are generated in HTML format and saved to the `playwright-report/` directory. Open `playwright-report/index.html` in your browser to view detailed test results.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RESTful Booker API Documentation](https://restful-booker.herokuapp.com/apidoc/index.html)
- [Sauce Demo Application](https://www.saucedemo.com/)

## 🐳 Docker Support

The project includes Docker support for the API testing environment:

```bash
# Pull the API testing image
docker pull mwinteringham/restfulbooker

# Run the container
docker run -d -p 3001:3001 mwinteringham/restfulbooker
```

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Mark Winteringham](https://www.mwtestconsultancy.co.uk/) for the RESTful Booker API
- [Sauce Labs](https://saucelabs.com/) for the Sauce Demo application
- [Playwright Team](https://playwright.dev/) for the excellent testing framework