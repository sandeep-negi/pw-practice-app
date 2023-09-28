import {expect, test} from '@playwright/test' 
import { getLocalUrl}  from '../config';

test.beforeEach(async ({page}) => {
    await page.goto(getLocalUrl());
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('Locators in Playwright', async ({page}) => {
    // By tagname
    page.locator('input');

    //By ID
    page.locator('#inputEmail');

    // By Class value 
    page.locator('.shape-rectangle');

    // By Attribute
    page.locator('[type="email"]');

    // Combine Different Selectors
    page.locator('input[type="email"]');

    //By Xpath (Not Recommended)
    page.locator('//*[id="inputEmail1"]');

    // By Partial text match
    page.locator(':text("Using")');

    // By Full text match
    page.locator(':text-is("Using the grid")');

    });

    test('User Facing Locators', async ({page}) => {
        await page.getByRole('textbox', {name : 'Email'}).first().click();
        await page.getByRole('button', {name : 'Sign in'}).first().click();
        await page.getByLabel('Email').first().click();
        await page.getByPlaceholder('Jane Doe').click();
        await page.getByText('Using the Grid').click();
        await page.getByTitle('IoT Dashboard').click();
    });

    test('Locating Child Elements', async ({page}) => {
        // Child Element radio having text Option 1 ****** important
        await page.locator('nb-card nb-radio :text-is("Option 1")').click();
        // Alternatively for selecting child element
        await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
        // Clicking child Element
        await page.locator('nb-card').getByRole('button', {name : 'Sign in'}).click();
        await page.pause();
    });

    test('Locating Parent Elements', async ({page}) => {
        // Using Parent
        await page.locator('nb-card', {hasText : 'Using the Grid'}).getByRole('textbox', {name : 'Email'}).click();
        // Alternative way
        await page.locator('nb-card', {has : page.locator('#inputEmail1')}).getByRole('textbox', {name : 'Email'}).click();

        // Using inbuilt filter method
        await page.locator('nb-card').filter({hasText : 'Basic form'}).getByRole('textbox', {name : 'Email'}).click();
        await page.locator('nb-card').filter({has : page.locator('.status-danger')}).getByRole('textbox', {name : 'Password'}).click();
        await page.pause();
    });

    test('Extracting Values', async ({page}) => {
        const basicForm = page.locator('nb-card').filter({hasText : 'Basic form'}) ;
        const buttonText = await basicForm.locator('button').textContent();
        expect(buttonText).toEqual('Submit');

        // All text values
        const allRadioBtnValues = await page.locator('nb-radio').allTextContents();
        expect(allRadioBtnValues).toContain('Option 1');

        // Input value
        const emailField = basicForm.getByRole('textbox', {name: 'Email'});
        await emailField.fill('test@test.com');
        const emailValue = await emailField.inputValue();
        expect(emailValue).toEqual('test@test.com');
        await page.pause();
    });

    test('Assertions in Playwright', async ({page}) => {
        // General Assertion

        const value = 10;
        expect(value).toEqual(10);

        // Soft Assertions

        expect.soft(value).toEqual(6);
        expect(value).toEqual(10);


    });