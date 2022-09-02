import { Page } from "puppeteer";
import ScraperTemplate from "../types/scraper-template";

const SubjectsScrape = {
    url: '',
    async action(browser: Page) {
        if (browser?.url() != "https://tbl.umak.edu.ph/my/") return;

        await browser.goto(browser.url() + "courses.php", { "waitUntil": "networkidle2", timeout: 60000 });

        const allSubjectsList = await browser.$$(".dashboard-card-deck");

        for(const subject of allSubjectsList) {
            await browser.evaluate(value => {
                console.log(value)
            }, await (await subject.getProperty("textContent")).jsonValue())
        }
    },
} as ScraperTemplate;

export default SubjectsScrape;