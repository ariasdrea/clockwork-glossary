const puppeteer = require("puppeteer");
const fs = require("fs");

async function getSlovs() {
    try {
        const URL = "https://www.sparknotes.com/lit/clockworkorange/terms/";
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(URL);

        const result = [];
        const titles = await page.$$eval(
            "h3.mainTextContent__list-content__item__heading",
            (titles) => titles.map((title) => title.textContent.toLowerCase())
        );
        const meanings = await page.$$eval(
            "li.mainTextContent__list-content__item p",
            (meanings) =>
                meanings.map((meaning) =>
                    meaning.textContent.replace(/\n/g, " ")
                )
        );

        for (let i = 0; i < titles.length; i++) {
            result.push({
                [titles[i]]: meanings[i],
            });
        }

        fs.writeFileSync(
            `${__dirname}/data.json`,
            JSON.stringify(result, null, 4)
        );

        await browser.close();
    } catch (error) {
        console.error(error);
    }
}

getSlovs();
