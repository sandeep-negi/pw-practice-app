import {Locator, Page} from '@playwright/test' 

export class FormsLayoutPage {
    readonly page: Page ;
 
    constructor(page : Page){
    this.page = page ;
 }

 async submitForm(email : string, password: string, optionText: string){
    const usingTheGridForm = this.page.locator('nb-card', {hasText : 'Using the Grid'});
    await usingTheGridForm.getByRole('textbox', {name : 'Email'}).fill(email);
    await usingTheGridForm.getByRole('textbox', {name : 'Password'}).fill(password);
    await usingTheGridForm.getByRole('radio', {name : optionText}).check({force : true});
    await usingTheGridForm.getByRole('button').click();
 }
 async submitInlineFormWithEmailAndCheckbox(name : string, email: string, rememberMe: boolean){
    const inlineForm = this.page.locator('nb-card', {hasText : 'Inline form'});
    await inlineForm.getByRole('textbox', {name : 'Jane Doe'}).fill(name);
    await inlineForm.getByRole('textbox', {name : 'Email'}).fill(email);
    if(rememberMe){
        await inlineForm.getByRole('checkbox').check({force : true});
    }
    await inlineForm.getByRole('button').click();
 }

}