const mongoose  = require("mongoose");

const AdminSchema = mongoose.Schema({
    Name : {
        type:String ,
        required :true 
    } ,
    Email : {
        type:String ,
        required :true 
    } ,

    isNew : {
        type:String ,
        required :true 
    },
    Password : {
        type:String ,
        required :false 
    } ,
    

})

module.exports = Admin = mongoose.model('Admin',AdminSchema)