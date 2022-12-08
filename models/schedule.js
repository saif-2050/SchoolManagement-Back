const mongoose  = require("mongoose");

const ScheduleSchema = mongoose.Schema({
    ClassName: {
        type:String,
        required :true 
    } ,
    Mon_9h: {
        type:String,
        required :true 
    } ,
    Mon_10h: {
        type:String,
        required :true 
    } ,
    Mon_13h: {
        type:String,
        required :true 
    } ,
    Mon_15h: {
        type:String,
        required :true 
    } ,

    MonTea_9h: {
        type:String,
        required :true 
    } ,
    MonTea_10h: {
        type:String,
        required :true 
    } ,
    MonTea_13h: {
        type:String,
        required :true 
    } ,
    MonTea_15h: {
        type:String,
        required :true 
    } ,

    Tue_9h: {
        type:String,
        required :true 
    } ,
    Tue_10h: {
        type:String,
        required :true 
    } ,
    Tue_13h: {
        type:String,
        required :true 
    } ,
    Tue_15h: {
        type:String,
        required :true 
    } ,

    TueTea_9h: {
        type:String,
        required :true 
    } ,
    TueTea_10h: {
        type:String,
        required :true 
    } ,
    TueTea_13h: {
        type:String,
        required :true 
    } ,
    TueTea_15h: {
        type:String,
        required :true 
    } ,

    Wen_9h: {
        type:String,
        required :true 
    } ,
    Wen_10h: {
        type:String,
        required :true 
    } ,
    Wen_13h: {
        type:String,
        required :true 
    } ,
    Wen_15h: {
        type:String,
        required :true 
    } ,

    WenTea_9h: {
        type:String,
        required :true 
    } ,
    WenTea_10h: {
        type:String,
        required :true 
    } ,
    WenTea_13h: {
        type:String,
        required :true 
    } ,
    WenTea_15h: {
        type:String,
        required :true 
    } ,

    Thu_9h: {
        type:String,
        required :true 
    } ,
    Thu_10h: {
        type:String,
        required :true 
    } ,
    Thu_13h: {
        type:String,
        required :true 
    } ,
    Thu_15h: {
        type:String,
        required :true 
    } ,

    ThuTea_9h: {
        type:String,
        required :true 
    } ,
    ThuTea_10h: {
        type:String,
        required :true 
    } ,
    ThuTea_13h: {
        type:String,
        required :true 
    } ,
    ThuTea_15h: {
        type:String,
        required :true 
    } ,

    Fri_9h: {
        type:String,
        required :true 
    } ,
    Fri_10h: {
        type:String,
        required :true 
    } ,
    Fri_13h: {
        type:String,
        required :true 
    } ,
    Fri_15h: {
        type:String,
        required :true 
    } ,

    FriTea_9h: {
        type:String,
        required :true 
    } ,
    FriTea_10h: {
        type:String,
        required :true 
    } ,
    FriTea_13h: {
        type:String,
        required :true 
    } ,
    FriTea_15h: {
        type:String,
        required :true 
    } ,

    Sat_9h: {
        type:String,
        required :true 
    } ,
    Sat_10h: {
        type:String,
        required :true 
    } ,
    Sat_13h: {
        type:String,
        required :true 
    } ,
    Sat_15h: {
        type:String,
        required :true 
    } ,

    SatTea_9h: {
        type:String,
        required :true 
    } ,
    SatTea_10h: {
        type:String,
        required :true 
    } ,
    SatTea_13h: {
        type:String,
        required :true 
    } ,
    SatTea_15h: {
        type:String,
        required :true 
    } 
    

})

module.exports = Schedule = mongoose.model('Schedule',ScheduleSchema)