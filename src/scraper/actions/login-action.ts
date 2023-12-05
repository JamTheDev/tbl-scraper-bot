import { Browser } from "puppeteer";
import ScraperTemplate from "../types/scraper-template";

/**
 * Main entry point of the scraping tool
 * 
 * When a discord command is ran, this is the first action
 * the scraping tool will do, validate credentials & log-in the user
 * to the main page. It'll spit out the landing url.
 */
const LoginAction: ScraperTemplate = {
    url: 'https://tbl.umak.edu.ph/login',
    async action(browser: Browser) {
        const page = await browser.newPage();
        try {
            // navigate to said page
            await page.goto(this.url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(e => void 0);

            // type out the credentials
            await page.waitForSelector('#username');
            await page.waitForSelector('#password');
            await page.waitForSelector('#loginbtn');

            await page.type('#username', 'SECRET');
            await page.type('#password', 'SECRET');

            // login & authenticate
            await page.click('#loginbtn');

            // wait until we get redirected to a new page
            await page.waitForNavigation({ 'waitUntil': 'networkidle0', timeout: 60000 });

            return page;
        } catch (err) {
            console.error(err);
            await browser.close();
        }
    },
} as ScraperTemplate;

export default LoginAction;
