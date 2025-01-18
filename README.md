# Playwright TypeScript Project

Test automation project with TypeScript and Playwright: WIP.

NOTE: The API tests in this project, 'restfulbooker.spec.ts', run against a docker image and has a Github Actions workflow to do the same (see 'playwright.yml'. You can either pull this image down and run the image locally to test OR you can change the base url in 'api.config.ts' from:

```bash
'http://localhost:3001')
```

to:

```bash
'https://restful-booker.herokuapp.com/'
```

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd playwright-ts-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the tests:**
   ```bash
   npx playwright test
   ```


## Project Structure

typescript-playwright/
├── src/
│   ├── tests/
│   │   ├── api/
│   │   │   └── restfulbooker.spec.ts
│   │   ├── e2e/
│   │   │   └── auth.spec.ts
│   │   │   └── example.spec.ts
│   ├── utils/
│   │   ├── api.config.ts
│   │   ├── sauce.users.ts
│   │   └── schemas/
│   │       └── booking.schema.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md

## Usage

- **End-to-End Tests:** Located in `src/tests/e2e/`, these tests simulate user interactions with the application.
- **API Tests:** Located in `src/tests/api/`, these tests validate the API endpoints and responses

For more detailed information on Playwright, visit the [Playwright Documentation](https://playwright.dev/docs/intro).
