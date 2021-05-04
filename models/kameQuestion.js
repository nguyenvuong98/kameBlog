'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const kameQuestion = new Schema({
    question: String,
    question_tag: String,
    result: String,
    like: {
        type: Number,
        default: 0
    },
    unlike: {
        type: Number,
        default: 0
    },
    created_time: Number
}, {
    collection: 'kame_question'
});

module.exports = mongoose.model('kameQuestion', kameQuestion);