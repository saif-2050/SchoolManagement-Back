const mongoose  = require("mongoose");

const TeacherSchema = mongoose.Schema({
    cin : {
        type:String,
        required :true 
    } ,

    isNew : {
        type:String ,
        required :true 
    },
    Name : {
        type:String ,
        required :true 
    } ,

    
    Email : {
        type:String ,
        required :true 
    } ,

    Password : {
        type:String ,
        required :false 
    } ,
    Phone : {
        type:String ,
        required :false 
    } ,
    Birthday : {
        type:String ,
        required :false 
    },
    Class : {
        type :Array ,
        required :false 
    }
    

})

module.exports = Teacher = mongoose.model('Teacher',TeacherSchema)