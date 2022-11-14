let {chromium} = require('playwright');
let { expect } = require('chai');

const host = 'http://localhost:5500';
const mockData = {"d953e5fb-a585-4d6b-92d3-ee90697398a0":{"author":"J.K.Rowling","title":"Harry Potter and the Philosopher's Stone"},
"d953e5fb-a585-4d6b-92d3-ee90697398a1":{"author":"Svetlin Nakov","title":"C# Fundamentals"}}


describe('Test', async function(){
    this.timeout(15000);
    let browser,page;

    

    before(async() => {
        //browser = await chromium.launch();
        browser = await chromium.launch({headless:false , slowMo:1000});
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

    it('Loads all books', async() => {
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
        await page.waitForSelector('button');
        await page.click('text=Load all books');
        await page.waitForSelector('text = Nakov');
        let rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));
        
        expect(rowData[0]).to.contains("Harry Potter");
        expect(rowData[0]).to.contains("Rowling");
        expect(rowData[1]).to.contains("Nakov");
        expect(rowData[1]).to.contains("C#")
        

    });

   /*it('Adds books successfully', async() => { 
       
        await page.goto(host);
        await page.waitForSelector('button');
        await page.fill('[name="title"]',"Cool Book Title");
        await page.fill('[name="author"]',"Ico");
        await page.click('text=Submit');
        await page.click('text=Load all books');
        await page.waitForSelector('text = Nakov');
        let rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));
        expect(rowData[2]).to.contains("Ico");
        expect(rowData[2]).to.contains("Cool Book");



    })*/

    it('Adds books successfully', async()=>{
        await page.goto(host);

        await page.fill('[name="title"]',"Cool Book Title");
        await page.fill('[name="author"]',"Ico");

        let [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == "POST"),
            page.click('text=Submit')
        ])

        let data = JSON.parse(request.postData());
        expect(data.title).to.equal("Cool Book Title");
        expect(data.author).to.equal("Ico");
        
    });

    it('Edit book successfully', async() => {
        await page.goto(host);
        await page.waitForSelector('button');
        await page.fill('[name="title"]',"The Godfather");
        await page.fill('[name="author"]',"Ico");
        await page.locator('text=Submit').click();
        await page.locator('text=Edit >> nth=-1').click();
        await page.fill('[name="title"]',"The Godfather 2: Tokyo Drift");

        let [request] = await Promise.all([
            page.waitForRequest((request) => request.method() == "PUT"),
            page.click('text=Save')
        ])

        let data = JSON.parse(request.postData());
        expect(data.title).to.equal("The Godfather 2: Tokyo Drift");
        expect(data.author).to.equal("Ico");
        
    });

    it.only("Deleting a book successfully", async() =>{

        await page.goto(host);
        await page.waitForSelector('button');
        await page.click('text=Load all books');
        let rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));
        let rowsCount = rowData.length;
        await page.locator('text=Delete >> nth=-1').click();
        rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));
        let rowsCountAfterDelete = rowData.length;

        expect(rowsCountAfterDelete).to.be.lessThan(rowsCount)
    })

});