"use strict";

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let StaticContentSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    imgurl: {type: String, required: true}
});

// Export model
module.exports = mongoose.model('StaticContent', StaticContentSchema);

