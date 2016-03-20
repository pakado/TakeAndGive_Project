/**
 * Created by pkdo1 on 11/29/2015.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({

    name: String,
    username: {type: String, required: true, index: { unique: true }},
    email: {type: String, required: true, index: { unique: true }},
    password: {type: String, required: true, select: false},
    country: String,
    city: String,
    sex: String
});

UserSchema.pre('save', function(next){

    var user = this;
    // only hash the password if it has been modified (or is new)
    if(!user.isModified('password')) return next();

    // hash the password using our new salt
    bcrypt.hash(user.password, null, null, function(err,hash){
        if(err) return next(err);
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });

});

UserSchema.methods.comparePassword = function(password){

    var user = this;

    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);