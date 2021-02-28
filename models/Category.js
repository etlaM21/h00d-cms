"use strict";

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    name: {type: String, required: true}
});

// Export model
module.exports = mongoose.model('Category', CategorySchema);