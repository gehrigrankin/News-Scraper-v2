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
                .then(async function (response) {
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

                        // await getFullDoc(result)
                        results.push(result)
                    })
                    res.json(results)
                })
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    },
    findSelected: async (req, res) => {
        try {
            const { selectedResult } = req.body;

            axios.get(selectedResult.src)
                .then(async function (response) {
                    const $ = cheerio.load(response.data);
                    result = {};
                    result.text = [];
                    result.src = selectedResult.src;
                    result.topic = selectedResult.topic
                    result.headline = selectedResult.headline
                    result.time = selectedResult.time


                    $('.gnt_cw').each(async function (i, element) {
                        result.headlineSummary = $(this)
                            .children('.gnt_pr')
                            .children('.gnt_ar_hl')
                            .text();
                        result.timeSummary = $(this)
                            .children('.gnt_pr')
                            .children('.gnt_ar_dt')
                            .attr('aria-label');
                        result.author = $(this)
                            .children('.gnt_pr')
                            .children('.gnt_ar_by')
                            .children('.gnt_ar_by_a')
                            .text();
                        result.company = $(this)
                            .children('.gnt_pr')
                            .children('.gnt_ar_by')
                            .children('.gnt_ar_pb')
                            .text();

                        $(this).children('.gnt_pr')
                            .children('.gnt_ar_b')
                            .children('.gnt_ar_b_p')
                            .each(async function (i, element) {
                                result.text.push($(this).text())
                            })
                    })
                    res.json(result)
                })
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }

    }
}
