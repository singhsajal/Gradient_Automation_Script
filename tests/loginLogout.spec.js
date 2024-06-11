import { test, expect } from '@playwright/test';
import loginPage from '../pages/loginPage.js';
import homePage from '../pages/homePage.js';
import basePage from '../pages/basePage.js';

const base = new basePage()
const baseUrl = "https://staging-v2.gradientcyber.net/cyber/login"



test.describe('Login and Logout Flow', () => {
    let login;
    let home;
    let page;

    // Set up before all tests
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        login = new loginPage(page);
        home = new homePage(page);
    });

    test('open login page by url', async () => {
        console.log("Step 1: Navigating to the login page...");
        await login.navigate(baseUrl);

        // Expect a title "to contain" a substring.
        console.log("Step 2: Verifying the page title...");
        await expect(page).toHaveTitle("Gradient Quorum");

    });

    test('valid login', async () => {
        console.log("Step 1: Navigating to the login page...");
        await login.navigate(baseUrl);

        console.log("Step 2: Logging in with valid credentials...");
        //await login.validLogin()
        await login.login('sajal@jasbhi.com', 'Focus@12345')

        console.log("Step 3: Verifying that the correct user is logged in ...");

        await expect(page.getByText('Sajal Singh')).toBeVisible();

        // Check if logout button is visible
        console.log("Step 4: Verifying if the logout button is visible...");
        await expect.soft(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    });

    test('invalid login', async () => {
        console.log("Step 1: Navigating to the login page...");
        await login.navigate(baseUrl);

        console.log("Step 2: Logging in with invalid credentials...");
        await login.login('Sameer@jasbhi.com', '1212121212');


        // Check if error message is visible
        console.log("Step 3: Verifying if the error message is visible...");
        await expect.soft(page.getByText('Invalid credentials, Please')).toBeVisible();
    });

    test('logout after valid login', async () => {
        console.log("Step 1: Navigating to the login page...");
        await login.navigate(baseUrl);

        console.log("Step 2: Logging in with valid credentials...");
        await login.login('sajal@jasbhi.com', 'Focus@12345');
        //await login.validLogin()

        await page.waitForSelector('text=Sajal Singh', { timeout: 15000 });

        // Check if logout button is visible
        console.log("Step 3: Verifying if the logout button is visible after successful login...");
        await expect.soft(page.getByRole('link', { name: 'Log out' })).toBeVisible();

        console.log("Step 4: Logging out...");
        await home.logout();

        // Check if login button is visible
        console.log("Step 5: Verifying if the login button is visible after logout...");
        await expect.soft(page.getByRole('button', { name: 'SIGN IN' })).toBeVisible();
    });







    // test('logout without login', async () => {
    //   await home.navigate(baseUrl);

    //   // Attempt to logout without login
    //   try {
    //     await home.logout();
    //     // Check if login button is still visible
    //     await expect.soft(page.locator('#login')).toBeVisible(); // Adjust selector for login button
    //   } catch (error) {
    //     console.error('Soft assertion failed:', error);
    //   }
    // });
});