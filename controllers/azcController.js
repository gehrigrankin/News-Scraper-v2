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
    }
}

async function getFullDoc(result) {
    return (
        axios.get(result.src)
            .then(async function (response) {
                const $ = cheerio.load(response.data);

                result.text = []

                $('.gnt_pr').each(async function (i, element) {
                    result.author = $(this)
                        .children('.gnt_ar_by')
                        .children('.gnt_ar_by_a')
                        .text();
                    result.company = $(this)
                        .children('.gnt_ar_by')
                        .children('.gnt_ar_pb')
                        .text();


                    $(this).children('.gnt_ar_b')
                        .children('.gnt_ar_b_p')
                        .each(async function (i, element) {
                            result.text.push($(this).text())
                        })
                })
                resultsArr.push(result)
            })
    )
}
