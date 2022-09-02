import { Browser } from "puppeteer";
import ScraperTemplate from "../types/scraper-template";

const VisitWebsiteAction: ScraperTemplate = {
    url: "https://tbl.umak.edu.ph",
    async action(browser: Browser): Promise<number> {
        // create new page
        const page = await browser.newPage();

        // record current timestamp before we navigate to the UMak page
        const startTime = +new Date();
        // navigate to the UMak page
        const response = await page.goto(this.url, { waitUntil: "networkidle2", timeout: 30000});
        // after finishing, find the difference of time now vs startTime
        const endTime = +new Date() - startTime;

        // if it times out, it should spit out -1. meaning the site is very slow.
        if (!response?.ok)
            return -1;

        return endTime;
    },
    finished(data, nextUrl?) {
        
    },
} as ScraperTemplate;

export default VisitWebsiteAction;