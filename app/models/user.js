// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    summoner: {
        type: String,
        default: null
    }
});

//check if has submited a summoners name
userSchema.methods.hasSummoner = function() {
    return this.summoner;
}
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);