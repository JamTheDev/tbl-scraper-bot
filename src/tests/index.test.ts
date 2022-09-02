import { Page } from 'puppeteer';
import VisitWebsiteAction from '../scraper/actions/visit-website-action';
import LoginAction from '../scraper/actions/login-action';
import SubjectsScrape from '../scraper/actions/subject-scrape-action';
import createBrowserInstance from '../scraper/browser';
import ScraperTemplate from '../scraper/types/scraper-template';
jest.setTimeout(500000);

describe('puppeteer', () => {
    test('login test', async () => {
        let browserInstance = await createBrowserInstance();

        // we are passing the new url instance. this should return the next url string.
        // const nextUrl = await LoginAction.action(browserInstance!);
        // browserInstance?.on("console", consoleObj => console.log(consoleObj));

        // expect(nextUrl.url()).toEqual("https://tbl.umak.edu.ph/my/");

        // await SubjectsScrape.action(nextUrl);

        const testPing = await VisitWebsiteAction.action(browserInstance);
        
        console.log(testPing);

        expect(testPing).not.toBe(-1);

        await browserInstance?.close();
    })
})