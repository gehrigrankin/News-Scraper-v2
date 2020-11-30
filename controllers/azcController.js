const axios = require("axios");
var cheerio = require("cheerio");
// const db = require("../models");

let resultsArr = [];

module.exports = {
    findAll: async (req, res) => {
        try {
            const mainSrc = "https://www.azcentral.com";

            // Grab the body of the html with request
            axios.get(mainSrc)
                .then(function (response) {
                    const $ = cheerio.load(response.data);
                    const results = [];

                    $(".gnt_m_lb_a__i").each(async function (i, element) {
                        const result = {}

                        result.id = i;

                        result.headline = $(this)
                            .text();
                        result.time = $(this)
                            .children(".gnt_m_lb_sbt")
                            .data("c-dt");
                        result.topic = $(this)
                            .children(".gnt_m_lb_sbt")
                            .data("c-ms");
                        result.src = mainSrc + $(this)
                            .attr('href')

                        if (result.headline.startsWith("Photos:")) {
                            return;
                        }

                        results.push(result);
                    })

                    console.log(results);
                })
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }
}
