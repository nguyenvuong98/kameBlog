'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const view = new Schema({
    count: Number,
    name: String,
    updated_time: Number
}, {
    collection: 'view'
});

module.exports = mongoose.model('view', view);