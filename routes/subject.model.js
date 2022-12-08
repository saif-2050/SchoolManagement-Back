const Subject = require("../models/subject") ;
const db = require("../models");





exports.add=async(SubjectName)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Subject.findOne({'SubjectName' : SubjectName}) ;
        }).then(async (OldSubject)=>{
            if(!OldSubject){
              
                        let new_Subject = new Subject({
                            SubjectName  :  SubjectName
                        })
                        new_Subject.save().then((result)=>{
                        resolve("New Subject saved")
                        })
                   
                    .catch((err)=>{
                        reject(err) ;

                    })
            
            }else{
                reject("Subject Name is Found");

            }
        })
})
}


exports.remove=async(Id)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Subject.findOne({"_id" : Id}) ;

        }).then(async (OldSubject)=>{
            if(!OldSubject){
                reject("Subject Name does not exist") ;
            }else{
                
                    await Subject.deleteOne({_id: Id}) 
                      .then(result=>{
                       resolve({Msg:"Subject Deleted Successfully"});
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
                return Subject.findOne({"_id" : Id}) ;

        }).then(async (OldSubject)=>{
            if(!OldSubject){
                reject("This Subject does not exist") ;
            }else{
                    resolve(OldSubject);
                }
            })
                
        })
        
}


exports.update=async(Id , data)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Subject.findOne({"_id" : Id}) ;

        }).then(async (OldSubject)=>{
            if(!OldSubject){
                reject("This Subject does not exist") ;
            }else{
               
                const da = await Subject.findOneAndUpdate({_id :Id}, 
                    data,{new:true}) 
                  .then(result=>{
                    
                    resolve({Msg:"Subject Updated Successfully"});

                }) 
                }
            })
                
            })
        
}