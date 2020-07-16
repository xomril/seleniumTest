import { browser, ExpectedConditions, ElementFinder, element } from "protractor";
const { By, until } = require("selenium-webdriver");
const  testdata = require('./../../../testData.json');



describe('TODO', () => {
    const URL = "http://tutorialsninja.com/demo/";

    it('should go to tutorialsninja.com/demo/ and login', async() => {
        browser.waitForAngularEnabled(false);
        browser.get(URL);
        expect(browser.getCurrentUrl()).toContain(URL);
        await browser.findElement(By.xpath('//span[text()="My Account"]')).click();
        await browser.findElement(By.xpath('//*[text()="Login"]')).click();
        await browser.findElement(By.css('#input-email')).sendKeys(testdata.email);
        await browser.findElement(By.css('#input-password')).sendKeys(testdata.password);
        await browser.findElement(By.css('[type="submit"]')).click();
        const myAccountElement = await browser.findElement(By.xpath('//*[@id="content"]//h2'));
        expect(myAccountElement.getText()).toEqual('My Account');
    });

    it('should test Phones & PDAs sort price high to low', async() => {
        await browser.findElement(By.xpath('//a[text()="' + testdata.category + '"]')).click();
        await browser.findElement(By.css('#list-view')).click();
        browser.get(await browser.findElement(By.xpath('//option[text()="Price (High > Low)"]')).getAttribute('value'))
        const items = await browser.findElements(By.xpath('(//*[@class="product-thumb"])'));
        console.log("there are " + items.length + " items");
        const firstItemPrice = await browser.findElement(By.xpath('(//*[@class="product-thumb"]) [1] //p[@class="price"]')).getText();
        const lastItemPrice =  await browser.findElement(By.xpath('(//*[@class="product-thumb"]) [' + items.length +'] //p[@class="price"]')).getText();
        expect(priceToNum(lastItemPrice)).toBeLessThan(+priceToNum(firstItemPrice));
    });

    it('should test Phones & PDAs sort price Low to high', async() => {
        await browser.findElement(By.xpath('//a[text()="' + testdata.category + '"]')).click();
        await browser.findElement(By.css('#list-view')).click();
        browser.get(await browser.findElement(By.xpath('//option[text()="Price (Low > High)"]')).getAttribute('value'))
        const items = await browser.findElements(By.xpath('(//*[@class="product-thumb"])'));
        console.log("there are " + items.length + " items");
        const firstItemPrice = await browser.findElement(By.xpath('(//*[@class="product-thumb"]) [1] //p[@class="price"]')).getText();
        const lastItemPrice =  await browser.findElement(By.xpath('(//*[@class="product-thumb"]) [' + items.length +'] //p[@class="price"]')).getText();
        expect(priceToNum(firstItemPrice)).toBeLessThan(+priceToNum(lastItemPrice));
    });

    it('should place order for HTC Touch HD', async() =>{
        await waitAndClickElement(By.xpath('//h4//a[text()="' + testdata.itemToBuy + '"]'))
         await browser.findElement(By.css('#button-cart')).click();
         await browser.findElement(By.css('#cart-total')).click();
         await waitAndClickElement(By.xpath('//*[text()=" Checkout"]'));
         await waitAndClickElement(By.css('#button-payment-address'));
         await waitAndClickElement(By.css('#button-shipping-address'));
         await waitAndClickElement(By.css('#button-shipping-method'));
         await waitAndClickElement(By.xpath('//input[@name="agree"]'));
         await waitAndClickElement(By.css('#button-payment-method'));
         await waitAndClickElement(By.css('#button-confirm'));
        await browser.sleep(2000);
        browser.get('http://tutorialsninja.com/demo/index.php?route=account/order');
        const sumOrder = await browser.findElement(By.xpath('//td[text()="' + getCurrentDate() + '"]//..//td[contains(text(),"$")]'))
        expect(sumOrder.getText()).toEqual(testdata.price)
    });

    it('should search for Mac and verify all items are MAC 4 (verify by name)', async() =>{
        await browser.findElement(By.xpath('//input[@name="search"]')).sendKeys('Mac' + '\n');
        const items = await browser.findElements(By.xpath('//*[@class="product-thumb"]//a'));
        items.forEach(async item =>{
            const itemText = await item.getText();
            if(itemText != ""){
                console.log(itemText);
                expect(itemText.indexOf('Mac') > -1).toBe(true);
            }
        })

    })
});


const priceToNum = (price) => {
    return +price.split("\n")[0].match(/\d.+/g,"")
}

const waitAndClickElement = async (by)=> {
    let el: ElementFinder = element(by);
    await browser.wait(ExpectedConditions.elementToBeClickable(el),5000);
    await el.click();
}

const getCurrentDate = ()=> {
    const today = new Date();
    const month = ("0"  +(today.getMonth()+1)).slice(-2);
    const year = today.getFullYear();
  return today.getDate()+'/' + month +'/'+ year;
}