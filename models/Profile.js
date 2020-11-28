const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.TypesObjetId,
        ref: 'user'
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileShema);