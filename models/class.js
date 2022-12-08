const mongoose  = require("mongoose");

const ClassSchema = mongoose.Schema({
    ClassName : {
        type: String,
        required :true 
    } ,
    Created : {
        type: String,
        required :true 
    } ,

})

module.exports = Class = mongoose.model('Class',ClassSchema)