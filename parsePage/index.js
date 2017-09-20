var cheerio = require('cheerio');
var request = require('request');

module.exports = function (response, opt) {
    request(opt, function (err, res) {
        if (err) throw err;
        var paragraphs = [];

        var $ = cheerio.load(res.body);
        $('article').find('p').each(function (i, elem) {
            paragraphs[i] = $(elem).text();
        });

        var title = $('header.row').find('h2.headline').text();

        var result = {
            title: title,
            paragraphs: paragraphs
        };

        var json = JSON.stringify(result);

        response.end(json);
    });
}