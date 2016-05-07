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
    size: String,
    toUse: String,
    userRequest: String,
    status: String,
    permission: String,
    timeRequest: String,
    image: { data: Buffer, contentType: String },
    datasrc: String,
    created: { type: Date, default: Date.now}

});

module.exports = mongoose.model('Images', ImagesSchema);