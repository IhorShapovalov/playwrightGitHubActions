# Playwright portfolio + GitHub Actions
Sample framework structure including:
- Implemented GitHub Actions
- Page objects
- Allure Reporting
- Working with environment variables (.env)
- Test data approach (just a sample, actual one strongly depends on project needs)
- Run test by using multiple .env
- Separated @smoke and @regression tests
- Execution against different browsers
- Extensibility – additional features can be discussed and implemented
- Structure of the framework is not ideal (it should be modified depends on project)


Tests are written https://www.saucedemo.com/

## Prerequisites
1. Install Playwright

```shell 
npm install 
npx install playwright
```

2. (Optional) For better experience install following plugin for Visual studio code - ‘Playwright Test for VSCode’

## Run tests from command line
All tests:
```
TEST_ENV=dev npm run test
```
3. (Optional) Setup .env.local for local setup executions

```
TEST_ENV=local npm run test
```
