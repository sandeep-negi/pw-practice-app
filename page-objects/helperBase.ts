import {Page} from '@playwright/test' 

/**
 * If we want to make some common methods to put in this file
 */
export class HelperBase{
    readonly page: Page ;
    constructor(page : Page){
        this.page = page ;
    }

    async waitForNumberOfSeconds(timeInSeconds : number){
        await this.page.waitForTimeout(timeInSeconds * 1000);

    }
}
