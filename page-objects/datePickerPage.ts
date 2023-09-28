import {Locator, Page, expect} from '@playwright/test' 

export class DatePickerPage {
    readonly page : Page ;

    constructor(page : Page){
        this.page = page ;
    }

    async selectCommonDatePickerFromToday(numberOfDaysFromToday : number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDate = date.getDate().toString();
        const expectedMonthShort = date .toLocaleString('En-US', {month : 'short'}); 
        const expectedMonthLong = date .toLocaleString('En-US', {month : 'long'}); 
        const expectedYear = date.getFullYear();
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
        let calendarMonthAndYear = await this.page.locator('nb-calnedar-view-mode').textContent();
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
        while(! calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calendarMonthAndYear = await this.page.locator('nb-calnedar-view-mode').textContent();
        }
        await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact : true}).click();
        await expect(calendarInputField).toHaveValue(dateToAssert);
    }

}