"use strict";

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PostSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    excerpt: {type: String, required: true},
    imgurl:  {type: String, required: true},
    date: {type: Date, required: true},
    // category is a ObjectId, coming from the Category collection
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true}
});

// Export model
module.exports = mongoose.model('Post', PostSchema);

