var mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    // _id : Number,
    name : String,
 
});
module.exports  = mongoose.model('todo',TodoSchema);  