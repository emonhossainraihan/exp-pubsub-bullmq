const puppeteer = require('puppeteer');
class Scraper {
    constructor() {
        this.browser;
    }
    async init() {
        this.browser = await puppeteer.launch();
    }
    async controller(url) {
        if (!this.browser) await this.init();
        const page = await this.browser.newPage();
        await page.goto(url);
        await page.waitForTimeout(1000);
        const title = await page.title();
        await page.close();
        return title;
    }
    async cleanup() {
        await this.browser.close();
        this.browser = null;
    }
}
// worker.js
const { Worker } = require('bullmq');
async function process(job) {
    const scraper = new Scraper();
    const data = await scraper.controller(job.data.url);
    console.log(job.data.url, data);
    await scraper.cleanup();
}

const worker = new Worker('links', process, {
    limiter: { max: 2, duration: 1000 },
});

worker.on('completed', (job) => {
    console.log(`${job.id} has completed!`);
    //console.log(JSON.stringify(job, null, 4))
});
worker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});