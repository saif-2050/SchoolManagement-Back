const Class = require("../models/class") ;
const db = require("../models");





exports.add=async(ClassName)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Class.findOne({'ClassName' : ClassName}) ;
        }).then(async (OldClass)=>{
            if(!OldClass){
              
                        let new_class = new Class({
                            ClassName  :  ClassName
                        })
                        new_class.save().then((result)=>{
                        resolve("New Class saved")
                        })

                   
                    .catch((err)=>{
                        reject(err) ;

                    })
            
            }else{
                reject("Class Name is Found");

            }
        })
})
}


exports.remove=async(Id)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Class.findOne({"_id" : Id}) ;

        }).then(async (OldClass)=>{
            if(!OldClass){
                reject("Class Name does not exist") ;
            }else{
                
                    await Class.deleteOne({_id: Id}) 
                      .then(result=>{
                       resolve({Msg:"Class Deleted Successfully"});
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
                return Class.findOne({"_id" : Id}) ;

        }).then(async (OldClass)=>{
            if(!OldClass){
                reject("This Class does not exist") ;
            }else{
                    resolve(OldClass);
                }
            })
                
        })
        
}


exports.update=async(Id , data)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Class.findOne({"_id" : Id}) ;

        }).then(async (OldClass)=>{
            if(!OldClass){
                reject("This Class does not exist") ;
            }else{
               
                const da = await Class.findOneAndUpdate({_id :Id}, 
                    data,{new:true}) 
                  .then(result=>{
                    
                    resolve({Msg:"Class Updated Successfully"});

                }) 
                }
            })
                
            })
        
}