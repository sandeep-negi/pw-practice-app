import {expect, test} from '@playwright/test' 
import { getLocalUrl } from '../config';

test.beforeEach(async({page}) => {
    await page.goto(getLocalUrl());
    
});

test.describe('Form Layout Page', () => {
 test.beforeEach('', async({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
 });

 test('input fields @smoke', async({page})=> {
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
 test('Radio buttons @sanity', async({page})=> {
    const usingTheGridForm = page.locator('nb-card', {hasText : 'Using the Grid'});
    
   // await usingTheGridForm.getByLabel('Option 1').check({force : true});
    
    // 2nd way
    await usingTheGridForm.getByRole('radio', {name : 'Option 1'}).check({force : true});
    const radioStatus = await usingTheGridForm.getByRole('radio', {name : 'Option 1'}).isChecked();
    
    // 1st way for assertion
    expect(radioStatus).toBeTruthy();

    // 2nd way of assertion
    await expect(usingTheGridForm.getByRole('radio', {name : 'Option 1'})).toBeChecked();

 });
});

test('CheckBox', async({page})=> {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    // Difference between check and click [both works]
    // Check will not select again if checkbox is already checked while click will do
    await page.getByRole('checkbox', {name : 'Hide on click'}).click({force : true});
    await page.getByRole('checkbox', {name : 'Hide on click'}).check({force : true});
    await page.getByRole('checkbox', {name : 'Hide on click'}).uncheck({force : true});

    // To Check all check boxes and verify them
    const allCheckBoxes = page.getByRole('checkbox');
    for(const box of await allCheckBoxes.all()){
        await box.check({force : true});
        expect(await box.isChecked()).toBeTruthy();

    }
    // To Un Check all check boxes and verify them
    // all() method converts into array

    for(const box of await allCheckBoxes.all()){
        await box.uncheck({force : true});
        expect(await box.isChecked()).toBeFalsy();
    }

 });

 test('List and DropBox', async({page})=> {

    const dropDownMenu = page.locator('ngx-header nb-select');
    await dropDownMenu.click();

    // when list have got UI tag
    page.getByRole('list');
    // when list have got li tag
    page.getByRole('listitem');

    // const optionList = page.getByRole('list').locator('nb-option') ;

    const optionList = page.locator('nb-option-list nb-option');
    await expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"]);
    await optionList.filter({hasText : 'Cosmic'}).click();

    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    const colors ={
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)",
    }

    await dropDownMenu.click();
    for(const color in colors){
        await optionList.filter({hasText : color}).click();
        await expect(header).toHaveCSS('background-color', colors[color]);
        if(color != 'Corporate'){
            await dropDownMenu.click();
        }
    }
 });

 test('Tooltip ', async({page})=> {

    // To debug tooltip on mac browser, visit source on console
    // section and press command + backslash

    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();
    const toolTipCard = page.locator('nb-card', {hasText :'Tooltip Placements'});
    await toolTipCard.getByRole('button', {name : 'Top'}).hover();

    const toolTipText = await page.locator('nb-tooltip').textContent();
    expect(toolTipText).toEqual('This is a tooltip'); 
 });

 test('Dialog box ', async({page})=> {
 // handling browser pop up
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        dialog.accept();
    });
    await page.getByRole('table').locator('tr', {hasText : 'mdo@gmail.com'}).locator('.nb-trash').click();
    
 });

 test('Web Table Handling', async({page})=> {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();
    // get the row by any test in this row
    const targetRow = page.getByRole('row', {name : 'twitter@outlook.com'});
    await targetRow.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('Age').clear();
    await page.locator('input-editor').getByPlaceholder('Age').fill('40');
    await page.locator('.nb-checkmark').click();

    // get the row based on any value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
    const targetRowById = page.getByRole('row', {name : '11'}).filter({has : page.locator('td').nth(1).getByText('11')});
    await targetRowById.locator('.nb-edit').click();
    await page.pause();
 });

 test('Date picker', async({page})=> {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const calenderInputField = page.getByPlaceholder('Form Picker');
    await calenderInputField.click();
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1',{exact : true}).click();
    await page.pause();
 });
 test('Sliders', async({page})=> {
    await page.getByText('Forms').click();
    await page.getByText('IoT Dashboard').click();

    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();
    const box = await tempBox.boundingBox();
    const x = box.x + box.width / 2 ;
    const y = box.y + box.height / 2 ;
    await page.mouse.move(x, y);
    await page.mouse.down()
    await page.mouse.move(x + 100, y);
    await page.mouse.move(x + 100, y + 100);
    await page.mouse.up();
    await page.pause();
 });

