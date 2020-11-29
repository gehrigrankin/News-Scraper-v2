const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile
            .findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);

            if (!profile) {
                return res.status(400).json({ msg: 'There is no profile for this user' });
            }

            res.json(profile);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route POST api/profile
// @desc Create user profile
// @access Private
router.post('/', auth, async (req, res) => {
    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    try {
        let profile = Profile.findOne({ user: req.user.id });

        profile = new Profile(profileFields);
        
        await profile.save();
        res.json(profile)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route GET api/profile
// @desc Get all profiles
// @access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.status(500).send('Server Error')
    }
});

// @route DELETE api/profile
// @desc Delete profile, user, & posts
// @access Private
router.delete('/', auth,  async (req, res) => {
    try {
        // Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });
        
        // Remove User
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted'});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;
