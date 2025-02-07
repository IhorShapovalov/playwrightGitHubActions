import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import * as path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, `env-file/.env.${process.env.TEST_ENV}`) });

const enabledProjects = process.env.PROJECTS ? process.env.PROJECTS.split(',') : ['chromium'];

export default defineConfig({
    testDir: './tests',
    fullyParallel: process.env.FULLY_PARALLEL === 'true',
    forbidOnly: !!process.env.CI,
    retries: Number(process.env.RETRIES || 0),
    workers: process.env.CI ? 1 : Number(process.env.WORKERS || 1),
    reporter: [['allure-playwright', { outputFolder: 'allure-results', open: !process.env.CI }]],
    grep: process.env.GREP
        ? new RegExp(process.env.GREP.split(',').join('|'))
        : undefined,
    timeout: Number(process.env.TIMEOUT || 30000),
    expect: {
        timeout: Number(process.env.EXPECT_TIMEOUT || 5000),
    },
    use: {
        baseURL: process.env.BASE_URL,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        headless: process.env.HEADLESS === 'true',
        actionTimeout: Number(process.env.ACTION_TIMEOUT || 10000),
        navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT || 30000),
    },

    projects: enabledProjects.map(projectName => {
        const projectConfig = {
            name: projectName,
            use: {},
        };

        switch (projectName) {
            case 'chromium':
                projectConfig.use = { ...devices['Desktop Chrome'] };
                break;
            case 'firefox':
                projectConfig.use = { ...devices['Desktop Firefox'] };
                break;
            case 'webkit':
                projectConfig.use = { ...devices['Desktop Safari'] };
                break;
            case 'mobile-chrome':
                projectConfig.use = { ...devices['Pixel 5'] };
                break;
            case 'mobile-safari':
                projectConfig.use = { ...devices['iPhone 12'] };
                break;
            case 'google-chrome':
                projectConfig.use = { ...devices['Desktop Chrome'], channel: 'chrome' };
                break;
            default:
                console.warn(`Unknown project: ${projectName}`);
                return null;
        }
        return projectConfig;
    }).filter(project => project !== null),
});