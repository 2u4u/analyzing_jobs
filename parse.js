const request = require('request-promise');
const resolve = require('url').resolve;
const cheerio = require('cheerio');
const tress = require('tress');
const fs = require("fs");

const BASIC_SEARCH_URL = 'https://www.indeed.com/jobs?q=Front-End&l=United+States';

let urlList = [];
let jobsDescriptions = [];

console.log("start time:", Date());

let q = tress((url, done) => {
  request(url, (err, res) => {
    if (err) throw err;
    const $ = cheerio.load(res.body);

    if (url.includes(BASIC_SEARCH_URL)) {
      const addToUrlList = (page) => {
        urlList.push(page);
        q.push(page);
      }
      const jobsOnThePageList = $(".jobsearch-SerpJobCard");
      jobsOnThePageList.each((i, job) => {
        let jobUrl = resolve(BASIC_SEARCH_URL, $(job).find(".title a").attr("href"));
        if (urlList.indexOf(jobUrl) < 0) addToUrlList(jobUrl);
      })
      const paginationList = $(".pagination>a");
      paginationList.each((i, page) => {
        let newPageUrl = resolve(BASIC_SEARCH_URL, $(page).attr('href'));
        if (urlList.indexOf(newPageUrl) < 0) addToUrlList(newPageUrl);
      })
    } else {
      jobsDescriptions.push({
        title: $(".jobsearch-JobComponent .jobsearch-JobInfoHeader-title").text().toString(),
        company: $(".jobsearch-InlineCompanyRating div").first().text().toString(),
        location: $(".jobsearch-InlineCompanyRating div").last().text().toString(),
        text: $(".jobsearch-jobDescriptionText").html() ? $(".jobsearch-jobDescriptionText").html().replace(/(<([^>]+)>)/ig, " ").replace(/\s\s+/g, ' ') : $(".jobsearch-jobDescriptionText").html(),
        link: url,
      })
    }

    done();
  });
}, 10)

q.success = () => {
  fs.writeFileSync("./client/public/list_of_vacancy_descriptions.json", JSON.stringify(jobsDescriptions, null, 4))
}

q.drain = () => console.log("end time:", Date())

q.push(BASIC_SEARCH_URL);