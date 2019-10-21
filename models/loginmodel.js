var mongoose = require('mongoose');

const LoginSchema = mongoose.Schema({
    // _id : Number,
    username : String,
    password : String, 
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports  = mongoose.model('login',LoginSchema);