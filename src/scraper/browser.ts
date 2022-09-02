import { launch } from "puppeteer";


export default async function createBrowserInstance() {
    let browser;

    try {
        browser = await launch({
            headless: true,
            args: ['--disable-setuid-sandbox'],
            ignoreHTTPSErrors: true
        });
    } catch (err) {
        console.error('Could not create a browser instance. Error stack: ', err);
    }

    return browser;
}