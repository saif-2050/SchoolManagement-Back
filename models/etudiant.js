const mongoose  = require("mongoose");

const EtudiantSchema = mongoose.Schema({
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

    Class : {
        type:String ,
        required :false 
    } ,

    Birthday : {
        type:String ,
        required :false 
    } ,
    
    

})

module.exports = Etudiant = mongoose.model('Etudiant',EtudiantSchema)