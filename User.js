const mongoose = require('mongoose');

const PostSchema =  mongoose.Schema({
    userName:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    } ,
});

module.exports = mongoose.model('User', PostSchema);