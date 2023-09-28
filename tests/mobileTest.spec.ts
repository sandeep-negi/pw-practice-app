import {expect, test} from '@playwright/test' 
import { getLocalUrl } from '../config';

test('mobile input fields', async({page})=> {
    await page.goto(getLocalUrl());
    await page.locator('.sidebar-toggle').click();
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await page.locator('.sidebar-toggle').click();
    
    const usingTheGrid = page.locator('nb-card', {hasText : 'Using the Grid'}).getByRole('textbox', {name : 'Email'});
    await usingTheGrid.fill('test@test.com');
    await usingTheGrid.clear();
    // type method deprecated now
    await usingTheGrid.type('test@test.com');

    // generic assertion
    const inputValue = await usingTheGrid.inputValue();
    expect(inputValue).toEqual('test@test.com');

    // locator Assertion
    await expect(usingTheGrid).toHaveValue('test@test.com')

 });