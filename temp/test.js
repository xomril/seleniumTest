"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const { By } = require("selenium-webdriver");
const testdata = require('./../../../testData.json');
describe('TODO', () => {
    const URL = "http://tutorialsninja.com/demo/";
    it('should go to tutorialsninja.com/demo/ and login', () => __awaiter(void 0, void 0, void 0, function* () {
        protractor_1.browser.waitForAngularEnabled(false);
        protractor_1.browser.get(URL);
        expect(protractor_1.browser.getCurrentUrl()).toContain(URL);
        yield protractor_1.browser.findElement(By.xpath('//span[text()="My Account"]')).click();
        yield protractor_1.browser.findElement(By.xpath('//*[text()="Login"]')).click();
        yield protractor_1.browser.findElement(By.css('#input-email')).sendKeys(testdata.email);
        yield protractor_1.browser.findElement(By.css('#input-password')).sendKeys(testdata.password);
        yield protractor_1.browser.findElement(By.css('[type="submit"]')).click();
        const myAccountElement = yield protractor_1.browser.findElement(By.xpath('//*[@id="content"]//h2'));
        expect(myAccountElement.getText()).toEqual('My Account');
    }));
    it('should test Phones & PDAs sort price high to low', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.findElement(By.xpath('//a[text()="Phones & PDAs"]')).click();
        yield protractor_1.browser.findElement(By.css('#list-view')).click();
        protractor_1.browser.get(yield protractor_1.browser.findElement(By.xpath('//option[text()="Price (High > Low)"]')).getAttribute('value'));
        const items = yield protractor_1.browser.findElements(By.xpath('(//*[@class="product-thumb"])'));
        console.log("there are " + items.length + " items");
        const firstItemPrice = yield protractor_1.browser.findElement(By.xpath('(//*[@class="product-thumb"]) [1] //p[@class="price"]')).getText();
        const lastItemPrice = yield protractor_1.browser.findElement(By.xpath('(//*[@class="product-thumb"]) [' + items.length + '] //p[@class="price"]')).getText();
        expect(priceToNum(lastItemPrice)).toBeLessThan(+priceToNum(firstItemPrice));
    }));
    it('should test Phones & PDAs sort price Low to high', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.findElement(By.xpath('//a[text()="Phones & PDAs"]')).click();
        yield protractor_1.browser.findElement(By.css('#list-view')).click();
        protractor_1.browser.get(yield protractor_1.browser.findElement(By.xpath('//option[text()="Price (Low > High)"]')).getAttribute('value'));
        const items = yield protractor_1.browser.findElements(By.xpath('(//*[@class="product-thumb"])'));
        console.log("there are " + items.length + " items");
        const firstItemPrice = yield protractor_1.browser.findElement(By.xpath('(//*[@class="product-thumb"]) [1] //p[@class="price"]')).getText();
        const lastItemPrice = yield protractor_1.browser.findElement(By.xpath('(//*[@class="product-thumb"]) [' + items.length + '] //p[@class="price"]')).getText();
        expect(priceToNum(firstItemPrice)).toBeLessThan(+priceToNum(lastItemPrice));
    }));
    it('should place order for Palm Treo Pro', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.findElement(By.xpath('//a[text()="Palm Treo Pro"]')).click();
        yield protractor_1.browser.findElement(By.css('#button-cart')).click();
        yield (yield protractor_1.browser.findElement(By.css('#cart-total'))).click();
        yield (yield protractor_1.browser.findElement(By.xpath('//*[text()=" Checkout"]'))).click();
        yield protractor_1.browser.sleep(5000);
    }));
});
const priceToNum = (price) => {
    return +price.split("\n")[0].match(/\d.+/g, "");
};
