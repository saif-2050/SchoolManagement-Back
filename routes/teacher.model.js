const Teachers = require("../models/teacher") ;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const secretKey = "pfmsfs2544ds!" ;
const db = require("../models");

exports.register=async(Email, cin , Name)=>{
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
                         Password:HashPassword
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