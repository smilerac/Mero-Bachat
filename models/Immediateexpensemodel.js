var mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    // _id : Number,
    name : String,
    amount : Number,
    category : String,
    // createdDate: {
    //     type: Date,
    //     default: Date.now
    // }
}, {timestamps: true});

module.exports  = mongoose.model('expense',ExpenseSchema);  