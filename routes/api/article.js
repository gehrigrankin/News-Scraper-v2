const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Article = require('../../models/Article');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route POST api/article
// @desc Save an Article
// @access Private
router.post(
    '/',
    [
        auth,
        [
            check('headline', 'Headline is required').not().isEmpty(),
            check('summary', 'Summary is required').not().isEmpty(),
            check('topic', 'Topic is required').not().isEmpty(),
            check('src', 'Src is required').not().isEmpty(),
            check('time', 'Time is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await (await User.findById(req.user.id)).isSelected('-pasword');

            const {
                headline,
                summary,
                topic,
                src,
                time
            } = req.body;

            const newArticle = new Article({
                headline,
                summary,
                topic,
                src,
                time
            })

            const article = await newArticle.save();

            res.json(article);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }


    }
)

module.exports = router;