const puppeteer = require('puppeteer');
async function comparePrices() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.technodom.kz/p/smartfon-gsm-apple-iphone-13-128gb-thx-61-12-5-midnight-252945?recommended_by=dynamic&recommended_code=z9wxnh4hkr');
    const technodomPrice = await page.evaluate(() => {
        const price = document.querySelector('.--accented').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''));
    });

    await page.goto('https://www.sulpak.kz/g/smartfon_apple_iphone_13_128gb_midnight_mlnw3rka');
    const sulpakPrice = await page.evaluate(() => {
        const price = document.querySelector('.product__price').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''));
    });

    await page.goto('https://shop.kz/offer/smartfon-apple-iphone-13-128gb-midnight-mlnw3/');
    const whitePrice = await page.evaluate(() => {
        const price = document.querySelector('.item_current_price').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g, ''));
    });

    if (technodomPrice == sulpakPrice && technodomPrice == whitePrice && sulpakPrice == whitePrice) {
        console.log('Цены одинаковы')
    } 
    else if ((technodomPrice > sulpakPrice) && (technodomPrice > whitePrice)) {
        console.log('https://www.technodom.kz/')
    } 
    else if ((technodomPrice < sulpakPrice) && (whitePrice < sulpakPrice)) {
        console.log('https://www.sulpak.kz/')
    }
    else if ((technodomPrice < whitePrice) && (sulpakPrice < whitePrice)) {
        console.log('https://shop.kz/')
    }
    else {
        console.log('error')
    }

    await browser.close();
}

comparePrices();