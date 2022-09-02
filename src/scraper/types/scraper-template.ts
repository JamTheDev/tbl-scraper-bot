import { Browser, Page } from "puppeteer";

export default interface ScraperTemplate {
    url: string,
    action: (browser: any) => Promise<any>,
    finished: (data: any, nextUrl?: string) => void
}