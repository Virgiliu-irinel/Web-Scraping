const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const { table } = require('console');
const writeStream = fs.createWriteStream('post.csv');

request('https://ro.wikipedia.org/wiki/Lista_%C8%9B%C4%83rilor_dup%C4%83_popula%C8%9Bie', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    
    

    const test = $(".wikitable").children("tbody").children();
    test.each((i, el) => {
      const top = $(el).children(":first").text();
      const tara = $(el).children().slice(1, 2).text();
      const populatie = $(el).children().slice(2, 3).text();

      writeStream.write(`${top} | ${tara} | ${populatie} \n`);
      
    })

    // writeStream.write(`${table} \n`);

    console.log('Scraping Done...');
  }
});