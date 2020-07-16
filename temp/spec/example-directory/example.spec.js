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
const { By, until } = require("selenium-webdriver");
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
        yield protractor_1.browser.findElement(By.xpath('//a[text()="' + testdata.category + '"]')).click();
        yield protractor_1.browser.findElement(By.css('#list-view')).click();
        protractor_1.browser.get(yield protractor_1.browser.findElement(By.xpath('//option[text()="Price (High > Low)"]')).getAttribute('value'));
        const items = yield protractor_1.browser.findElements(By.xpath('(//*[@class="product-thumb"])'));
        console.log("there are " + items.length + " items");
        const firstItemPrice = yield protractor_1.browser.findElement(By.xpath('(//*[@class="product-thumb"]) [1] //p[@class="price"]')).getText();
        const lastItemPrice = yield protractor_1.browser.findElement(By.xpath('(//*[@class="product-thumb"]) [' + items.length + '] //p[@class="price"]')).getText();
        expect(priceToNum(lastItemPrice)).toBeLessThan(+priceToNum(firstItemPrice));
    }));
    it('should test Phones & PDAs sort price Low to high', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.findElement(By.xpath('//a[text()="' + testdata.category + '"]')).click();
        yield protractor_1.browser.findElement(By.css('#list-view')).click();
        protractor_1.browser.get(yield protractor_1.browser.findElement(By.xpath('//option[text()="Price (Low > High)"]')).getAttribute('value'));
        const items = yield protractor_1.browser.findElements(By.xpath('(//*[@class="product-thumb"])'));
        console.log("there are " + items.length + " items");
        const firstItemPrice = yield protractor_1.browser.findElement(By.xpath('(//*[@class="product-thumb"]) [1] //p[@class="price"]')).getText();
        const lastItemPrice = yield protractor_1.browser.findElement(By.xpath('(//*[@class="product-thumb"]) [' + items.length + '] //p[@class="price"]')).getText();
        expect(priceToNum(firstItemPrice)).toBeLessThan(+priceToNum(lastItemPrice));
    }));
    it('should place order for HTC Touch HD', () => __awaiter(void 0, void 0, void 0, function* () {
        yield waitAndClickElement(By.xpath('//h4//a[text()="' + testdata.itemToBuy + '"]'));
        yield protractor_1.browser.findElement(By.css('#button-cart')).click();
        yield protractor_1.browser.findElement(By.css('#cart-total')).click();
        yield waitAndClickElement(By.xpath('//*[text()=" Checkout"]'));
        yield waitAndClickElement(By.css('#button-payment-address'));
        yield waitAndClickElement(By.css('#button-shipping-address'));
        yield waitAndClickElement(By.css('#button-shipping-method'));
        yield waitAndClickElement(By.xpath('//input[@name="agree"]'));
        yield waitAndClickElement(By.css('#button-payment-method'));
        yield waitAndClickElement(By.css('#button-confirm'));
        yield protractor_1.browser.sleep(2000);
        protractor_1.browser.get('http://tutorialsninja.com/demo/index.php?route=account/order');
        const sumOrder = yield protractor_1.browser.findElement(By.xpath('//td[text()="' + getCurrentDate() + '"]//..//td[contains(text(),"$")]'));
        expect(sumOrder.getText()).toEqual(testdata.price);
    }));
    it('should search for Mac and verify all items are MAC 4 (verify by name)', () => __awaiter(void 0, void 0, void 0, function* () {
        yield protractor_1.browser.findElement(By.xpath('//input[@name="search"]')).sendKeys('Mac' + '\n');
        const items = yield protractor_1.browser.findElements(By.xpath('//*[@class="product-thumb"]//a'));
        items.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            const itemText = yield item.getText();
            if (itemText != "") {
                console.log(itemText);
                expect(itemText.indexOf('Mac') > -1).toBe(true);
            }
        }));
    }));
});
const priceToNum = (price) => {
    return +price.split("\n")[0].match(/\d.+/g, "");
};
const waitAndClickElement = (by) => __awaiter(void 0, void 0, void 0, function* () {
    let el = protractor_1.element(by);
    yield protractor_1.browser.wait(protractor_1.ExpectedConditions.elementToBeClickable(el), 5000);
    yield el.click();
});
const getCurrentDate = () => {
    const today = new Date();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    return today.getDate() + '/' + month + '/' + year;
};
