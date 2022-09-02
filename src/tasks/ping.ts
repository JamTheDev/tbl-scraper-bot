import { expose } from "threads";
import { sys, promise } from "ping";
import createBrowserInstance from "../scraper/browser";


expose({
    async ping(url) {
        const browserInstance = await createBrowserInstance();

        
    }
})