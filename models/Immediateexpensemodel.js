var mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    // _id : Number,
    name : String,
    amount : Number,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports  = mongoose.model('expense',ExpenseSchema);  