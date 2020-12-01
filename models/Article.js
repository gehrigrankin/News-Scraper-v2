const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    headline: {
        type: String,
        required: true
    },
    headlineSummary: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    company: {
        type: String
    },
    text: {
        type: Array,
        required: true
    },
    topic: {
        type: String
    },
    time: {
        type: String,
        required: true
    },
    timeSummary: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    src: {
        type: String,
        required: true 
    }
});

module.exports = Article = mongoose.model("article", ArticleSchema);;