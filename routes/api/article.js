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
            const {
                headline,
                summary,
                topic,
                src,
                time
            } = req.body;

            const newArticle = new Article({
                user: req.user.id,
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

// @route GET api/article/:id
// @desc Get articles by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ msg: 'Article not found' });
        }

        res.json(article);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Article not found' });
        }

        res.status(500).send('Server Error')
    }
});

// @route DELETE api/article/:id
// @desc Delete an article
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        
        if (!article) {
            return res.status(404).json({ msg: 'Article not found' });
        }

        // Check user
        if (article.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        await article.remove();

        res.json({ msg: 'Article removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Article not found' });
        }

        res.status(500).send('Server Error')
    }
});

// @route GET api/article
// @desc Get articles by user
// @access Private
router.get('/user/:user_id', auth, async (req, res) => {
    try {
        const articles = await Article.find().sort({ date: -1 });

        // if (!profile) {
        //     return res.status(400).json({ msg: 'Profile not found' });
        // }

        res.json(articles);
    } catch (err) {
        console.error(err.message);
        // if(err.kind == 'ObjectId') {
        //     return res.status(400).json({ msg: 'Profile not found' });
        // }

        res.status(500).send('Server Error')
    }
});

module.exports = router;