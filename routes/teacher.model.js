const Teachers = require("../models/teacher") ;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const secretKey = "pfmsfs2544ds!" ;
const db = require("../models");
const Class = require("../models/class") ;

exports.register=async(Email,cin,Name,Phone,Birthday,Class)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Teachers.findOne({'Email' : Email}) ;

        }).then(async (Teacher)=>{
            if(!Teacher){
                bcrypt.hash(cin , 10) 
                    .then((HashPassword)=>{
                        let new_Teacher = new Teachers({
                        cin : cin ,
                        Name :  Name ,
                        Email : Email ,
                        Password : HashPassword,
                        isNew : "true",
                        Phone : Phone ,
                        Birthday : Birthday ,
                        Class :Class ,
                        
                        })
                        new_Teacher.save().then((user)=>{
                        resolve("succ saved")
                        })
                    })
                    .catch((err)=>{
                        reject(err) ;

                    })
            
            }else{
                reject("Email is Found");

            }
        })
})
}


exports.login=async(Email, Password)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Teachers.findOne({'Email' : Email}) ;

        }).then(async (Teacher)=>{
            if(!Teacher){
                reject("This teacher does not exist") ;
            }else{
                await bcrypt.compare(Password,Teacher.Password).then((same)=>{
                   if(same){
                      let token = jwt.sign({id:Teacher._id , Email:Teacher.Email , name : Teacher.Name , new : Teacher.isNew },secretKey) ;
                      resolve({token:token ,role:"teacher"});
                    }else{
                       reject('invalid password') ;
                    }
                })
                .catch((err)=>{
                    reject(err) ;

                })
            }
        })
})
}


exports.setPassword=async(Id, Email, Password)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
            return Teachers.findOne({'Email' : Email}) ;

        }).then(async (Teacher)=>{
            if(!Teacher){
                reject("This teacher does not exist") ;
            }else{
                bcrypt.hash(Password , 10)
                .then(async (HashPassword)=>{
                    await Teachers.findOneAndUpdate({id : Id},
                        {
                         Password:HashPassword,
                         isNew : "false"
                        }) 
                      .then(result=>{
                       resolve({Msg:"Password Updated Successfully"});
                      }) ;

                })
                .catch((err)=>{
                    reject(err) ;

                })
            }
        })
})

}
exports.remove=async(Id)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Teachers.findOne({"_id" : Id}) ;

        }).then(async (Teacher)=>{
            if(!Teacher){
                reject("This teacher does not exist") ;
            }else{
                
                    await Teachers.deleteOne({_id: Id}) 
                      .then(result=>{
                       resolve({Msg:"Teacher Deleted Successfully"});
                      }).catch((err)=>{
                        reject(err) ;
    
                    })

                }
            })
                
            })
        
}



exports.getteacher=async(Id)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Teachers.findOne({"_id" : Id}) ;

        }).then(async (Teacher)=>{
            if(!Teacher){
                reject("This teacher does not exist") ;
            }else{
                    resolve(Teacher);
                }
            })
                
            })
        
}

exports.getteacherByClassName=async(ClassName)=>{
   // console.log(ClassName)
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Class.findOne({'ClassName' : ClassName}) ;

        }).then(async (Found)=>{
            if(!Found){
                reject("This Class does not exist") ;
            }else{
                const ClassFound =  Teachers.find({'Class' : ClassName}).then(async function(doc) {
                    if(doc!= null){
                        resolve(doc);
                    }else{
                        reject("There is no teachers teach this Class") ;
                    }        
                })
                }
            })
                
            })
        
}

exports.update=async(Id , data)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Teachers.findOne({"_id" : Id}) ;

        }).then(async (Teacher)=>{
            if(!Teacher){
                reject("This teacher does not exist") ;
            }else{
                //console.log(Etudiant);
                //console.log(data.Name);
                
                const da = await Teachers.findOneAndUpdate({_id :Id}, 
                    data,{new:true}) 
                  .then(result=>{
                    
                    resolve({Msg:"Teacher Updated Successfully"});

                }) 
                }
            })
                
            })
}