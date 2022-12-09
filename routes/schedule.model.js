const Schedule = require("../models/schedule") ;
const Class = require("../models/class") ;

const db = require("../models");





exports.add=async(Data)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Schedule.findOne({'ClassName' : Data.ClassName}) ;
        }).then(async (OldClass)=>{
            if(!OldClass){
              
                        let new_schedule = new Schedule({
                            ClassName: Data.ClassName ,
                            Mon_9h: Data.Mon_9h ,
                            Mon_10h: Data.Mon_10h,
                            Mon_13h: Data.Mon_13h,
                            Mon_15h: Data.Mon_15h,
                            MonTea_9h: Data.MonTea_9h,
                            MonTea_10h: Data.MonTea_10h,
                            MonTea_13h: Data.MonTea_13h,
                            MonTea_15h: Data.MonTea_15h,
                            Tue_9h: Data.Tue_9h,
                            Tue_10h: Data.Tue_10h,
                            Tue_13h: Data.Tue_13h,
                            Tue_15h: Data.Tue_15h,
                            TueTea_9h: Data.TueTea_9h,
                            TueTea_10h: Data.TueTea_10h,
                            TueTea_13h: Data.TueTea_13h,
                            TueTea_15h: Data.TueTea_15h,
                            Wen_9h: Data.Wen_9h,
                            Wen_10h: Data.Wen_10h,
                            Wen_13h: Data.Wen_13h,
                            Wen_15h: Data.Wen_15h,
                            WenTea_9h: Data.WenTea_9h,
                            WenTea_10h: Data.WenTea_10h,
                            WenTea_13h: Data.WenTea_13h,
                            WenTea_15h: Data.WenTea_15h,
                            Thu_9h: Data.Thu_9h,
                            Thu_10h: Data.Thu_10h,
                            Thu_13h: Data.Thu_13h,
                            Thu_15h: Data.Thu_15h,
                            ThuTea_9h: Data.ThuTea_9h,
                            ThuTea_10h: Data.ThuTea_10h,
                            ThuTea_13h: Data.ThuTea_13h,
                            ThuTea_15h: Data.ThuTea_15h,
                            Fri_9h: Data.Fri_9h,
                            Fri_10h: Data.Fri_10h,
                            Fri_13h: Data.Fri_13h,
                            Fri_15h: Data.Fri_15h,
                            FriTea_9h: Data.FriTea_9h,
                            FriTea_10h: Data.FriTea_10h,
                            FriTea_13h: Data.FriTea_13h,
                            FriTea_15h: Data.FriTea_15h,
                            Sat_9h: Data.Sat_9h,
                            Sat_10h: Data.Sat_10h,
                            Sat_13h: Data.Sat_13h,
                            Sat_15h: Data.Sat_15h,
                            SatTea_9h: Data.SatTea_9h,
                            SatTea_10h: Data.SatTea_10h,
                            SatTea_13h: Data.SatTea_13h,
                            SatTea_15h: Data.SatTea_15h
                        })
                        new_schedule.save().then(async (result)=>{
                            const ClassFound = Class.findOne({'ClassName' : Data.ClassName}).then(async function(doc) {
                                if(doc!= null){
                                    const data = { Created : "Yes"}
                                    const da = await Class.findOneAndUpdate({_id :doc._id}, 
                                        data,{new:true}) 
                                      .then(result=>{
                                        resolve("New Schedule saved");
                                    }).catch((err)=>{
                                        reject(err) ;
                
                                    }) 
                                }
                                           
                            })
                       
                        })

                   
                 .catch((err)=>{
                         reject(err) ;

                    })
            
            }else{
                reject("This Schedule is Already Created");

            }
        })
})
}


exports.remove=async(Id)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Schedule.findOne({"_id" : Id}) ;

        }).then(async (OldClass)=>{
            if(!OldClass){
                reject("Schedule does not exist") ;
            }else{
                //const ClassN = Schedule.findOne({"_id" : Id}).then(async function(doc) {
                   // console.log(OldClass.ClassName)
            
                    
                    await Schedule.deleteOne({_id: Id}) 
                      .then(result=>{

                        const ClassFound = Class.findOne({'ClassName' : OldClass.ClassName}).then(async function(doc) {
                            if(doc!= null){
                                const data = { Created : "No"}
                                const da = await Class.findOneAndUpdate({_id :doc._id}, 
                                    data,{new:true}) 
                                  .then(result=>{
                                    resolve({Msg:"Schedule Deleted Successfully"});
                                }).catch((err)=>{
                                    reject(err) ;
            
                                }) 
                            }
                                       
                        })
                      }).catch((err)=>{
                        reject(err) ;
    
                    }) 

                }
            })
                
            })
        
}



exports.get=async(Id)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Schedule.findOne({"_id" : Id}) ;

        }).then(async (OldClass)=>{
            if(!OldClass){
                reject("This Schedule does not exist") ;
            }else{
                    resolve(OldClass);
                }
            })
                
        })
        
}


exports.getByName=async(ClassName)=>{
  
     return new Promise((resolve,reject)=>{
        
        const ClassFound = Schedule.findOne({'ClassName' : ClassName}).then(async function(doc) {
            if(doc){
                resolve(doc)
            }else{
                reject("This Schedule does not exist") ;

            }
        })
                
        })
         
}
exports.update=async(Id , data)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Schedule.findOne({"_id" : Id}) ;

        }).then(async (OldClass)=>{
            if(!OldClass){
                reject("This Schedule does not exist") ;
            }else{
               
                const da = await Schedule.findOneAndUpdate({_id :Id}, 
                    data,{new:true}) 
                  .then(result=>{
                    
                    resolve({Msg:"Schedule Updated Successfully"});

                }) 
                }
            })
                
            })
        
}