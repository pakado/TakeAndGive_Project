/**
 * Created by pkdo10 on 1/30/2016.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ImagesSchema = new Schema({

    username: String,
    country: String,
    city: String,
    category: String,
    toUse: String,
    size: String,
    image: { data: Buffer, contentType: String },
    datasrc: String,
    created: { type: Date, defauly: Date.now},
    userRequest: String,
    status: String

});

module.exports = mongoose.model('Images', ImagesSchema);