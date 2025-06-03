import { Page } from "@playwright/test";

export default class ContactPage{

    private page:Page;

    constructor(page:Page){
        this.page = page;
    }

    
async waitForPageLoad() {
  await this.page.waitForLoadState('load');
}


}