const mongoose  = require("mongoose");

const SubjectSchema = mongoose.Schema({
    SubjectName : {
        type: String,
        required :true 
    } 
})

module.exports = Subject = mongoose.model('Subject',SubjectSchema)