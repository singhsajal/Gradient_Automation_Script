import { test, expect } from '@playwright/test';
import loginPage from '../pages/loginPage.js';
import homePage from '../pages/homePage.js';
import basePage from '../pages/basePage.js';
import profilePage from '../pages/profilePage.js';
import { profile } from 'console';

const base = new basePage()
const baseUrl = "https://staging-v2.gradientcyber.net/cyber/login"



test.describe('Test users section ', () => {
    let login;
    let home;
    let page;
    let profile;

    // Set up before all tests
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        login = new loginPage(page);
        home = new homePage(page);
        profile = new profilePage(page);

    });

    test('open profile screen from users section dropdown ', async () => {
        console.log("Step 1: Navigating to the login page...");
        await login.navigate(baseUrl);

        console.log("Step 2: Logging in with valid credentials...");
        //await login.validLogin()
        await login.login('sajal@jasbhi.com', 'Focus@12345')

        console.log("Step 3: Verifying that the correct user is logged in ...");

        await expect(page.getByText('Sajal Singh')).toBeVisible();

        // Check if logout button is visible
        console.log("Step 4: navigate to profile screen from users profile dropdown ..");
        //await expect.soft(page.getByRole('link', { name: 'Log out' })).toBeVisible();
        await profile.profile()
        console.log("Step 5: variefy that profile screen is visible")
        await expect(page.getByText('User profile')).toBeVisible()

    });

    test('Update phone number and variefy ', async () => {
        console.log("Step 1: Navigating to the login page...");
        await login.navigate(baseUrl);

        console.log("Step 2: Logging in with valid credentials...");
        //await login.validLogin()
        await login.login('sajal@jasbhi.com', 'Focus@12345')

        console.log("Step 3: Verifying that the correct user is logged in ...");

        const actualName = await page.getByText('Sajal Singh').textContent();

        await expect(actualName).toBe(" Sajal Singh ");
        console.log("logged in user name is ", actualName)

        // Check if logout button is visible
        console.log("Step 4: navigate to profile screen from users profile dropdown ..");

        await profile.profile()
        console.log("Step 5: variefy that profile screen is visible")
        await expect(page.getByText('User profile')).toBeVisible()
        console.log("Step 6: Update phone number ")


        await page.getByLabel('Phone Number *').click();
        await page.getByLabel('Phone Number *').press('ControlOrMeta+a');
        await page.getByLabel('Phone Number *').fill('+91 9119015725');
        console.log("Updated Number is +91 9119015725")
        await page.getByRole('button', { name: 'Update settings' }).click();

        console.log("Step 7: variefy that number is updated successfully or not")

        await page.locator('.menu-icon').first().click();
        await page.getByRole('link', { name: 'Home' }).click();
        await page.waitForTimeout(5000);

        await page.goto('https://staging-v2.gradientcyber.net/cyber/profile');

        const actualPhoneNumber = await page.getByLabel('Phone Number *').inputValue();
        await expect.soft(actualPhoneNumber).toBe("+91 9119015725");
        console.log("number visible on UI is  ", actualPhoneNumber)

        console.log("Step 8: change to previous number")

        await profile.profile()
        console.log("Step 9: variefy that profile screen is visible")
        await expect(page.getByText('User profile')).toBeVisible()
        console.log("Step 10: Update previous phone number +91 6376735920 ")


        await page.getByLabel('Phone Number *').click();
        await page.getByLabel('Phone Number *').press('ControlOrMeta+a');
        await page.getByLabel('Phone Number *').fill('+91 6376735920');
        await page.getByRole('button', { name: 'Update settings' }).click();
        await page.waitForTimeout(2000);
        await home.logout();
        await login.login('sajal@jasbhi.com', 'Focus@12345')
        await page.waitForTimeout(5000);
        await profile.profile()


        console.log("Step 11: variefy that previous number is updated successfully or not")
        await page.goto('https://staging-v2.gradientcyber.net/cyber/profile');
        const previousPhoneNumber = await page.getByLabel('Phone Number *').inputValue();
        console.log("Number visible on UI is ", previousPhoneNumber)
        await expect.soft(previousPhoneNumber).toBe("+91 6376735920");



    });


})