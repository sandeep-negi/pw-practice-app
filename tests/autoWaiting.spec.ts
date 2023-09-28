import {expect, test} from '@playwright/test' 

test.beforeEach(async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajaxdata');
    await page.getByText('Button Triggering AJAX Request').click();
});

test('Auto Wait', async ({page}) => {
const successBtn = page.locator('.bg-success');
// await successBtn.waitFor({state : "attached"});
// const text = await successBtn.allTextContents();
// expect(text).toContain('Data loaded with AJAX get request.');
await expect(successBtn).toHaveText('Data loaded with AJAX get request.', {timeout : 20000});

});
test('Alternative Waits', async ({page}) => {
    const successBtn = page.locator('.bg-success');

    // Wait for Element
    // await page.waitForSelector('.bg-success');

    // Wait for particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

    // Wait for Network calls to be completed ('Not Recommended')
    await page.waitForLoadState('networkidle');

    const text = await successBtn.allTextContents();
    expect(text).toContain('Data loaded with AJAX get request.');
    
    
    });