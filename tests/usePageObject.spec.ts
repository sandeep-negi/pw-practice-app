import {expect, test} from '@playwright/test' 
import { PageManager } from '../page-objects/pageManager' ; 
import { faker } from '@faker-js/faker';
import { getLocalUrl } from '../config';


test.beforeEach(async({page}) => {
    await page.goto(getLocalUrl());
});

test('navigate to form page', async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datePickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toasterPage();
    await pm.navigateTo().toolTipPage();
});

test('parameterised methods', async ({page}) => {
    const pm = new PageManager(page);
    const firstName = faker.person.firstName();
    
    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutPage().submitForm('test@test.com', '12345678', 'Option 1');
    await pm.onFormLayoutPage().submitInlineFormWithEmailAndCheckbox(firstName, 'test@gmail.com', true);
    await pm.navigateTo().datePickerPage();
    await pm.onDatePickerPage().selectCommonDatePickerFromToday(2);
    await page.pause();
});