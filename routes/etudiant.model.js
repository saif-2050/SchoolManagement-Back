const Etudiants = require("../models/etudiant") ;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const secretKey = "pfmsfs2544ds!" ;
const db = require("../models");


exports.register=async(Email,cin,Name,Phone,Class,Birthday)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Etudiants.findOne({'Email' : Email}) ;

            
        }).then(async (Etudiant)=>{
            if(!Etudiant){
                bcrypt.hash(cin , 10)
                    .then((HashPassword)=>{
                        let new_etudiant = new Etudiants({
                        cin : cin ,
                        Name :  Name ,
                        Email : Email ,
                        Password : HashPassword,
                        isNew : "true",
                        Phone : Phone ,
                        Class : Class ,
                        Birthday : Birthday ,


                        })
                        new_etudiant.save().then((user)=>{
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
                return Etudiants.findOne({'Email' : Email}) ; 

        }).then(async (Etudiant)=>{
            if(!Etudiant){
                reject("This student does not exist") ;
            }else{
                await bcrypt.compare(Password,Etudiant.Password).then((same)=>{  
                   if(same){
                      let token = jwt.sign({id:Etudiant._id , Email:Etudiant.Email , name : Etudiant.Name , new : Etudiant.isNew , Class: Etudiant.Class , Phone:Etudiant.Phone , Birthday:Etudiant.Birthday   },secretKey) ;
                      
                      resolve({token:token, role:"student"});
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
                return Etudiants.findOne({'Email' : Email}) ;

        }).then(async (Etudiant)=>{
            if(!Etudiant){
                reject("This student does not exist") ;
            }else{
                bcrypt.hash(Password , 10)
                .then(async (HashPassword)=>{
                    await Etudiants.findOneAndUpdate({id : Id},
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
                return Etudiants.findOne({"_id" : Id}) ;

        }).then(async (Etudiant)=>{
            if(!Etudiant){
                reject("This student does not exist") ;
            }else{
                
                    await Etudiants.deleteOne({_id: Id}) 
                      .then(result=>{
                       resolve({Msg:"Student Deleted Successfully"});
                      }).catch((err)=>{
                        reject(err) ;
    
                    })

                }
            })
                
            })
        
}



exports.getstudent=async(Id)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Etudiants.findOne({"_id" : Id}) ;

        }).then(async (Etudiant)=>{
            if(!Etudiant){
                reject("This student does not exist") ;
            }else{
                    resolve(Etudiant);
                }
            })
                
            })
        
}


exports.update=async(Id , data)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Etudiants.findOne({"_id" : Id}) ;

        }).then(async (Etudiant)=>{
            if(!Etudiant){
                reject("This student does not exist") ;
            }else{
                //console.log(Etudiant);
                //console.log(data.Name);
                
                const da = await Etudiants.findOneAndUpdate({_id :Id}, 
                    data,{new:true}) 
                  .then(result=>{
                    
                    resolve({Msg:"Student Updated Successfully"});

                }) 
                }
            })
                
            })
        
}