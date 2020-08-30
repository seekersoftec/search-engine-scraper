// search google
const puppeteer = require("puppeteer");
//

const searchGoogle = async (searchQuery) => {
  try {
    //
    let pages = [];
    //   get all pages
    function getPages() {
      //
      let getPagesLinks = document.querySelectorAll(
        'div[id="foot"] > span[id="xjs"] > div > table[class="AaVjTc"] > tbody > tr > td'
      );

      getPagesLinks.forEach((page, index) => {
        let pageLink = page.querySelector(".fl");

        if (pageLink) {
          if (!pages.includes(pageLink.href)) {
            pages.push(pageLink.href);
          }
        }
        if (index === getPagesLinks.length - 1) {
          pageLink = page.querySelector("a#pnnext.G0iuSb");
          if (pageLink != null) {
            if (!pages.includes(pageLink.href)) {
              pages.push(pageLink.href); // next page link
            }
          } else {
            // remove the next page link
            pages.pop();
          }
        }
      });
    }

    //
    /** by default puppeteer launch method have headless option true*/
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();
    await page.goto("https://www.google.com/", { waitUntil: "networkidle2" });
    //   Finds input element with name attribute 'q' and types search query
    await page.type('input[name="q"]', searchQuery);
    //  Finds an input with name 'btnK', after so it executes .click() DOM Method
    await page.$eval('input[name="btnK"]', (button) => button.click());
    // Wait for one of the div classes to load
    // await page.waitForSelector('div[id="search"]');

    /** waitfor while loding the page, otherwise evaulate method will get failed. */
    await page.waitFor(10000);
    //
    try {
      const searchResults = async () => {
        //
        //   let data = [];
        let pageResults = await page.evaluate(() => {
          //
          let data = [];
          //   let pages = [];
          // get results per page
          //
          let results = document.querySelectorAll(
            "div[class=rc] > div[class=r]"
          );
          let searchQuery = document
            .querySelector("title")
            .innerText.split("-")[0]
            .trim();

          //
          for (const result of results) {
            // title
            let title = result.querySelector(
              "div[class=rc] > div[class=r] > a >  h3"
            ).innerText;
            // link
            let link = result.querySelector("div[class=rc] > div[class=r] > a")
              .href;
            // check if the url has already been added to data
            let findURL = data.find(function (dataset) {
              if (dataset.link == link) return true;
            });
            //
            if (findURL === undefined) {
              // add result to data
              data.push({
                title: title != "" ? title : searchQuery,
                link: link,
              });
            }
          }

          return data;
        });
        //
        return pageResults;
        //   return data;
      };
      //

      //
      //
      // const page = await browser.newPage();
      // console.log(page);
      // pages.forEach(async (pageLink, index) => {
      //   await page.goto(pageLink);
      //   await page.waitFor(10000);
      //   await page.evaluate(() => {
      //     getResults();
      //   });
      // });
      //
      searchResults()
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      //   close browser
      await browser.close();
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

searchGoogle("cats").catch(console.error);
