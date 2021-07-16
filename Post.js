const mongoose = require('mongoose');

const PostSchema =  mongoose.Schema({
    lastName:{
        type: String,
        require: true
    },
    firstName:{
        type: String,
        require: true
    } ,
    firstNumber:{
        type: String,
        require: true
    },
    secondNumber:{
        type: String,
    }, 
    thirdNumber:{
        type: String,
    } ,
});

module.exports = mongoose.model('Posts', PostSchema);