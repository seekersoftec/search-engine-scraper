const Crawler = require("crawler");
// 
const SEARCH_QUERY = "/search?q=node js tutorial";
const SEARCH_ENGINE_URL = "https://www.google.com"+SEARCH_QUERY;
const LINK_SELECTOR = "#main div.med div.g div.rc div.r a";

var googleCrawler = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            // console.log(res.body.toString());
            // console.log($("title").text());
            let data = [];
            // var list = $("div").find(".rc .r a");
            var list = $('#main').find('div.med div.g div.rc div.r a');
            console.log(list.prevObject.length);
            console.log(list.prevObject['0'].children[0].children);
            // for(var link of list.prevObject) {
            //     data.push({
            //         'title':'',
            //         'link':'',
            //     })
            // }
            // console.log(list.prevObject['346']);

            // let data = []            /** this can be changed for other website.*/
            // const list = document.querySelectorAll('.rc .r');
            // for (const a of list) {
            //     data.push({
            //         'title': a.querySelector('.LC20lb').innerText.trim().replace(/(\r\n|\n|\r)/gm, " "),
            //         'link': a.querySelector('a').href
            //     })
            // }
        }
        done();
    }
});

// Queue just one URL, with default callback
googleCrawler.queue(SEARCH_ENGINE_URL);


const puppeteer = require("puppeteer");

let searchQuery = "nodejs tutorial";

try {
  (async () => {
    /** by default puppeteer launch method have headless option true*/
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto("https://www.google.com/");
    await page.type('input[aria-label="Search"]', searchQuery);
    await page.keyboard.press("Enter");

    /** waitfor while loding the page, otherwise evaulate method will get failed. */
    await page.waitFor(20000);
    const list = await page.evaluate(() => {
      let data = []; /** this can be changed for other website.*/
      // document.querySelectorAll("#main div.med div.g div.rc div.r a");
      const list = document.querySelectorAll(".rc .r");
      for (const a of list) {
        data.push({
          title: a
            .querySelector(".LC20lb")
            .innerText.trim()
            .replace(/(\r\n|\n|\r)/gm, " "),
          link: a.querySelector("a").href,
        });
      }
      return data;
    });
    console.log(list);
    //
    //
    await browser.close();
  })();
} catch (err) {
  console.error(err);
}


