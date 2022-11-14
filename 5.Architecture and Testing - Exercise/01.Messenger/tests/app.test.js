let {chromium} = require('playwright');
let { assert } = require('chai');


const host = 'http://localhost:5500';
const mockData = '{"-LxHVtajG3N1sU714pVj":{"author":"Spami","content":"Hello, are you there?"},"-LxIDxC-GotWtf4eHwV8":{"author":"Garry","content":"Yep, whats up :?"},"-LxIDxPfhsNipDrOQ5g_":{"author":"Spami","content":"How are you? Long time no see? :)"},"-LxIE-dM_msaz1O9MouM":{"author":"George","content":"Hello, guys! :))"},"-LxLgX_nOIiuvbwmxt8w":{"author":"Spami","content":"Hello, George nice to see you! :)))"}}'



describe('Test', async function(){
    this.timeout(15000);
    let browser,page;
    
    

    before(async() => {
        browser = await chromium.launch();
        //browser = await chromium.launch({headless:false , slowMo:2000});
    });

    after(async() => {
        await browser.close();
    });

    beforeEach(async() => {
       page = await browser.newPage();
    });

    afterEach(async() => {
       page.close()
    });


    it("Loading messagess successfully", async() => {
       await page.goto(host);
       await page.click('text = Refresh');
       let pageContent = await page.$eval('Textarea', content => content.value);
       assert(pageContent.includes("Spami"));
    })

    it("sending messagess successfully", async() => {
        await page.route('**/jsonstore/collections/books', (route,request) => {
            route.fulfill({
             
                body : JSON.stringify(mockData),
                status :200 ,
                headers : {
                    'Access-Control-Allow-Origin' : "*",
                    'Content-Type' : "application/json"
                }
            })
        })
        await page.goto(host);
        await page.fill('[name="author"]', 'Ico');
        await page.fill('[name="content"]', 'Cool content');
        let [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == "POST"),
            page.click("text=Send")
        ])
        let data = JSON.parse(request.postData());
        
                
        assert.equal(data.author,"Ico");
        assert.equal(data.content,"Cool content");
    })
})