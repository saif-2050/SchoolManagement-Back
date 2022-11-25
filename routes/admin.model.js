const Admins = require("../models/admin") ;
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const secretKey = "pfmsfs2544ds!" ;
const db = require("../models");


exports.register=async(Email, Password , Name)=>{
    return new Promise((resolve,reject)=>{
        db.mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
                return Admins.findOne({'Email' : Email}) ;

        }).then(async (Admin)=>{
            if(!Admin){
                bcrypt.hash(Password , 10)
                    .then((HashPassword)=>{
                        let new_Admin = new Admins({
                        Name :  Name ,
                        Email : Email ,
                        Password : HashPassword,
                        })
                        new_Admin.save().then((user)=>{
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
                return Admins.findOne({'Email' : Email}) ;

        }).then(async (Admin)=>{
            if(!Admin){
                reject("This student does not exist") ;
            }else{
                await bcrypt.compare(Password,Admin.Password).then((same)=>{
                   if(same){
                      let token = jwt.sign({id:Admin._id , Email:Admin.Email, name : Admin.Name, new:Admin.isNew},secretKey) ;
                      resolve({token:token ,role:"admin"});
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

