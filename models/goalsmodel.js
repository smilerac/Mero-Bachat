var mongoose = require('mongoose');

const GoalSchema = mongoose.Schema({
    // _id : Number,
    for : String,
    amount : Number,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports  = mongoose.model('goal',GoalSchema);  